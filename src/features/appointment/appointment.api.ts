import { baseApi } from "@/redux/api/baseApi";
import { ApiParams, ApiResponse } from "@/types/api";
import { IAppointment } from "./appointment.interface";

export const appointmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAppointments: builder.query<
      ApiResponse<IAppointment[]>,
      ApiParams & { date?: string; doctorId?: string; branchId?: string }
    >({
      query: ({ page, limit, searchTerm, date, branchId, doctorId }) => ({
        url: "/appointment",
        params: { page, limit, searchTerm, date, branchId, doctorId },
      }),
      providesTags: ["appointment"],
    }),
    getAppointmentById: builder.query<ApiResponse<IAppointment>, string>({
      query: (id) => `/appointment/${id}`,
      providesTags: ["appointment"],
    }),
    createAppointment: builder.mutation<IAppointment, Partial<IAppointment>>({
      query: (body) => ({ url: "/appointment", method: "POST", body }),
      invalidatesTags: ["appointment"],
    }),
    updateAppointment: builder.mutation<
      IAppointment,
      Partial<IAppointment> & { id: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/appointment/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["appointment"],
    }),
    deleteAppointment: builder.mutation<
      { success: boolean; id: string },
      string
    >({
      query: (id) => ({ url: `/appointment/${id}`, method: "DELETE" }),
      invalidatesTags: ["appointment"],
    }),
  }),
});

export const {
  useGetAppointmentsQuery,
  useGetAppointmentByIdQuery,
  useCreateAppointmentMutation,
  useUpdateAppointmentMutation,
  useDeleteAppointmentMutation,
} = appointmentApi;
