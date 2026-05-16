import { forwardRef, type ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type Props = ComponentProps<"input">;

const Input = forwardRef<HTMLInputElement, Props>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={twMerge(
          "border-2 border-neutral-800 outline-none focus:border-neutral-400 rounded-md p-4",
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export default Input;
