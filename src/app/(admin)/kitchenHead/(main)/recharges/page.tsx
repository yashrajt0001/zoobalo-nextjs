"use client";
import axios from "axios";
import { ChevronLeftIcon, ChevronRight, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { createErrorMessage } from "@/lib/utils";


const page = () => {
  const searchParams = useSearchParams();

  const [isFetchloading, setIsFetchloading] = useState(true);
  const [history, setHistory] = useState([]);

  const page = searchParams.get("page") ?? 1;
  const limit = searchParams.get("limit") ?? 10;

  useEffect(() => {
    const getHistory = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/kitchenHead/payments`,
          {
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
            },
          }
        );
        setHistory(data);
      } catch (error: any) {
        toast.error(createErrorMessage(error));
      } finally {
        setIsFetchloading(false);
      }
    };
    getHistory();
  }, []);

  return (
    <div className="flex h-[calc(100vh-65px)] bg-slate-50">
      <div className="flex-1 overflow-y-auto">
        <div className="pt-8 bg-[#F6F6F6] relative">
          <div className="pb-8 px-8 min-h-screen">
            {isFetchloading ? null : (
              <div className="text-green-500 text-3xl">Recharges: </div>
            )}
            <div className="flex mt-6 px-16 text-2xl font-semibold">
              <h1 className="w-[20%] text-center">Name</h1>
              <h1 className="w-[20%] text-center">Phone</h1>
              <h1 className="w-[20%] text-center">Amount</h1>
              <h1 className="w-[20%] text-center">Date</h1>
              <h1 className="w-[20%] text-center">Type</h1>
              <h1 className="w-[20%] text-center">Mode</h1>
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
                    <h1 className="w-[20%] text-center">{user.user.name}</h1>
                    <h1 className="w-[20%] text-center">{user.user.phone}</h1>
                    <h1 className="w-[20%] text-center">{user.amount}</h1>
                    <h1 className="w-[20%] text-center">{dateOnly}</h1>
                    <h1 className="w-[20%] text-center">{user.type}</h1>
                    <h1 className="w-[20%] text-center">{user.mode}</h1>
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
                  <ChevronLeftIcon
                    strokeWidth={1.2}
                    className="text-slate-600"
                  />
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
      </div>
    </div>
  );
};

export default page;
