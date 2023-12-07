export const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const doPasswordsMatch = (password: string, confirmPassword: string) => {
  return password === confirmPassword;
};
