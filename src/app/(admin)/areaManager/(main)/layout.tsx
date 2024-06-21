"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/layouts/Sidebar";
import axios from "axios";
import { createErrorMessage } from "@/lib/utils";
import { useRouter } from "next/navigation";
import AdminNavbar from "@/components/AdminNavbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [showSidebar, setShowSidebar] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const authToken = localStorage.getItem("auth-token");
    if (authToken) {
      axios
        .get(`${process.env.NEXT_PUBLIC_HOST}/areaManager/verify`, {
          headers: {
            "auth-token": authToken,
          },
        })
        .catch((error) => {
          // todo: show toast of invalid authToken
          console.log(createErrorMessage(error));
          localStorage.removeItem("auth-token");
          return router.push("/areaManager/login");
        });
    } else {
      return router.push("/areaManager/login");
    }
  }, []);

  return (
    <>
      <div className="flex flex-col">
        <AdminNavbar setter={setShowSidebar} />
        <div className="flex">
          <Sidebar show={showSidebar} setter={setShowSidebar} />
          <div className="bg-[#f6f6f6] flex flex-col flex-grow w-screen md:w-full">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
