"use client";

import { useSidebar } from "@/src/context/SidebarContext";
import { usePathname, useRouter } from "next/navigation";
import { Icon } from "../icons/Icon";

export function AppSidebar() {
  const { state } = useSidebar();
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { icon: "Home", label: "Home", link: "/" },
    { icon: "Flame", label: "Shorts", link: "/shorts" },
    { icon: "Library", label: "Library", link: "/library" },
    { icon: "Heart", label: "Liked", link: "/liked" },
    { icon: "History", label: "History", link: "/history" },
  ] as const;

  const isActive = (link: string) => pathname === link;

  return (
    <div
      className={`sticky top-20 h-[calc(100vh-80px)] flex flex-col justify-between border-r border-(--border-fade) ${state === "collapsed" ? "w-20" : "w-64"}`}
    >
      <nav className="mt-3 p-2">
        {menuItems.map((item) => (
          <div
            key={item.label}
            onClick={() => router.push(item.link)}
            className={`flex cursor-pointer ${state === "expanded" ? "flex-row mb-4.75 px-4 pl-5" : "flex-col"} py-4 items-center gap-1 rounded-lg hover:bg-(--surface-hover) ${
              isActive(item.link) ? "bg-(--active-links)" : ""
            }`}
          >
            <Icon icon={item.icon} />
            <span
              className={`${state === "expanded" ? "ml-5" : "text-[10px]"}`}
            >
              {item.label}
            </span>
          </div>
        ))}
      </nav>
      <div
        onClick={() => router.push("/settings")}
        className={`flex m-2 cursor-pointer ${state === "expanded" ? "flex-row mb-4.75 px-4 pl-5" : "flex-col"} py-4 items-center gap-1 rounded-lg hover:bg-neutral-800 ${
          isActive("/settings") ? "bg-neutral-800" : ""
        }`}
      >
        <Icon icon="Settings" />
        <span className={`${state === "expanded" ? "ml-5" : "text-[10px]"}`}>
          {"Settings"}
        </span>
      </div>
    </div>
  );
}
