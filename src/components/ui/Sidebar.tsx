"use client";

import { useSidebar } from "@/src/context/SidebarContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "../icons/Icon";

export function AppSidebar() {
  const {state} = useSidebar();
  const pathname = usePathname();

  const menuItems = [
    { icon: 'Home', label: "Home", href: "/" },
    { icon: 'Flame', label: "Shorts", href: "/shorts" },
    { icon: 'Library', label: "Library", href: "/library" },
    { icon: 'Heart', label: "Liked", href: "/liked" },
    { icon: 'History', label: "History", href: "/history" },
  ] as const;

  const isActive = (href: string) => pathname === href;

  return (
    <div className={`border-r border-neutral-800 ${state === "collapsed" ? "w-20" : "w-64"}`}>
      <nav className="mt-3 p-2">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`flex ${state === "expanded" ? "flex-row mb-4.75 px-4 pl-5" : "flex-col"} py-4 items-center gap-1 rounded-lg hover:bg-neutral-800 ${
              isActive(item.href) ? "bg-neutral-800" : ""
            }`}
          >
            <Icon icon={item.icon} />
            <span
              className={`${state === "expanded" ? "ml-5" : "text-[10px]"}`}
            >
              {item.label}
            </span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
