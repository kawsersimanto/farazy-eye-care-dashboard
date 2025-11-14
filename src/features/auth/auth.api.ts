import { baseApi } from "@/redux/api/baseApi";
import { ApiResponse } from "@/types/api";
import { IDoctor } from "../doctor/doctor.interface";
import { IEmployeeProfile } from "../employee/employee.interface";
import { IPatient } from "../patient/patient.interface";
import { IUser } from "../user/user.interface";
import { AuthResponse } from "./auth.interface";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, { email: string; password: string }>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["auth"],
    }),
    getProfile: builder.query<ApiResponse<IUser>, string>({
      query: () => `/users/profile`,
      providesTags: ["auth"],
    }),

    updateProfile: builder.mutation<
      ApiResponse<IUser>,
      {
        user: Partial<IUser>;
        doctorProfile?: Partial<IDoctor> | null;
        employeeProfile?: Partial<IEmployeeProfile> | null;
        patientProfile?: Partial<IPatient> | null;
      }
    >({
      query: (body) => ({
        url: `/users/profile`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["auth"],
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["auth"],
    }),
    changePassword: builder.mutation<
      ApiResponse<{ message: string }>,
      { oldPassword: string; newPassword: string }
    >({
      query: (body) => ({
        url: "/auth/change-password",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["auth"],
    }),
    resetPassword: builder.mutation<ApiResponse<null>, { password: string }>({
      query: (body) => ({
        url: "/auth/reset-password",
        method: "POST",
        body,
      }),
      invalidatesTags: ["auth"],
    }),
    forgotPassword: builder.mutation<ApiResponse<null>, { email: string }>({
      query: (body) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body,
      }),
      invalidatesTags: ["auth"],
    }),
    register: builder.mutation({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetProfileQuery,
  useLogoutMutation,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
