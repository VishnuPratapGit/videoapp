"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/src/redux/store";
import { SidebarProvider } from "@/src/components/ui/sidebar";
import { ThemeProvider } from "./theme-provider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <Provider store={store}>{children}</Provider>
      </SidebarProvider>
    </ThemeProvider>
  );
}
