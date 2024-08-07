"use client";

import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { createErrorMessage } from "@/lib/utils";


const page = () => {
  const [selectedKitchen, setSelectedKitchen] = useState(1);
  const [requests, setRequests] = useState([]);
  const [isFetchLoading, setIsFetchLoading] = useState(true);
  const [kitchens, setKitchens] = useState([]);
  const [loader, setLoader] = useState(false);
  const [searchinput, setSearchinput] = useState("");
  const [totalRequests, setTotalRequests] = useState(0);
  console.log(kitchens)

  useEffect(() => {
    async function getAllRequest() {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_HOST}/areaManager/get/users`,
          {
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
            },
          }
        );
        setRequests(res.data);
        setTotalRequests(res.data.length);
      } catch (error: any) {
        toast.error(createErrorMessage(error));
      } finally {
        setIsFetchLoading(false);
      }
    }
    getAllRequest();
    async function getAllKitchens() {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_HOST}/kitchen/get`,
          {
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
            },
          }
        );

        setKitchens(res.data);
      } catch (error: any) {
        toast.error(createErrorMessage(error));
      }
    }
    getAllKitchens();
  }, []);

  return (
    <div className="flex flex-col h-[calc(100vh-65px)]">
      <div className="ml-10 mt-4 pb-8">
        <div>
          <input
            type="text"
            value={searchinput}
            onChange={(e) => setSearchinput(e.target.value)}
            placeholder="Search a User"
            className="p-2 border border-gray-200 rounded-lg outline-none w-[25%]"
          />
        </div>

        <div>
          <h1 className="mt-6 text-3xl mb-5">
            Total Requests: {totalRequests}
          </h1>
        </div>

        <div className="flex-1 overflow-y-auto">
          {isFetchLoading ? (
            <Loader2 className="animate-spin w-8 h-8" />
          ) : (
            <div className="mt-6">
              {requests.map((user: any) => {
                return (
                  <div className="bg-blue-200 p-4 pt-2 rounded-xl box-border w-[40%]">
                    <h1 className="text-3xl">{user.name}</h1>
                    {user.morningAddress != null && (
                      <h1 className="text-lg mt-1">
                        Morning Address: {user.morningAddress}
                      </h1>
                    )}
                    {user.eveningAddress != null && (
                      <h1 className="text-lg mt-1">
                        Evening Address: {user.eveningAddress}
                      </h1>
                    )}
                    <h1 className="text-lg mt-1">Mob No: {user.phone}</h1>
                    <div className="flex mt-3 items-center">
                      <h1 className="text-xl">Assign Kitchen:</h1>
                      <select
                        onChange={(e) =>
                          setSelectedKitchen(parseInt(e.target.value))
                        }
                        value={selectedKitchen}
                        className="py-1 px-4 rounded-md text-black bg-white ml-3"
                      >
                        {kitchens.map((kitchen: any) => (
                          <option key={kitchen.id} value={kitchen.id}>
                            {kitchen.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex justify-end items-center">
                      <button
                        onClick={async () => {
                          setLoader(true);
                          try {
                            await axios.post(
                              `${process.env.NEXT_PUBLIC_HOST}/kitchen/assign`,
                              {
                                userId: user.id,
                                kitchenId: selectedKitchen,
                              },
                              {
                                headers: {
                                  "auth-token":
                                    localStorage.getItem("auth-token"),
                                },
                              }
                            );
                            toast.success("Assigned Kitchen Successfully");
                          } catch (error: any) {
                            toast.error(createErrorMessage(error));
                          } finally {
                            setLoader(false);
                          }
                          const updatedRequests = requests.filter(
                            (request: any) => request.id != user.id
                          );
                          setRequests(updatedRequests);
                        }}
                        className="flex items-center px-6 py-2 rounded-lg text-xl text-white bg-green-500 w-fit ml-3"
                      >
                        Done
                        {loader && <Loader2 className=" animate-spin mr-2" />}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
