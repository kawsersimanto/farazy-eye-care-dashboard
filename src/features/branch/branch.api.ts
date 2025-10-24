import { baseApi } from "@/redux/api/baseApi";
import { ApiResponse } from "@/types/api";
import { IBranch } from "./branch.interface";

export const branchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBranches: builder.query<ApiResponse<IBranch[], false>, void>({
      query: () => "/branch",
      providesTags: ["branch"],
    }),
    getBranchById: builder.query<IBranch, string>({
      query: (id) => `/branch/${id}`,
    }),
    createBranch: builder.mutation<IBranch, Partial<IBranch>>({
      query: (body) => ({ url: "/branch", method: "POST", body }),
    }),
    updateBranch: builder.mutation<IBranch, Partial<IBranch> & { id: string }>({
      query: ({ id, ...body }) => ({
        url: `/branch/${id}`,
        method: "PUT",
        body,
      }),
    }),
    deleteBranch: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({ url: `/branch/${id}`, method: "DELETE" }),
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
