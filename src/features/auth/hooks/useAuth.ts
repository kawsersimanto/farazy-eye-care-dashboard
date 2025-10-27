"use client";

import { IUser } from "@/features/user/user.interface";
import { RootState } from "@/redux/store";
import { decodeToken } from "@/utils/tokenHandler";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
} from "../auth.api";
import { reset, setEmail, setToken, setUser } from "../store/auth.slice";

// ---- Types ----
interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  email: string;
  password: string;
  name?: string;
}

interface AuthResponse {
  token: string;
  user: IUser;
}

interface UseAuthReturn {
  user: IUser | null;
  token: string | null;
  email: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  handleLogin: (credentials: LoginCredentials) => Promise<void>;
  handleLogout: () => Promise<void>;
  handleRegister: (credentials: RegisterCredentials) => Promise<void>;
}

// ---- Hook ----
export const useAuth = (): UseAuthReturn => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { user, token, email } = useSelector((state: RootState) => state.auth);

  const [login, { isLoading: loginLoading }] = useLoginMutation();
  const [logout, { isLoading: logoutLoading }] = useLogoutMutation();
  const [register, { isLoading: registerLoading }] = useRegisterMutation();

  const isLoading = loginLoading || logoutLoading || registerLoading;

  // ---- LOGIN ----
  const handleLogin = useCallback(
    async ({ email, password }: LoginCredentials) => {
      try {
        const response = await login({ email, password }).unwrap();

        const token: string = response?.data?.token;
        const decodedUser = decodeToken(token);

        dispatch(setEmail(email));
        dispatch(setToken(token));
        dispatch(setUser(decodedUser as IUser));

        localStorage.setItem("token", token);
        router.push("/");
      } catch (error) {
        const message =
          (error as { data?: { message?: string } })?.data?.message ||
          "Login failed";
        throw new Error(message);
      }
    },
    [login, dispatch, router]
  );

  // ---- LOGOUT ----
  const handleLogout = useCallback(async () => {
    try {
      await logout({}).unwrap();
      dispatch(reset());
      localStorage.removeItem("token");
      document.cookie =
        "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      router.push("/login");
    } catch (error) {
      const message =
        (error as { data?: { message?: string } })?.data?.message ||
        "Logout failed";
      throw new Error(message);
    }
  }, [logout, dispatch, router]);

  // ---- REGISTER ----
  const handleRegister = useCallback(
    async (credentials: RegisterCredentials) => {
      try {
        const response = (await register(credentials).unwrap()) as AuthResponse;

        dispatch(setEmail(credentials.email));
        dispatch(setToken(response.token));
        dispatch(setUser(response.user));

        localStorage.setItem("token", response.token);
        router.push("/dashboard");
      } catch (error) {
        const message =
          (error as { data?: { message?: string } })?.data?.message ||
          "Registration failed";
        throw new Error(message);
      }
    },
    [register, dispatch, router]
  );

  return {
    user,
    token,
    email,
    isLoading,
    isAuthenticated: Boolean(token),
    handleLogin,
    handleLogout,
    handleRegister,
  };
};
