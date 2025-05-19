import { useState } from 'react';
import { changeEmailApi, changePasswordApi } from '../api/userApi';
import { useToast } from '../context/ToastContext';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import { validateEmail, validatePassword } from '../utils/validation';

export const useUser = () => {
  const { setUser, handleLogout } = useAuthStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { showError, showSuccess } = useToast();

  const changePassword = async (currentPassword: string, newPassword: string) => {
    if (!currentPassword || !newPassword) {
      showError('Both current and new passwords are required');
      return;
    }

    const validationError = validatePassword(newPassword);
    if (validationError) {
      showError(validationError);
      return;
    }

    setLoading(true);
    try {
      const response = await changePasswordApi(currentPassword, newPassword);
      showSuccess(response.message);
      if(response) {
        handleLogout(navigate, showSuccess);
      }
    } catch (error) {
      console.error(error);
      showError("Password change failed");
    } finally {
      setLoading(false);
    }
  };

  const changeEmail = async (currentEmail: string, newEmail: string) => {
    if (!currentEmail || !newEmail) {
      showError('Both current and new emails are required');
      return;
    }

    const validationError = validateEmail(newEmail);
    if (validationError) {
      showError(validationError);
      return;
    }

    setLoading(true);
    try {
      const response = await changeEmailApi(currentEmail, newEmail);
      showSuccess(response.message);
      setUser({ email: response.newEmail });
    } catch (error) {
      console.error(error);
      showError("Email change failed");
    } finally {
      setLoading(false);
    }
  };

  return { changePassword, changeEmail, loading };
};
