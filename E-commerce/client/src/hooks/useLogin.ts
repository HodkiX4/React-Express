import { useState } from "react";
import { loginApi } from "../api/authApi";
import { useToast } from "../context/ToastContext";
import { NavigateFunction } from "react-router-dom";
import { useAuthStore } from "../store/authStore";  // Import your Zustand store

export const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { showError, showSuccess } = useToast();
  
  const { setToken, setUser } = useAuthStore();

  const handleLogin = async (email: string, password: string, navigate: NavigateFunction) => {
    if (!email || !password) {
      showError("Login failed. Please fill in all the fields!");
      return;
    }

    setLoading(true);
    try {
      const response = await loginApi(email, password);
      
      if (response) {
        setToken(response.token);
        setUser(response.user);

        showSuccess("Login successful!");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      showError("Login failed. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading };
};
