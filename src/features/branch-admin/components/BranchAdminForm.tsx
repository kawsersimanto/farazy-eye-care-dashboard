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
import { useCreateBranchAdminMutation } from "../branch-admin.api";
import {
  BranchAdminSchema,
  BranchAdminSchemaType,
} from "../branch-admin.schema";

export const BranchAdminForm = () => {
  const router = useRouter();
  const branchId = useAppSelector(
    (state) => state.auth.user?.branchId
  ) as string;
  const [createBranchAdminFn, { isLoading }] = useCreateBranchAdminMutation();
  const form = useForm<BranchAdminSchemaType>({
    resolver: zodResolver(BranchAdminSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: BranchAdminSchemaType) => {
    await handleMutationRequest(
      createBranchAdminFn,
      { ...values, branchId },
      {
        loadingMessage: "Creating Branch Admin",
        successMessage: (res: ApiResponse<string>) => res?.message,
        onSuccess: () => {
          router.push("/branch-admin");
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
