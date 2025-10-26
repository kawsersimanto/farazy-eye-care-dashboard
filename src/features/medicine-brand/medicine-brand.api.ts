import { baseApi } from "@/redux/api/baseApi";
import { ApiResponse } from "@/types/api";
import { IMedicineBrand } from "./medicine-brand.interface";

export const medicineBrandApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMedicineBrands: builder.query<ApiResponse<IMedicineBrand[]>, void>({
      query: () => "/medicine-brand",
      providesTags: ["medicine-brand"],
    }),
    getMedicineBrandById: builder.query<ApiResponse<IMedicineBrand>, string>({
      query: (id) => `/medicine-brand/${id}`,
      providesTags: ["medicine-brand"],
    }),
    createMedicineBrand: builder.mutation<IMedicineBrand, Partial<IMedicineBrand>>({
      query: (body) => ({ url: "/medicine-brand", method: "POST", body }),
      invalidatesTags: ["medicine-brand"],
    }),
    updateMedicineBrand: builder.mutation<IMedicineBrand, Partial<IMedicineBrand> & { id: string }>(
      {
        query: ({ id, ...body }) => ({
          url: `/medicine-brand/${id}`,
          method: "PUT",
          body,
        }),
        invalidatesTags: ["medicine-brand"],
      }
    ),
    deleteMedicineBrand: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({ url: `/medicine-brand/${id}`, method: "DELETE" }),
      invalidatesTags: ["medicine-brand"],
    }),
  }),
});

export const {
  useGetMedicineBrandsQuery,
  useGetMedicineBrandByIdQuery,
  useCreateMedicineBrandMutation,
  useUpdateMedicineBrandMutation,
  useDeleteMedicineBrandMutation,
} = medicineBrandApi;
