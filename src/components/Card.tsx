"use client";

import { type } from "@prisma/client";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import React, { FC, FormEvent, useState, useEffect, HTMLAttributes } from "react";

interface userInterface extends HTMLAttributes<HTMLDivElement> {
  id: string;
  _name: string;
  _mobile: string;
  _address: string;
  _balance: string;
  _location: string;
  _type: type;
}

export const Card: FC<userInterface> = ({
  id,
  _name,
  _mobile,
  _address,
  _balance,
  _location,
  _type,
  className
}) => {
  const [show, setShow] = useState<null | boolean>(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState<null | string>(null);
  const [address, setAddress] = useState<null | string>(null);
  const [mob, setMob] = useState<null | string>(null);
  const [location, setLocation] = useState<null | string>(null);
  const [balance, setBalance] = useState<null | string>(null);
  const [type, setType] = useState<null | type>(null);

  useEffect(() => {
    setName(_name)
    setLocation(_location ?? "")
    setMob(_mobile)
    setAddress(_address)
    setBalance(_balance)
    setType(_type)
  })
  
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoader(true);
      await axios.post(
        "/api/updateUser",
        {
          id: id,
          name,
          address,
          mobile: mob,
          balance: parseInt(balance!),
          location,
          type,
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
    <div className={className}>
      <div className="w-[50%] p-6 bg-lime-200 rounded-xl h-[40%]">
        <h1 className="mt-2 text-2xl font-bold">{name}</h1>
        <h1 className="mt-2 text-lg">{address}</h1>
        <h1 className="mt-2">
          Mob No: <span className="ml-2">{mob}</span>{" "}
        </h1>
        <div className="mt-5 flex gap-4 items-center">
          <button
            onClick={() => {
              setShow(true);
            }}
            className="p-3 bg-white font-bold rounded-xl"
          >
            Update
          </button>
          <Link href={`/admin/user?userId=${id}&name=${name}&mobile=${mob}`}>
            <button className="p-3 bg-white font-bold rounded-xl">
              Show History
            </button>
          </Link>
          <button className="py-[0.6rem] px-3 bg-white font-bold rounded-xl w-[30%] flex gap-3 items-center">
            Set Priority
            <input
              data-userid={id}
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
          value={name!}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
          value={address!}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Phone Number"
          className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
          value={mob!}
          onChange={(e) => setMob(e.target.value)}
        />
        <input
          type="number"
          placeholder="User's Balance"
          className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
          value={balance!}
          onChange={(e) => setBalance(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
          value={location!}
          onChange={(e) => setLocation(e.target.value)}
        />
        <div className="border-2 pr-4 border-gray-200 rounded-lg flex">
          <select
            onChange={(e) => {
              setType(e.target.value as type);
            }}
            name="type"
            id="type"
            className="p-5 w-full"
            value={type!}
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
