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
  _morningAddress: string;
  _eveningAddress: string;
  _balance: string;
  _location: string;
  dueTiffin: number;
  _type: any;
  _isSubscribed: boolean;
  _isPaused: boolean;
  nextMeal: any;
  _order?: any;
  user: [];
}

export const Card: FC<userInterface> = ({
  id,
  _name,
  _mobile,
  _morningAddress,
  _eveningAddress,
  _balance,
  _type,
  dueTiffin,
  className,
  _isSubscribed,
  _isPaused,
  nextMeal,
  _order,
  user,
}) => {
  const [pausedDates, setPausedDates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [addOns, setAddOns] = useState([]);

  console.log("user: ", user);

  const cancelled = () => {
    if (_order && Array.isArray(_order) && _order.length > 0) {
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

  const checkForAddOns = () => {
    if (_isSubscribed) {
      if (_order?.length > 1) {
        let array = [] as any;
        _order[0].orderAddon.map((addon: any) => {
          array.push({ ...addon, timing: _order[0].tiffinTime });
        });
        _order[1].orderAddon.map((addon: any) => {
          array.push({ ...addon, timing: _order[1].tiffinTime });
        });
        setAddOns(array);
      } else {
        let array = [] as any;
        _order[0]?.orderAddon.map((addon: any) => {
          array.push({ ...addon, timing: _order[0].tiffinTime });
        });
        setAddOns(array);
      }
      return true;
    }
    return false;
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

  useEffect(() => {
    checkForAddOns();
  }, [_isSubscribed, _order]);

  const context = useContext(UserContext);
  const {
    setUserName,
    setMorningAddress,
    setMob,
    setBalance,
    setTiming,
    setUserDetails,
    setEveningAddress,
    setDueTiffins,
    setUserId,
  } = context as UserContextType;

  const handleUpdate = () => {
    setUserName(_name);
    setMorningAddress(_morningAddress);
    setEveningAddress(_eveningAddress);
    setMob(_mobile);
    setBalance(_balance);
    setTiming(_type);
    setUserId(id);
    setDueTiffins(dueTiffin);
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
        {(_type == "BOTH" || _type == "MORNING") && (
          <h1 className="mt-2 text-lg">Morning Address: {_morningAddress}</h1>
        )}
        {(_type == "BOTH" || _type == "EVENING") && (
          <h1 className="mt-2 text-lg">Evening Address: {_eveningAddress}</h1>
        )}
        <h1 className="mt-2 text-lg">Balance: {_balance}</h1>
        <h1 className="mt-2">
          Mob No: <span className="ml-2">{_mobile}</span>{" "}
        </h1>
        <h1 className="mt-2 text-lg">Tiffin Time: {_type?.length > 0 ? _type : "NA"}</h1>
        <h1 className="mt-2 text-lg">
          {cancelled() ? `Cancelled for: ${cancelled()}` : null}
        </h1>
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

        {addOns.length > 0 && (
          <div className="mt-2">
            <h1 className="text-lg">Add Ons:</h1>
            <div className="mt-1 pb-1">
              {addOns.map((item: any) => (
                <div className="flex items-center">
                  <h1 className="text-lg font-semibold">{item.addon.name}</h1>
                  <h1 className="ml-3 font-semibold">{item.quantity}</h1>
                </div>
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
              <button
                onClick={() => setUserDetails(user)}
                className="p-3 bg-white font-bold rounded-xl"
              >
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
