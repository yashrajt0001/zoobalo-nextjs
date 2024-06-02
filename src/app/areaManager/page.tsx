"use client";

import { ShowLogin } from "@/components/ShowLogin";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";

const page = () => {
  const [login, setLogin] = useState(true);
  const [kitchenDetails, setKitchenDetails] = useState({
    name: "",
    address: ""
  });
  const [selectedCity, setSelectedCity] = useState(1);
  const [showError, setShowError] = useState<undefined | string>(undefined);
  const [cities, setCities] = useState([]);
  const [kitchenLoader, setKitchenLoader] = useState(false);

  useEffect(() => {
    setLogin(!localStorage.getItem("auth-token"));
    async function getAllCities() {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/city/get`);
        setCities(res.data);
        setSelectedCity(res.data[0].id);
      } catch (error: any) {
        console.log(error.response.data);
      }
    }
    getAllCities();
  }, []);

  const isLoggedIn = () => {
    setLogin(false);
  }; 

  const handleKitchenCreate = async () => {
    if (
      !kitchenDetails.name ||
      !kitchenDetails.address
    ) {
      return setShowError("Please enter details!");
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
      setShowError(error.response.data);
    } finally {
      setKitchenLoader(false);
    }
  };

  return (
    <div>
      {login ? (
        <ShowLogin isLoggedIn={isLoggedIn} />
      ) : (
        <div className="pb-8 min-h-full">
          <div className="ml-12 flex flex-col gap-3 w-[43%] mt-7">
            <h1 className="text-3xl">Create Kitchen:</h1>
            <input
              type="text"
              name="name"
              value={kitchenDetails.name}
              onChange={(e) => {
                setShowError(undefined);
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
                setShowError(undefined);
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
        </div>
      )}
    </div>
  );
};

export default page;
