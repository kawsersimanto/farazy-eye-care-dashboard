import { IRole, IUser } from "@/features/user/user.interface";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface ChangePasswordCredentials {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ResetPasswordCredentials {
  password: string;
  confirmPassword: string;
}

export interface ForgotPasswordCredentials {
  email: string;
}

export interface AuthResponse {
  data: {
    token: string;
    user?: IUser;
  };
  message: string;
}

export interface UseAuthReturn {
  user: IUser | null;
  token: string | null;
  email: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  handleLogin: (credentials: LoginCredentials) => Promise<void>;
  handleLogout: () => Promise<void>;
  handleChangePassword: (
    credentials: ChangePasswordCredentials
  ) => Promise<void>;
  handleResetPassword: (credentials: ResetPasswordCredentials) => Promise<void>;
  handleForgotPassword: (
    credentials: ForgotPasswordCredentials
  ) => Promise<void>;
  getUserRole: () => IRole | null;
  hasRole: (requiredRoles: IRole[]) => boolean;
  isSuperAdmin: () => boolean;
  isAdmin: () => boolean;
  isDoctor: () => boolean;
  isPatient: () => boolean;
  isEmployee: () => boolean;
}
