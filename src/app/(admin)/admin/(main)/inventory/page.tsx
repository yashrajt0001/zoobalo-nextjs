"use client";

import { TodaysCard } from "@/components/TodaysCard";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { createErrorMessage } from "@/lib/utils";

const page = () => {
  const [history, setHistory] = useState([]);
  const [isFetchloading, setIsFetchloading] = useState(true);
  const [totalTiffinDelivered, setTotalTiffinDelivered] = useState(0);
  const [totalTiffinPicked, setTotalTiffinPicked] = useState(0);

  useEffect(() => {
    const getHistory = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_HOST}/orderLogs/today`,
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
        setHistory(data);
      } catch (error: any) {
        toast.error(createErrorMessage(error));
      } finally {
        setIsFetchloading(false);
      }
    };
    getHistory();
  }, []);

  const dateTime = new Date();
  const date = dateTime.getDate();
  const month = dateTime.getMonth() + 1;
  const year = dateTime.getFullYear();

  const todayDate = `${date}/${month}/${year}`;

  return (
    <div className="flex h-[calc(100vh-65px)]">
      <div className="flex-1 overflow-y-auto">
        <div className="pt-8 bg-[#F6F6F6] relative">
          {history && history.length > 0 ? (
            <>
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
                      delivered={user.deliveredTiffin}
                      picked={user.pickedTiffin}
                      dateTime={user.createdAt}
                      due={user.user.dueTiffin}
                    />
                  ))
                )}
              </div>
              <div className="bottom-0 px-24 flex items-center py-4 bg-green-500 text-white w-full sticky text-2xl">
                <h1 className="w-[20%] text-center">Total :</h1>
                <h1 className="w-[20%] text-center"></h1>
                <h1 className="w-[20%] text-center"></h1>
                <h1 className="w-[20%] text-center">{totalTiffinDelivered}</h1>
                <h1 className="w-[20%] text-center">{totalTiffinPicked}</h1>
                <h1 className="w-[20%] text-center">
                  {totalTiffinDelivered - totalTiffinPicked}
                </h1>
              </div>
            </>
          ) : (
              <div className="flex items-center justify-center h-[calc(90vh-65px)]" >
                <h1 className="text-4xl">No History</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
