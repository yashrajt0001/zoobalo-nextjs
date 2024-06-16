"use client";

import { ShowLogin } from "@/components/ShowLogin";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const page = () => {
  const [login, setLogin] = useState(true);
  const [kitchenDetails, setKitchenDetails] = useState({
    name: "",
    address: "",
  });
  const [kitchenHeadDetails, setKitchenHeadDetails] = useState({
    name: "",
    username: "",
    password: "",
    phone: "",
  });
  const [selectedCity, setSelectedCity] = useState(1);
  const [cities, setCities] = useState([]);
  const [kitchenLoader, setKitchenLoader] = useState(false);
  const [kitchenHeadLoader, setKitchenHeadLoader] = useState(false);
  const [kitchenHeadId, setKitchenHeadId] = useState("");
  const [kitchenId, setKitchenId] = useState("");
  const [kitchenHeadAssignLoader, setKitchenHeadAssignLoader] = useState(false);

  useEffect(() => {
    setLogin(!localStorage.getItem("auth-token"));
    async function getAllCities() {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/city/get`);
        setCities(res.data);
        setSelectedCity(res.data[0].id);
      } catch (error: any) {
        toast.error(error.response.data);
      }
    }
    getAllCities();
  }, []);

  const isLoggedIn = () => {
    setLogin(false);
  };

  const handleKitchenCreate = async () => {
    if (!kitchenDetails.name || !kitchenDetails.address) {
      return toast.error("Please enter details!");
    }

    try {
      setKitchenLoader(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/kitchen/create`,
        {
          name: kitchenDetails.name,
          cityId: selectedCity,
          address: kitchenDetails.address,
        },
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
    } catch (error: any) {
      toast.error(error.response.data);
    } finally {
      setKitchenLoader(false);
    }
  };

  const handleKitchenHeadCreate = async () => {
    if (
      !kitchenHeadDetails.name ||
      !kitchenHeadDetails.username ||
      !kitchenHeadDetails.password ||
      !kitchenHeadDetails.phone
    ) {
      return toast.error("Please enter details!");
    }

    try {
      setKitchenHeadLoader(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/kitchenHead/create`,
        {
          name: kitchenHeadDetails.name,
          username: kitchenHeadDetails.username,
          password: kitchenHeadDetails.password,
          phone: kitchenHeadDetails.phone,
        },
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
    } catch (error: any) {
      toast.error(error.response.data);
    } finally {
      setKitchenHeadLoader(false);
    }
  };

  const handleKitchenHeadAssign = async () => {
    if (!kitchenHeadId || !kitchenId) {
      return toast.error("Please enter details!");
    }

    try {
      setKitchenHeadAssignLoader(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/kitchenHead/assign`,
        {
          kitchenHeadId: parseInt(kitchenHeadId),
          kitchenId: parseInt(kitchenId),
        },
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
    } catch (error: any) {
      toast.error(error.response.data);
    } finally {
      setKitchenHeadAssignLoader(false);
    }
  };

  return (
    <div>
      {login ? (
        <ShowLogin isLoggedIn={isLoggedIn} />
      ) : (
        <div className="pb-8 min-h-full">
          <div className="flex mt-7">
            <div className="ml-12 flex flex-col gap-3 w-[43%]">
              <h1 className="text-3xl">Create Kitchen:</h1>
              <input
                type="text"
                name="name"
                value={kitchenDetails.name}
                onChange={(e) => {
                  setKitchenDetails({
                    ...kitchenDetails,
                    [e.target.name]: e.target.value,
                  });
                }}
                placeholder="Name"
                className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
              />
              <select
                onChange={(e) => setSelectedCity(parseInt(e.target.value))}
                value={selectedCity}
                className="py-5 px-4 rounded-md"
              >
                {cities.map((city: any) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                name="address"
                value={kitchenDetails.address}
                onChange={(e) => {
                  setKitchenDetails({
                    ...kitchenDetails,
                    [e.target.name]: e.target.value,
                  });
                }}
                placeholder="Address"
                className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
              />
              <button
                onClick={handleKitchenCreate}
                className="flex items-center px-6 py-2 rounded-lg text-xl text-white bg-green-500 w-fit"
              >
                {kitchenLoader && <Loader2 className=" animate-spin mr-2" />}{" "}
                Create
              </button>
            </div>
            <div className="ml-20 flex flex-col gap-3 w-[43%]">
              <h1 className="text-3xl">Create Kitchen Head:</h1>
              <input
                type="text"
                name="name"
                value={kitchenHeadDetails.name}
                onChange={(e) => {
                  setKitchenHeadDetails({
                    ...kitchenHeadDetails,
                    [e.target.name]: e.target.value,
                  });
                }}
                placeholder="Name"
                className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
              />
              <input
                type="text"
                name="username"
                value={kitchenHeadDetails.username}
                onChange={(e) => {
                  setKitchenHeadDetails({
                    ...kitchenHeadDetails,
                    [e.target.name]: e.target.value,
                  });
                }}
                placeholder="Username"
                className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
              />

              <input
                type="text"
                name="password"
                value={kitchenHeadDetails.password}
                onChange={(e) => {
                  setKitchenHeadDetails({
                    ...kitchenHeadDetails,
                    [e.target.name]: e.target.value,
                  });
                }}
                placeholder="Password"
                className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
              />
              <input
                type="tel"
                name="phone"
                value={kitchenHeadDetails.phone}
                onChange={(e) => {
                  setKitchenHeadDetails({
                    ...kitchenHeadDetails,
                    [e.target.name]: e.target.value,
                  });
                }}
                placeholder="Phone Number"
                className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
              />
              <button
                onClick={handleKitchenHeadCreate}
                className="flex items-center px-6 py-2 rounded-lg text-xl text-white bg-green-500 w-fit"
              >
                {kitchenHeadLoader && (
                  <Loader2 className=" animate-spin mr-2" />
                )}{" "}
                Create
              </button>
            </div>
          </div>

          <div className="flex mt-7">
            <div className="ml-12 flex flex-col gap-3 w-[43%]">
              <h1 className="text-3xl">Assign KitchenHead to Kitchen:</h1>
              <input
                type="number"
                name="kitchenHeadId"
                value={kitchenHeadId}
                onChange={(e) => {
                  setKitchenHeadId(e.target.value);
                }}
                placeholder="Kitchen Head ID"
                className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
              />
              <input
                type="number"
                name="kitchenId"
                value={kitchenId}
                onChange={(e) => {
                  setKitchenId(e.target.value);
                }}
                placeholder="Kitchen Id"
                className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
              />
              <button
                onClick={handleKitchenHeadAssign}
                className="flex items-center px-6 py-2 rounded-lg text-xl text-white bg-green-500 w-fit"
              >
                {kitchenHeadAssignLoader && (
                  <Loader2 className=" animate-spin mr-2" />
                )}{" "}
                Assign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
