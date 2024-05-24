export function errorCheckEmail(email: string): string {
  if (!email) {
    return "Email is required";
  }
  if (!isValidEmail(email)) {
    return "Invalid email address";
  }
  return "";
}

export function errorCheckPassword(password: string): string {
  if (!password) {
    return "Password is required";
  }
  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }
  return "";
}

/**
 * Helper
 */

export function isValidEmail(email: string): boolean {
  return email.includes("@") && email.includes(".");
}
