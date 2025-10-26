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
import { useGetMedicineBrandsQuery } from "@/features/medicine-brand/medicine-brand.api";
import { useGetMedicineCategoriesQuery } from "@/features/medicine-category/medicine-category.api";
import { ApiResponse } from "@/types/api";
import { handleMutationRequest } from "@/utils/handleMutationRequest";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  useGetMedicineByIdQuery,
  useUpdateMedicineMutation,
} from "../medicine.api";
import { MedicineFormValues, MedicineSchema } from "../medicine.schema";
import { MedicineFormSkeleton } from "./MedicineFormSkeleton";

export const MedicineEdit = ({ id }: { id: string }) => {
  const router = useRouter();
  const { data: medicineData, isLoading: loadingMedicine } =
    useGetMedicineByIdQuery(id);
  const [updateMedicineFn, { isLoading }] = useUpdateMedicineMutation();
  const { data: categories, isLoading: loadingCategory } =
    useGetMedicineCategoriesQuery();
  const { data: brands, isLoading: loadingBrand } = useGetMedicineBrandsQuery();

  const form = useForm<MedicineFormValues>({
    resolver: zodResolver(MedicineSchema),
    defaultValues: {
      name: "",
      genericName: "",
      strength: "",
      unit: "",
      type: "",
      description: "",
      sideEffects: "",
      dosageForm: "",
      routeOfAdmin: "",
      unitPrice: 0,
      mrp: 0,
      isPrescriptionOnly: false,
      categoryId: "",
      brandId: "",
      isActive: true,
    },
  });

  const medicine = medicineData?.data;

  useEffect(() => {
    if (medicine) {
      form.reset({
        name: medicine?.name ?? "",
        genericName: medicine?.genericName ?? "",
        strength: medicine?.strength ?? "",
        unit: medicine?.unit ?? undefined,
        type: medicine?.type ?? undefined,
        description: medicine?.description ?? undefined,
        sideEffects: medicine?.sideEffects ?? undefined,
        dosageForm: medicine?.dosageForm ?? undefined,
        routeOfAdmin: medicine?.routeOfAdmin ?? undefined,
        unitPrice: medicine?.unitPrice ?? 0,
        mrp: medicine?.mrp ?? 0,
        isPrescriptionOnly: medicine?.isPrescriptionOnly ?? false,
        categoryId: medicine?.category?.id ?? "",
        brandId: medicine?.brand?.id ?? "",
        isActive: medicine?.isActive ?? true,
      });
    }
  }, [medicine, form]);

  const onSubmit = async (values: MedicineFormValues) => {
    await handleMutationRequest(
      updateMedicineFn,
      { id, ...values },
      {
        loadingMessage: "Updating Medicine",
        successMessage: (res: ApiResponse<string>) => res?.message,
        onSuccess: () => {
          router.push("/medicine");
        },
      }
    );
  };

  if (loadingBrand) return <MedicineFormSkeleton />;

  if (loadingCategory) return <MedicineFormSkeleton />;

  if (loadingMedicine) return <MedicineFormSkeleton />;

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
                <Input placeholder="ex. Paracetamol" type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="genericName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Generic Name</FormLabel>
              <FormControl>
                <Input placeholder="ex. Paracetamol" type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="strength"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Strength</FormLabel>
              <FormControl>
                <Input placeholder="ex. 250mg" type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="unit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unit</FormLabel>
              <FormControl>
                <Input placeholder="ex. CAP" type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Input placeholder="ex. CAPSULE" type="text" {...field} />
              </FormControl>

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
                  placeholder="ex. Antibiotic for bacterial infections"
                  className="resize-none"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sideEffects"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Side Effects</FormLabel>
              <FormControl>
                <Input placeholder="ex. Eye Vision" type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dosageForm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dosage Form</FormLabel>
              <FormControl>
                <Input placeholder="ex. Capsule" type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="routeOfAdmin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Route Of Admin</FormLabel>
              <FormControl>
                <Input placeholder="ex. Oral" type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="unitPrice"
          render={({ field }) => {
            const { onChange, ...rest } = field;
            return (
              <FormItem>
                <FormLabel>Unit Price</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ex. 0.8"
                    type="number"
                    onChange={(e) => onChange(e.target.valueAsNumber)}
                    step="0.01"
                    {...rest}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="mrp"
          render={({ field }) => {
            const { onChange, ...rest } = field;
            return (
              <FormItem>
                <FormLabel>MRP</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ex. 1.20"
                    type="number"
                    onChange={(e) => onChange(e.target.valueAsNumber)}
                    step="0.01"
                    {...rest}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories?.data?.map((category) => (
                    <SelectItem key={category?.id} value={category?.id}>
                      {category?.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="brandId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brand</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Brand" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {brands?.data?.map((brand) => (
                    <SelectItem key={brand?.id} value={brand?.id}>
                      {brand?.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

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
          name="isPrescriptionOnly"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prescription Only</FormLabel>
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
                  <SelectItem value="true">Yes</SelectItem>
                  <SelectItem value="false">No</SelectItem>
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
