"use client";

import { useSidebar } from "@/src/components/ui/sidebar";
import { Home, Flame, Library, Heart, History } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppSidebar() {
  const { state } = useSidebar();
  const pathname = usePathname();

  const menuItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Flame, label: "Shorts", href: "/shorts" },
    { icon: Library, label: "Library", href: "/library" },
    { icon: Heart, label: "Liked", href: "/liked" },
    { icon: History, label: "History", href: "/history" },
  ];

  return (
    <div className={`border-r ${state === "collapsed" ? "w-20" : "w-64"}`}>
      {/* Menu Items */}
      <nav className="mt-3 p-2">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`flex ${state === "expanded" ? "flex-row mb-4.75 px-4 pl-5" : "flex-col"} py-4 items-center gap-1 rounded-lg hover:bg-neutral-800 ${
              pathname === item.href ? "bg-neutral-800" : ""
            }`}
          >
            <item.icon size={24} />
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
