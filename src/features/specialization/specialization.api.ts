import { baseApi } from "@/redux/api/baseApi";
import { ApiResponse } from "@/types/api";
import { ISpecialization } from "./specialization.interface";

export const specializationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSpecializations: builder.query<ApiResponse<ISpecialization[]>, void>({
      query: () => "/specialization",
      providesTags: ["specialization"],
    }),
    getSpecializationById: builder.query<ApiResponse<ISpecialization>, string>({
      query: (id) => `/specialization/${id}`,
      providesTags: ["specialization"],
    }),
    createSpecialization: builder.mutation<ISpecialization, Partial<ISpecialization>>({
      query: (body) => ({ url: "/specialization", method: "POST", body }),
      invalidatesTags: ["specialization"],
    }),
    updateSpecialization: builder.mutation<ISpecialization, Partial<ISpecialization> & { id: string }>(
      {
        query: ({ id, ...body }) => ({
          url: `/specialization/${id}`,
          method: "PUT",
          body,
        }),
        invalidatesTags: ["specialization"],
      }
    ),
    deleteSpecialization: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({ url: `/specialization/${id}`, method: "DELETE" }),
      invalidatesTags: ["specialization"],
    }),
  }),
});

export const {
  useGetSpecializationsQuery,
  useGetSpecializationByIdQuery,
  useCreateSpecializationMutation,
  useUpdateSpecializationMutation,
  useDeleteSpecializationMutation,
} = specializationApi;
