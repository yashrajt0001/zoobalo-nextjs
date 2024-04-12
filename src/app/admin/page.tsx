"use client";

import React, { FormEvent, useEffect, useState } from "react";

import axios from "axios";
import { ShowLogin } from "../../components/ShowLogin";
import { Loader2 } from "lucide-react";

const page = () => {
  const [login, setLogin] = useState(true);
  const [timing, setTiming] = useState("MORNING");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setLogin(!localStorage.getItem("auth-token"));
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

  const [userloader, setUserloader] = useState(false);
  const [delBoyLoader, setDelBoyLoader] = useState(false);

  // const handleUserSubmit = async (e: FormEvent) => {
  //   e.preventDefault();
  //   if (
  //     !userDetails.name ||
  //     !userDetails.address ||
  //     !userDetails.phone ||
  //     userDetails.balance == undefined ||
  //     !userDetails.type
  //   ) {
  //     return setShowError("Please enter details!");
  //   }

  //   try {
  //     setUserloader(true);
  //     await axios.post(
  //       "/api/createUser",
  //       {
  //         name: userDetails.name,
  //         address: userDetails.address,
  //         mobile: userDetails.phone,
  //         balance: parseInt(userDetails.balance),
  //         location: userDetails.location,
  //         type: userDetails.type,
  //       },
  //       {
  //         headers: {
  //           "auth-token": localStorage.getItem("auth-token"),
  //         },
  //       }
  //     );
  //   } catch (error: any) {
  //     setShowError(error.response.data);
  //   } finally {
  //     setUserloader(false);
  //   }

  //   setUserDetails({
  //     name: "",
  //     address: "",
  //     balance: "",
  //     phone: "",
  //     location: "",
  //     type: "both",
  //   });
  // };

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

  return (
    <>
      {login ? (
        <ShowLogin setLogin={setLogin} />
      ) : (
        <div className="mb-10">
          <div className="flex items-center">
            <h1 className="text-4xl mt-5 ml-12 text-[#FF5F1F]">
              Hi! <span className="text-green-500">Admin</span>{" "}
            </h1>

            <div className="ml-16 mt-5 flex">
              <select
                onChange={(e) => setTiming(e.target.value)}
                value={timing}
                className="py-2 px-4 text-center"
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
          <div className="flex">
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
        </div>
      )}
    </>
  );
};

export default page;
