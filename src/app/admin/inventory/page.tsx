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
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_HOST}/orderLogs/today`,
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      console.log(data)
      setIsFetchloading(false);
      setHistory(data);
    };
    getHistory();
  }, []);

  const dateTime = new Date();
  const date = dateTime.getDate();
  const month = dateTime.getMonth() + 1;
  const year = dateTime.getFullYear();

  const todayDate = `${date}/${month}/${year}`;

  return (
    <div className="p-8 bg-[#F6F6F6] min-h-screen">
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
        history &&
        history.map((user: any) => (
          <TodaysCard
            key={user.id}
            name={user.user.name}
            mobile={user.user.phone}
            delivered={user.deliveredTiffin}
            picked={user.pickedTiffin}
            dateTime={user.createdAt}
            due={user.user.dueTiffin}
          />
        ))
      )}
    </div>
  );
};

export default page;
