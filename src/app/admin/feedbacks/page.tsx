"use client";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";

const page = () => {
  const [isFetchloading, setIsFetchloading] = useState(false);
  const [results, setResults] = useState([]);

  return (
    <div className="pl-10 py-8 min-h-screen bg-[#F6F6F6]">
      <h1 className="text-3xl">Total Feedbacks:</h1>
      <div className="mt-6">
        {isFetchloading ? (
          <Loader2 className="animate-spin w-8 h-8" />
        ) : (
          <div className="flex w-full">
            <div className="flex flex-col gap-3 w-[50%]">
              <div className="bg-blue-200 p-4 rounded-xl">
                <h1 className="text-2xl">Rahul Chouhan</h1>
                <h1 className="text-lg mt-1">Rating: 5</h1>
                <h1 className="mt-2 text-lg">Review: jhsabdnmbnbnbsa</h1>
                <div className="flex w-full justify-end">
                  <button className="rounded-xl bg-white py-2 px-3 mt-4">
                    Send Response
                  </button>
                </div>
              </div>
            </div>

            {/* {name != "" && (
              <div className="w-[40%] ml-12 -mt-14">
                <div className="sticky top-24 z-10 bg-white flex flex-col gap-3">
                  <h1 className="text-3xl">Update:</h1>
                  <input
                    type="text"
                    placeholder="Name"
                    className="p-5 outline-none border-[2px] border-gray-200 rounded-lg"
                    value={name!}
                    // onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Address"
                    className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
                    value={address!}
                    // onChange={(e) => setAddress(e.target.value)}
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
                    value={mob!}
                    // onChange={(e) => setMob(e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="User's Balance"
                    className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
                    value={balance!}
                    // onChange={(e) => setBalance(e.target.value)}
                  />
                  <div className="border-2 pr-4 border-gray-200 rounded-lg flex">
                    <select
                      // onChange={(e) => {
                      //   setType(e.target.value as type);
                      // }}
                      name="type"
                      id="type"
                      className="p-5 w-full"
                      value={timing!}
                    >
                      <option value="MORNING">MORNING</option>
                      <option value="EVENING">EVENING</option>
                      <option value="BOTH">BOTH</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 flex items-center rounded-lg text-xl text-white bg-green-500 w-fit"
                  >
                    Update
                  </button>
                </div>
              </div>
            )} */}
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
