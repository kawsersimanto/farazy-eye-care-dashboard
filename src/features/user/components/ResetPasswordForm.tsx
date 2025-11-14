"use client";
import { Password } from "@/components/password/Password";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  resetPasswordSchema,
  resetPasswordSchemaType,
} from "../schema/profile.schema";

export const ResetPasswordForm = () => {
  const { handleResetPassword, isLoading } = useAuth();
  const form = useForm<resetPasswordSchemaType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: resetPasswordSchemaType) => {
    handleResetPassword(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 py-5">
        <Password
          control={form.control}
          name="password"
          label="Reset Password"
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
              Resetting Password...
            </>
          ) : (
            "Reset Password"
          )}
        </Button>
      </form>
    </Form>
  );
};
