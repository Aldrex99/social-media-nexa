import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

export const PrivateRoute = ({ acceptedRole }: { acceptedRole: string[] }) => {
  const { user, isAuthenticated } = useUser();

  if (!user || !isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!acceptedRole.includes(user.role)) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};
