import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth?.token;

      if (token) {
        headers.set("Authorization", `${token}`);
      }

      return headers;
    },
  }),
  tagTypes: [
    "prescription-pdf",
    "prescription",
    "appointment",
    "specialization",
    "schedule",
    "branch-admin",
    "employee",
    "doctor",
    "patient",
    "medicine",
    "medicine-category",
    "medicine-brand",
    "auth",
    "articles",
    "branch",
    "articleCategories",
    "users",
    "images",
    "polls",
    "pollCategories",
    "subscription",
    "department",
  ],
  endpoints: () => ({}),
});
