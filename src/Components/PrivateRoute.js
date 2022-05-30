import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ user, redirectPath = "/login" }) => {
  if (!user.success) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};
