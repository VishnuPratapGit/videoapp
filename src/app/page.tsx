'use client';

import { useState } from "react";
import { Header } from "../components/navbar/Header";
import Sidebar from "../components/sidebar";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  return (
    <>
      <nav>
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </nav>
      <div>
        <aside>
          <Sidebar sidebarOpen={sidebarOpen} />
        </aside>
        <main>{/* Your main content goes here */}</main>
      </div>
    </>
  );
}