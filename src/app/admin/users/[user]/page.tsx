import { HistoryCard } from "@/components/HistoryCard";
import React from "react";

const page = () => {
  return (
    <div className="pt-8 px-8 bg-[#F6F6F6] min-h-screen">
      <h1 className="text-3xl text-green-500">Rudra Pratap Singh</h1>

      <h1 className="text-2xl text-orange-500 mt-1">8503079734</h1>

      <div className="flex mt-6 px-16 text-2xl font-semibold">
        <h1 className="w-[25%] text-center">Date</h1>
        <h1 className="w-[25%] text-center">Delivered</h1>
        <h1 className="w-[25%] text-center">Picked</h1>
        <h1 className="w-[25%] text-center">Due</h1>
      </div>

      <HistoryCard />
    </div>
  );
};

export default page;
