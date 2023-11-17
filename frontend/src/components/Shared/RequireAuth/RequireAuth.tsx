import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const RequireAuth: React.FC = () => {
  const { auth } = useAuth();
  const location = useLocation();
  const item = window.localStorage.getItem("token");

  return item ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
