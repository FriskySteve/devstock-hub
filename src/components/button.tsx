import * as React from "react";

const styleVariants = {
  fill: "bg-[var(--primary-500)] text-[var(--base-white)] hover:bg-[var(--primary-600)] active:bg-[var(--primary-600)] disabled:bg-[var(--primary-300)]",
  text: "text-[var(--primary-500)] hover:text-[var(--primary-600)] active:text-[var(--primary-400)] disabled:text-[var(--primary-300)]",
  stroke:
    "text-[var(--primary-500)] border border-[var(--primary-500)] hover:border-[var(--primary-400)] active:border-[var(--primary-400)] active:text-[var(--primary-400)] disabled:border-[var(--primary-300)] disabled:text-[var(--primary-300)]",
};

const sizeVariants = {
  xxl: "h-[60px] px-[16px] text-[18px]",
  xl: "h-[54px] px-[14px] text-[16px]",
  l: "h-[50px] px-[12px] text-[16px]",
  m: "h-[44px] px-[10px] text-[14px]",
  s: "h-[40px] px-[8px] text-[14px]",
  xs: "h-[34px] px-[6px] text-[12px]",
};

const baseClasses =
  "flex flex-row gap-[14px] py-[20px] justify-center items-center shrink-0 cursor-pointer rounded-md";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof styleVariants;
  size?: keyof typeof sizeVariants;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

function Button({
  variant = "stroke",
  size = "m",
  leftIcon,
  rightIcon,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const buttonClasses = [
    baseClasses,
    styleVariants[variant],
    sizeVariants[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={buttonClasses} {...props}>
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
}

export { Button };
export type { ButtonProps };
