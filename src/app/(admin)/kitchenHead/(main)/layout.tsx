"use client"

import AdminNavbar from "@/components/AdminNavbar";
import KitchenHeadNavbar from "@/components/KitchenHeadNavbar"
import KitchenHeadSidebar from "@/components/layouts/KitchenHeadSideBar";
import { createErrorMessage } from "@/lib/utils";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [showSidebar, setShowSidebar] = useState(false);


    useEffect(() => {
      const authToken = localStorage.getItem("auth-token");
      if (authToken) {
        axios
          .get(`${process.env.NEXT_PUBLIC_HOST}/kitchenHead/verify`, {
            headers: {
              "auth-token": authToken,
            },
          })
          .catch((error) => {
            // todo: show toast of invalid authToken
            console.log(createErrorMessage(error));
            localStorage.removeItem("auth-token");
            return router.push("/kitchenHead/login");
          });
      } else {
        return router.push("/kitchenHead/login");
      }
    }, []);

    return <>
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
}

export default layout