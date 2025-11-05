import { baseApi } from "@/redux/api/baseApi";
import { ApiParams, ApiResponse } from "@/types/api";
import { IRole, IUser } from "../user/user.interface";

export const doctorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDoctors: builder.query<
      ApiResponse<IUser[], true>,
      Partial<ApiParams & { branchId: string; role?: string }>
    >({
      query: ({ branchId, role = IRole.DOCTOR, page = 1, limit = 10 }) => ({
        url: "/users",
        params: { branchId, role, page, limit },
      }),
      providesTags: ["users"],
    }),
    getDoctorById: builder.query<ApiResponse<IUser>, string>({
      query: (id) => `/users/${id}`,
      providesTags: ["users"],
    }),
    createDoctor: builder.mutation<IUser, Partial<IUser>>({
      query: (body) => ({ url: "/users/create-doctor", method: "POST", body }),
      invalidatesTags: ["users"],
    }),
    updateDoctor: builder.mutation<IUser, Partial<IUser> & { id: string }>({
      query: ({ id, ...body }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["users"],
    }),
    deleteDoctor: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({ url: `/users/${id}`, method: "DELETE" }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useGetDoctorsQuery,
  useGetDoctorByIdQuery,
  useCreateDoctorMutation,
  useUpdateDoctorMutation,
  useDeleteDoctorMutation,
} = doctorApi;
