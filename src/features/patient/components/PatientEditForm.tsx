"use client";
import { PhoneInput } from "@/components/phone-input/PhoneInput";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "@/features/user/user.api";
import { IGender } from "@/features/user/user.interface";
import { createPatientPayload } from "@/features/user/user.utils";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/redux/hook";
import { ApiResponse } from "@/types/api";
import { handleMutationRequest } from "@/utils/handleMutationRequest";
import { normalizePayload } from "@/utils/normalizePayload";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  PatientFormValue,
  UpdatePatientFormValue,
  updatePatientSchema,
} from "../patient.schema";
import { PatientEditFormSkeleton } from "./PatientEditFormSkeleton";

export const PatientEditForm = ({ id }: { id: string }) => {
  const router = useRouter();
  const { data: patientData, isLoading: isLoadingPatient } =
    useGetUserByIdQuery(id);
  const patientProfile = patientData?.data?.patientProfile;

  const [updatePatientFn, { isLoading }] = useUpdateUserMutation();
  const branchId = useAppSelector((state) => state.auth.user?.branchId);
  const form = useForm<UpdatePatientFormValue>({
    resolver: zodResolver(updatePatientSchema),
    defaultValues: {
      name: "",
      address: "",
      bloodGroup: "A+",
      dateOfBirth: undefined,
      email: "",
      phone: "",
      emergencyPhone: undefined,
      gender: IGender.MALE,
      branchId: "",
    },
  });

  useEffect(() => {
    if (patientData && patientProfile) {
      form.reset({
        name: patientData?.data?.name || "",
        address: patientProfile?.address ?? "",
        bloodGroup: patientProfile?.bloodGroup || "A+",
        dateOfBirth: patientProfile?.dateOfBirth
          ? new Date(patientProfile.dateOfBirth)
          : undefined,
        email: patientData?.data?.email || "",
        phone: patientData?.data?.phone || "",
        emergencyPhone: patientProfile?.emergencyPhone ?? "",
        gender: patientProfile?.gender || IGender.MALE,
        branchId: branchId || "",
      });
    }
  }, [form, branchId, patientData, patientProfile]);

  const onSubmit = async (values: PatientFormValue) => {
    const payload = normalizePayload(createPatientPayload(values));
    await handleMutationRequest(
      updatePatientFn,
      { id, payload },
      {
        loadingMessage: "Updating Patient",
        successMessage: (res: ApiResponse<string>) => res?.message,
        onSuccess: () => {
          router.push("/patients");
        },
      }
    );
  };

  if (isLoadingPatient) return <PatientEditFormSkeleton />;

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
                <Input placeholder="ex. John Doe" type="text" {...field} />
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
                  placeholder="ex. johndoe@gmail.com"
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
                  placeholder="ex. 0153123412"
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
          name="emergencyPhone"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel>Emergency Phone</FormLabel>
              <FormControl className="w-full">
                <PhoneInput
                  placeholder="ex. 0133512342"
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
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal bg-white",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>ex. November 12, 1988</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(IGender).map((gender) => (
                    <SelectItem key={gender} value={gender}>
                      {gender}
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
          name="bloodGroup"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Blood Group</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a blood group" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                  <SelectItem value="AB-">AB-</SelectItem>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="ex. 122/12, Rampura, Badda"
                  type="text"
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
