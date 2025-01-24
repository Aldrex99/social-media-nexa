import { createContext } from "react";

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
  logout: () => Promise<boolean>;
}

export const UserContext = createContext<IUserContextValue | null>(null);
export type { IUser, IUserContextValue };
