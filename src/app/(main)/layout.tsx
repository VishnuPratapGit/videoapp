import { Header } from "@/src/components/ui/Header";
import { AppSidebar } from "@/src/components/ui/Sidebar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <div className="flex flex-1">
        <AppSidebar />
        <main className="flex-1 p-10">{children}</main>
      </div>
    </div>
  );
}
