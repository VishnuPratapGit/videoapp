'use client';
import { useSession, signOut } from "next-auth/react"
import { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import Logo from "./Logo";
import { Menu, Search, X } from "lucide-react";
import { useSidebar } from "@/src/context/SidebarContext";
import { useRouter } from "next/navigation"
import UserProfilePopover from "./UserProfilePopover";
import Avatar from "./Avatar";

type HeaderProps = {
  sidebarOpen?: boolean;
  setSidebarOpen?: (open: boolean) => void;
};

export function Header({ 
    sidebarOpen, 
    setSidebarOpen = ()=>{} 
} : HeaderProps ) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const {state, toggleSidebar} = useSidebar();
    const [inputActive, setInputActive] = useState(false);
    const [popupOpen, setPopupOpen] = useState(false);

    const toggleProfilePopup = () => {
      setPopupOpen((prev) => !prev)
    }

    return (
      <div className="flex items-center justify-between border-b border-(--border-fade) py-2 px-5">
        <div className="flex items-center gap-4">
          <div
            onClick={toggleSidebar}
            className="hover:bg-neutral-700 rounded-full p-2 hover:cursor-pointer"
          >
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

        <div className="relative" onClick={toggleProfilePopup}>
          <Avatar />
          {popupOpen && (
            <div className="absolute right-0 top-11">
              <UserProfilePopover />
            </div>
          )}
        </div>
      </div>
    );
}