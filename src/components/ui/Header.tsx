"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Input from "./Input";
import Logo from "./Logo";
import { Menu, Search, X } from "lucide-react";
import { useSidebar } from "@/src/context/SidebarContext";
import UserProfilePopover from "./UserProfilePopover";
import Avatar from "./Avatar";
import { useTheme } from "@/src/providers/ThemeProvider";
import { Icon } from "../icons/Icon";

export function Header() {
  const { data: session } = useSession();
  const { state, toggleSidebar } = useSidebar();
  const [inputActive, setInputActive] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex h-20 z-50 backdrop-blur-md sticky top-0 items-center justify-between border-b border-(--border-fade) py-2 px-5">
      {/* LOGO */}
      <div className="flex items-center gap-4">
        <div
          onClick={toggleSidebar}
          className="hover:bg-neutral-700 rounded-full p-2 hover:cursor-pointer"
        >
          {state === "expanded" ? <X size={24} /> : <Menu size={24} />}
        </div>
        <Logo title="BLOGGER" />
      </div>

      {/* SEARCH_BAR */}
      <div
        className={`flex items-center w-1/3 border-2 ${inputActive ? "border-(--border)" : "border-(--border-fade)"} rounded-full px-6 pr-0`}
      >
        <Search
          className={`${inputActive ? "text-(--active-shade)" : "text-(--inactive-shade)"}`}
        />
        <Input
          onFocus={() => setInputActive(true)}
          onBlur={() => setInputActive(false)}
          className={"rounded-full w-full text-lg border-none p-3"}
          placeholder="Search"
        />
      </div>

      <div className="flex items-center gap-5">
        {/* THEME */}
        <div className="hover:cursor-pointer">
          {theme === "dark" ? (
            <div onClick={toggleTheme}>
              <Icon icon="Sun" />
            </div>
          ) : (
            <div onClick={toggleTheme}>
              <Icon icon="Moon" />
            </div>
          )}
        </div>

        <div className="border-l border-(--border-fade) h-6"></div>

        {/* PROFILE */}
        <div className="relative" onClick={() => setPopupOpen((prev) => !prev)}>
          <Avatar
            name={session?.user?.name || "A"}
            src={session?.user?.image}
          />
          {popupOpen && (
            <div className="absolute right-0 top-11">
              <UserProfilePopover />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
