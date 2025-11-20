import { baseApi } from "@/redux/api/baseApi";
import { ApiResponse } from "@/types/api";
import { IPrescriptionPdf } from "./prescription-pdf.interface";

export const prescriptionPdfApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPrescriptionPdfs: builder.query<ApiResponse<IPrescriptionPdf[]>, void>({
      query: () => "/prescription-pdf",
      providesTags: ["prescription-pdf"],
    }),
    getPrescriptionPdfById: builder.query<ApiResponse<IPrescriptionPdf>, string>({
      query: (id) => `/prescription-pdf/${id}`,
      providesTags: ["prescription-pdf"],
    }),
    createPrescriptionPdf: builder.mutation<IPrescriptionPdf, Partial<IPrescriptionPdf>>({
      query: (body) => ({ url: "/prescription-pdf", method: "POST", body }),
      invalidatesTags: ["prescription-pdf"],
    }),
    updatePrescriptionPdf: builder.mutation<IPrescriptionPdf, Partial<IPrescriptionPdf> & { id: string }>(
      {
        query: ({ id, ...body }) => ({
          url: `/prescription-pdf/${id}`,
          method: "PUT",
          body,
        }),
        invalidatesTags: ["prescription-pdf"],
      }
    ),
    deletePrescriptionPdf: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({ url: `/prescription-pdf/${id}`, method: "DELETE" }),
      invalidatesTags: ["prescription-pdf"],
    }),
  }),
});

export const {
  useGetPrescriptionPdfsQuery,
  useGetPrescriptionPdfByIdQuery,
  useCreatePrescriptionPdfMutation,
  useUpdatePrescriptionPdfMutation,
  useDeletePrescriptionPdfMutation,
} = prescriptionPdfApi;
