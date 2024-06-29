"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { createErrorMessage } from "@/lib/utils";


interface PageInterface {
  params: {
    userId: number;
  };
}

const page = ({ params }: PageInterface) => {
  const searchParams = useSearchParams();
  const id = searchParams.get("userId");
  const name = searchParams.get("name");
  const mobile = searchParams.get("mobile");

  const [userDetails, setUserDetails] = useState({
    packageId: null as any,
    noOfDays: null as any,
    time: "MORNING",
    morningAddress: "",
    eveningAddress: "",
    altNo: "",
  });

  const [userloader, setUserloader] = useState(false);

  const handleAddSubscription = async () => {
    if (
      ((userDetails.time == "MORNING" || userDetails.time == "BOTH") &&
        !userDetails.morningAddress) ||
      ((userDetails.time == "EVENING" || userDetails.time == "BOTH") &&
        !userDetails.eveningAddress) ||
      !userDetails.noOfDays ||
      !userDetails.packageId ||
      userDetails.time == ""
    ) {
      toast.error("Please enter details!");
    }
    setUserloader(true);
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/admin/user/subscription`,
        {
          userId: parseInt(id as string),
          tiffinPackageId: parseInt(userDetails.packageId),
          days: parseInt(userDetails.noOfDays),
          tiffinTime: userDetails.time,
          morningAddress: userDetails.morningAddress,
          eveningAddress: userDetails.eveningAddress,
          alternateNumber: userDetails.altNo,
        },
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
    } catch (error: any) {
      toast.error(createErrorMessage(error));
    } finally {
      setUserloader(false);
    }

    setUserDetails({
      packageId: null,
      noOfDays: null,
      time: "MORNING",
      morningAddress: "",
      eveningAddress: "",
      altNo: "",
    });
  };

  return (
    <div className="pt-8 px-8 bg-[#F6F6F6] min-h-screen pb-8">
      <h1 className="text-3xl text-green-500">{name}</h1>
      <h1 className="text-2xl text-orange-500 mt-1">{mobile}</h1>
      <div className="flex flex-col gap-4 w-[40%]">
        <h1 className="text-3xl mt-5">Add Subscription:</h1>
        <input
          type="number"
          value={userDetails.packageId || ""}
          name="packageId"
          onChange={(e) => {
            setUserDetails({
              ...userDetails,
              [e.target.name]: e.target.value,
            });
          }}
          placeholder="Tiffin Package Id"
          className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
        />
        <input
          type="number"
          value={userDetails.noOfDays || ""}
          name="noOfDays"
          onChange={(e) => {
            setUserDetails({
              ...userDetails,
              [e.target.name]: e.target.value,
            });
          }}
          placeholder="No. of Days of Subscription"
          className="p-5 outline-none border-[2px] border-gray-200 rounded-lg"
        />
        <select
          name="time"
          id="time"
          className="p-5 w-full"
          value={userDetails.time}
          onChange={(e) => {
            setUserDetails({
              ...userDetails,
              [e.target.name]: e.target.value,
            });
          }}
        >
          <option value="MORNING">MORNING</option>
          <option value="EVENING">EVENING</option>
          <option value="BOTH">BOTH</option>
        </select>
        {(userDetails.time == "MORNING" || userDetails.time == "BOTH") && (
          <input
            type="text"
            value={userDetails.morningAddress || ""}
            name="morningAddress"
            onChange={(e) => {
              setUserDetails({
                ...userDetails,
                [e.target.name]: e.target.value,
              });
            }}
            placeholder="Morning Address of the User"
            className="p-5 outline-none border-[2px] border-gray-200 rounded-lg"
          />
        )}

        {(userDetails.time == "EVENING" || userDetails.time == "BOTH") && (
          <input
            type="text"
            value={userDetails.eveningAddress || ""}
            name="eveningAddress"
            onChange={(e) => {
              setUserDetails({
                ...userDetails,
                [e.target.name]: e.target.value,
              });
            }}
            placeholder="Evening Address of the User"
            className="p-5 outline-none border-[2px] border-gray-200 rounded-lg"
          />
        )}

        <input
          type="tel"
          value={userDetails.altNo || ""}
          name="altNo"
          maxLength={10}
          onChange={(e) => {
            setUserDetails({
              ...userDetails,
              [e.target.name]: e.target.value,
            });
          }}
          placeholder="Alternate Number"
          className="p-5 outline-none border-[2px] border-gray-200 rounded-lg"
        />
        <button
          onClick={handleAddSubscription}
          className="flex mt-8 items-center px-6 py-2 rounded-lg text-xl text-white bg-green-500 w-fit"
        >
          {userloader && <Loader2 className="animate-spin mr-2" />} Create
        </button>
      </div>
    </div>
  );
};

export default page;
