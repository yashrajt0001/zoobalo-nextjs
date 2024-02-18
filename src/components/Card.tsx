"use client";

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
} from "react";

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
  className,
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
    setName(_name);
    setLocation(_location ?? "");
    setMob(_mobile);
    setAddress(_address);
    setBalance(_balance);
    setType(_type);
  });

  const handleSubmit = async (e: FormEvent) => {
    console.log("called");
    e.preventDefault();
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
  };

  return(
    <div className={className}>
      <div className="w-[100%] p-6 bg-lime-200 rounded-xl">
        <h1 className="mt-2 text-2xl font-bold">{name}</h1>
        <h1 className="mt-2 text-lg">Address: {address}</h1>
        <h1 className="mt-2 text-lg">Balance: {balance}</h1>
        <h1 className="mt-2">
          Mob No: <span className="ml-2">{mob}</span>{" "}
        </h1>
        <h1 className="mt-2 text-lg">Tiffin Time: {type}</h1>
        <div className="mt-5 flex gap-4 items-center">
          <button
            className="p-3 bg-white font-bold rounded-xl"
          >
            Update
          </button>
          <Link href={`/admin/user?userId=${id}&name=${name}&mobile=${mob}`}>
            <button className="p-3 bg-white font-bold rounded-xl">
              Show History
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
