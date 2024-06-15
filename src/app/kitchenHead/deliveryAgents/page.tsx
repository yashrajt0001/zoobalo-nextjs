"use client";

import { DeliveryAgentCard } from "@/components/DeliveryAgentCard";
import UserContext, { UserContextType } from "@/contextApi/user/UserContext";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useState, useEffect, useContext } from "react";

const page = () => {
  const [deliveryAgents, setDeliveryAgents] = useState([]);
  const [isFetchloading, setIsFetchloading] = useState(true);
  const [searchinput, setSearchinput] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalDeliveryAgents, setTotalDeliveryAgents] = useState(0);


  const context = useContext(UserContext);
  const {
    deliveryAgentName,
    deliveryAgentMob,
    deliveryAgentParnterCode,
    setDeliveryAgentName,
    setDeliveryAgentMob,
    setDeliveryAgentPartnerCode,
    deliveryAgentId,
    setDeliveryAgentId
  } = context as UserContextType;

  useEffect(() => {
    const getDeliveryAgents = async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_HOST}/agent/get`,
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      setIsFetchloading(false);
      console.log(data);
      setResults(data);
      setTotalDeliveryAgents(data.length);
      setDeliveryAgents(data);
    };
    getDeliveryAgents();
  }, []);

  useEffect(() => {
    if (results != undefined) {
      const finalResults = results.filter((result: any) => {
        return (
          result.name.toLowerCase().indexOf(searchinput.toLowerCase()) !== -1
        );
      });
      setResults(finalResults);
      setTotalDeliveryAgents(finalResults.length);
    }

    if (!searchinput) {
      setResults(deliveryAgents);
      setTotalDeliveryAgents(deliveryAgents.length);
    }
  }, [searchinput]);

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/kitchenHead/agent/update`,
        {
          name: deliveryAgentName,
          phone: deliveryAgentMob,
          partnerCode: deliveryAgentParnterCode,
          agentId: deliveryAgentId,
        },
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      setDeliveryAgentId(0);
      setDeliveryAgentName("");
      setDeliveryAgentMob("");
      setDeliveryAgentPartnerCode("");
    } catch (error: any) {
      console.log(error.response.data);
    }
    finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="ml-10 mt-4 pb-8">
        <div className="flex items-center">
          <input
            type="text"
            value={searchinput}
            onChange={(e) => setSearchinput(e.target.value)}
            placeholder="Search a Delivery Agent"
            className="p-2 border border-gray-200 rounded-lg outline-none w-[30%]"
          />
        </div>

        <div className="flex justify-between w-1/2 items-center">
          <h1 className=" mt-6 text-3xl mb-5">
            Total Delivery Agents: {totalDeliveryAgents}
          </h1>
        </div>
        {isFetchloading ? (
          <Loader2 className="animate-spin w-8 h-8" />
        ) : (
          <div className="flex w-full">
            <div className="flex flex-col gap-3 w-[50%]">
              {results.map((deliveryAgent:any) => {
                return (
                  <DeliveryAgentCard data={deliveryAgent} />
                );
              })}
            </div>

            {deliveryAgentName != "" && (
              <div className="w-[40%] ml-12 -mt-14">
                <div className="sticky top-24 z-10 bg-white flex flex-col gap-3">
                  <h1 className="text-3xl">Update:</h1>
                  <input
                    type="text"
                    placeholder="Name"
                    className="p-5 outline-none border-[2px] border-gray-200 rounded-lg"
                    value={deliveryAgentName!}
                    onChange={(e) => setDeliveryAgentName(e.target.value)}
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
                    value={deliveryAgentMob!}
                    onChange={(e) => setDeliveryAgentMob(e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Partner Code"
                    className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
                    value={deliveryAgentParnterCode!}
                    onChange={(e) =>
                      setDeliveryAgentPartnerCode(e.target.value)
                    }
                  />
                  <button
                    onClick={handleUpdate}
                    disabled={isLoading}
                    className={`px-4 py-2 flex items-center justify-center rounded-lg text-xl w-fit gap-2 ${
                      isLoading ? "bg-[#949494]" : "bg-green-500 text-white"
                    }`}
                  >
                    Update
                    {isLoading && (
                      <Loader2 className="animate-spin w-8 h-8 ml-3" />
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default page;
