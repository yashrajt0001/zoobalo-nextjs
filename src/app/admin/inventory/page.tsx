"use client";

import { TodaysCard } from "@/components/TodaysCard";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";

const page = () => {
  const [history, setHistory] = useState([]);
  const [isFetchloading, setIsFetchloading] = useState(true);
  const [totalTiffinDelivered, setTotalTiffinDelivered] = useState(0);
  const [totalTiffinPicked, setTotalTiffinPicked] = useState(0);

  useEffect(() => {
    const getHistory = async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_HOST}/admin/deliveries/get`,
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      setIsFetchloading(false);
      console.log(data);
      const res = data.filter((order: any) => {
        return order.isDelivered == true;
      });
      let totalDelivered = 0;
      let totalPicked = 0;
      res.map((order: any) => {
        totalDelivered = totalDelivered + order.deliveredTiffin;
        totalPicked = totalPicked + order.pickedTiffin;
      });
      setTotalTiffinDelivered(totalDelivered);
      setTotalTiffinPicked(totalPicked);
      setHistory(res);
    };
    getHistory();
  }, []);

  const dateTime = new Date();
  const date = dateTime.getDate();
  const month = dateTime.getMonth() + 1;
  const year = dateTime.getFullYear();

  const todayDate = `${date}/${month}/${year}`;

  return (
    <div className="pt-8 bg-[#F6F6F6] relative">
      <div className="pb-8 px-8 min-h-screen">
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
              delivered={user.delivered}
              picked={user.picked}
              dateTime={user.createdAt}
            />
          ))
        )}
      </div>
      <div className="bottom-0 px-24 flex items-center py-4 bg-green-500 text-white w-full sticky text-2xl">
        <h1 className="w-[25%] text-center">Total :</h1>
        <h1 className="w-[25%] text-center"></h1>
        <h1 className="w-[25%] text-center"></h1>
        <h1 className="w-[25%] text-center">{totalTiffinDelivered}</h1>
        <h1 className="w-[25%] text-center">{totalTiffinPicked}</h1>
        <h1 className="w-[25%] text-center">
          {totalTiffinDelivered - totalTiffinPicked}
        </h1>
      </div>
    </div>
  );
};

export default page;
