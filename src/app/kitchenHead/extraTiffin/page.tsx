"use client";

import { Card } from "@/components/Card";
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
      console.log(error.response.data);
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
      console.log(error.response.data);
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
        console.log(error.response.data);
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
        console.log(error.response.data);
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
        console.log(error.response.data);
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
      console.log(error.response.data);
    }
    finally {
      setExtraTiffinLoader(false);
    }
  };

  return (
    <>
      <div className="ml-10 mt-4 pb-8">
        <h1 className="text-3xl mt-4">Create Extra Tiffin:</h1>
        <div className="flex flex-col">
          <div className="relative">
            <button
              onClick={() => setOpen(true)}
              className="w-[40%] mt-5 border border-gray-200 p-3"
            >
              {!selectedUserId ? (
                <h1 className="text-xl">Select User</h1>
              ) : (
                <h1 className="text-xl">{selectedUsername}</h1>
              )}
            </button>
            {open && (
              <div className="p-2 absolute bg-gray-100 border-4 w-[40%] border-gray-200 border-t-none flex flex-col rounded-lg rounded-t-none z-20">
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
              className="w-[40%] mt-5 border border-gray-200 p-3"
            >
              {!selectedAgent ? (
                <h1 className="text-xl">Select Agent</h1>
              ) : (
                <h1 className="text-xl">{selectedAgentName}</h1>
              )}
            </button>
            {openAgent && (
              <div className="p-2 absolute bg-gray-100 border-4 w-[40%] border-gray-200 border-t-none flex flex-col rounded-lg rounded-t-none z-20">
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
              className="w-[40%] mt-5 border border-gray-200 p-3"
            >
              {!tiffinPackageId ? (
                <h1 className="text-xl">Select Tiffin Package</h1>
              ) : (
                <h1 className="text-xl">{tiffinPackageName}</h1>
              )}
            </button>
            {openTiffinPackage && (
              <div className="p-2 absolute bg-gray-100 border-4 w-[40%] border-gray-200 border-t-none flex flex-col rounded-lg rounded-t-none z-20">
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
            className="p-5 w-[40%] mt-4 bg-white border-gray-200 border"
            value={extraTiffintiming}
          >
            <option value="MORNING">MORNING</option>
            <option value="EVENING">EVENING</option>
            <option value="BOTH">BOTH</option>
          </select>

          <input
            type="text"
            placeholder="Address"
            className="px-5 py-4 outline-none border-[2px] border-gray-200 rounded-lg w-[40%] mt-6"
            value={extraTiffinAddress}
            onChange={(e) => setExtraTiffinAddress(e.target.value)}
          />

          <input
            type="text"
            placeholder="Name"
            className="px-5 py-4 outline-none border-[2px] border-gray-200 rounded-lg w-[40%] mt-6"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="tel"
            placeholder="Phone"
            className="px-5 py-4 outline-none border-[2px] border-gray-200 rounded-lg w-[40%] mt-6"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="w-[40%] flex justify-end items-center">
          <button
            onClick={handleExtraTiffinCreate}
            className="flex items-center px-6 py-2 rounded-lg text-xl text-white bg-green-500 w-fit mt-4"
          >
            {extraTiffinLoader && <Loader2 className=" animate-spin mr-2" />}{" "}
            Create
          </button>
        </div>
      </div>
    </>
  );
};

export default page;
