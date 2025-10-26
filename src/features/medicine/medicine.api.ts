import { baseApi } from "@/redux/api/baseApi";
import { ApiResponse } from "@/types/api";
import { IMedicine } from "./medicine.interface";

export const medicineApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMedicines: builder.query<ApiResponse<IMedicine[], true>, void>({
      query: () => "/medicine",
      providesTags: ["medicine"],
    }),
    getMedicineById: builder.query<ApiResponse<IMedicine>, string>({
      query: (id) => `/medicine/${id}`,
      providesTags: ["medicine"],
    }),
    createMedicine: builder.mutation<IMedicine, Partial<IMedicine>>({
      query: (body) => ({ url: "/medicine", method: "POST", body }),
      invalidatesTags: ["medicine"],
    }),
    updateMedicine: builder.mutation<
      IMedicine,
      Partial<IMedicine> & { id: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/medicine/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["medicine"],
    }),
    deleteMedicine: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({ url: `/medicine/${id}`, method: "DELETE" }),
      invalidatesTags: ["medicine"],
    }),
  }),
});

export const {
  useGetMedicinesQuery,
  useGetMedicineByIdQuery,
  useCreateMedicineMutation,
  useUpdateMedicineMutation,
  useDeleteMedicineMutation,
} = medicineApi;
