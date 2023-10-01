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

  useEffect(() => {
    const getUserHistory = async () => {
        const {data} = await axios.get(`/api/getUserHistory?userId=${userId}`);
      setUsers(data)
      console.log(data)
    };
    getUserHistory()
  }, []);

  return (
    <div className="pt-8 px-8 bg-[#F6F6F6] min-h-screen">
      <h1 className="text-3xl text-green-500">{name}</h1>
      <h1 className="text-2xl text-orange-500 mt-1">{mobile}</h1>
      <div className="flex mt-6 px-16 text-2xl font-semibold">
        <h1 className="w-[25%] text-center">Date</h1>
        <h1 className="w-[25%] text-center">Delivered</h1>
        <h1 className="w-[25%] text-center">Picked</h1>
        <h1 className="w-[25%] text-center">Due</h1>
      </div>
      {users.map((user) => (
        <HistoryCard user={user} />
      ))}
    </div>
  );
};

export default page;
