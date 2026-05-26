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
      <div className="flex items-center justify-between border-b border-neutral-800 py-2 px-5">
        <div className="flex items-center gap-4">
          <Logo title="BLOGGER" />
        </div>
        
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
              className="py-2 my-2"
              onClick={() => router.push("/auth/signin")}
            >
              Sign In
            </Button>
          ) : (
            pathname === "/auth/signin" && (
              <Button
                className="py-2 my-2"
                onClick={() => router.push("/auth/signup")}
              >
                Sign Up
              </Button>
            )
          ))
        )}
      </div>
    );
}