"use client";

import React, { FormEvent, useEffect, useState } from "react";

import axios from "axios";
import { ShowLogin } from "../../components/ShowLogin";
import { Loader2 } from "lucide-react";

const page = () => {
  const [login, setLogin] = useState(true);

  useEffect(() => {
    setLogin(!localStorage.getItem("auth-token"));
  }, []);

  const [showError, setShowError] = useState<undefined | string>(undefined);
  const [userDetails, setUserDetails] = useState({
    name: "",
    address: "",
    phone: "",
    balance: "",
  });
  const [delBoyDetails, setDelBoyDetails] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [userloader, setUserloader] = useState(false);
  const [delBoyLoader, setDelBoyLoader] = useState(false);

  const handleUserSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (
      !userDetails.name ||
      !userDetails.address ||
      !userDetails.phone ||
      userDetails.balance == undefined
    ) {
      return setShowError("Please enter details!");
    }

    try {
      setUserloader(true);
      await axios.post(
        "/api/createUser",
        {
          name: userDetails.name,
          address: userDetails.address,
          mobile: userDetails.phone,
          balance: parseInt(userDetails.balance),
        },
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
    } catch (error: any) {
      setShowError(error.response.data);
    } finally {
      setUserloader(false);
    }

    setUserDetails({ name: "", address: "", balance: "", phone: "" });
  };

  const handleDelBoySubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (
      !delBoyDetails.name ||
      !delBoyDetails.email ||
      !delBoyDetails.password
    ) {
      return setShowError("Please enter details!");
    }

    try {
      setDelBoyLoader(true);
      await axios.post(
        "/api/createDelBoy",
        {
          name: delBoyDetails.name,
          email: delBoyDetails.email,
          password: delBoyDetails.password,
        },
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
    } catch (error: any) {
      setShowError(error.response.data);
    } finally {
      setDelBoyLoader(false);
    }
  };
  return (
    <>
      {login ? (
        <ShowLogin setLogin={setLogin} />
      ) : (
          <div className="mb-10">
          <h1 className="text-4xl mt-5 ml-12 text-[#FF5F1F]">
            Hi! <span className="text-green-500">Admin</span>{" "}
          </h1>
          {showError && (
            <div className="text-red-500 ml-12 text-2xl mt-4">{showError}</div>
          )}
          <div className="flex">
            <form
              onSubmit={handleUserSubmit}
              className="ml-16 flex flex-col gap-3 w-[40%]"
            >
              <h1 className="text-3xl mt-5">Create a User:</h1>
              <input
                type="text"
                value={userDetails.name}
                name="name"
                onChange={(e) => {
                  setShowError(undefined);
                  setUserDetails({
                    ...userDetails,
                    [e.target.name]: e.target.value,
                  });
                }}
                placeholder="Name"
                className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
              />
              <input
                type="text"
                value={userDetails.address}
                name="address"
                onChange={(e) => {
                  setShowError(undefined);
                  setUserDetails({
                    ...userDetails,
                    [e.target.name]: e.target.value,
                  });
                }}
                placeholder="Address"
                className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
              />
              <input
                type="tel"
                value={userDetails.phone}
                name="phone"
                onChange={(e) => {
                  setShowError(undefined);
                  setUserDetails({
                    ...userDetails,
                    [e.target.name]: e.target.value,
                  });
                }}
                placeholder="Phone Number"
                className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
              />
              <input
                type="number"
                value={userDetails.balance}
                name="balance"
                onChange={(e) => {
                  setShowError(undefined);
                  setUserDetails({
                    ...userDetails,
                    [e.target.name]: e.target.value,
                  });
                }}
                placeholder="User's Balance"
                className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
              />
              <button
                type="submit"
                className="flex items-center px-6 py-2 rounded-lg text-xl text-white bg-green-500 w-fit"
              >
                {userloader && <Loader2 className=" animate-spin mr-2" />}{" "}
                Create
              </button>
            </form>

            <form
              onSubmit={handleDelBoySubmit}
              className="ml-24 flex flex-col gap-3 w-[40%]"
            >
              <h1 className="text-3xl mt-5">Create a Delivery Boy Account:</h1>
              <input
                type="text"
                name="name"
                value={delBoyDetails.name}
                onChange={(e) => {
                  setShowError(undefined);
                  setDelBoyDetails({
                    ...delBoyDetails,
                    [e.target.name]: e.target.value,
                  });
                }}
                placeholder="Name"
                className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
              />
              <input
                type="email"
                name="email"
                value={delBoyDetails.email}
                onChange={(e) => {
                  setShowError(undefined);
                  setDelBoyDetails({
                    ...delBoyDetails,
                    [e.target.name]: e.target.value,
                  });
                }}
                placeholder="Email Address"
                className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
              />
              <input
                type="password"
                name="password"
                value={delBoyDetails.password}
                onChange={(e) => {
                  setShowError(undefined);
                  setDelBoyDetails({
                    ...delBoyDetails,
                    [e.target.name]: e.target.value,
                  });
                }}
                placeholder="Password"
                className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
              />
              <button
                type="submit"
                className="flex items-center px-6 py-2 rounded-lg text-xl text-white bg-green-500 w-fit"
              >
                {delBoyLoader && <Loader2 className=" animate-spin mr-2" />}{" "}
                Create
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default page;
