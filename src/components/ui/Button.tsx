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
          "outline-(--accent) px-4 py-3 cursor-pointer rounded-md bg-(--accent) hover:bg-(--accent-hover) transition-colors active:outline-2 active:outline-offset-3",
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
