import { baseApi } from "@/redux/api/baseApi";
import { ApiResponse } from "@/types/api";
import { IPrescription } from "./prescription.interface";

export const prescriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPrescriptions: builder.query<ApiResponse<IPrescription[]>, void>({
      query: () => "/prescription",
      providesTags: ["prescription"],
    }),
    getPrescriptionById: builder.query<ApiResponse<IPrescription>, string>({
      query: (id) => `/prescription/${id}`,
      providesTags: ["prescription"],
    }),
    createPrescription: builder.mutation<IPrescription, Partial<IPrescription>>({
      query: (body) => ({ url: "/prescription", method: "POST", body }),
      invalidatesTags: ["prescription"],
    }),
    updatePrescription: builder.mutation<IPrescription, Partial<IPrescription> & { id: string }>(
      {
        query: ({ id, ...body }) => ({
          url: `/prescription/${id}`,
          method: "PUT",
          body,
        }),
        invalidatesTags: ["prescription"],
      }
    ),
    deletePrescription: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({ url: `/prescription/${id}`, method: "DELETE" }),
      invalidatesTags: ["prescription"],
    }),
  }),
});

export const {
  useGetPrescriptionsQuery,
  useGetPrescriptionByIdQuery,
  useCreatePrescriptionMutation,
  useUpdatePrescriptionMutation,
  useDeletePrescriptionMutation,
} = prescriptionApi;
