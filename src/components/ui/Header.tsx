'use client';

import { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import Logo from "./Logo";
import { Menu, Search, X } from "lucide-react";
import { useSidebar } from "@/src/context/SidebarContext";

type HeaderProps = {
  sidebarOpen?: boolean;
  setSidebarOpen?: (open: boolean) => void;
};

export function Header({ 
    sidebarOpen, 
    setSidebarOpen = ()=>{} 
} : HeaderProps ) {
    const {state, toggleSidebar} = useSidebar();
    const [inputActive, setInputActive] = useState(false);

    return (
      <div className="flex items-center justify-between border-b border-neutral-800 py-2 px-5">
        <div className="flex items-center gap-4">
          <div onClick={toggleSidebar} className="hover:bg-neutral-700 rounded-full p-2 hover:cursor-pointer">
            {state === "expanded" ? (
              <X 
                size={24} 
                // onClick={() => setSidebarOpen(false)}
              />
            ) : (
              <Menu
                size={24}
                // onClick={() => setSidebarOpen(true)}
              />
            )}
          </div>
          <Logo title="BLOGGER" />
        </div>
        <div
          className={`flex items-center w-1/3 border-2 ${inputActive ? "border-neutral-600" : "border-neutral-800"} rounded-full px-6`}
        >
          <Search
            className={`${inputActive ? "text-neutral-300" : "text-neutral-500"}`}
          />
          <Input
            onFocus={() => setInputActive(true)}
            onBlur={() => setInputActive(false)}
            className={"rounded-full w-full text-lg border-none p-3"}
            placeholder="Search"
          />
        </div>
        <div>
          <Button
            className={
              "border-2 font-bold bg-slate-200 font-mono text-black hover:text-blue-500 rounded-md hover:border-blue-500"
            }
          >
            Login
          </Button>
        </div>
      </div>
    );
}