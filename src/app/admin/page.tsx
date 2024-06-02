"use client";

import React, { FormEvent, useEffect, useState, ChangeEvent } from "react";

import axios from "axios";
import { Loader2 } from "lucide-react";
import { ShowLogin } from "@/components/ShowLogin";

const page = () => {
  const [login, setLogin] = useState(true);
  const [timing, setTiming] = useState("MORNING");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedCity, setSelectedCity] = useState(1);
  const [kitchenLoader, setKitchenLoader] = useState(false);
  const [cities, setCities] = useState([]);

  const isLoggedIn = () => {
    setLogin(false);
  }

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

  const [showError, setShowError] = useState<undefined | string>(undefined);
  const [userDetails, setUserDetails] = useState({
    name: "",
    phone: "",
  });
  const [delBoyDetails, setDelBoyDetails] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [kitchenDetails, setKitchenDetails] = useState({
    name: "",
    address: ""
  });

  const [userloader, setUserloader] = useState(false);
  const [delBoyLoader, setDelBoyLoader] = useState(false);

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

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/queueDelivery/create`,
        {
          time: timing,
        },
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      console.log(data);
      setIsLoading(false);
    } catch (error: any) {
      setShowError(error.response.data);
    }
  };

  const handleCreate = async () => {
    if (!userDetails.name || !userDetails.phone) {
      return setShowError("Please enter details!");
    }
    setUserloader(true);
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/admin/user/create`,
        {
          name: userDetails.name,
          phone: userDetails.phone,
        },
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      console.log(data);
    } catch (error: any) {
      setShowError(error.response.data);
    } finally {
      setUserloader(false);
    }

    setUserDetails({
      name: "",
      phone: "",
    });
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      console.log("Please select a file");
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/admin/webBanner/upload`,
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      console.log("Image uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <>
      {login ? (
        <ShowLogin isLoggedIn={isLoggedIn} />
      ) : (
        <div className="pb-8 min-h-full">
          <div className="flex items-center">
            <h1 className="text-4xl mt-5 ml-12 text-[#FF5F1F]">
              Hi! <span className="text-green-500">Admin</span>{" "}
            </h1>

            <div className="ml-16 mt-5 flex">
              <select
                onChange={(e) => setTiming(e.target.value)}
                value={timing}
                className="py-2 px-4 text-center rounded-md"
              >
                <option value="MORNING">MORNING</option>
                <option value="EVENING">EVENING</option>
              </select>
              <button
                onClick={handleGenerate}
                disabled={isLoading}
                className={`flex items-center px-3 py-2 rounded-lg text-xl text-white ml-8 ${
                  isLoading ? "bg-[#949494]" : "bg-green-500"
                }`}
              >
                Generate
                {isLoading && <Loader2 className="animate-spin w-8 h-8 ml-3" />}
              </button>
            </div>
          </div>

          {showError && (
            <div className="text-red-500 ml-12 text-2xl mt-4">{showError}</div>
          )}
          <div className="flex mb-6">
            <div className="ml-16 flex flex-col gap-3 w-[40%]">
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
                className="p-5 outline-none border-[2px] border-gray-200 rounded-lg"
              />
              <input
                type="tel"
                value={userDetails.phone}
                name="phone"
                maxLength={10}
                onChange={(e) => {
                  setShowError(undefined);
                  setUserDetails({
                    ...userDetails,
                    [e.target.name]: e.target.value,
                  });
                }}
                placeholder="Phone Number"
                className="p-5 outline-none border-[2px] border-gray-200 rounded-lg"
              />
              <button
                onClick={handleCreate}
                className="flex mt-8 items-center px-6 py-2 rounded-lg text-xl text-white bg-green-500 w-fit"
              >
                {userloader && <Loader2 className="animate-spin mr-2" />} Create
              </button>
            </div>

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

          <div className="flex ml-16">
            <div className="flex flex-col gap-4 w-[40%]">
              <h1 className="text-3xl">Upload Image:</h1>
              <input type="file" onChange={handleFileChange} />
              <button
                className="bg-green-500 px-3 py-2 rounded-lg text-xl w-fit flex items-center text-white"
                onClick={handleUpload}
              >
                Upload Image
              </button>
            </div>

            <div className="ml-28 flex flex-col gap-3 w-[43%]">
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
                  <option key={city.id} value={city.id}>{city.name}</option>
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
        </div>
      )}
    </>
  );
};

export default page;
