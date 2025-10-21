import { baseApi } from "@/redux/api/baseApi";
import { Branch } from "./branch.interface";

export const branchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBranchs: builder.query<Branch[], void>({
      query: () => "/branch",
    }),
    getBranchById: builder.query<Branch, string>({
      query: (id) => `/branch/${id}`,
    }),
    createBranch: builder.mutation<Branch, Partial<Branch>>({
      query: (body) => ({ url: "/branch", method: "POST", body }),
    }),
    updateBranch: builder.mutation<Branch, Partial<Branch> & { id: string }>(
      { query: ({ id, ...body }) => ({ url: `/branch/${id}`, method: "PUT", body }) }
    ),
    deleteBranch: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({ url: `/branch/${id}`, method: "DELETE" }),
    }),
  }),
});

export const {
  useGetBranchsQuery,
  useGetBranchByIdQuery,
  useCreateBranchMutation,
  useUpdateBranchMutation,
  useDeleteBranchMutation,
} = branchApi;
