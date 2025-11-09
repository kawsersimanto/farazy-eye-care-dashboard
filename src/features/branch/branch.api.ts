import { baseApi } from "@/redux/api/baseApi";
import { ApiResponse } from "@/types/api";
import { IBranch } from "./branch.interface";

export const branchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBranches: builder.query<ApiResponse<IBranch[], false>, void>({
      query: () => "/branch",
      providesTags: ["branch"],
    }),
    getBranchById: builder.query<ApiResponse<IBranch>, string>({
      query: (id) => `/branch/${id}`,
      providesTags: ["branch"],
    }),
    createBranch: builder.mutation<IBranch, Partial<IBranch>>({
      query: (body) => ({ url: "/branch", method: "POST", body }),
      invalidatesTags: ["branch"],
    }),
    updateBranch: builder.mutation<IBranch, Partial<IBranch> & { id: string }>({
      query: ({ id, ...body }) => ({
        url: `/branch/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["branch"],
    }),
    deleteBranch: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({ url: `/branch/${id}`, method: "DELETE" }),
      invalidatesTags: ["branch"],
    }),
  }),
});

export const {
  useGetBranchesQuery,
  useGetBranchByIdQuery,
  useCreateBranchMutation,
  useUpdateBranchMutation,
  useDeleteBranchMutation,
} = branchApi;
