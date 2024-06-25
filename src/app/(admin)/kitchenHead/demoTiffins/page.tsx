"use client";
import { DemoTiffinCard } from "@/components/DemoTiffinCard";
import UserContext, { UserContextType } from "@/contextApi/user/UserContext";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const page = () => {
  const [isFetchloading, setIsFetchloading] = useState(true);
  const [searchinput, setSearchinput] = useState("");
  const [totalDeliveries, setTotalDeliveries] = useState(0);
  const [isDemoLoading, setIsDemoLoading] = useState(false);

  useEffect(() => {
    handlePending();
  }, []);

  useEffect(() => {
    if (results != undefined) {
      const finalResults = results.filter((result: any) => {
        return (
          result?.name?.toLowerCase().indexOf(searchinput.toLowerCase()) !== -1
        );
      });
      setResults(finalResults);
      setTotalDeliveries(finalResults.length);
    }

    if (!searchinput) {
      setResults(demoDeliveries);
      setTotalDeliveries(demoDeliveries.length);
    }
  }, [searchinput]);

  const context = useContext(UserContext);
  const {
    demoDeliveries,
    results,
    setResults,
    getDemoDeliveries,
    getCompletedDeliveries,
    setShowCompleted,
  } = context as UserContextType;

  useEffect(() => {
    setTotalDeliveries(results.length);
  }, [results]);

  const handlePending = async () => {
    setIsFetchloading(true);
    const res = await getDemoDeliveries();
    setIsFetchloading(false);
    setShowCompleted(false);
  };

  const handleCompleted = async () => {
    setIsFetchloading(true);
    const res = await getCompletedDeliveries();
    setIsFetchloading(false);
    setShowCompleted(true);
  };


  return (
    <div className="flex h-[calc(100vh-65px)] bg-slate-50">
        <div className="ml-10 mt-4 pb-8">
          <div className="flex items-center">
            <input
              type="text"
              value={searchinput}
              onChange={(e) => setSearchinput(e.target.value)}
              placeholder="Search a Delivery Agent"
              className="p-2 border border-gray-200 rounded-lg outline-none w-[30%]"
            />

            <div className="flex gap-5 ml-12">
              <button
                onClick={handlePending}
                className="bg-red-400 items-center justify-center h-fit w-fit py-2 px-4 rounded-lg text-white flex gap-2"
              >
                Pending
              </button>

              <button
                onClick={handleCompleted}
                className="bg-green-400 items-center justify-center h-fit w-fit py-2 px-4 rounded-lg text-white flex gap-2"
              >
                Completed
              </button>
            </div>
          </div>

          <div className="flex justify-between w-1/2 items-center">
            <h1 className=" mt-6 text-3xl mb-5">
              Total Deliveries: {totalDeliveries}
            </h1>
        </div>
        <div className="flex-1 overflow-y-auto">
          {isFetchloading ? (
            <Loader2 className="animate-spin w-8 h-8" />
          ) : (
            <div className="flex w-full">
              <div className="flex flex-col gap-3 w-[50%]">
                {results.map((user: any) => {
                  return <DemoTiffinCard data={user} />;
                })}
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
  );
};

export default page;
