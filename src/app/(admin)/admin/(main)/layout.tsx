"use client"

import React, { useState } from "react";
import Sidebar from '@/components/layouts/Sidebar'
import MenuBarMobile from "@/components/ui/MenuBarMobile";

export default function Layout({ children }: {children: React.ReactNode}) {
  const [showSidebar, setShowSidebar] = useState(false);

 

  return (
    <>
      <div className="min-h-screen">
        <div className="flex">
          <MenuBarMobile setter={setShowSidebar} />
          <Sidebar show={showSidebar} setter={setShowSidebar} />
          <div className="flex flex-col flex-grow w-screen md:w-full min-h-screen">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
