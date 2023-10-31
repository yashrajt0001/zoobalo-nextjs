"use client";

import { type } from "@prisma/client";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import React, { FC, FormEvent, useState } from "react";

interface userInterface {
  user: {
    id: string;
    name: string;
    mobile: string;
    address: string;
    balance: number;
    location: string;
    type: type
  };
}

export const Card: FC<userInterface> = ({ user }) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState(user.name);
  const [address, setAddress] = useState(user.address);
  const [mob, setMob] = useState(user.mobile);
  const [location, setLocation] = useState(user.location);
  const [balance, setBalance] = useState(user.balance.toString());
  const [type, setType] = useState(user.type) 
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoader(true);
      await axios.post(
        "/api/updateUser",
        {
          id: user.id,
          name,
          address,
          mobile: mob,
          balance: parseInt(balance),
          location,
          type
        },
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
    } catch (error: any) {
      setError(error.response.data);
    } finally {
      setLoader(false);
      setShow(false);
    }
  };

  return (
    <div className="flex">
      <div className="w-[50%] p-6 bg-lime-200 rounded-xl h-[40%]">
        <h1 className="mt-2 text-2xl font-bold">{user.name}</h1>
        <h1 className="mt-2 text-lg">{user.address}</h1>
        <h1 className="mt-2">
          Mob No: <span className="ml-2">{user.mobile}</span>{" "}
        </h1>
        <div className="mt-5 flex gap-4 items-center">
          <button
            onClick={() => setShow(true)}
            className="p-3 bg-white font-bold rounded-xl"
          >
            Update
          </button>
          <Link
            href={`/admin/user?userId=${user.id}&name=${user.name}&mobile=${user.mobile}`}
          >
            <button className="p-3 bg-white font-bold rounded-xl">
              Show History
            </button>
          </Link>
          <button className="py-[0.6rem] px-3 bg-white font-bold rounded-xl w-[30%] flex gap-3 items-center">
            Set Priority
            <input
              data-userid={user.id}
              type="text"
              className="priority-input w-[25%] border-[2px] text-center outline-none"
            />
          </button>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className={`${show ? "ml-32 flex flex-col gap-3" : "hidden"}`}
      >
        <h1 className="text-3xl mt-5">Update:</h1>
        {error && <div className="text-red-500">{error}</div>}
        <input
          type="text"
          placeholder="Name"
          className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Phone Number"
          className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
          value={mob}
          onChange={(e) => setMob(e.target.value)}
        />
        <input
          type="number"
          placeholder="User's Balance"
          className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <div className="border-2 pr-4 border-gray-200 rounded-lg flex">
          <select
            onChange={(e) => {
              setType(e.target.value as type)
            }}
            name="type"
            id="type"
            className="p-5 w-full"
            value={type}
          >
            <option value="morning">morning</option>
            <option value="evening">evening</option>
            <option value="both">both</option>
          </select>
        </div>
        <button
          type="submit"
          className="px-4 py-2 flex items-center rounded-lg text-xl text-white bg-green-500 w-fit"
        >
          {loader && <Loader2 className="animate-spin mr-2" />}Update
        </button>
      </form>
    </div>
  );
};
