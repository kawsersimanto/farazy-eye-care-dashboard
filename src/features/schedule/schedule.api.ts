import { baseApi } from "@/redux/api/baseApi";
import { ApiResponse } from "@/types/api";
import { ISchedule } from "./schedule.interface";

export const scheduleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSchedules: builder.query<ApiResponse<ISchedule[]>, void>({
      query: () => "/doctor-schedule/",
      providesTags: ["schedule"],
    }),
    getScheduleById: builder.query<ApiResponse<ISchedule>, string>({
      query: (id) => `/doctor-schedule/${id}`,
      providesTags: ["schedule"],
    }),
    getDoctorScheduleById: builder.query<ApiResponse<ISchedule[]>, string>({
      query: (id) => `/doctor-schedule/doctor/${id}`,
      providesTags: ["schedule"],
    }),
    createSchedule: builder.mutation<ISchedule, Partial<ISchedule>>({
      query: (body) => ({ url: "/doctor-schedule", method: "POST", body }),
      invalidatesTags: ["schedule"],
    }),
    updateSchedule: builder.mutation<
      ISchedule,
      Partial<ISchedule> & { id: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/doctor-schedule/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["schedule"],
    }),
    deleteSchedule: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({ url: `/doctor-schedule/${id}`, method: "DELETE" }),
      invalidatesTags: ["schedule"],
    }),
  }),
});

export const {
  useGetSchedulesQuery,
  useGetScheduleByIdQuery,
  useGetDoctorScheduleByIdQuery,
  useCreateScheduleMutation,
  useUpdateScheduleMutation,
  useDeleteScheduleMutation,
} = scheduleApi;
