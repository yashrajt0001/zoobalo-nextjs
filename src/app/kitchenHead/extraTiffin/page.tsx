"use client";

import ExtraTiffinCard from "@/components/ExtraTiffinCard";
import UserContext, { UserContextType } from "@/contextApi/user/UserContext";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useState, useEffect, useContext, FormEvent } from "react";

const page = () => {
  const [extraTiffinAddress, setExtraTiffinAddress] = useState("");
  const [extraTiffintiming, setExtraTiffinTiming] = useState("MORNING");
  const [search, setSearch] = useState("");
  const [kitchens, setKitchens] = useState([]);
  const [tiffinPackages, setTiffinPackages] = useState([]);
  const [tiffinPackageId, setTiffinPackageId] = useState(null);
  const [tiffinPackageName, setTiffinPackageName] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUsername, setSelectedUsername] = useState("");
  const [open, setOpen] = useState(false);
  const [openAgent, setOpenAgent] = useState(false);
  const [openTiffinPackage, setOpenTiffinPackage] = useState(false);
  const [selectedAgentName, setSelectedAgentName] = useState("");
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [users, setUsers] = useState([]);
  const [extraTiffinLoader, setExtraTiffinLoader] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isFetchloading, setIsFetchloading] = useState(true);
  const [searchinput, setSearchinput] = useState("");
  const [totalDeliveries, setTotalDeliveries] = useState(0);

  useEffect(() => {
    handlePending();
  }, []);

  const getUsers = async (e: any) => {
    try {
      setSearch(e.target.value);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_HOST}/extraTiffin/users?search=${e.target.value}`,
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      setUsers(res.data);
      console.log(res.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  const getAgents = async (e: any) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_HOST}/extraTiffin/agents?search=${search}`,
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      setKitchens(res.data);
      console.log(res.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function getTiffinPackages() {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_HOST}/extraTiffin/tiffinPackages`,
          {
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
            },
          }
        );
        setTiffinPackages(res.data);
        console.log(res.data);
      } catch (error: any) {
        console.log(error);
      }
    }
    getTiffinPackages();

    async function getUser() {
      try {
        console.log(search);
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_HOST}/extraTiffin/users?search=${search}`,
          {
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
            },
          }
        );
        setUsers(res.data);
        console.log(res.data);
      } catch (error: any) {
        console.log(error);
      }
    }
    getUser();

    async function getAgents() {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_HOST}/extraTiffin/agents?search=${search}`,
          {
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
            },
          }
        );
        setKitchens(res.data.AssignedKitchenHead);
        console.log(res.data);
      } catch (error: any) {
        console.log(error);
      }
    }
    getAgents();
  }, []);

  const handleExtraTiffinCreate = async () => {
    setExtraTiffinLoader(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/extraTiffin/create`,
        {
          userId: selectedUserId,
          name,
          phone,
          agentId: selectedAgent,
          tiffinPackageId,
          address: extraTiffinAddress,
          tiffinTime: extraTiffintiming,
        },
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
    } catch (error: any) {
      console.log(error);
    } finally {
      setExtraTiffinLoader(false);
    }
  };

  useEffect(() => {
    if (results != undefined) {
      const finalResults = results.filter((result: any) => {
        return (
          result?.name?.toLowerCase().indexOf(searchinput.toLowerCase()) !== -1
        );
      });
      setResults(finalResults);
      setTotalDeliveries(finalResults.length);
    }

    if (!searchinput) {
      setResults(extraTiffinDeliveries);
      setTotalDeliveries(extraTiffinDeliveries.length);
    }
  }, [searchinput]);

  const context = useContext(UserContext);
  const {
    extraTiffinDeliveries,
    results,
    setResults,
    getExtraTiffinDeliveries,
    getCompletedExtraTiffinDeliveries,
    setShowCompleted,
  } = context as UserContextType;

  useEffect(() => {
    setTotalDeliveries(results?.length);
  }, [results]);

  const handlePending = async () => {
    setIsFetchloading(true);
    const res = await getExtraTiffinDeliveries();
    setIsFetchloading(false);
    setShowCompleted(false);
  };
  const handleCompleted = async () => {
    setIsFetchloading(true);
    const res = await getCompletedExtraTiffinDeliveries();
    setIsFetchloading(false);
    setShowCompleted(true);
  };

  return (
    <>
      <div className="ml-10 mt-4 pb-8">
        <div className="flex">
          <div className="w-[40%]">
            <h1 className="text-3xl mt-4">Create Extra Tiffin:</h1>
            <div className="flex flex-col">
              <div className="relative">
                <button
                  onClick={() => setOpen(true)}
                  className="mt-5 w-full border border-gray-200 p-3"
                >
                  {!selectedUserId ? (
                    <h1 className="text-xl">Select User</h1>
                  ) : (
                    <h1 className="text-xl">{selectedUsername}</h1>
                  )}
                </button>
                {open && (
                  <div className="p-2 w-full absolute bg-gray-100 border-4 border-gray-200 border-t-none flex flex-col rounded-lg rounded-t-none z-20">
                    <input
                      type="text"
                      placeholder="Search User"
                      value={search}
                      onChange={getUsers}
                      className="rounded-xl p-2"
                    />
                    {users.map((user: any) => {
                      return (
                        <button
                          className="border-b mb-1 text-lg"
                          onClick={() => {
                            setSelectedUsername(user.name);
                            setSelectedUserId(user.id);
                            setOpen(false);
                          }}
                        >
                          {user.name}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  onClick={() => setOpenAgent(true)}
                  className="mt-5 w-full border border-gray-200 p-3"
                >
                  {!selectedAgent ? (
                    <h1 className="text-xl">Select Agent</h1>
                  ) : (
                    <h1 className="text-xl">{selectedAgentName}</h1>
                  )}
                </button>
                {openAgent && (
                  <div className="p-2 w-full absolute bg-gray-100 border-4 border-gray-200 border-t-none flex flex-col rounded-lg rounded-t-none z-20">
                    <input
                      type="text"
                      placeholder="Search User"
                      value={search}
                      onChange={getAgents}
                      className="rounded-xl p-2"
                    />
                    {kitchens.map((kitchen: any) => (
                      <div>
                        <h1 className="text-xl mt-2 ml-1">
                          {kitchen.kitchen.name} :
                        </h1>
                        {kitchen.kitchen.Agent.map((agent: any) => (
                          <button
                            className="border-b mb-1 text-lg text-center w-full"
                            onClick={() => {
                              setSelectedAgentName(agent.name);
                              setSelectedAgent(agent.id);
                              setOpenAgent(false);
                            }}
                          >
                            {agent.name}
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  onClick={() => setOpenTiffinPackage(true)}
                  className="mt-5 w-full border border-gray-200 p-3"
                >
                  {!tiffinPackageId ? (
                    <h1 className="text-xl">Select Tiffin Package</h1>
                  ) : (
                    <h1 className="text-xl">{tiffinPackageName}</h1>
                  )}
                </button>
                {openTiffinPackage && (
                  <div className="p-2 w-full absolute bg-gray-100 border-4 border-gray-200 border-t-none flex flex-col rounded-lg rounded-t-none z-20">
                    {tiffinPackages.map((tiffinPackage: any) => {
                      return (
                        <button
                          className="border-b mb-1 text-lg"
                          onClick={() => {
                            setTiffinPackageName(tiffinPackage.name);
                            setTiffinPackageId(tiffinPackage.id);
                            setOpenTiffinPackage(false);
                          }}
                        >
                          {tiffinPackage.name}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
              <select
                onChange={(e) => {
                  setExtraTiffinTiming(e.target.value);
                }}
                name="timing"
                id="timing"
                className="p-5 mt-4 bg-white border-gray-200 border"
                value={extraTiffintiming}
              >
                <option value="MORNING">MORNING</option>
                <option value="EVENING">EVENING</option>
                <option value="BOTH">BOTH</option>
              </select>

              <input
                type="text"
                placeholder="Address"
                className="px-5 py-4 outline-none border-[2px] border-gray-200 rounded-lg mt-6"
                value={extraTiffinAddress}
                onChange={(e) => setExtraTiffinAddress(e.target.value)}
              />

              <input
                type="text"
                placeholder="Name"
                className="px-5 py-4 outline-none border-[2px] border-gray-200 rounded-lg mt-6"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                type="tel"
                placeholder="Phone"
                className="px-5 py-4 outline-none border-[2px] border-gray-200 rounded-lg mt-6"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="flex justify-end items-center">
              <button
                onClick={handleExtraTiffinCreate}
                className="flex items-center px-6 py-2 rounded-lg text-xl text-white bg-green-500 w-fit mt-4"
              >
                {extraTiffinLoader && (
                  <Loader2 className=" animate-spin mr-2" />
                )}{" "}
                Create
              </button>
            </div>
          </div>
          <div className="ml-20 w-[50%]">
            <div className="flex items-center">
              <input
                type="text"
                value={searchinput}
                onChange={(e) => setSearchinput(e.target.value)}
                placeholder="Search a Delivery Agent"
                className="p-2 border border-gray-200 rounded-lg outline-none w-[30%]"
              />

              <div className="flex gap-5 ml-12">
                <button
                  onClick={handlePending}
                  className="bg-red-400 items-center justify-center h-fit w-fit py-2 px-4 rounded-lg text-white flex gap-2"
                >
                  Pending
                </button>

                <button
                  onClick={handleCompleted}
                  className="bg-green-400 items-center justify-center h-fit w-fit py-2 px-4 rounded-lg text-white flex gap-2"
                >
                  Completed
                </button>
              </div>
            </div>

            <div className="flex justify-between w-1/2 items-center">
              <h1 className=" mt-6 text-3xl mb-5">
                Total Deliveries: {totalDeliveries}
              </h1>
            </div>
            {isFetchloading ? (
              <Loader2 className="animate-spin w-8 h-8" />
            ) : (
              <div className="flex w-full">
                <div className="flex flex-col gap-3 w-full">
                  {results?.map((user: any) => {
                    return <ExtraTiffinCard data={user} />;
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
