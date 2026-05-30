import { forwardRef, type ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type Props = ComponentProps<"input">;

const Input = forwardRef<HTMLInputElement, Props>(
  ({ className, ...props }, ref) => {
    return (
      <div className="flex flex-col w-full">
        {props?.name && <label className="capitalize mb-2 text-lg">{props.name}</label>}
        <input
          ref={ref}
          className={twMerge(
            "border-2 border-(--border) outline-none focus:border-(--border-strong) rounded-md p-4",
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
