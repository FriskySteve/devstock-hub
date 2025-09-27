import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import OpenEyeIcon from "../icons/OpenEyeIcon";
import ClosedEyeIcon from "../icons/ClosedEyeIcon";
import { FormInput } from "./FormInput";

interface PasswordInputProps {
  register: UseFormRegisterReturn;
  placeholder?: string;
  hasError?: boolean;
  showPassword: boolean;
  onToggleVisibility: () => void;
}

export function PasswordInput({
  register,
  placeholder,
  hasError,
  showPassword,
  onToggleVisibility,
}: PasswordInputProps) {
  return (
    <div className="relative">
      <FormInput
        register={register}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        hasError={hasError}
        className="pr-12"
      />
      <button
        type="button"
        onClick={onToggleVisibility}
        className="absolute right-[20px] top-1/2 -translate-y-1/2 text-[var(--neutral-500)] hover:text-[var(--blaze-orange-50)] transition-colors"
      >
        {showPassword ? <ClosedEyeIcon /> : <OpenEyeIcon />}
      </button>
    </div>
  );
}
