import Loading from "../pages/Loading";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

export const PrivateRoute = ({ acceptedRole }: { acceptedRole: string[] }) => {
  const { user, isAuthenticated, userIsLoaded } = useUser();

  if (!userIsLoaded) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (acceptedRole.includes("guest") && isAuthenticated) {
    return <Navigate to="/post" />;
  }

  if (user && acceptedRole.includes(user.role)) {
    return <Outlet />;
  }

  return <Navigate to="/login" />;
};
