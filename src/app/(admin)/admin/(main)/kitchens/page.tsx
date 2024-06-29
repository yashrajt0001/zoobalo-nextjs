"use client";

import KitchenCard from "@/components/KitchenCard";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { createErrorMessage } from "@/lib/utils";


const page = () => {
  const [searchinput, setSearchinput] = useState("");
  const [isFetchloading, setIsFetchloading] = useState(false);
  const [kitchens, setKitchens] = useState([]);
  const [selectedCity, setSelectedCity] = useState(1);
  const [cities, setCities] = useState([]);

  // gets all cities
  useEffect(() => {
    async function getAllCities() {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/city/get`);
        setCities(res.data);
        setSelectedCity(res.data[0].id);
      } catch (error: any) {
        toast.error(createErrorMessage(error));
      }
    }
    getAllCities();
  });

  // gets all kitchens
  useEffect(() => {
    async function getAllKitchens() {
      setIsFetchloading(true);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_HOST}/kitchen/get?cityId=${selectedCity}`,
          {
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
            },
          }
        );
        setKitchens(res.data.kitchens);
      } catch (error: any) {
        toast.error(createErrorMessage(error));
      } finally {
        setIsFetchloading(false);
      }
    }
    getAllKitchens();
  }, [selectedCity]);

  return (
    <div className="ml-10 mt-4 pb-8">
      <div className="flex items-center">
        <input
          type="text"
          value={searchinput}
          onChange={(e) => setSearchinput(e.target.value)}
          placeholder="Search a Kitchen"
          className="p-2 border border-gray-200 rounded-lg outline-none w-[25%]"
        />

        <select
          onChange={(e) => setSelectedCity(parseInt(e.target.value))}
          value={selectedCity}
          className="py-2 px-4 rounded-md bg-green-400 text-white ml-6"
        >
          {cities.map((city: any) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>
      </div>

      {isFetchloading ? (
        <Loader2 className="animate-spin w-8 h-8" />
      ) : (
        <div className="flex flex-col gap-3 w-[40%] mt-8">
          {kitchens.map((kitchen: any) => (
            <KitchenCard data={kitchen} />
          ))}
        </div>
      )}
    </div>
  );
};

export default page;
