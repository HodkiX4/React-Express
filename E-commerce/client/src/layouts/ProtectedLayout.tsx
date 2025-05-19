import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore"
import useCart from "../hooks/useCart";
import { useEffect } from "react";

const ProtectedLayout = () => {
  const { token } = useAuthStore();
  const { fetchCart,cart } = useCart();
  useEffect(() => {
    if (token && cart === null) {
      fetchCart();
    }
  }, [])
  return token ? <Outlet/> : <Navigate to='/login' replace />
}

export default ProtectedLayout