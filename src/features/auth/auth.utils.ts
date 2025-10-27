export const TOKEN_KEY = "token";
export const TOKEN_COOKIE_NAME = "token";

export interface TokenStorageOptions {
  useLocalStorage?: boolean;
  useCookie?: boolean;
}

/**
 * Save token to storage (localStorage and/or cookie)
 */

export const saveToken = (
  token: string,
  options: TokenStorageOptions = { useLocalStorage: true, useCookie: true }
): void => {
  if (options.useLocalStorage) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  if (options.useCookie) {
    document.cookie = `${TOKEN_COOKIE_NAME}=${token}; path=/; max-age=86400`;
  }
};

/**
 * Remove token from all storage locations
 */

export const clearToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  document.cookie = `${TOKEN_COOKIE_NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
};

/**
 * Extract error message from API response
 */

export const extractErrorMessage = (
  error: unknown,
  fallbackMessage: string = "An error occurred"
): string => {
  return (
    (error as { data?: { message?: string } })?.data?.message || fallbackMessage
  );
};
