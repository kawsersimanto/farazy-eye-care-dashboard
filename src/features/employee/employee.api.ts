import { baseApi } from "@/redux/api/baseApi";
import { ApiResponse } from "@/types/api";
import { IEmployee } from "./employee.interface";

export const employeeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEmployees: builder.query<ApiResponse<IEmployee[]>, void>({
      query: () => "/employee",
      providesTags: ["employee"],
    }),
    getEmployeeById: builder.query<ApiResponse<IEmployee>, string>({
      query: (id) => `/employee/${id}`,
      providesTags: ["employee"],
    }),
    createEmployee: builder.mutation<IEmployee, Partial<IEmployee>>({
      query: (body) => ({ url: "/employee", method: "POST", body }),
      invalidatesTags: ["employee"],
    }),
    updateEmployee: builder.mutation<IEmployee, Partial<IEmployee> & { id: string }>(
      {
        query: ({ id, ...body }) => ({
          url: `/employee/${id}`,
          method: "PUT",
          body,
        }),
        invalidatesTags: ["employee"],
      }
    ),
    deleteEmployee: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({ url: `/employee/${id}`, method: "DELETE" }),
      invalidatesTags: ["employee"],
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
