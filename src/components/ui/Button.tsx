'use client'

import React from "react";
import { twMerge } from "tailwind-merge";
import { Icon } from "../icons/Icon";
import { useRouter } from "next/navigation";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
  varient?: 'transparent'| undefined;
  icon?: string,
  navigate?: string
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, navigate, varient, className, icon, ...props }, ref) => {
    const router = useRouter();
    return (
      <button
        ref={ref}
        onClick={()=> {
          navigate && router?.push(navigate)
        }}
        className={twMerge(
          "flex items-center gap-2 outline-(--accent) px-4 py-3 cursor-pointer rounded-md bg-(--accent) hover:bg-(--accent-hover) transition-colors active:outline-2 active:outline-offset-3",
          className, varient==="transparent"?'surface-mutedpy-1 font-semibold bg-transparent border border-(--border) hover:bg-(--surface-muted)':''
         )}
        {...props}
      >
        {icon && <Icon icon={icon}/>} {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
