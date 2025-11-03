import { baseApi } from "@/redux/api/baseApi";
import { ApiResponse } from "@/types/api";
import { IPatient } from "./patient.interface";

export const patientApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPatients: builder.query<ApiResponse<IPatient[]>, void>({
      query: () => "/patient",
      providesTags: ["patient"],
    }),
    getPatientById: builder.query<ApiResponse<IPatient>, string>({
      query: (id) => `/patient/${id}`,
      providesTags: ["patient"],
    }),
    createPatient: builder.mutation<IPatient, Partial<IPatient>>({
      query: (body) => ({ url: "/patient", method: "POST", body }),
      invalidatesTags: ["patient"],
    }),
    updatePatient: builder.mutation<IPatient, Partial<IPatient> & { id: string }>(
      {
        query: ({ id, ...body }) => ({
          url: `/patient/${id}`,
          method: "PUT",
          body,
        }),
        invalidatesTags: ["patient"],
      }
    ),
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
