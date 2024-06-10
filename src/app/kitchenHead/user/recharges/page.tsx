"use client";
import axios from "axios";
import { ChevronLeftIcon, ChevronRight, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

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

  const [isFetchloading, setIsFetchloading] = useState(true);
  const [history, setHistory] = useState([]);

  const page = searchParams.get("page") ?? 1;
  const limit = searchParams.get("limit") ?? 10;

  useEffect(() => {
    const getHistory = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/kitchenHead/payments/user/${userId}`,
          {
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
            },
          }
        );
        console.log(data);
        setHistory(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsFetchloading(false);
      }
    };
    getHistory();
  }, []);

  return (
    <div className="pt-8 bg-[#F6F6F6] relative">
      <div className="pb-8 px-8 min-h-screen">
        <h1 className="text-3xl text-green-500">{name}</h1>
        <h1 className="text-2xl text-orange-500 mt-1">{mobile}</h1>
        {isFetchloading ? null : (
          <div className="text-green-500 text-3xl">Recharges: </div>
        )}
        <div className="flex mt-6 px-16 text-2xl font-semibold">
          <h1 className="w-[25%] text-center">Amount</h1>
          <h1 className="w-[25%] text-center">Date</h1>
          <h1 className="w-[25%] text-center">Type</h1>
          <h1 className="w-[25%] text-center">Mode</h1>
        </div>
        {isFetchloading ? (
          <div className="w-full mt-20 flex justify-center items-center">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : (
          history &&
          history.map((user: any) => {
            const dateOnly = user.createdAt.substring(0, 10);
            return (
              <div className="mt-5 bg-white rounded-xl flex text-2xl py-5 px-16">
                <h1 className="w-[25%] text-center">{user.amount}</h1>
                <h1 className="w-[25%] text-center">{dateOnly}</h1>
                <h1 className="w-[25%] text-center">{user.type}</h1>
                <h1 className="w-[25%] text-center">{user.mode}</h1>
              </div>
            );
          })
        )}
      </div>
      <div className="sticky bottom-0">
        <div className=" px-24 flex items-center py-4 bg-green-500 text-white w-full text-2xl">
          <h1 className="w-[20%] text-center">Total :</h1>
          <h1 className="w-[20%] text-center"></h1>
          <h1 className="w-[20%] text-center"></h1>
          <h1 className="w-[20%] text-center"></h1>
          <h1 className="w-[20%] text-center">{history.length}</h1>
        </div>
        <div className="bg-white py-2">
          <div className="flex justify-center">
            <a
              className="p-2 hover:bg-gray-200 transition-colors rounded-xl cursor-pointer"
              href={`?page=${Number(page) - 1}&limit=${limit}`}
            >
              <ChevronLeftIcon strokeWidth={1.2} className="text-slate-600" />
            </a>
            <div className="p-2">
              {page}/{Math.ceil(30 / Number(limit))}
            </div>
            <a
              href={`?page=${Number(page) + 1}&limit=${limit}`}
              className="p-2 hover:bg-gray-200 transition-colors rounded-xl cursor-pointer"
            >
              <ChevronRight strokeWidth={1.2} className="text-slate-600" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
