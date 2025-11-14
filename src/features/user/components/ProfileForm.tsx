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
import { profileSchema, profileSchemaType } from "../schema/profile.schema";

export const ProfileForm = () => {
  const { profile } = useAuth();
  const [updateProfileFn, { isLoading }] = useUpdateProfileMutation();
  const uploadMutation = useUploadSingleImageMutation();
  const deleteMutation = useDeleteImageByUrlMutation();

  const form = useForm<profileSchemaType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      profileImageUrl: "",
    },
  });

  useEffect(() => {
    if (profile) {
      form.reset({
        name: profile?.name || "",
        email: profile?.email || "",
        phone: formatPhoneToE164(profile?.phone) || "",
        profileImageUrl: profile?.profileImageUrl || "",
      });
    }
  }, [form, profile]);

  const onSubmit = async (values: profileSchemaType) => {
    await handleMutationRequest(
      updateProfileFn,
      { user: normalizePayload(values) },
      {
        loadingMessage: "Updating Profile",
        successMessage: (res: ApiResponse<string>) => res?.message,
      }
    );
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
                  placeholder="ex. +88015349123"
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
