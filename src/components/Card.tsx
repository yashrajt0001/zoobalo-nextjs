"use client";

import UserContext, { UserContextType } from "@/contextApi/user/UserContext";
import { type } from "@prisma/client";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import React, {
  FC,
  FormEvent,
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
}) => {
  // const [show, setShow] = useState<null | boolean>(null);
  // const [loader, setLoader] = useState(false);
  // const [error, setError] = useState("");
  // const [name, setName] = useState<null | string>(null);
  // const [address, setAddress] = useState<null | string>(null);
  // const [mob, setMob] = useState<null | string>(null);
  // const [location, setLocation] = useState<null | string>(null);
  // const [balance, setBalance] = useState<null | string>(null);
  // const [type, setType] = useState<null | type>(null);

  // useEffect(() => {
  //   setName(_name);
  //   setLocation(_location ?? "");
  //   setMob(_mobile);
  //   setAddress(_address);
  //   setBalance(_balance);
  //   setType(_type);
  // });

  // const handleSubmit = async (e: FormEvent) => {
  //   console.log("called");
  //   e.preventDefault();
  // setShow(false);
  // try {
  //   setLoader(true);
  //   await axios.post(
  //     "/api/updateUser",
  //     {
  //       id: id,
  //       name,
  //       address,
  //       mobile: mob,
  //       balance: parseInt(balance!),
  //       location,
  //       type,
  //     },
  //     {
  //       headers: {
  //         "auth-token": localStorage.getItem("auth-token"),
  //       },
  //     }
  //   );
  // } catch (error: any) {
  //   setError(error.response.data);
  // } finally {
  //   setLoader(false);
  //   setShow(false);
  // }
  // };

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
