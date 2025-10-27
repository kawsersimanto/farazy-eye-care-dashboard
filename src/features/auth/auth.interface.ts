import { IUser } from "@/features/user/user.interface";
import { ApiResponse } from "@/types/api";

export interface AuthState {
  email: string;
  token: string;
  user: IUser | null;
}

export type AuthResponse = ApiResponse<Pick<AuthState, "token" | "user">>;

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name?: string;
}

export interface UseAuthReturn {
  user: IUser | null;
  token: string | null;
  email: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  handleLogin: (credentials: LoginCredentials) => Promise<void>;
  handleLogout: () => Promise<void>;
  // handleRegister: (credentials: RegisterCredentials) => Promise<void>;
}
