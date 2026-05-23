"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/src/redux/store";
import { ThemeProvider } from "./ThemeProvider";
import { SidebarProvider } from "../context/SidebarContext";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <SessionProvider>
        <ThemeProvider>
          <SidebarProvider>
            {children}
          </SidebarProvider>
        </ThemeProvider>
      </SessionProvider>
    </Provider>
  );
}
