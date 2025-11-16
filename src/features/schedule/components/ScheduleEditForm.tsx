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
import { TimePicker } from "@/components/ui/time-picker";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { ApiResponse } from "@/types/api";
import { handleMutationRequest } from "@/utils/handleMutationRequest";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  useGetScheduleByIdQuery,
  useUpdateScheduleMutation,
} from "../schedule.api";
import { ScheduleSchema, ScheduleSchemaType } from "../schedule.schema";
import { ScheduleFormSkeleton } from "./ScheduleFormSkeleton";

export const ScheduleEditForm = ({ id }: { id: string }) => {
  const router = useRouter();
  const { profile, isLoading: isLoadingProfile } = useAuth();
  const { data, isLoading: isLoadingSchedule } = useGetScheduleByIdQuery(id);
  const [updateScheduleFn, { isLoading }] = useUpdateScheduleMutation();

  const schedule = data?.data;

  const form = useForm<ScheduleSchemaType>({
    resolver: zodResolver(ScheduleSchema),
    defaultValues: {
      doctorId: "",
      dayOfWeek: "",
      startTime: "",
      endTime: "",
      slotMinutes: 10,
      maxPatients: 50,
      isActive: true,
    },
  });

  useEffect(() => {
    if (!profile || !schedule) return;

    form.reset(
      {
        doctorId: profile?.id || "",
        dayOfWeek: schedule?.dayOfWeek || "",
        startTime: schedule?.startTime || "",
        endTime: schedule?.endTime || "",
        slotMinutes: schedule?.slotMinutes || 10,
        maxPatients: schedule?.maxPatients || 50,
        isActive: Boolean(schedule?.isActive),
      },
      { keepDirty: false, keepTouched: false }
    );
  }, [form, profile, schedule]);

  const onSubmit = async (values: ScheduleSchemaType) => {
    await handleMutationRequest(
      updateScheduleFn,
      { id, ...values },
      {
        loadingMessage: "Updating Schedule",
        successMessage: (res: ApiResponse<string>) => res?.message,
        onSuccess: () => {
          router.push("/schedules");
        },
      }
    );
  };

  if (isLoadingProfile || isLoadingSchedule) return <ScheduleFormSkeleton />;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 py-5">
        <FormField
          control={form.control}
          name="doctorId"
          render={({ field }) => (
            <FormItem hidden>
              <FormLabel>Doctor ID</FormLabel>
              <FormControl>
                <Input placeholder="" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dayOfWeek"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Day Of Week</FormLabel>
              <Select
                onValueChange={(value) => {
                  if (value) field.onChange(value);
                }}
                value={String(field.value || "")}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Day" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="SAT">Saturday</SelectItem>
                  <SelectItem value="SUN">Sunday</SelectItem>
                  <SelectItem value="MON">Monday</SelectItem>
                  <SelectItem value="TUE">Tuesday</SelectItem>
                  <SelectItem value="WED">Wednesday</SelectItem>
                  <SelectItem value="THU">Thursday</SelectItem>
                  <SelectItem value="FRI">Friday</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Time</FormLabel>
                <FormControl>
                  <TimePicker field={field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Time</FormLabel>
                <FormControl>
                  <TimePicker field={field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="slotMinutes"
          render={({ field }) => (
            <FormItem hidden>
              <FormLabel>Slot Minutes</FormLabel>
              <FormControl>
                <Input placeholder="ex. 10" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="maxPatients"
          render={({ field }) => (
            <FormItem hidden>
              <FormLabel>Max Patients</FormLabel>
              <FormControl>
                <Input placeholder="ex. 50" type="number" {...field} />
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
                onValueChange={(value) => {
                  if (value !== "") field.onChange(value === "true");
                }}
                value={String(field.value) === "true" ? "true" : "false"}
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
              Saving Changes
            </>
          ) : (
            "Save changes"
          )}
        </Button>
      </form>
    </Form>
  );
};
