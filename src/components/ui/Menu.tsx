"use client";
import { useEffect, useRef, useState } from "react";

export interface option {
  name: string;
  action: () => void;
}

export interface IMenu {
  options: option[];
  menuClass?: string;
  optionsClass?: string;
  children: React.ReactNode;
}

export default function Menu({ children, options, ...props }: IMenu) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseUp = (e: MouseEvent) => {
      if(menuRef.current && !menuRef.current?.contains(e.target as Node)){
        setMenuOpen(false);
      }
    };
    document.body.addEventListener("mouseup", handleMouseUp);
    return () => document.body.removeEventListener("mouseup", handleMouseUp);
  }, []);

  return (
    <div ref={menuRef} className="relative">
      <div onClick={() => setMenuOpen((prev) => !prev)}>{children}</div>

      <div
        className={`w-max absolute overflow-clip top-[calc(100%+5px)] right-0 border border-(--border) rounded-md bg-(--surface) ${menuOpen ? "scale-100" : "scale-0"} duration-300 transition-all origin-top-right`}
      >
        {options?.map((opt) => {
          return (
            <div
              key={opt?.name}
              onClick={() => {
                opt?.action();
                setMenuOpen(false);
              }}
              className={`p-3 py-2 cursor-pointer text-sm transition-all bg-(--surface-muted) hover:bg-(--surface-muted-fade) ${menuOpen ? "opacity-100" : "opacity-0"} duration-200`}
            >
              {opt?.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}
