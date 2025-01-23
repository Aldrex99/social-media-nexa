import React, { createContext } from "react";
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
  setUser: React.Dispatch<React.SetStateAction<any>>;
  isAuthenticated: boolean;
  setIsAuthenticated?: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [user, setUser] = React.useState<IUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const getUser = async () => {
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
      console.error("Failed to get user", error);
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
      console.error("Failed to logout", error);
      return false;
    }
  };

  React.useEffect(() => {
    getUser();
  }, []);

  const value: IUserContextValue = {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    getUser,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
