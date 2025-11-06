import { baseApi } from "@/redux/api/baseApi";
import { ApiResponse } from "@/types/api";
import { IBranchAdmin } from "./branch-admin.interface";

export const branchAdminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBranchAdmins: builder.query<ApiResponse<IBranchAdmin[]>, void>({
      query: () => "/branch-admin",
      providesTags: ["branch-admin"],
    }),
    getBranchAdminById: builder.query<ApiResponse<IBranchAdmin>, string>({
      query: (id) => `/branch-admin/${id}`,
      providesTags: ["branch-admin"],
    }),
    createBranchAdmin: builder.mutation<IBranchAdmin, Partial<IBranchAdmin>>({
      query: (body) => ({ url: "/branch-admin", method: "POST", body }),
      invalidatesTags: ["branch-admin"],
    }),
    updateBranchAdmin: builder.mutation<IBranchAdmin, Partial<IBranchAdmin> & { id: string }>(
      {
        query: ({ id, ...body }) => ({
          url: `/branch-admin/${id}`,
          method: "PUT",
          body,
        }),
        invalidatesTags: ["branch-admin"],
      }
    ),
    deleteBranchAdmin: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({ url: `/branch-admin/${id}`, method: "DELETE" }),
      invalidatesTags: ["branch-admin"],
    }),
  }),
});

export const {
  useGetBranchAdminsQuery,
  useGetBranchAdminByIdQuery,
  useCreateBranchAdminMutation,
  useUpdateBranchAdminMutation,
  useDeleteBranchAdminMutation,
} = branchAdminApi;
