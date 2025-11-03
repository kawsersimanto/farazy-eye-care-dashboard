/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { Control } from "react-hook-form";

interface PasswordProps {
  control: Control<any>;
  name?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export const Password = ({
  control,
  name = "password",
  label = "Password",
  placeholder = "Enter your password",
  disabled = false,
  className,
}: PasswordProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <div className="relative">
            <FormControl>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder={placeholder}
                {...field}
                className={cn("h-auto py-2.5 px-4 pr-12", className)}
                disabled={disabled}
              />
            </FormControl>

            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-1/2 -translate-y-1/2 right-[10px] focus:outline-none hover:opacity-70 transition-opacity"
              aria-label={showPassword ? "Hide password" : "Show password"}
              disabled={disabled}
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
  );
};
