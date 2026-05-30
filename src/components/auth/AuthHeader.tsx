'use client'
import { usePathname, useRouter } from "next/navigation";
import Logo from "../ui/Logo";
import Button from "../ui/Button";
import { useTheme } from "@/src/providers/ThemeProvider";
import { Icon } from "../icons/Icon";

export function AuthHeader() {
  const { theme, toggleTheme } = useTheme();

  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="w-[90%] bg-(--background) mx-auto mt-10 flex items-center justify-between rounded-full border-2 border-(--border-fade) py-1 px-10">
      <div className="flex items-center gap-4">
        <Logo title="BLOGGER" />
      </div>

      <div className="flex items-center">
        <div className="px-3 hover:cursor-pointer">
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

        <Button
          className="py-2 my-2 bg-transparent hover:bg-transparent border-none outline-none"
          onClick={() => router.push("/contact")}
        >
          Contact Support
        </Button>

        <div className="border-l border-(--border-fade) h-6"></div>

        {pathname === "/auth/signup" ? (
          <Button
            className="py-2 my-2 bg-transparent hover:bg-transparent border-none outline-none"
            onClick={() => router.push("/auth/signin")}
          >
            Sign In
          </Button>
        ) : (
          pathname === "/auth/signin" && (
            <Button
              className="py-2 my-2 bg-transparent hover:bg-transparent border-none outline-none"
              onClick={() => router.push("/auth/signup")}
            >
              Sign Up
            </Button>
          )
        )}
      </div>
    </div>
  );
}