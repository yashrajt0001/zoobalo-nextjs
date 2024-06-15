"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import HistoryCard from "@/components/HistoryCard";

interface PageInterface {
  params: {
    userId: number;
  };
}

const page = ({ params }: PageInterface) => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const name = searchParams.get("name");
  const mobile = searchParams.get("mobile");

  const [users, setUsers] = useState([]);
  const [totalTiffinDelivered, setTotalTiffinDelivered] = useState(0);
  const [totalTiffinPicked, setTotalTiffinPicked] = useState(0);

  useEffect(() => {
    const getUserHistory = async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_HOST}/kitchenHead/orderLogs/user/get/${userId}`,
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      let totalDelivered = 0;
      let totalPicked = 0;
      data.map((order: any) => {
        totalDelivered = totalDelivered + order.deliveredTiffin;
        totalPicked = totalPicked + order.pickedTiffin;
      });
      setTotalTiffinDelivered(totalDelivered);
      setTotalTiffinPicked(totalPicked);
      setUsers(data);
      console.log(data);
    };
    getUserHistory();
  }, []);

  return (
    <div className="pt-8 bg-[#F6F6F6] relative">
      <div className="px-8 pb-8 min-h-screen">
        <h1 className="text-3xl text-green-500">{name}</h1>
        <h1 className="text-2xl text-orange-500 mt-1">{mobile}</h1>
        <div className="flex mt-6 px-16 text-2xl font-semibold">
          <h1 className="w-[25%] text-center">Time</h1>
          <h1 className="w-[25%] text-center">Date</h1>
          <h1 className="w-[25%] text-center">Delivered</h1>
          <h1 className="w-[25%] text-center">Picked</h1>
          <h1 className="w-[25%] text-center">Due</h1>
        </div>
        {users.map((user) => (
          <HistoryCard user={user} />
        ))}
      </div>
      <div className="bottom-0 px-24 flex items-center py-4 bg-green-500 text-white w-full sticky text-2xl">
        <h1 className="w-[25%] text-center">Total :</h1>
        <h1 className="w-[25%] text-center"></h1>
        <h1 className="w-[25%] text-center">{totalTiffinDelivered}</h1>
        <h1 className="w-[25%] text-center">{totalTiffinPicked}</h1>
        <h1 className="w-[25%] text-center">{totalTiffinDelivered - totalTiffinPicked}</h1>
      </div>
    </div>
  );
};

export default page;
