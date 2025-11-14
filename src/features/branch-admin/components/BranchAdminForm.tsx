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
import { useGetBranchesQuery } from "@/features/branch/branch.api";
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
  const [createBranchAdminFn, { isLoading }] = useCreateBranchAdminMutation();
  const { data: branches } = useGetBranchesQuery();

  const form = useForm<BranchAdminSchemaType>({
    resolver: zodResolver(BranchAdminSchema),
    defaultValues: {
      email: "",
      branchId: "",
    },
  });

  const onSubmit = async (values: BranchAdminSchemaType) => {
    await handleMutationRequest(
      createBranchAdminFn,
      { ...values, branchId: values.branchId },
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

        <FormField
          control={form.control}
          name="branchId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Branch</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="ex. Bansree Branch" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {branches?.data?.map((branch) => (
                    <SelectItem key={branch?.id} value={branch?.id}>
                      {branch?.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

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
