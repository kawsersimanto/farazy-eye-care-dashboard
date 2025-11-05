import { baseApi } from "@/redux/api/baseApi";
import { ApiParams, ApiResponse } from "@/types/api";
import { IRole, IUser } from "../user/user.interface";

export const employeeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEmployees: builder.query<
      ApiResponse<IUser[], true>,
      Partial<ApiParams & { branchId: string; role?: string }>
    >({
      query: ({ branchId, role = IRole.EMPLOYEE, page = 1, limit = 10 }) => ({
        url: "/users",
        params: { branchId, role, page, limit },
      }),
      providesTags: ["users"],
    }),
    getEmployeeById: builder.query<ApiResponse<IUser>, string>({
      query: (id) => `/users/${id}`,
      providesTags: ["users"],
    }),
    createEmployee: builder.mutation<IUser, Partial<IUser>>({
      query: (body) => ({
        url: "/users/create-employee",
        method: "POST",
        body,
      }),
      invalidatesTags: ["users"],
    }),
    updateEmployee: builder.mutation<IUser, Partial<IUser> & { id: string }>({
      query: ({ id, ...body }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["users"],
    }),
    deleteEmployee: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({ url: `/users/${id}`, method: "DELETE" }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useGetEmployeeByIdQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = employeeApi;
