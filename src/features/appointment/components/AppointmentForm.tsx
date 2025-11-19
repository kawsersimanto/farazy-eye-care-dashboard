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
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useGetDoctorScheduleByIdQuery } from "@/features/schedule/schedule.api";
import { ISchedule } from "@/features/schedule/schedule.interface";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, isToday } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { DAY_OF_WEEK_MAP } from "../appointment.constants";
import {
  AppointmentSchema,
  AppointmentSchemaType,
} from "../appointment.schema";

const parseTimeString = (
  timeStr: string
): { hours: number; minutes: number } => {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return { hours, minutes };
};

const isTimeOver = (timeStr: string): boolean => {
  const now = new Date();
  const { hours, minutes } = parseTimeString(timeStr);
  const scheduleTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hours,
    minutes
  );
  return now >= scheduleTime;
};

export const AppointmentForm = () => {
  const { profile } = useAuth();
  const id = profile?.id as string;
  const { data: scheduleData } = useGetDoctorScheduleByIdQuery(id, {
    skip: !id,
  });

  const scheduleByDay = useMemo(() => {
    if (!scheduleData?.data) return new Map<string, ISchedule[]>();
    const map = new Map<string, ISchedule[]>();
    scheduleData.data
      .filter((schedule: ISchedule) => schedule.isActive)
      .forEach((schedule: ISchedule) => {
        if (!map.has(schedule.dayOfWeek)) {
          map.set(schedule.dayOfWeek, []);
        }
        map.get(schedule.dayOfWeek)!.push(schedule);
      });
    return map;
  }, [scheduleData]);

  const isDateDisabled = (date: Date) => {
    // Disable past dates
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const checkDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    if (checkDate < today) return true;

    // Check if day of week is available
    for (const [dayKey, dayChecker] of Object.entries(DAY_OF_WEEK_MAP)) {
      if (dayChecker(date) && scheduleByDay.has(dayKey)) {
        // If it's today, check if any schedule slot hasn't started yet
        if (isToday(date)) {
          const schedules = scheduleByDay.get(dayKey) || [];
          const hasAvailableSlot = schedules.some(
            (schedule: ISchedule) => !isTimeOver(schedule.startTime)
          );
          return !hasAvailableSlot;
        }
        // For future dates, they are enabled
        return false;
      }
    }
    return true;
  };

  const form = useForm<AppointmentSchemaType>({
    resolver: zodResolver(AppointmentSchema),
    defaultValues: {
      name: "",
      branchId: "",
      doctorId: "",
      age: 18,
      notes: "",
      gender: "MALE",
      phone: "",
      scheduledAt: new Date(),
    },
  });

  useEffect(() => {
    if (!profile) return;

    form.reset({
      branchId: profile?.branchId || "",
      doctorId: profile?.id || "",
    });
  }, [form, profile]);

  const onSubmit = (values: AppointmentSchemaType) => {
    try {
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  };

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
                <Input
                  placeholder="ex. MD. Abul Kalam"
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
          name="phone"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel>Phone number</FormLabel>
              <FormControl className="w-full">
                <PhoneInput
                  placeholder="ex. 01940075782"
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
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="branchId"
          render={({ field }) => (
            <FormItem hidden>
              <FormLabel>Branch Id</FormLabel>
              <FormControl>
                <Input placeholder="" type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="doctorId"
          render={({ field }) => (
            <FormItem hidden>
              <FormLabel>Doctor</FormLabel>
              <FormControl>
                <Input placeholder="" type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input placeholder="ex. 23" type="number" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="ex. Patient has problem with vision"
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
          name="scheduledAt"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Appointment Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal bg-transparent",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
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
                    disabled={isDateDisabled}
                  />
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
