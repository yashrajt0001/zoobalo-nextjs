"use client";

import UserContext, { UserContextType } from "@/contextApi/user/UserContext";
import { type } from "@prisma/client";
import Link from "next/link";
import React, {
  FC,
  useState,
  useEffect,
  HTMLAttributes,
  useContext,
} from "react";

interface userInterface extends HTMLAttributes<HTMLDivElement> {
  id: string;
  _name: string;
  _mobile: string;
  _address: string;
  _balance: string;
  _location: string;
  _type: type;
  _isSubscribed: boolean;
  _isPaused: boolean;
}

export const Card: FC<userInterface> = ({
  id,
  _name,
  _mobile,
  _address,
  _balance,
  _location,
  _type,
  className,
  _isSubscribed,
  _isPaused,
}) => {
  const [pausedDates, setPausedDates] = useState([]);

  useEffect(() => {
    // async function getPausedDates {
    // const res = await axios.get(`${process.env.HOST}/user/detail`, {
    //   headers: {
    //     'auth-token': await localStorage.getItem('auth-token'),
    //   },
    // });
    // const pauseTime = res.data.user.order[0].NextMeal.PauseTime.map(
    //   (d: any) => {
    //     let day = moment(d.date).tz("Asia/Kolkata");
    //     const formattedDate = day.format();
    //     return formattedDate.split("T")[0];
    //   }
    // );
    // setPausedDates(pauseTime);
    // }
  }, []);

  const context = useContext(UserContext);
  const {
    location,
    setLocation,
    name,
    setName,
    address,
    setAddress,
    mob,
    setMob,
    balance,
    setBalance,
    timing,
    setTiming,
  } = context as UserContextType;

  const handleUpdate = () => {
    setName(_name);
    setAddress(_address);
    setMob(_mobile);
    setBalance(_balance);
    setTiming(_type);
  };

  return (
    <div className={className}>
      <div className="w-[100%] p-6 bg-lime-200 rounded-xl">
        <h1 className="mt-2 text-2xl font-bold">{_name}</h1>
        <h1 className="mt-2 text-lg">Address: {_address}</h1>
        <h1 className="mt-2 text-lg">Balance: {_balance}</h1>
        <h1 className="mt-2">
          Mob No: <span className="ml-2">{_mobile}</span>{" "}
        </h1>
        <h1 className="mt-2 text-lg">Tiffin Time: {_type}</h1>
        {_isPaused && (
          <div className="mt-2">
            <h1 className="text-lg">Paused Dates:</h1>
            <div className="h-12 overflow-y-auto mt-2">{}</div>
          </div>
        )}
        <div className="mt-5 flex gap-4 items-center">
          <button
            onClick={handleUpdate}
            className="p-3 bg-white font-bold rounded-xl"
          >
            Update
          </button>
          <Link
            href={`/admin/user?userId=${id}&name=${_name}&mobile=${_mobile}`}
          >
            <button className="p-3 bg-white font-bold rounded-xl">
              Show History
            </button>
          </Link>
          {!_isSubscribed && (
            <Link
              href={`/admin/user/subscription?userId=${id}&name=${_name}&mobile=${_mobile}`}
            >
              <button className="p-3 bg-white font-bold rounded-xl">
                Add Subscription
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
