import { forwardRef, type ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type Props = ComponentProps<"input"> & { prefix?: string };

const Input = forwardRef<HTMLInputElement, Props>(
  ({ className, prefix, ...props }, ref) => {
    return (
      <div className="flex flex-col w-full">
        {props?.name && (
          <label className="capitalize mb-2 text-lg">{props.name}</label>
        )}

        {!prefix ? (
          <input
            ref={ref}
            className={twMerge(
              "border-2 border-(--border) outline-none focus:border-(--border-strong) rounded-md p-4",
              className,
            )}
            {...props}
          />
        ) : (
          <div className="flex items-center border-2 border-(--border) focus-within:border-(--border-strong) rounded-md overflow-hidden">
            <span className="pl-2 text-lg font-semibold text-(--muted)">
              {prefix}
            </span>
            <input
              ref={ref}
              className={twMerge(
                `border-none outline-none flex-1 p-4 ${prefix ? "pl-0.5" : "pl-2"}`,
                className,
              )}
              {...props}
            />
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;