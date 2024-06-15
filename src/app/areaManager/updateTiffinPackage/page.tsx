"use client";

import { Card } from "@/components/Card";
import UserContext, { UserContextType } from "@/contextApi/user/UserContext";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useState, useEffect, useContext } from "react";

const page = () => {
  const [packages, setPackages] = useState([]);
  const [isFetchloading, setIsFetchloading] = useState(true);
  const [searchinput, setSearchinput] = useState("");
  const [results, setResults] = useState([]);
  const [totalPackages, setTotalPackages] = useState(0);
  const [updateLoader, setUpdateLoader] = useState(false);
  const [tempResults, setTempResults] = useState([]);
  const [showUpdateSecurityDeposit, setShowUpdateSecurityDeposit] =
    useState(false);
  const [securityDeposit, setSecurityDeposit] = useState(0);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(1);
  const [securityDepositLoader, setSecurityDepositLoader] = useState(false);

  const context = useContext(UserContext);
  const {
    tiffinPackageId,
    setTiffinPackageId,
    tiffinPackageName,
    setTiffinPackageName,
    packageContain,
    setPackageContain,
    price,
    setPrice,
  } = context as UserContextType;

  useEffect(() => {
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
    getPackages();
  }, []);

  const getPackages = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_HOST}/areaManager/tiffinPackage/get`,
      {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      }
    );
    setIsFetchloading(false);
    setPackages(data.AreaHeadCities[0].city.TiffinPackage);
    setResults(data.AreaHeadCities[0].city.TiffinPackage);
    setTempResults(data.AreaHeadCities[0].city.TiffinPackage);
    setTotalPackages(data.AreaHeadCities[0].city.TiffinPackage.length);
  };

  useEffect(() => {
    let finalResults = tempResults;

    if (searchinput) {
      finalResults = tempResults.filter((tiffinPackage: any) =>
        tiffinPackage.name.toLowerCase().includes(searchinput.toLowerCase())
      );
    }
    setResults(finalResults);
    setTotalPackages(finalResults.length);
  }, [searchinput, tempResults]);

  const handleUpdate = async () => {
    setUpdateLoader(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/areaManager/tiffinPackage/update`,
        {
          name: tiffinPackageName,
          packageContain,
          price,
          tiffinPackageId,
        },
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      console.log(res.data);
    } catch (error: any) {
      console.log(error.response.data);
    } finally {
      setUpdateLoader(false);
    }
  };

  const handleUpdateSecurityDeposit = () => {
    setShowUpdateSecurityDeposit(true);
  };

  const handleUpdatePackage = () => {
    setIsFetchloading(true);
    setShowUpdateSecurityDeposit(false);
    getPackages();
    setIsFetchloading(false);
  };

  const handleUpdateSecurityDepositCall = async () => {
    setSecurityDepositLoader(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/areaManager/securityDeposit/update`,
        {
          securityDeposit,
          cityId: selectedCity,
        },
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      console.log(res.data);
    } catch (error: any) {
      console.log(error.response.data);
    } finally {
      setSecurityDepositLoader(false);
    }
  };

  return (
    <div className="ml-10 mt-4 pb-8">
      <div className="flex items-center">
        <input
          type="text"
          value={searchinput}
          onChange={(e) => setSearchinput(e.target.value)}
          placeholder="Search a User"
          className="p-2 border border-gray-200 rounded-lg outline-none w-[25%]"
        />

        <div className="flex gap-2 ml-8">
          <button
            onClick={handleUpdatePackage}
            className="bg-red-400 items-center justify-center h-fit w-fit py-2 px-4 rounded-lg text-white flex gap-2"
          >
            Update Package
          </button>

          <button
            onClick={handleUpdateSecurityDeposit}
            className="bg-yellow-400 items-center justify-center h-fit w-fit py-2 px-4 rounded-lg text-white flex gap-2"
          >
            Update Security Deposit
          </button>
        </div>
      </div>

      {showUpdateSecurityDeposit ? (
        <div className="mt-6 flex flex-col w-[50%]">
          <h1 className="text-3xl mb-5">Update Security Deposit :</h1>

          <input
            type="number"
            placeholder="Security Deposit"
            className="px-5 py-4 outline-none border-[2px] border-gray-200 rounded-lg"
            value={securityDeposit}
            onChange={(e) => setSecurityDeposit(parseInt(e.target.value))}
          />

          <select
            onChange={(e) => setSelectedCity(parseInt(e.target.value))}
            value={selectedCity}
            className="py-5 px-4 rounded-md mt-4 bg-white border-[2px] border-gray-200"
          >
            {cities.map((city: any) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>

          <div className="flex justify-end mt-4">
            <button
              onClick={handleUpdateSecurityDepositCall}
              className="flex items-center px-6 py-2 rounded-lg text-xl text-white bg-green-500 w-fit"
            >
              {securityDepositLoader && (
                <Loader2 className=" animate-spin mr-2" />
              )}{" "}
              Update
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between w-1/2 items-center">
            <h1 className=" mt-6 text-3xl mb-5">
              Total Packages: {totalPackages}
            </h1>
          </div>

          {isFetchloading ? (
            <Loader2 className="animate-spin w-8 h-8" />
          ) : (
            <div className="flex w-full">
              <div className="flex flex-col gap-3 w-[50%]">
                {results.map((tiffinPackage: any) => {
                  return (
                    <div className="flex">
                      <div className="w-[100%] p-6 bg-lime-200 rounded-xl">
                        <h1 className="mt-2 text-2xl font-bold">
                          {tiffinPackage.name}
                        </h1>
                        <h1 className="mt-2 text-lg">
                          Package Contain: {tiffinPackage.packageContain}
                        </h1>
                        <h1 className="mt-2">
                          Price:{" "}
                          <span className="ml-2">{tiffinPackage.price}</span>{" "}
                        </h1>
                        <div className="mt-5 flex gap-4 items-center">
                          <button
                            onClick={() => {
                              setTiffinPackageName(tiffinPackage.name);
                              setPackageContain(tiffinPackage.packageContain);
                              setTiffinPackageId(tiffinPackage.id);
                              setPrice(tiffinPackage.price);
                            }}
                            className="p-3 bg-white font-bold rounded-xl"
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {tiffinPackageId != "" && (
                <div className="w-[40%] ml-12 -mt-14">
                  <div className="sticky top-24 z-10 bg-white flex flex-col gap-2">
                    <h1 className="text-3xl">Update:</h1>
                    <input
                      type="text"
                      placeholder="Package Name"
                      className="px-5 py-4 outline-none border-[2px] border-gray-200 rounded-lg"
                      value={tiffinPackageName}
                      onChange={(e) => setTiffinPackageName(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Package Contain"
                      className="px-5 py-4 outline-none border-[2px] border-gray-200 rounded-lg"
                      value={packageContain}
                      onChange={(e) => setPackageContain(e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Price"
                      className="px-5 py-4 outline-none border-[2px] border-gray-200 rounded-lg"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    <button
                      onClick={handleUpdate}
                      className={`px-4 py-2 flex items-center rounded-lg text-xl text-white bg-green-500 w-fit`}
                    >
                      Update{" "}
                      {updateLoader && (
                        <Loader2 className="animate-spin mr-2" />
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default page;
