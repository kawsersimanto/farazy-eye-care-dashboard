"use client";

import {
  formatPhoneToE164,
  PhoneInput,
} from "@/components/phone-input/PhoneInput";
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
import { Spinner } from "@/components/ui/spinner";
import {
  TagsInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputList,
} from "@/components/ui/tags-input";
import { Textarea } from "@/components/ui/textarea";
import { UploadImage } from "@/components/upload-image/UploadImage";
import { useUpdateProfileMutation } from "@/features/auth/auth.api";
import { useAuth } from "@/features/auth/hooks/useAuth";
import {
  useDeleteImageByUrlMutation,
  useUploadSingleImageMutation,
} from "@/features/image/image.api";
import { ApiResponse } from "@/types/api";
import { handleMutationRequest } from "@/utils/handleMutationRequest";
import { normalizePayload } from "@/utils/normalizePayload";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { doctorSchema, doctorSchemaType } from "../schema/doctor.schema";
import { createDoctorPayload } from "../user.utils";

export const DoctorProfileForm = () => {
  const { profile } = useAuth();
  const [updateProfileFn, { isLoading }] = useUpdateProfileMutation();
  const uploadMutation = useUploadSingleImageMutation();
  const deleteMutation = useDeleteImageByUrlMutation();

  const form = useForm<doctorSchemaType>({
    resolver: zodResolver(doctorSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      profileImageUrl: "",
      title: "",
      about: "",
      consultationFee: 0,
      registrationNo: "",
      yearsExperience: 0,
      degrees: [],
      qualifications: [],
    },
  });

  useEffect(() => {
    if (profile) {
      form.reset({
        name: profile?.name || "",
        email: profile?.email || "",
        phone: formatPhoneToE164(profile?.phone) || "",
        profileImageUrl: profile?.profileImageUrl || "",
        title: profile?.doctorProfile?.title || "",
        about: profile?.doctorProfile?.about || "",
        consultationFee: profile?.doctorProfile?.consultationFee || 0,
        registrationNo: profile?.doctorProfile?.registrationNo || "",
        yearsExperience: profile?.doctorProfile?.yearsExperience || 0,
        degrees: profile?.doctorProfile?.degrees || [],
        qualifications: profile?.doctorProfile?.qualifications || [],
      });
    }
  }, [form, profile]);

  const onSubmit = async (values: doctorSchemaType) => {
    const payload = normalizePayload(createDoctorPayload(values));
    await handleMutationRequest(updateProfileFn, payload, {
      loadingMessage: "Updating Profile",
      successMessage: (res: ApiResponse<string>) => res?.message,
    });
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
              <FormLabel>email</FormLabel>
              <FormControl>
                <Input
                  placeholder="ex. johndoe@farazy-eye-care.com"
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
                  placeholder="ex. 15349123"
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
          name="profileImageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Image</FormLabel>
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="ex. Senior Eye Doctor"
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
          name="about"
          render={({ field }) => (
            <FormItem>
              <FormLabel>About</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="ex. Senior Consultant, Ophthalmology"
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
          name="registrationNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Registration No.</FormLabel>
              <FormControl>
                <Input
                  placeholder="ex. MBBS2300482DHK"
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
          name="yearsExperience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Years of Experience</FormLabel>
              <FormControl>
                <Input
                  placeholder="ex. 2"
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="consultationFee"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Consultation Fee</FormLabel>
              <FormControl>
                <Input
                  placeholder="ex. 1200"
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="qualifications"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel>Qualifications</FormLabel>
              <FormControl className="w-full">
                <TagsInput
                  value={field.value || []}
                  onValueChange={field.onChange}
                  max={6}
                  editable
                  addOnPaste
                >
                  <TagsInputList className="bg-transparent">
                    {(field.value || []).map((trick) => (
                      <TagsInputItem key={trick} value={trick}>
                        {trick}
                      </TagsInputItem>
                    ))}
                    <TagsInputInput placeholder="ex. MBBS, MS (Eye)" />
                  </TagsInputList>
                </TagsInput>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="degrees"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel>Degrees</FormLabel>
              <FormControl className="w-full">
                <TagsInput
                  value={field.value || []}
                  onValueChange={field.onChange}
                  max={6}
                  editable
                  addOnPaste
                >
                  <TagsInputList className="bg-transparent">
                    {(field.value || []).map((trick) => (
                      <TagsInputItem key={trick} value={trick}>
                        {trick}
                      </TagsInputItem>
                    ))}
                    <TagsInputInput placeholder="ex. LASIK Surgery, Cataract Specialist" />
                  </TagsInputList>
                </TagsInput>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Spinner />
              Updating Profile
            </>
          ) : (
            "Update Profile"
          )}
        </Button>
      </form>
    </Form>
  );
};
