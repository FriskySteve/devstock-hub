"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { usePasswordVisibility } from "../../hooks/usePasswordVisibility";
import { type CreateAccountFormData } from "../../schema/createAccountSchema";
import { FormField } from "../register/FormField";
import { FormInput } from "../register/FormInput";
import { PasswordInput } from "../register/PasswordInput";
import { useRouter } from "next/navigation";
import useFetch from "@/hooks/useFetch";
import { CheckboxWithText } from "../register/CheckBoxWithText";

type RegisterResponse = {
  success: boolean;
  message?: string;
};

export default function CreateAccountForm() {
  const passwordVisibility = usePasswordVisibility();
  const confirmPasswordVisibility = usePasswordVisibility();
  const { postData, error, setError } = useFetch<RegisterResponse>(null);
  const router = useRouter();
  const [hidden, setHidden] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAccountFormData>({
    mode: "onChange",
  });

  const handleRegister = () => {
    router.push("/register");
  };

  const handleContinue = () => {
    setHidden(!hidden);
  };

  const onSubmit = async (data: CreateAccountFormData) => {
    console.log("Tutaj", data);
    // try {
    //   const response = await postData("/api/register", data);
    //   setError(null);
    //   if (error) {
    //     console.error("Login error:", error);
    //   } else if (response?.success) {
    //     console.log("Login successful:", response);
    //     router.push("/home");
    //   } else {
    //     console.error("Login failed:", response?.message);
    //   }
    // } catch (error) {
    //   console.error("Error during form submission:", error);
    // }
  };

  return (
    <div className="max-w-md mx-auto bg-[var(--base-white)] border border-[var(--(gray-200)] rounded-lg p-6">
      <h2 className="text-[24px] font-medium text-[var(--neutral-900)] mb-8 border-b border-b-[var(--gray-200)] pb-[20px]">
        Sign in
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {hidden && (
          <div className="space-y-6">
            <FormField
              label="Email or mobile phone number"
              error={errors.email?.message}
            >
              <FormInput
                register={register("email")}
                type="email"
                placeholder="Email or mobile phone number"
                hasError={!!errors.email}
              />
            </FormField>

            <button
              onClick={handleContinue}
              className="w-full bg-[var(--primary-500)] hover:bg-[var(--blaze-orange-50)] font-medium text-[var(--base-white)] text-[16px] py-3 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--orange-500)] focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              Continue
            </button>
            <div>
              <span className="text-[16px] font-normal text-[var(--neutral-600)] leading-relaxed">
                Don’t have an account?{" "}
                <a
                  href="#"
                  onClick={handleRegister}
                  className="text-[var(--neutral-900)] text-[16px] font-medium"
                >
                  Register
                </a>
              </span>
            </div>
          </div>
        )}

        {!hidden && (
          <div className="space-y-6">
            <FormField label="Password" error={errors.password?.message}>
              <PasswordInput
                register={register("password")}
                placeholder="Password"
                hasError={!!errors.password}
                showPassword={passwordVisibility.showPassword}
                onToggleVisibility={passwordVisibility.toggleVisibility}
              />
            </FormField>

            <div className="flex items-center justify-between w-full ">
              <CheckboxWithText register={register("accept")}>
                <span className="text-[16px] font-normal text-[var(--neutral-600)] leading-relaxed">
                  Save password
                </span>
              </CheckboxWithText>

              <a
                href="#"
                className="text-[var(--neutral-900)] text-[16px] font-medium"
              >
                Forgot your password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-[var(--primary-500)] hover:bg-[var(--blaze-orange-50)] font-medium text-[var(--base-white)] text-[16px] py-3 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--orange-500)] focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              Sign In
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
