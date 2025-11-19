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
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useGetMedicinesQuery } from "@/features/medicine/medicine.api";
import { useDebounce } from "@/hooks/useDebounce";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  PrescriptionSchema,
  PrescriptionSchemaType,
} from "../prescription.schema";
import { PrescriptionConsultant } from "./PrescriptionConsultant";
import { PrescriptionHeader } from "./PrescriptionHeader";
import { PrescriptionPatient } from "./PrescriptionPatient";

export const PrescriptionForm = () => {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 500);
  const { data: medicineData } = useGetMedicinesQuery({
    page,
    limit: 50,
    searchTerm: debouncedSearch,
  });

  const medicines = medicineData?.data?.data || [];

  const handleSearch = (query: string) => {
    setSearchInput(query);
    setPage(1);
  };

  const form = useForm<PrescriptionSchemaType>({
    resolver: zodResolver(PrescriptionSchema),
    defaultValues: {
      antSegment: "",
      cc: "",
      oe: "",
      postSegment: "",
      var: "",
      medicine: [{ name: "", description: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "medicine",
  });

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
        <PrescriptionPatient />
        <Separator className="mt-5" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-[1fr_2fr] gap-10">
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
                  <FormLabel className="mb-4">Features</FormLabel>
                  <div className="border-dashed border border-border rounded-2xl px-4 pt-5 pb-3 flex flex-col gap-2">
                    <div className="flex flex-col gap-4">
                      {fields.map((field, index) => (
                        <div key={field.id} className="flex gap-4">
                          <div className="grow">
                            <FormField
                              control={form.control}
                              name={`medicine.${index}.name`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Name</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Unlimited Team Members"
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
                              name={`medicine.${index}.description`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Description</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Invite unlimited members"
                                      type="text"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          {fields.length > 1 && (
                            <div className="flex items-end">
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => remove(index)}
                                className="py-[17px]"
                              >
                                <X className="" />
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <Button
                      type="button"
                      variant="link"
                      className="!p-0 !m-0 self-start"
                      onClick={() => append({ name: "", description: "" })}
                    >
                      <Plus /> Add New Feature
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
