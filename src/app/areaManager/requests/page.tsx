"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

const page = () => {
  const [searchinput, setSearchinput] = useState("");
  const [selectedKitchen, setSelectedKitchen] = useState(1);
  const [requests, setRequests] = useState([]);
  const [kitchens, setKitchens] = useState([]);

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
        console.log(res.data);
        setRequests(res.data);
      } catch (error: any) {
        console.log(error.response.data);
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
        console.log(res.data.kitchens);
        setKitchens(res.data.kitchens);
      } catch (error: any) {
        console.log(error.response.data);
      }
    }
    getAllKitchens();
  }, []);

  return (
    <div className="ml-10 mt-4 pb-8">
      {/* <div className="flex items-center">
        <input
          type="text"
          value={searchinput}
          onChange={(e) => setSearchinput(e.target.value)}
          placeholder="Search a User"
          className="p-2 border border-gray-200 rounded-lg outline-none w-[25%]"
        />
      </div> */}

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
                  onChange={(e) => setSelectedKitchen(parseInt(e.target.value))}
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
                    try {
                      await axios.post(
                        `${process.env.NEXT_PUBLIC_HOST}/kitchen/assign`,
                        {
                          userId: user.id,
                          kitchenId: selectedKitchen,
                        },
                        {
                          headers: {
                            "auth-token": localStorage.getItem("auth-token"),
                          },
                        }
                      );
                      console.log("assigned kitchen successfully");
                    } catch (error: any) {
                      console.log(error.response.data);
                    }
                    const updatedRequests = requests.filter(
                      (request: any) => request.id != user.id
                    );
                    setRequests(updatedRequests);
                  }}
                  className="rounded-lg bg-green-400 text-white py-1 px-6 text-xl ml-3"
                >
                  Done
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default page;
