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
import { TimePicker } from "@/components/ui/time-picker";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  doctorId: z.string().min(1),
  dayOfWeek: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  slotMinutes: z.number(),
  maxPatients: z.number(),
  isActive: z.boolean(),
});

export const ScheduleForm = () => {
  const { profile } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      doctorId: "",
      dayOfWeek: "SUN",
      startTime: "17:00",
      endTime: "21:00",
      slotMinutes: 10,
      maxPatients: 50,
      isActive: true,
    },
  });

  useEffect(() => {
    if (profile) {
      form.reset({
        doctorId: profile?.id || "",
      });
    }
  }, [form, profile]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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

        <FormField
          control={form.control}
          name="slotMinutes"
          render={({ field }) => (
            <FormItem>
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
            <FormItem>
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

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
