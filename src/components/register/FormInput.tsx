import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface FormInputProps {
  register: UseFormRegisterReturn;
  type?: string;
  placeholder?: string;
  hasError?: boolean;
  className?: string;
}

export function FormInput({
  register,
  type = "text",
  placeholder,
  hasError,
  className = "",
}: FormInputProps) {
  return (
    <input
      {...register}
      type={type}
      placeholder={placeholder}
      className={`w-full px-[20px] py-[14px] bg-transparent border rounded-md text-[var(--neutral-900)] font-normal text-[16px] placeholder-[var(--neutral-500)] focus:outline-none focus:ring-1 transition-colors ${
        hasError
          ? "border-[var(--danger-500)] focus:ring-[var(--danger-500)]"
          : "border-[var(--gray-400)] focus:border-[var(--gray-400)] focus:ring-[var(--gray-400)]"
      } ${className}`}
    />
  );
}
