"use client";

import { IRole, IUser } from "@/features/user/user.interface";
import { useAppSelector } from "@/redux/hook";
import { decodeToken } from "@/utils/tokenHandler";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useGetProfileQuery,
  useLoginMutation,
  useLogoutMutation,
  useResetPasswordMutation,
} from "../auth.api";
import {
  ChangePasswordCredentials,
  ForgotPasswordCredentials,
  LoginCredentials,
  ResetPasswordCredentials,
  UseAuthReturn,
} from "../auth.interface";
import {
  clearToken,
  decodeStoredToken,
  extractErrorMessage,
  saveToken,
} from "../auth.utils";
import { reset, setEmail, setToken, setUser } from "../store/auth.slice";

export const useAuth = (): UseAuthReturn => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { user, token, email } = useAppSelector((state) => state.auth);

  const [login, { isLoading: loginLoading }] = useLoginMutation();
  const [logout, { isLoading: logoutLoading }] = useLogoutMutation();
  const [changePassword, { isLoading: changePasswordLoading }] =
    useChangePasswordMutation();
  const [resetPassword, { isLoading: resetPasswordLoading }] =
    useResetPasswordMutation();
  const [forgotPassword, { isLoading: forgotPasswordLoading }] =
    useForgotPasswordMutation();

  const { data: profileData, isLoading: profileLoading } = useGetProfileQuery(
    "",
    {
      skip: !token,
    }
  );

  const profile = profileData?.data || null;

  const isLoading =
    loginLoading ||
    logoutLoading ||
    changePasswordLoading ||
    resetPasswordLoading ||
    forgotPasswordLoading ||
    profileLoading;

  // ---- LOGIN ----
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

  // ---- LOGOUT ----
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

  // ---- CHANGE PASSWORD ----
  const handleChangePassword = useCallback(
    async ({ oldPassword, newPassword }: ChangePasswordCredentials) => {
      try {
        await changePassword({
          oldPassword,
          newPassword,
        }).unwrap();
      } catch (error) {
        throw new Error(
          extractErrorMessage(error, "Failed to change password")
        );
      }
    },
    [changePassword]
  );

  // ---- RESET PASSWORD ----
  const handleResetPassword = useCallback(
    async ({ password }: ResetPasswordCredentials) => {
      try {
        await resetPassword({
          password,
        }).unwrap();

        router.push("/login");
      } catch (error) {
        throw new Error(extractErrorMessage(error, "Failed to reset password"));
      }
    },
    [resetPassword, router]
  );

  // ---- FORGOT PASSWORD ----
  const handleForgotPassword = useCallback(
    async ({ email }: ForgotPasswordCredentials) => {
      try {
        await forgotPassword({ email }).unwrap();
      } catch (error) {
        throw new Error(
          extractErrorMessage(
            error,
            "Failed to process forgot password request"
          )
        );
      }
    },
    [forgotPassword]
  );

  // ---- ROLE HELPERS ----
  const getUserRole = useCallback((): IRole | null => {
    const decoded = decodeStoredToken();
    return decoded?.role || null;
  }, []);

  const hasRole = useCallback(
    (requiredRoles: IRole[]): boolean => {
      const role = getUserRole();
      return role ? requiredRoles.includes(role) : false;
    },
    [getUserRole]
  );

  const isSuperAdmin = useCallback(
    (): boolean => hasRole([IRole.SUPER_ADMIN]),
    [hasRole]
  );

  const isAdmin = useCallback((): boolean => hasRole([IRole.ADMIN]), [hasRole]);

  const isBranchAdmin = useCallback(
    (): boolean => hasRole([IRole.BRANCH_ADMIN]),
    [hasRole]
  );

  const isDoctor = useCallback(
    (): boolean => hasRole([IRole.DOCTOR]),
    [hasRole]
  );

  const isPatient = useCallback(
    (): boolean => hasRole([IRole.PATIENT]),
    [hasRole]
  );

  const isEmployee = useCallback(
    (): boolean => hasRole([IRole.EMPLOYEE]),
    [hasRole]
  );

  return {
    user,
    token,
    email,
    profile,
    isLoading,
    isAuthenticated: Boolean(token),
    handleLogin,
    handleLogout,
    handleChangePassword,
    handleResetPassword,
    handleForgotPassword,
    getUserRole,
    hasRole,
    isSuperAdmin,
    isBranchAdmin,
    isAdmin,
    isDoctor,
    isPatient,
    isEmployee,
  };
};
