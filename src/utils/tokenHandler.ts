import { jwtDecode } from "jwt-decode";

/**
 * Decode a JWT token and return its payload.
 * Returns `null` if the token is invalid or can't be decoded.
 */

export function decodeToken(token: string) {
  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return null;
  }
}

/**
 * Check whether a JWT token is expired.
 * Returns `true` if the token is expired or invalid.
 */
export const isTokenExpired = (token: string): boolean => {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return true;

  const currentTime = Math.floor(Date.now() / 1000);
  return decoded.exp < currentTime;
};
