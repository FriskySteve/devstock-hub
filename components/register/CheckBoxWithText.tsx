import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface CheckboxWithTextProps {
  register?: UseFormRegisterReturn;
  children: React.ReactNode;
}

export function CheckboxWithText({
  register,
  children,
}: CheckboxWithTextProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center h-5">
        <input
          {...register}
          type="checkbox"
          className="w-[26px] h-[26px] rounded-[6px] bg-transparent text-[var(--primary-500)] focus:ring-[var(--blaze-orange-50)] focus:ring-1 accent-[var(--primary-500)]"
        />
      </div>
      <label className="text-[14px] font-normal text-[var(--neutral-600)] leading-relaxed">
        {children}
      </label>
    </div>
  );
}
