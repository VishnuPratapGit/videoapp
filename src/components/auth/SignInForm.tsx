"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Link from "next/link";
import Logo from "../ui/Logo";
import Spinner from "../ui/Spinner";
import GoogleButton from "../ui/GoogleButton";
import Divider from "../ui/Divider";

export const SignInForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get("email");
      const password = formData.get("password");

      if (typeof email !== "string" || typeof password !== "string") {
        setError("Please enter your email and password.");
        return;
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error || !result?.ok) {
        setError("Invalid email or password.");
        return;
      }

      router.push(callbackUrl);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setIsLoading(true);
    try {
      const result = await signIn("google", {
        redirect: true,
        callbackUrl: callbackUrl,
      });

      if (!result?.ok && result?.error) {
        setError("Google sign-in failed. Please try again.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <form
        noValidate
        onSubmit={handleSubmit}
        className="flex bg-(--background) flex-col items-center border-2 rounded-xl p-10 border-(--border-fade) w-xl h-max mx-auto"
      >
        <div className="flex flex-col items-center mb-10 gap-4">
          <Logo title="BLOGGER" />
          <p className="text-lg font-mono">
            Welcome! Please sign in to your account.
          </p>
        </div>

        <div className="w-full">
          <GoogleButton onClick={handleGoogleSignIn} isLoading={isLoading} />
        </div>

        <Divider label="OR" />

        <div className="flex flex-col gap-4 w-full">
          <Input
            name="email"
            placeholder="name@domail.com"
            type="email"
            autoComplete="email"
            required
          />
          <Input
            name="password"
            placeholder="8 characters minimum"
            type="password"
            autoComplete="current-password"
            required
          />
          {error ? <p className="text-sm text-[#FF7B1D]">{error}</p> : null}
          <Button
            className="font-mono mt-4 font-bold"
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? <Spinner /> : "Sign In"}
          </Button>
        </div>

        <p className="font-mono mt-10">
          <Link href={"/auth/forgot-password"}>Forgot password?</Link>
        </p>
      </form>

      <p className="mt-10">
        Don&apos;t have an account? <Link href={"/auth/signup"}>Sign Up</Link>
      </p>
    </div>
  );
};
