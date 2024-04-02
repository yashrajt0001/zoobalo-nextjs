"use client";

import UserContext, { UserContextType } from "@/contextApi/user/UserContext";
import axios from "axios";
import { Loader2 } from "lucide-react";
import moment from "moment-timezone";
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
  _type: any;
  _isSubscribed: boolean;
  _isPaused: boolean;
  nextMeal: any;
  _order?: any;
  user:[]
}

export const Card: FC<userInterface> = ({
  id,
  _name,
  _mobile,
  _address,
  _balance,
  _type,
  className,
  _isSubscribed,
  _isPaused,
  nextMeal,
  _order,
  user
}) => {
  const [pausedDates, setPausedDates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const cancelled = () => {
    if (_order) {
      let time: null | string = null;
      _order.map((order: any) => {
        if (order.NextMeal.isCancel) {
          if (!time) {
            time = order.tiffinTime;
          } else {
            time = "Both time";
          }
        }
      });
      return time;
    }
  };

  useEffect(() => {
    async function getPausedDates() {
      if (nextMeal.PauseTime) {
        const pauseTime = nextMeal.PauseTime.map((d: any) => {
          let day = moment(d.date).tz("Asia/Kolkata");
          const formattedDate = day.format();
          return formattedDate.split("T")[0];
        });
        setPausedDates(pauseTime);
      }
    }
    getPausedDates();
  }, [nextMeal]);

  const context = useContext(UserContext);
  const {
    setName,
    setAddress,
    setMob,
    setBalance,
    setTiming,
    setUserDetails
  } = context as UserContextType;

  const handleUpdate = () => {
    setName(_name);
    setAddress(_address);
    setMob(_mobile);
    setBalance(_balance);
    setTiming(_type);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/admin/user/delete`,
        {
          userId: id,
        },
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
    } catch (error: any) {
      console.log(error.response.data);
    } finally {
      setIsLoading(false);
    }
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
        <h1 className="mt-2 text-lg">{cancelled() ? `Cancelled for: ${cancelled()}` : null}</h1>
        {_isPaused && (
          <div className="mt-2">
            <h1 className="text-lg">Paused Dates:</h1>
            <div className="h-12 overflow-y-auto mt-2 pb-1">
              {pausedDates.map((date: any) => (
                <h1 className="text-lg">{date}</h1>
              ))}
            </div>
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
          {_isSubscribed && (
            <Link
              href={`/admin/user/cancelPause?userId=${id}&name=${_name}&mobile=${_mobile}`}
            >
              <button onClick={() => setUserDetails(user)} className="p-3 bg-white font-bold rounded-xl">
                Cancel / Pause
              </button>
            </Link>
          )}
          {!_isSubscribed && (
            <Link
              href={`/admin/user/subscription?userId=${id}&name=${_name}&mobile=${_mobile}`}
            >
              <button className="p-3 bg-white font-bold rounded-xl">
                Add Subscription
              </button>
            </Link>
          )}
          {!_isSubscribed && (
            <button
              onClick={handleDelete}
              disabled={isLoading}
              className={`p-3 font-bold rounded-xl flex justify-center items-center gap-2 ${
                isLoading ? "bg-[#949494]" : "bg-red-400 text-white"
              }`}
            >
              Delete
              {isLoading && <Loader2 className="animate-spin w-8 h-8 ml-3" />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
