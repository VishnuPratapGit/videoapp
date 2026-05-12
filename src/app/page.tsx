'use client';

import { useState } from "react";
import { Header } from "../components/navbar/Header";
import { AppSidebar } from "../components/sidebar";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  return (
    <>
      Home
    </>
  );
}