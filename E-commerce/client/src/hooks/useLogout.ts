import { useToast } from "../context/ToastContext";
import { useAuthStore } from "../store/authStore";
import { NavigateFunction } from "react-router-dom";

export const useLogout = () => {
  const { setUser, setToken } = useAuthStore();
  const { showSuccess } = useToast();

  const handleLogout = (navigate: NavigateFunction) => {
    // Clear user and token from the store
    setUser(null);
    setToken(null);
    
    showSuccess("Logged out successfully!");
    navigate("/login"); // redirect to login page after logout
  };

  return { handleLogout };
};
