"use client"

import KitchenHeadNavbar from "@/components/KitchenHeadNavbar"
import { createErrorMessage } from "@/lib/utils";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()

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
            return router.push("/admin/login");
          });
      } else {
        return router.push("/kitchenHead/login");
      }
    }, []);

    return <>
        <KitchenHeadNavbar/>
        {children}
    </>
}

export default layout