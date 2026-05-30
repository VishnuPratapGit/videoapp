"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { createNewUser } from "@/src/features/users/user.actions";
import Link from "next/link";
import Spinner from "../ui/Spinner";
import Divider from "../ui/Divider";
import GoogleButton from "../ui/GoogleButton";

export const SignUpForm = () => {
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
      const username = formData.get("username");
      const email = formData.get("email");
      const password = formData.get("password");

      if (
        typeof username !== "string" ||
        typeof email !== "string" ||
        typeof password !== "string"
      ) {
        setError("Please fill all fields correctly.");
        return;
      }

      const userCreated = await createNewUser({
        username,
        email,
        password,
      });

      if (!userCreated.success) {
        setError(userCreated.error || "Could not create account.");
        return;
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error || !result?.ok) {
        setError("Account created, but auto sign-in failed.");
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
    <form
      noValidate
      onSubmit={handleSubmit}
      className="flex flex-col items-center bg-(--background) border-2 rounded-xl p-10 border-(--border-fade) w-xl h-max mx-auto"
    >
      <div className="flex flex-col items-center mb-10 gap-2">
        <p className="text-lg font-mono">Welcome! Please create an account.</p>
      </div>

      <div className="w-full">
        <GoogleButton onClick={handleGoogleSignIn} isLoading={isLoading} />
      </div>

      <Divider label="OR" />

      <div className="flex flex-col gap-4 w-full">
        <Input
          name="username"
          placeholder="Full Name"
          type="text"
          autoComplete="off"
          required
        />
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
        {error ? <p className="text-sm text-red-500">{error}</p> : null}
        <Button className="font-mono mt-4" disabled={isLoading} type="submit">
          {isLoading ? (
            <Spinner className="text-white mx-auto font-bold" />
          ) : (
            "Sign Up"
          )}
        </Button>
      </div>

      <p className="mt-10">
        Already have an account? <Link href={"/auth/signin"}>Sign In</Link>
      </p>
    </form>
  );
};
