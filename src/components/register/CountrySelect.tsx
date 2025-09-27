import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import Dropdown from "../icons/Dropdown";

interface CountrySelectProps {
  register: UseFormRegisterReturn;
  countries?: Array<{ value: string; label: string }>;
}

const DEFAULT_COUNTRIES = [
  { value: "Indonesia", label: "Indonesia" },
  { value: "Poland", label: "Poland" },
  { value: "USA", label: "United States" },
  { value: "UK", label: "United Kingdom" },
];

export function CountrySelect({
  register,
  countries = DEFAULT_COUNTRIES,
}: CountrySelectProps) {
  return (
    <div className="relative">
      <select
        {...register}
        className={`w-full px-4 py-3 bg-transparent border border-[var(--gray-400)] rounded-md text-[var(--neutral-900)] focus:outline-none focus:ring-1 appearance-none cursor-pointer transition-colors`}
      >
        <option
          value={""}
          className="bg-gray-800 text-[var(--neutral-900)]"
        ></option>
        {countries.map((country) => (
          <option
            key={country.value}
            value={country.value}
            className="bg-gray-800 text-[var(--neutral-900)]"
          >
            {country.label}
          </option>
        ))}
      </select>
      <div className="absolute right-[20px] top-1/2 -translate-y-1/2 text-[var(--neutral-500)] pointer-events-none">
        <Dropdown />
      </div>
    </div>
  );
}
