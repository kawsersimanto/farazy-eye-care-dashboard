import { baseApi } from "@/redux/api/baseApi";
import { ApiResponse } from "@/types/api";
import { IRole, IUser } from "../user/user.interface";
import { IDoctor } from "./doctor.interface";

export const doctorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDoctors: builder.query<
      ApiResponse<IUser[], true>,
      { branchId: string; role?: string }
    >({
      query: ({ branchId, role = IRole.PATIENT }) => ({
        url: "/users",
        params: { branchId, role },
      }),
      providesTags: ["users"],
    }),
    getDoctorById: builder.query<ApiResponse<IDoctor>, string>({
      query: (id) => `/doctor/${id}`,
      providesTags: ["doctor"],
    }),
    createDoctor: builder.mutation<IDoctor, Partial<IDoctor>>({
      query: (body) => ({ url: "/doctor", method: "POST", body }),
      invalidatesTags: ["doctor"],
    }),
    updateDoctor: builder.mutation<IDoctor, Partial<IDoctor> & { id: string }>({
      query: ({ id, ...body }) => ({
        url: `/doctor/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["doctor"],
    }),
    deleteDoctor: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({ url: `/doctor/${id}`, method: "DELETE" }),
      invalidatesTags: ["doctor"],
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
