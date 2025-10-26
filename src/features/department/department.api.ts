import { baseApi } from "@/redux/api/baseApi";
import { ApiResponse } from "@/types/api";
import { IDepartment } from "./department.interface";

export const departmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDepartments: builder.query<ApiResponse<IDepartment[]>, void>({
      query: () => "/department",
      providesTags: ["department"],
    }),
    getDepartmentById: builder.query<ApiResponse<IDepartment>, string>({
      query: (id) => `/department/${id}`,
      providesTags: ["department"],
    }),
    createDepartment: builder.mutation<IDepartment, Partial<IDepartment>>({
      query: (body) => ({ url: "/department", method: "POST", body }),
      invalidatesTags: ["department"],
    }),
    updateDepartment: builder.mutation<
      IDepartment,
      Partial<IDepartment> & { id: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/department/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["department"],
    }),
    deleteDepartment: builder.mutation<
      { success: boolean; id: string },
      string
    >({
      query: (id) => ({ url: `/department/${id}`, method: "DELETE" }),
      invalidatesTags: ["department"],
    }),
  }),
});

export const {
  useGetDepartmentsQuery,
  useGetDepartmentByIdQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} = departmentApi;
