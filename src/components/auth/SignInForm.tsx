"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Button from "../ui/Button";
import Input from "../ui/Input";

export const AuthForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    const result = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      callbackUrl,
    });

    setIsLoading(false);

    if (result?.error) {
      setError("Invalid username or password.");
      return;
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-2 rounded-xl p-5 dark:border-neutral-700 w-md h-max mx-auto"
    >
      <div className="flex flex-col items-center mb-6">
        <p className="font-medium font-mono">Welcome! Please sign in to your account.</p>
      </div>

      <div className="flex flex-col gap-4">
        <Input
          name="username"
          placeholder="username"
          autoComplete="username"
          required
        />
        <Input
          name="password"
          placeholder="password"
          type="password"
          autoComplete="current-password"
          required
        />
        {error ? <p className="text-sm text-red-500">{error}</p> : null}
        <Button className="font-mono" disabled={isLoading} type="submit">
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </div>
    </form>
  );
};
