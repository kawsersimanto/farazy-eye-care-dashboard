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
import { ApiResponse } from "@/types/api";
import { handleMutationRequest } from "@/utils/handleMutationRequest";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  useGetMedicineBrandByIdQuery,
  useUpdateMedicineBrandMutation,
} from "../medicine-brand.api";
import {
  MedicineBrandSchema,
  MedicineBrandValues,
} from "../medicine-brand.schema";
import { MedicineBrandSkeleton } from "./MedicineBrandSkeleton";

export const MedicineBrandEdit = ({ id }: { id: string }) => {
  const router = useRouter();
  const { data, isLoading: loadingMedicineBrand } =
    useGetMedicineBrandByIdQuery(id);
  const [updateMedicineBrandFn, { isLoading }] =
    useUpdateMedicineBrandMutation();

  const medicineBrand = data?.data;

  const form = useForm<MedicineBrandValues>({
    resolver: zodResolver(MedicineBrandSchema),
    defaultValues: {
      name: "",
      manufacturer: "",
      country: "Bangladesh",
      isActive: true,
    },
  });

  useEffect(() => {
    if (medicineBrand) {
      form.reset({
        name: medicineBrand?.name || "",
        manufacturer: medicineBrand?.manufacturer || "",
        country: medicineBrand?.country || "",
        isActive: medicineBrand?.isActive ?? true,
      });
    }
  }, [medicineBrand, form]);

  const onSubmit = async (values: MedicineBrandValues) => {
    await handleMutationRequest(
      updateMedicineBrandFn,
      { id, ...values },
      {
        loadingMessage: "Updating Medicine Brand",
        successMessage: (res: ApiResponse<string>) => res?.message,
        onSuccess: () => {
          router.push("/medicine/brands");
        },
      }
    );
  };

  if (loadingMedicineBrand) return <MedicineBrandSkeleton />;

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
                <Input placeholder="ex. Novartis" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="manufacturer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Manufacturer</FormLabel>
              <FormControl>
                <Input placeholder="ex. Novartis AG" type="text" {...field} />
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
