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
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useGetMedicinesQuery } from "@/features/medicine/medicine.api";
import { useGetUserByIdQuery } from "@/features/user/user.api";
import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/redux/hook";
import { getAgeFromISO } from "@/utils/date";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  PrescriptionSchema,
  PrescriptionSchemaType,
} from "../prescription.schema";
import { PrescriptionConsultant } from "./PrescriptionConsultant";
import { PrescriptionHeader } from "./PrescriptionHeader";

export const PrescriptionForm = () => {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 500);
  const { data: medicineData } = useGetMedicinesQuery({
    page,
    limit: 50,
    searchTerm: debouncedSearch,
  });

  const { data: patientData } = useGetUserByIdQuery("6917665d84030b43c9ed6a36");
  const patient = patientData?.data;
  const selectedPatient = useAppSelector((state) => state.prescription.patient);

  const medicines = medicineData?.data?.data || [];

  const handleSearch = (query: string) => {
    setSearchInput(query);
    setPage(1);
  };

  console.log(medicines, handleSearch);

  const form = useForm<PrescriptionSchemaType>({
    resolver: zodResolver(PrescriptionSchema),
    defaultValues: {
      name: "",
      age: 18,
      gender: "MALE",
      phone: "",
      prescribeDate: new Date(),
      antSegment: "",
      cc: "",
      oe: "",
      postSegment: "",
      var: "",
      medicine: [
        { name: "", dosage: "", mealTiming: "", duration: "", instruction: "" },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "medicine",
  });

  // Populate form with selected patient data
  useEffect(() => {
    if (selectedPatient) {
      form.reset({
        name: selectedPatient.name,
        age: selectedPatient.age,
        gender: selectedPatient.gender,
        phone: selectedPatient.phone,
        prescribeDate: new Date(),
        antSegment: "",
        cc: "",
        oe: "",
        postSegment: "",
        var: "",
        medicine: [
          {
            name: "",
            dosage: "",
            mealTiming: "",
            duration: "",
            instruction: "",
          },
        ],
      });
    } else if (patient) {
      form.reset({
        name: patient?.name || "",
        age: patient?.patientProfile?.dateOfBirth
          ? getAgeFromISO(patient?.patientProfile?.dateOfBirth)
          : 18,
        gender: patient?.patientProfile?.gender || "MALE",
        phone: patient?.phone || "",
        prescribeDate: new Date(),
        antSegment: "",
        cc: "",
        oe: "",
        postSegment: "",
        var: "",
        medicine: [
          {
            name: "",
            dosage: "",
            mealTiming: "",
            duration: "",
            instruction: "",
          },
        ],
      });
    }
  }, [selectedPatient, patient, form]);

  function onSubmit(values: PrescriptionSchemaType) {
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
    <>
      <div>
        <PrescriptionHeader />
        <Separator className="my-5" />
        <PrescriptionConsultant />
        <Separator className="my-5" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex gap-4">
              <div className="grow">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ex. MD Abdul Salam"
                          type="text"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grow">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start">
                      <FormLabel>Phone</FormLabel>
                      <FormControl className="w-full">
                        <PhoneInput
                          placeholder="ex. 01234133351"
                          {...field}
                          defaultCountry="BD"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grow">
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          if (value) field.onChange(value);
                        }}
                        value={String(field.value || "")}
                      >
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
              </div>

              <div className="grow">
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input placeholder="ex. 18" type="" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grow">
                <FormField
                  control={form.control}
                  name="prescribeDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date</FormLabel>
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
                          />
                        </PopoverContent>
                      </Popover>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator className="mt-5" />
            <div className="grid grid-cols-[1fr_3fr] gap-10">
              <div className="border-r border-border pe-10 space-y-5 py-10">
                <FormField
                  control={form.control}
                  name="cc"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>C/C</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="oe"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>O/E</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="var"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>VaR</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="antSegment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ant. Segment</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder=""
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
                  name="postSegment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Post. Segment</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder=""
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="py-10">
                <div className="flex flex-col gap-2">
                  <FormLabel className="mb-4">Rx</FormLabel>
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-4">
                      {fields.map((field, index) => (
                        <div key={field.id} className="">
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name={`medicine.${index}.name`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Medicine Name</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="e.g., Paracetamol"
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
                              name={`medicine.${index}.dosage`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Dosage</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="e.g., 500mg"
                                      type="text"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name={`medicine.${index}.mealTiming`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Meal Timing</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="e.g., After food"
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
                              name={`medicine.${index}.duration`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Duration</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="e.g., 5 days"
                                      type="text"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={form.control}
                            name={`medicine.${index}.instruction`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Instruction</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="e.g., Take 1 tablet twice daily"
                                    type="text"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {fields.length > 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => remove(index)}
                              className="!p-0 h-auto bg-transparent border-0"
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>

                    <Button
                      type="button"
                      variant="link"
                      className="!p-0 !m-0 self-start"
                      onClick={() =>
                        append({
                          name: "",
                          dosage: "",
                          mealTiming: "",
                          duration: "",
                          instruction: "",
                        })
                      }
                    >
                      <Plus /> Add Medicine
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </>
  );
};
