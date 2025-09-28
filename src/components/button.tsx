import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "flex flex-row gap-[14px] py-[20px] justify-center items-center shrink-0 cursor-pointer rounded-md",
  {
    variants: {
      style: {
        fill: "bg-[var(--primary-500)] text-[var(--base-white)] hover:bg-[var(--primary-600)] active:bg-[var(--primary-600)] disabled:bg-[var(--primary-300)]",
        text: "text-[var(--primary-500)] hover:text-[var(--primary-600)] active:text-[var(--primary-400)] disabled:text-[var(--primary-300)]",
        stroke:
          "text-[var(--primary-500)] border border-[var(--primary-500)] hover:border-[var(--primary-400)] active:border-[var(--primary-400)] active:text-[var(--primary-400)] disabled:border-[var(--primary-300)] disabled:text-[var(--primary-300)]",
      },
      size: {
        xxl: "h-[60px] px-[16px] text-[18px]",
        xl: "h-[54px] px-[14px] text-[16px]",
        l: "h-[50px] px-[12px] text-[16px]",
        m: "h-[44px] px-[10px] text-[14px]",
        s: "h-[40px] px-[8px] text-[14px]",
        xs: "h-[34px] px-[6px] text-[12px]",
      },
    },
    defaultVariants: {
      style: "stroke",
      size: "m",
    },
  }
);

interface ButtonProps
  extends Omit<
      React.ComponentProps<"button">,
      keyof VariantProps<typeof buttonVariants>
    >,
    VariantProps<typeof buttonVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  asChild?: boolean;
  onClick?: () => void;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, style, size, children, onClick, asChild = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        data-slot="button"
        className={cn(buttonVariants({ style, size, className }))}
        onClick={onClick}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Button.displayName = "Button";
export default Button;
export { buttonVariants };
