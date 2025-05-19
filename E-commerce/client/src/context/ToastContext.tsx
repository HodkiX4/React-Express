import React, { createContext, useContext, useRef } from "react";
import toast from "react-hot-toast";

const ToastContext = createContext({
  showError: (message: string) => {},
  showSuccess: (message: string) => {},
});

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const toastId = useRef<string | undefined>(undefined);

  const showError = (message: string) => {
    // Remove the previous toast if any
    if (toastId.current) toast.remove(toastId.current);
    toastId.current = toast.error(message);
  };

  const showSuccess = (message: string) => {
    if (toastId.current) toast.remove(toastId.current);
    toastId.current = toast.success(message);
  };

  return (
    <ToastContext.Provider value={{ showError, showSuccess }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
