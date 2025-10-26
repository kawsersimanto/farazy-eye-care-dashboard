"use client";

import { Password } from "@/components/password/Password";
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
import { useAppDispatch } from "@/redux/hook";
import { handleMutationRequest } from "@/utils/handleMutationRequest";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useLoginMutation } from "../auth.api";
import { AuthResponse } from "../auth.interface";
import { AuthFormValues, authSchema } from "../auth.schema";
import { setToken } from "../store/auth.slice";

export const SignInForm = () => {
  const [loginFn, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: AuthFormValues) => {
    await handleMutationRequest(loginFn, data, {
      loadingMessage: "Logging in...",
      successMessage: (res: AuthResponse) => res?.message,
      errorMessage: "Login failed. Please check your credentials.",
      onSuccess: (res: AuthResponse) => {
        const token = res?.data?.token;
        if (token) {
          dispatch(setToken(token));
        }
        router.push("/");
      },
      onError: (message) => {
        toast.error(message);
      },
    });
  };

  return (
    <div className="mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        {...field}
                        className="h-auto py-2.5 px-4"
                        disabled={isLoading}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Password control={form.control} />

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full font-medium text-background h-auto py-3"
            >
              {isLoading ? (
                <>
                  <Spinner className="w-4 h-4" /> Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
