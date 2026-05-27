'use client';
import { useSession, signOut } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"
import Logo from "../ui/Logo";
import Button from "../ui/Button";

type HeaderProps = {
  sidebarOpen?: boolean;
  setSidebarOpen?: (open: boolean) => void;
};

export function AuthHeader() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();
    
    return (
      <div className="w-[90%] bg-neutral-950 mx-auto mt-10 flex items-center justify-between rounded-full border border-neutral-700 py-1 px-10">
        <div className="flex items-center gap-4">
          <Logo title="BLOGGER" />
        </div>

        <div className="flex items-center">
          <Button
            className="py-2 my-2 bg-transparent border-none"
            onClick={() => router.push("/contact")}
          >
            Contact Support
          </Button>

          <div className="border-l border-neutral-600 h-6"></div>

          {status === "authenticated" ? (
            <div>
              <Button onClick={() => signOut()}>Logout</Button>
            </div>
          ) : status === "loading" ? (
            <div>
              <Button disabled>Loading...</Button>
            </div>
          ) : (
            status === "unauthenticated" &&
            (pathname === "/auth/signup" ? (
              <Button
                className="py-2 my-2 bg-transparent border-none"
                onClick={() => router.push("/auth/signin")}
              >
                Sign In
              </Button>
            ) : (
              pathname === "/auth/signin" && (
                <Button
                  className="py-2 my-2 bg-transparent border-none"
                  onClick={() => router.push("/auth/signup")}
                >
                  Sign Up
                </Button>
              )
            ))
          )}
        </div>
      </div>
    );
}