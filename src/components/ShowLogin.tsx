"use client";

import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { createErrorMessage } from "@/lib/utils";

interface MyComponentProps {
  name: "admin" | "kitchenHead" | "areaManager";
}

export const ShowLogin = ({ name }: MyComponentProps) => {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState<undefined | string>(undefined);
  const [isLoading, setisLoading] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  console.log(pathname)

  const router = useRouter();

  useEffect(() => {
    const authToken = localStorage.getItem("auth-token");
    if (authToken) {
      axios
        .get(`${process.env.NEXT_PUBLIC_HOST}/${name}/verify`, {
          headers: {
            "auth-token": authToken,
          },
        })
        .catch(() => localStorage.removeItem("auth-token"));
      router.push(`/${name}`);
    }
  }, []);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     return router.push("/admin");
  //   }
  // }, [isLoggedIn]);

  const handleLogin = async () => {
    try {
      setisLoading(true);
      if (!email || !password) {
        setShowError("Please enter email and password");
        return;
      }
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}${pathname}`,
        {
          email,
          password,
        }
      );
      localStorage.setItem("auth-token", data.token);
      let extractedPart = pathname.split('/login')[0];
      console.log("ext:", extractedPart);
      return router.push(extractedPart);
    } catch (error: any) {
      // todo: show toast error
      console.log(createErrorMessage(error));
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div className="flex items-center h-screen w-full">
      <div className="w-[60%] bg-purple-500 h-screen flex justify-center items-center">
        <h1 className="text-5xl w-[70%] mb-32 font-semibold leading-tight text-[#dcd8d8]">
          Hello{" "}
          {name === "admin"
            ? "Admin"
            : name === "areaManager"
            ? "Area manager"
            : "Kitchen head"}
          ! Welcome in your Space
        </h1>
      </div>
      <form className="w-[40%] h-[70%] bg-white rounded-lg flex flex-col items-center p-10 gap-8 z-20">
        <h2 className="text-4xl font-semibold mb-10">Login</h2>
        <input
          type="text"
          placeholder={name === 'kitchenHead' ? 'Username' : 'Email'}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setShowError("");
          }}
          className="p-2 outline-none border-b-[1.5px] border-purple-300 w-[70%]"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setShowError("");
          }}
          className="p-2 outline-none mb-10 border-b-[1.5px] border-purple-300 w-[70%]"
        />
        {showError && <div className="text-red-500 text-lg">{showError}</div>}
        <Button
          disabled={isLoading}
          onClick={handleLogin}
          className="p-5 text-[1.25rem] font-semibold w-[60%] bg-purple-400 rounded-xl text-white hover:bg-purple-300"
        >
          Login
          {isLoading ? <Loader2 className="w-5 h-5 ml-2 animate-spin" /> : null}
        </Button>
      </form>
    </div>
  );
};
