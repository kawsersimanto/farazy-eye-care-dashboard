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
import { Spinner } from "@/components/ui/spinner";
import { useAppDispatch } from "@/redux/hook";
import { handleMutationRequest } from "@/utils/handleMutationRequest";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useLoginMutation } from "../auth.api";
import { AuthResponse } from "../auth.interface";
import { AuthFormValues, authSchema } from "../auth.schema";
import { setToken } from "../store/auth.slice";

export const SignInForm = () => {
  const [loginFn, { isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
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
      successMessage: "Login successful! Redirecting...",
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        {...field}
                        className="h-auto py-2.5 px-4 pr-12"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute top-1/2 -translate-y-1/2 right-[10px] focus:outline-none hover:opacity-70 transition-opacity"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOffIcon className="w-[20px] h-[20px]" />
                      ) : (
                        <EyeIcon className="w-[20px] h-[20px]" />
                      )}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

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
