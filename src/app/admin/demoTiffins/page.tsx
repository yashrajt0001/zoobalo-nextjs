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

  // handles search functionality
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

  // get pending demo deliveries
  const handlePending = async () => {
    setIsFetchloading(true);
    const res = await getDemoDeliveries();
    setIsFetchloading(false);
    setShowCompleted(false);
  };

  // get completed demo deliveries
  const handleCompleted = async () => {
    setIsFetchloading(true);
    const res = await getCompletedDeliveries();
    setIsFetchloading(false);
    setShowCompleted(true);
  };

  // handles demo deliveries to a delivery voy
  const handleDemoDeliveryBoyAssign = () => {
    setIsDemoLoading(true);
    try {
      results.map(async (user: any) => {
        await axios.post(
          `${process.env.NEXT_PUBLIC_HOST}/userAgent/assign`,
          {
            userId: user.user.id,
            agentId: 1,
          },
          {
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
            },
          }
        );
      })
    }
    catch (error:any) {
      toast.error(error.response.data);
    }
    finally {
      setIsDemoLoading(false);
    }
};

  return (
    <div className="ml-10 mt-4 pb-8">
      <div className="flex items-center gap-2 mb-4 mt-4">
        <button
          onClick={handleDemoDeliveryBoyAssign}
          disabled={isDemoLoading}
          className={`items-center justify-center h-fit w-fit py-2 px-4 rounded-lg text-white flex gap-2 ${
            isDemoLoading ? "bg-[#949494]" : "bg-green-500"
          } `}
        >
          Assign Demo Delivery
          {isDemoLoading && <Loader2 className="animate-spin w-8 h-8 ml-3" />}
        </button>
      </div>
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
  );
};

export default page;
