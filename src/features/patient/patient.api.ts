import { baseApi } from "@/redux/api/baseApi";
import { ApiParams, ApiResponse } from "@/types/api";
import { IRole, IUser } from "../user/user.interface";
import { IPatient } from "./patient.interface";

export const patientApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPatients: builder.query<
      ApiResponse<IUser[], true>,
      Partial<ApiParams & { branchId: string; role?: string }>
    >({
      query: ({ branchId, role = IRole.PATIENT, page = 1, limit = 10 }) => ({
        url: "/users",
        params: { branchId, role, page, limit },
      }),
      providesTags: ["users"],
    }),
    getPatientById: builder.query<ApiResponse<IPatient>, string>({
      query: (id) => `/patient/${id}`,
      providesTags: ["patient"],
    }),
    createPatient: builder.mutation<IPatient, Partial<IPatient>>({
      query: (body) => ({ url: "/patient", method: "POST", body }),
      invalidatesTags: ["patient"],
    }),
    updatePatient: builder.mutation<
      IPatient,
      Partial<IPatient> & { id: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/patient/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["patient"],
    }),
    deletePatient: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({ url: `/patient/${id}`, method: "DELETE" }),
      invalidatesTags: ["patient"],
    }),
  }),
});

export const {
  useGetPatientsQuery,
  useGetPatientByIdQuery,
  useCreatePatientMutation,
  useUpdatePatientMutation,
  useDeletePatientMutation,
} = patientApi;
