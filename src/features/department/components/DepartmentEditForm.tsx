"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { ApiResponse } from "@/types/api";
import { handleMutationRequest } from "@/utils/handleMutationRequest";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  useGetDepartmentByIdQuery,
  useUpdateDepartmentMutation,
} from "../department.api";
import { DepartmentFormValues, DepartmentSchema } from "../department.schema";
import { DepartmentFormSkeleton } from "./DepartmentFormSkeleton";

export const DepartmentEditForm = ({ id }: { id: string }) => {
  const { data, isLoading: loadingDepartment } = useGetDepartmentByIdQuery(id);
  const router = useRouter();
  const [updateDepartmentFn, { isLoading }] = useUpdateDepartmentMutation();

  const department = data?.data;

  const form = useForm<DepartmentFormValues>({
    resolver: zodResolver(DepartmentSchema),
    defaultValues: {
      name: "",
      alias: "",
      description: "",
      isActive: true,
    },
  });

  useEffect(() => {
    if (department) {
      form.reset({
        name: department?.name || "",
        alias: department?.alias || "",
        description: department?.description || "",
        isActive: department?.isActive ?? true,
      });
    }
  }, [department, form]);

  const onSubmit = async (values: DepartmentFormValues) => {
    await handleMutationRequest(
      updateDepartmentFn,
      { id, ...values },
      {
        loadingMessage: "Updating Department",
        successMessage: (res: ApiResponse<string>) => res?.message,
        onSuccess: () => {
          router.push("/department");
        },
      }
    );
  };

  if (loadingDepartment) return <DepartmentFormSkeleton />;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 py-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="ex. Ophthalmology" type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="alias"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alias</FormLabel>
              <FormControl>
                <Input
                  placeholder="ex. Brain & Vision"
                  type="text"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(value === "true")}
                defaultValue={field.value ? "true" : "false"}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="true">Active</SelectItem>
                  <SelectItem value="false">Inactive</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="ex. Manages vision problems related to the brain and nervous system"
                  className="resize-none"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Spinner />
              Submitting
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  );
};
