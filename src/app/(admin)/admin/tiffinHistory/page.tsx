"use client";

import { TodaysCard } from "@/components/TodaysCard";
import axios from "axios";
import {
  ChevronLeft,
  ChevronLeftIcon,
  ChevronRight,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const page = () => {
  const searchParams = useSearchParams();

  const [history, setHistory] = useState([]);
  const [isFetchloading, setIsFetchloading] = useState(true);
  const [totalTiffinDelivered, setTotalTiffinDelivered] = useState(0);
  const [totalTiffinPicked, setTotalTiffinPicked] = useState(0);
  const [startingDate, setStartingDate] = useState<string>("");
  const [endingDate, setEndingDate] = useState<string>("");

  const page = searchParams.get("page") ?? 1;
  const limit = searchParams.get("limit") ?? 10;

  // gets history
  useEffect(() => {
    const getHistory = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/orderLogs/all?page=${page}&limit=${limit}`,
          {
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
            },
          }
        );

        let totalDelivered = 0;
        let totalPicked = 0;
        data.allDeliveries.map((order: any) => {
          totalDelivered = totalDelivered + order.deliveredTiffin;
          totalPicked = totalPicked + order.pickedTiffin;
        });
        const date = new Date(data.startingDate);
        const startingDate = `${date.getDate()}/${date.getMonth() + 1}/${date
          .getFullYear()
          .toString()
          .slice(-2)}`;
        const edate = new Date(data.endingDate);
        const endingDate = `${edate.getDate()}/${date.getMonth() + 1}/${date
          .getFullYear()
          .toString()
          .slice(-2)}`;
        setStartingDate(startingDate);
        setEndingDate(endingDate);
        setTotalTiffinDelivered(totalDelivered);
        setTotalTiffinPicked(totalPicked);
        setHistory(data.allDeliveries);
      } catch (error:any) {
        toast.error(error.response.data);
      } finally {
        setIsFetchloading(false);
      }
    };
    getHistory();
  }, []);

  return (
    <div className="pt-8 bg-[#F6F6F6] relative">
      <div className="pb-8 px-8 min-h-screen">
        {isFetchloading ? null : <div className="text-green-500 text-3xl">{`${startingDate} - ${endingDate}`}</div>}
        <div className="flex mt-6 px-16 text-2xl font-semibold">
          <h1 className="w-[20%] text-center">Time</h1>
          <h1 className="w-[20%] text-center">User</h1>
          <h1 className="w-[20%] text-center">Mobile</h1>
          <h1 className="w-[20%] text-center">Delivered</h1>
          <h1 className="w-[20%] text-center">Picked</h1>
          <h1 className="w-[20%] text-center">Due</h1>
        </div>
        {isFetchloading ? (
          <div className="w-full mt-20 flex justify-center items-center">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : (
          history &&
          history.map((user: any) => {
            return (
              <TodaysCard
                key={user.id}
                name={user.user.name}
                mobile={user.user.phone}
                delivered={user.deliveredTiffin}
                picked={user.pickedTiffin}
                dateTime={user.createdAt}
                due={user.user.dueTiffin}
              />
            );
          })
        )}
      </div>
      <div className="sticky bottom-0">
        <div className=" px-24 flex items-center py-4 bg-green-500 text-white w-full text-2xl">
          <h1 className="w-[25%] text-center">Total :</h1>
          <h1 className="w-[25%] text-center"></h1>
          <h1 className="w-[25%] text-center"></h1>
          <h1 className="w-[25%] text-center">{totalTiffinDelivered}</h1>
          <h1 className="w-[25%] text-center">{totalTiffinPicked}</h1>
          <h1 className="w-[25%] text-center">
            {totalTiffinDelivered - totalTiffinPicked}
          </h1>
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
