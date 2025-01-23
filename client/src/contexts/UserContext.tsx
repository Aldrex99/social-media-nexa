import React, { createContext, useState, useEffect } from "react";
import { fetcher } from "../utils/fetch";

interface IUser {
  id: string;
  email: string;
  username: string;
  role: string;
  avatar?: string;
}

interface IUserContextValue {
  user: IUser | null;
  userIsLoaded?: boolean;
  isAuthenticated: boolean;
  getUser: () => Promise<void>;
  logout: () => boolean;
}

const UserContext = createContext<IUserContextValue | null>(null);

export const useUser = () => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [userIsLoaded, setUserIsLoaded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const getUser = async (reloadGet = false) => {
    setUserIsLoaded(false);
    try {
      const response = await fetcher("/user");

      if (response) {
        const data: IUser = {
          id: response.id,
          email: response.email,
          username: response.username,
          role: response.role,
          avatar: response.avatar,
        };
        setUser(data);
      }

      setIsAuthenticated(true);
    } catch (error) {
      if (reloadGet) {
        console.log("Failed to get user", error);
        return;
      }
    } finally {
      setUserIsLoaded(true);
    }
  };

  const logout = (): boolean => {
    try {
      document.cookie =
        "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setUser(null);
      setIsAuthenticated(false);

      return true;
    } catch (error) {
      console.log("Failed to logout", error);
      return false;
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const value: IUserContextValue = {
    user,
    userIsLoaded,
    isAuthenticated,
    getUser,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
