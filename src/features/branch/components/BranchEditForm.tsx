"use client";
import { PhoneInput } from "@/components/phone-input/PhoneInput";
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
import { UploadImage } from "@/components/upload-image/UploadImage";
import {
  useDeleteImageByUrlMutation,
  useUploadSingleImageMutation,
} from "@/features/image/image.api";
import { ApiResponse } from "@/types/api";
import { handleMutationRequest } from "@/utils/handleMutationRequest";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useGetBranchByIdQuery, useUpdateBranchMutation } from "../branch.api";
import { BranchFormValues, BranchSchema } from "../branch.schema";
import { BranchFormSkeleton } from "./BranchFormSkeleton";

export const BranchEditForm = ({ id }: { id: string }) => {
  const router = useRouter();
  const { data, isLoading: loadingBranch } = useGetBranchByIdQuery(id);
  const branch = data?.data;
  const [updateBranchFn, { isLoading }] = useUpdateBranchMutation();
  const uploadMutation = useUploadSingleImageMutation();
  const deleteMutation = useDeleteImageByUrlMutation();

  const form = useForm<BranchFormValues>({
    resolver: zodResolver(BranchSchema),
    defaultValues: {
      name: "",
      email: "",
      code: "",
      logoUrl: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      postalCode: "",
      country: "Bangladesh",
      phone: "",
      isActive: true,
    },
  });

  useEffect(() => {
    if (branch) {
      form.reset({
        name: branch.name || "",
        email: branch.email || "",
        code: branch.code || "",
        logoUrl: branch.logoUrl || "",
        addressLine1: branch.addressLine1 || "",
        addressLine2: branch.addressLine2 || "",
        city: branch.city || "",
        postalCode: branch.postalCode || "",
        country: branch.country || "Bangladesh",
        phone: branch.phone || "",
        isActive: branch.isActive ?? true,
      });
    }
  }, [branch, form]);

  const onSubmit = async (values: BranchFormValues) => {
    await handleMutationRequest(
      updateBranchFn,
      { id, ...values },
      {
        loadingMessage: "Updating Branch",
        successMessage: (res: ApiResponse<string>) => res?.message,
        onSuccess: () => {
          router.push("/branches");
        },
      }
    );
  };

  if (loadingBranch) {
    return <BranchFormSkeleton />;
  }

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
                <Input placeholder="ex. Badda" type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Branch Code</FormLabel>
              <FormControl>
                <Input placeholder="ex. BADDA01" type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="logoUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Branch Logo</FormLabel>
              <FormControl>
                <UploadImage
                  uploadMutation={uploadMutation}
                  deleteMutation={deleteMutation}
                  onImageChange={(url) => field.onChange(url)}
                  defaultImageUrl={field.value || ""}
                  maxSize={5}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="ex. badda@gmail.com"
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
          name="phone"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel>Phone</FormLabel>
              <FormControl className="w-full">
                <PhoneInput
                  placeholder="ex. 01723412341"
                  {...field}
                  defaultCountry="BD"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="addressLine1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Line 1</FormLabel>
              <FormControl>
                <Input
                  placeholder="ex. 12/3, Badda Block-B"
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
          name="addressLine2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Line 2</FormLabel>
              <FormControl>
                <Input
                  placeholder="ex. Rampura, Dhaka"
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
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="ex. Bansree" type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="postalCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Postal Code</FormLabel>
              <FormControl>
                <Input placeholder="ex. 1204" type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem hidden={true}>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input placeholder="ex. Bangladesh" type="text" {...field} />
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
        <Button type="submit" disabled={isLoading || loadingBranch}>
          {isLoading ? (
            <>
              <Spinner />
              Updating
            </>
          ) : (
            "Update"
          )}
        </Button>
      </form>
    </Form>
  );
};
