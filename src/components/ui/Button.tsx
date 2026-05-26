import React from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={twMerge(
          "border dark:border-neutral-600 px-4 py-3 cursor-pointer rounded-md bg-[#ff651d] font-bold hover:bg-[#ff561d] transition-colors active:outline-2 active:outline-offset-2",
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
