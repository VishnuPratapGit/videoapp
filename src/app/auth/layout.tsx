import { AuthHeader } from "@/src/components/auth/AuthHeader";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen signinpage">
      <AuthHeader />
      {children}
    </div>
  );
}
