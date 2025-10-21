import { IUser } from "@/features/user/user.interface";
import { ApiResponse } from "@/types/api";

export interface AuthState {
  email: string;
  token: string;
  user: Partial<IUser> | null;
}

export type AuthResponse = ApiResponse<Pick<AuthState, "token">>;
