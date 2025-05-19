import { useState } from "react";
import { validateSignup } from "../utils/validation";
import { signupApi } from "../api/authApi";
import { useToast } from "../context/ToastContext";

export const useSignup = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { showError, showSuccess } = useToast();

  const handleSignup = async (email: string, password: string, passwordAgain: string) => {
   const validationErrors = validateSignup(email, password, passwordAgain);
    if (validationErrors) {
      const errorMessage = Object.values(validationErrors).join(", ");
      showError(errorMessage);
      return;
    }

    setLoading(true);
    try {
      await signupApi(email, password);
      showSuccess("Signup successful!");
    } catch (error) {
      showError("Signup failed. Please try again!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { handleSignup, loading };
};
