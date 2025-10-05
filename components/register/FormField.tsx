import React from "react";

interface FormFieldProps {
  label: string;
  error?: string | null;
  children: React.ReactNode;
}

export function FormField({ label, error, children }: FormFieldProps) {
  return (
    <div>
      <label className="block text-[var(--neutral-900)] text-[18px] font-medium mb-4">
        {label}
      </label>
      {children}
      {error && (
        <p className="text-[var(--danger-500)] text-[14px] mt-2">{error}</p>
      )}
    </div>
  );
}
