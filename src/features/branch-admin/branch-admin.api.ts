import { baseApi } from "@/redux/api/baseApi";
import { ApiParams, ApiResponse } from "@/types/api";
import { IRole, IUser } from "../user/user.interface";
import { IBranchAdmin } from "./branch-admin.interface";

export const branchAdminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBranchAdmins: builder.query<
      ApiResponse<IUser[], true>,
      Partial<ApiParams & { branchId?: string; role?: string }>
    >({
      query: ({
        branchId,
        role = IRole.BRANCH_ADMIN,
        page = 1,
        limit = 10,
      }) => ({
        url: "/users",
        params: {
          ...(branchId && { branchId }),
          role,
          page,
          limit,
        },
      }),
      providesTags: ["users"],
    }),
    getBranchAdminById: builder.query<ApiResponse<IUser>, string>({
      query: (id) => `/users/${id}`,
      providesTags: ["users"],
    }),
    createBranchAdmin: builder.mutation<IUser, Partial<IUser>>({
      query: (body) => ({
        url: "/users/create-branch-admin",
        method: "POST",
        body,
      }),
      invalidatesTags: ["users"],
    }),
    updateBranchAdmin: builder.mutation<
      IBranchAdmin,
      Partial<IBranchAdmin> & { id: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/branch-admin/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["branch-admin"],
    }),
    deleteBranchAdmin: builder.mutation<
      { success: boolean; id: string },
      string
    >({
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
