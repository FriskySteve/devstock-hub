"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePasswordVisibility } from "../../hooks/usePasswordVisibility";
import { createAccountSchema } from "../../schema/createAccountSchema";
import { CreateAccountFormData } from "@/lib/types";
import { FormField } from "./FormField";
import { FormInput } from "./FormInput";
import { PasswordInput } from "./PasswordInput";
import { CountrySelect } from "./CountrySelect";
import { CheckboxWithText } from "./CheckBoxWithText";
import { useRouter } from "next/navigation";
import useFetch from "@/hooks/useFetch";

type RegisterResponse = {
  success: boolean;
  message?: string;
};

export default function CreateAccountForm() {
  const passwordVisibility = usePasswordVisibility();
  const confirmPasswordVisibility = usePasswordVisibility();
  const { postData, error, setError } = useFetch<RegisterResponse>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAccountFormData>({
    resolver: zodResolver(createAccountSchema),
    mode: "onChange",
    defaultValues: {
      country: "Indonesia",
    },
  });

  const onSubmit = async (data: CreateAccountFormData) => {
    try {
      const response = await postData("/api/register", data);
      setError(null);
      if (error) {
        console.error("Registration error:", error);
      } else if (response?.success) {
        console.log("Registration successful:", response);
        router.push("/register/success");
      } else {
        console.error("Registration failed:", response?.message);
      }
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-[var(--base-white)] border border-[var(--(gray-200)] rounded-lg p-6">
      <h2 className="text-[24px] font-medium text-[var(--neutral-900)] mb-8 border-b border-b-[var(--gray-200)] pb-[20px]">
        Create Account
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormField label="Email" error={errors.email?.message}>
          <FormInput
            register={register("email")}
            type="email"
            placeholder="Your Email"
            hasError={!!errors.email}
          />
        </FormField>

        <FormField label="Mobile Number" error={errors.phone?.message}>
          <FormInput
            register={register("phone")}
            type="tel"
            placeholder="+(Code country) 10 digit mobile number"
            hasError={!!errors.phone}
          />
        </FormField>

        <FormField label="Password" error={errors.password?.message}>
          <PasswordInput
            register={register("password")}
            placeholder="Password"
            hasError={!!errors.password}
            showPassword={passwordVisibility.showPassword}
            onToggleVisibility={passwordVisibility.toggleVisibility}
          />
        </FormField>

        <FormField
          label="Confirm Password"
          error={errors.confirmPassword?.message}
        >
          <PasswordInput
            register={register("confirmPassword")}
            placeholder="Confirm Password"
            hasError={!!errors.confirmPassword}
            showPassword={confirmPasswordVisibility.showPassword}
            onToggleVisibility={confirmPasswordVisibility.toggleVisibility}
          />
        </FormField>

        <FormField label="Country or region" error={errors.country?.message}>
          <CountrySelect register={register("country")} />
        </FormField>

        <div>
          <CheckboxWithText register={register("accept")}>
            <span className="text-[14px] font-normal text-[var(--neutral-600)] leading-relaxed">
              {" "}
              By creating an account and check, you agree to the{" "}
              <a
                href="#"
                className="text-[var(--primary-500)] hover:text-[var(--blaze-orange-50)] text-[14px] font-medium  underline"
              >
                Conditions of Use
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-[var(--primary-500)] hover:text-[var(--blaze-orange-50)] text-[14px] font-medium underline"
              >
                Privacy Notice
              </a>
              .
            </span>
          </CheckboxWithText>
          {errors.accept && (
            <p className="text-[var(--danger-500)] text-[14px] font-normal mt-1">
              {errors.accept.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-[var(--primary-500)] hover:bg-[var(--blaze-orange-50)] font-medium text-[var(--base-white)] text-[16px] py-3 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--orange-500)] focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}
