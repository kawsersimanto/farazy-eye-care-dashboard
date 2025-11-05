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
import { Spinner } from "@/components/ui/spinner";
import { useAppSelector } from "@/redux/hook";
import { ApiResponse } from "@/types/api";
import { handleMutationRequest } from "@/utils/handleMutationRequest";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useCreateEmployeeMutation } from "../employee.api";
import { EmployeeSchema, EmployeeSchemaType } from "../employee.schema";

export const EmployeeForm = () => {
  const router = useRouter();
  const [createEmployeeFn, { isLoading }] = useCreateEmployeeMutation();
  const branchId = useAppSelector(
    (state) => state.auth.user?.branchId
  ) as string;
  const form = useForm<EmployeeSchemaType>({
    resolver: zodResolver(EmployeeSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: EmployeeSchemaType) => {
    await handleMutationRequest(
      createEmployeeFn,
      { ...values, branchId },
      {
        loadingMessage: "Creating Employee",
        successMessage: (res: ApiResponse<string>) => res?.message,
        onSuccess: () => {
          router.push("/employees");
        },
      }
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 py-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="ex. zahed@farazy-eye-care.com"
                  type="email"
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
