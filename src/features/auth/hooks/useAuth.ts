"use client";

import { IUser } from "@/features/user/user.interface";
import { useAppSelector } from "@/redux/hook";
import { decodeToken } from "@/utils/tokenHandler";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useLoginMutation, useLogoutMutation } from "../auth.api";
import { LoginCredentials, UseAuthReturn } from "../auth.interface";
import { clearToken, extractErrorMessage, saveToken } from "../auth.utils";
import { reset, setEmail, setToken, setUser } from "../store/auth.slice";

export const useAuth = (): UseAuthReturn => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { user, token, email } = useAppSelector((state) => state.auth);

  const [login, { isLoading: loginLoading }] = useLoginMutation();
  const [logout, { isLoading: logoutLoading }] = useLogoutMutation();

  const isLoading = loginLoading || logoutLoading;

  const handleLogin = useCallback(
    async ({ email, password }: LoginCredentials) => {
      try {
        const response = await login({ email, password }).unwrap();
        const token: string = response?.data?.token;

        const decodedUser = decodeToken(token);

        if (!decodedUser) {
          throw new Error("Failed to decode user from token");
        }

        dispatch(setEmail(email));
        dispatch(setToken(token));
        dispatch(setUser(decodedUser as IUser));

        saveToken(token);
        router.push("/");
      } catch (error) {
        throw new Error(extractErrorMessage(error, "Login failed"));
      }
    },
    [login, dispatch, router]
  );

  const handleLogout = useCallback(async () => {
    try {
      await logout({}).unwrap();
      dispatch(reset());
      clearToken();
      router.push("/login");
    } catch (error) {
      throw new Error(extractErrorMessage(error, "Logout failed"));
    }
  }, [logout, dispatch, router]);

  return {
    user,
    token,
    email,
    isLoading,
    isAuthenticated: Boolean(token),
    handleLogin,
    handleLogout,
  };
};
