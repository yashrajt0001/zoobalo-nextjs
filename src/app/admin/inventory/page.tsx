"use client";

import { TodaysCard } from "@/components/TodaysCard";
import axios from "axios";
import React, { useEffect, useState } from "react";

const page = () => {
  const [history, setHistory] = useState<any>([]);

  useEffect(() => {
    async function getHistory() {
      try {
        const { data } = await axios.get("/api/getHistory", {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        });
        setHistory(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    getHistory();
  }, []);
  return (
    <div className="pt-8 px-8 bg-[#F6F6F6] min-h-screen">
      <h1 className="text-3xl text-green-500">28/09/2023</h1>

      <div className="flex mt-6 px-16 text-2xl font-semibold">
        <h1 className="w-[20%] text-center">User</h1>
        <h1 className="w-[20%] text-center">Mobile</h1>
        <h1 className="w-[20%] text-center">Delivered</h1>
        <h1 className="w-[20%] text-center">Picked</h1>
        <h1 className="w-[20%] text-center">Due</h1>
      </div>
      {history.map((user: any) => (
        <TodaysCard
          name={user.User.name}
          mobile={user.User.mobile}
          delivered={user.delivered}
          picked={user.picked}
        />
      ))}
    </div>
  );
};

export default page;