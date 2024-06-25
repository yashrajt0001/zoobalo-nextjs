"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/layouts/Sidebar";
import axios from "axios";
import { createErrorMessage } from "@/lib/utils";
import AdminNavbar from "@/components/AdminNavbar";
import { useRouter } from "next/navigation";
import KitchenHeadSidebar from "@/components/layouts/KitchenHeadSideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [showSidebar, setShowSidebar] = useState(false);
  const router = useRouter();

//   useEffect(() => {
//     const authToken = localStorage.getItem("auth-token");
//     if (authToken) {
//       axios
//         .get(`${process.env.NEXT_PUBLIC_HOST}/admin/verify`, {
//           headers: {
//             "auth-token": authToken,
//           },
//         })
//         .catch((error) => {
//           // todo: show toast of invalid authToken
//           console.log(createErrorMessage(error));
//           localStorage.removeItem("auth-token");
//           return router.push("/admin/login");
//         });
//     } else {
//       return router.push("/admin/login");
//     }
//   }, []);

  return (
    <>
      <div className="flex flex-col">
        <AdminNavbar setter={setShowSidebar} />
        <div className="flex">
          <KitchenHeadSidebar show={showSidebar} setter={setShowSidebar} />
          <div className="bg-[#f6f6f6] flex flex-col flex-grow w-screen md:w-full">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
