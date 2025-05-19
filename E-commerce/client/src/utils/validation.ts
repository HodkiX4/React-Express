export const validateEmail = (email: string) => {
  const trimmedEmail = email?.trim();
  if (!trimmedEmail) {
    return "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    return "Please enter a valid email";
  }
  return null;
};

export const validatePassword = (password: string) => {
  if (!password) {
    return "Password is required";
  } else if (password.length < 8) {
    return "Password must be at least 8 characters long";
  } else if (!/(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(password)) {
    return "Password must contain at least one uppercase letter, one number, and one special character";
  }
  return null;
};

export const validateSignup = (email: string, password: string, passwordAgain: string) => {
  const errors: Record<string, string> = {};

  const emailError = validateEmail(email);
  if (emailError) {
    errors.email = emailError;
  }

  const passwordError = validatePassword(password);
  if (passwordError) {
    errors.password = passwordError;
  }

  if (password !== passwordAgain) {
    errors.passwordAgain = "Passwords don't match";
  }

  return Object.keys(errors).length ? errors : null;
};
