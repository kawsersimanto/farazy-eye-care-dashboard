"use client";
import { Password } from "@/components/password/Password";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  updatePasswordSchema,
  updatePasswordSchemaType,
} from "../schema/profile.schema";

export const UpdatePasswordForm = () => {
  const { handleChangePassword, handleForgotPassword, isLoading, email } =
    useAuth();
  const form = useForm<updatePasswordSchemaType>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      confirmPassword: "",
      newPassword: "",
      oldPassword: "",
    },
  });

  const onSubmit = (values: updatePasswordSchemaType) => {
    handleChangePassword(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 py-5">
        <Password
          control={form.control}
          name="oldPassword"
          label="Current Password"
          className="py-2 text-sm"
        />
        <Password
          control={form.control}
          name="newPassword"
          label="New Password"
          className="py-2 text-sm"
        />
        <Password
          control={form.control}
          name="confirmPassword"
          label="Confirm Password"
          className="py-2 text-sm"
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Spinner />
              Updating Password...
            </>
          ) : (
            "Update Password"
          )}
        </Button>

        <Button
          type="button"
          variant="link"
          className=""
          onClick={() => handleForgotPassword({ email: email || "" })}
        >
          Forgot your password?
        </Button>
      </form>
    </Form>
  );
};
