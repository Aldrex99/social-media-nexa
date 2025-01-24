// UserProvider.tsx
import React, { useState, useEffect } from "react";
import { fetcher } from "@utils/fetch";
import { UserContext, IUserContextValue } from "@contexts/UserContext";
import { IUser } from "@/types/user";

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [userIsLoaded, setUserIsLoaded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const getMe = async (reloadGet = false) => {
    setUserIsLoaded(false);
    try {
      const response = await fetcher("/user/me");

      if (response) {
        const data: IUser = {
          id: response._id,
          email: response.email,
          username: response.username,
          role: response.role,
          profilePictureLink: response.profilePictureLink,
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

  const logout = async (): Promise<boolean> => {
    try {
      await fetcher("/auth/logout");
      setUser(null);
      setIsAuthenticated(false);

      return true;
    } catch (error) {
      console.log("Failed to logout", error);
      return false;
    }
  };

  useEffect(() => {
    getMe();
  }, []);

  const value: IUserContextValue = {
    user,
    userIsLoaded,
    isAuthenticated,
    getMe,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
