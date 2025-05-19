import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const PublicLayout = () => {
  const { token } = useAuthStore();

  return token ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicLayout;
