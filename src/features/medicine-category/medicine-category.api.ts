import { baseApi } from "@/redux/api/baseApi";
import { ApiResponse } from "@/types/api";
import { IMedicineCategory } from "./medicine-category.interface";

export const medicineCategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMedicineCategories: builder.query<
      ApiResponse<IMedicineCategory[]>,
      void
    >({
      query: () => "/medicine-category",
      providesTags: ["medicine-category"],
    }),
    getMedicineCategoryById: builder.query<
      ApiResponse<IMedicineCategory>,
      string
    >({
      query: (id) => `/medicine-category/${id}`,
      providesTags: ["medicine-category"],
    }),
    createMedicineCategory: builder.mutation<
      IMedicineCategory,
      Partial<IMedicineCategory>
    >({
      query: (body) => ({ url: "/medicine-category", method: "POST", body }),
      invalidatesTags: ["medicine-category"],
    }),
    updateMedicineCategory: builder.mutation<
      IMedicineCategory,
      Partial<IMedicineCategory> & { id: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/medicine-category/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["medicine-category"],
    }),
    deleteMedicineCategory: builder.mutation<
      { success: boolean; id: string },
      string
    >({
      query: (id) => ({ url: `/medicine-category/${id}`, method: "DELETE" }),
      invalidatesTags: ["medicine-category"],
    }),
  }),
});

export const {
  useGetMedicineCategoriesQuery,
  useGetMedicineCategoryByIdQuery,
  useCreateMedicineCategoryMutation,
  useUpdateMedicineCategoryMutation,
  useDeleteMedicineCategoryMutation,
} = medicineCategoryApi;
