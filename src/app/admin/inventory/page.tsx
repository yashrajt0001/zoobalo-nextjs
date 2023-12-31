"use client";

import { TodaysCard } from "@/components/TodaysCard";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";

const page = () => {
  const [history, setHistory] = useState([]);
  const [isFetchloading, setIsFetchloading] = useState(true);

  useEffect(() => {
    const getHistory = async () => {
      const { data } = await axios.get("/api/getHistory", {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      });
      setIsFetchloading(false);
      setHistory(data);
    };
    getHistory();
  }, []);

  const dateTime = new Date()
  const date = dateTime.getDate()
  const month = dateTime.getMonth() + 1
  const year = dateTime.getFullYear()

  const todayDate = `${date}/${month}/${year}`

  return (
    <div className="pt-8 px-8 bg-[#F6F6F6] min-h-screen">
      <h1 className="text-3xl text-green-500">{todayDate}</h1>
      <div className="flex mt-6 px-16 text-2xl font-semibold">
        <h1 className="w-[20%] text-center">Time</h1>
        <h1 className="w-[20%] text-center">User</h1>
        <h1 className="w-[20%] text-center">Mobile</h1>
        <h1 className="w-[20%] text-center">Delivered</h1>
        <h1 className="w-[20%] text-center">Picked</h1>
        <h1 className="w-[20%] text-center">Due</h1>
      </div>
      {isFetchloading ? (
        <Loader2 className="w-8 h-8 animate-spin" />
      ) : (
        history && history.map((user: any) => (
          <TodaysCard
            key={user.id}
            name={user.User.name}
            mobile={user.User.mobile}
            delivered={user.delivered}
            picked={user.picked}
            dateTime={user.dateTime}
          />
        ))
      )}
    </div>
  );
};

export default page;
