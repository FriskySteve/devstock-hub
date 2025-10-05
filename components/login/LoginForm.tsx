"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { usePasswordVisibility } from "../../hooks/usePasswordVisibility";
import { type LoginFormData } from "@/lib/types";
import { FormField } from "../register/FormField";
import { FormInput } from "../register/FormInput";
import { PasswordInput } from "../register/PasswordInput";
import { useRouter } from "next/navigation";
import { CheckboxWithText } from "../register/CheckBoxWithText";
import { signIn } from "next-auth/react";

export default function CreateAccountForm() {
  const passwordVisibility = usePasswordVisibility();
  const router = useRouter();
  const [hidden, setHidden] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    mode: "onSubmit",
  });

  const handleRegister = () => {
    router.push("/register");
  };

  const handleContinue = () => {
    setHidden(!hidden);
  };

  const handleLoginSubmit = (data: LoginFormData) => {
    if (!data.emailOrMobile) {
      setErrorMessage("Please enter your email or mobile.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{9,15}$/;
    if (
      !emailRegex.test(data.emailOrMobile) &&
      !phoneRegex.test(data.emailOrMobile)
    ) {
      setErrorMessage("Email or Phone Number is not valid.");
      return;
    }

    setErrorMessage(null);
    handleContinue();
    reset({ emailOrMobile: data.emailOrMobile, password: "" });
  };

  const handlePasswordSubmit = async (data: LoginFormData) => {
    setErrorMessage(null);

    if (!data.password) {
      setErrorMessage("Please enter your password.");
      return;
    }

    try {
      const result = await signIn("credentials", {
        emailOrMobile: data.emailOrMobile,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setErrorMessage("Email/Phone Number or Password Incorrect");
        handleContinue();
        reset();
        return;
      }

      if (result?.ok) {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      setErrorMessage("Network error. Please try again.");
      console.log(error);
      handleContinue();
      reset();
    }
  };

  return (
    <div className="max-w-md mx-auto bg-[var(--base-white)] border border-[var(--(gray-200)] rounded-lg p-6">
      <h2 className="text-[24px] font-medium text-[var(--neutral-900)] mb-8 border-b border-b-[var(--gray-200)] pb-[20px]">
        Sign in
      </h2>

      <form
        onSubmit={handleSubmit(
          hidden ? handleLoginSubmit : handlePasswordSubmit
        )}
        className="space-y-6"
      >
        {hidden && (
          <div className="space-y-6">
            <FormField
              label="Email or mobile phone number"
              error={errorMessage}
            >
              <FormInput
                register={register("emailOrMobile")}
                type="text"
                placeholder="Email or mobile phone number"
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
              <CheckboxWithText>
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
