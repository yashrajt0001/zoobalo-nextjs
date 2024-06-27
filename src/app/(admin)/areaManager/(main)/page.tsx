"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useModal } from "@/hooks/use-modal-store";

const page = () => {
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
  const [kitchenHeadLoader, setKitchenHeadLoader] = useState(false);
  const [kitchenHeadId, setKitchenHeadId] = useState("");
  const [kitchenId, setKitchenId] = useState("");
  const [kitchenHeadAssignLoader, setKitchenHeadAssignLoader] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [kitchens, setKitchens] = useState([]);
  const [isFetchLoading, setIsFetchLoading] = useState(true);

  const { onOpen } = useModal();

  useEffect(() => {
    async function getKitchens() {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_HOST}/kitchen/get`,
          {
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
            },
          }
        );
        setKitchens(res.data);
      } catch (error: any) {
        toast.error(error.response.data);
      } finally {
        setIsFetchLoading(false);
      }
    }
    getKitchens();
  }, []);

  const handleKitchenCreate = async () => {
    if (!kitchenDetails.name || !kitchenDetails.address) {
      return toast.error("Please enter details!");
    }

    try {
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
    <div className="flex flex-col h-[calc(100vh-65px)]">
      <div className="flex sticky top-0 px-4 gap-12 border-b border-gray-300 ">
        <button
          className={`py-3 ${
            selectedTab == 0 ? "border-b-2 border-blue-400" : ""
          }`}
          onClick={() => setSelectedTab(0)}
        >
          <h1
            className={`text-xl ${
              selectedTab == 0 ? "text-blue-400" : "text-gray-400"
            }`}
          >
            Kitchens
          </h1>
        </button>
        <button
          className={`py-3 ${
            selectedTab == 1 ? "border-b-2 border-blue-400" : ""
          }`}
          onClick={() => setSelectedTab(1)}
        >
          <h1
            className={`text-xl ${
              selectedTab == 1 ? "text-blue-400" : "text-gray-400"
            }`}
          >
            Kitchen Head
          </h1>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {selectedTab == 0 && (
          <>
            <Button
              className="ml-8 mt-5"
              onClick={() => onOpen("createKitchen")}
            >
              Create
            </Button>
            <div className="flex text-2xl mb-2 w-full font-semibold mt-4">
              <h1 className="w-[32%] text-center">Name</h1>
              <h1 className="w-[32%] text-center">Address</h1>
              <h1 className="w-[28%] text-center">City</h1>
            </div>

            {isFetchLoading ? (
              <Loader2 className="animate-spin w-8 h-8" />
            ) : (
              <div className="text-2xl w-[100%] pr-[6%] ml-8">
                <div>
                  {kitchens.map((cities: any) => {
                    let city = cities.name;
                    return cities.kitchen.map((kitchen: any) => (
                      <div className="bg-white border-b-2 border-gray-200 flex text-2xl py-3 px-2">
                        <h1 className="w-[32%] text-center truncate">
                          {kitchen?.name}
                        </h1>
                        <h1 className="w-[32%] text-center truncate">
                          {kitchen?.address}
                        </h1>
                        <h1 className="w-[32%] text-center truncate">{city}</h1>
                        {/* <Popover>
                          <PopoverTrigger>
                            <Button variant="ghost">
                              <EllipsisIcon className="w-5 h-5" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="p-2">
                            <PopoverClose className="flex flex-col w-full items-center">
                              <Button
                                onClick={() => {
                                  onOpen("createKitchen");
                                }}
                                className="w-full flex justify-center"
                                variant="ghost"
                              >
                                Update
                              </Button>
                            </PopoverClose>
                          </PopoverContent>
                        </Popover> */}
                      </div>
                    ));
                  })}
                </div>
              </div>
            )}
          </>
        )}

        {selectedTab == 1 &&
          (isFetchLoading ? (
            <Loader2 className="animate-spin w-8 h-8" />
          ) : (
            <div className="text-2xl w-[100%] pr-[6%]">
              <div className="flex mb-2 w-full font-semibold">
                <h1 className="w-[22%] text-center">Name</h1>
                <h1 className="w-[22%] text-center">Phone</h1>
                <h1 className="w-[22%] text-center">Balance</h1>
                <h1 className="w-[22%] text-center">Tiffin Time</h1>
                {/* <h1 className="w-[20%] text-center"></h1> */}
              </div>
              <div className="w-[100%]">
                {kitchens.map((user: any) => {
                  return (
                    <>
                      <div className="bg-white border-b-2 border-gray-200 flex text-2xl py-3 px-2 relative">
                        {/* <h1 className="w-[22%] text-center truncate">
                            {user?.name}
                          </h1>
                          <h1 className="w-[22%] text-center truncate">
                            {user?.phone}
                          </h1>
                          <h1 className="w-[22%] text-center truncate">
                            {user?.balance?.toString()}
                          </h1>
                          <h1 className="w-[22%] text-center truncate">
                            {user?.order?.length > 1
                              ? "BOTH"
                              : user?.order[0]?.tiffinTime}
                          </h1>
                          <Popover>
                            <PopoverTrigger>
                              <Button variant="ghost">
                                <EllipsisIcon className="w-5 h-5" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="p-2">
                              <PopoverClose className="flex flex-col w-full items-center">
                                <Button
                                  onClick={() => {
                                    setUserName(user.name);
                                    setMorningAddress(user.morningAddress);
                                    setEveningAddress(user.eveningAddress);
                                    setMob(user.phone);
                                    setBalance(user.balance);
                                    setTiming(
                                      user.order.length > 1
                                        ? "BOTH"
                                        : user.order[0].tiffinTime
                                    );
                                    setDueTiffins(user.order[0].dueTiffin);
                                    onOpen("userUpdate");
                                  }}
                                  className="w-full flex justify-center"
                                  variant="ghost"
                                >
                                  Update
                                </Button>
                                <Lin
                                  href={`/admin/user?userId=${user.id}&name=${user.name}&mobile=${user.phone}`}
                                >
                                  <Button
                                    className="w-full flex justify-start"
                                    variant="ghost"
                                  >
                                    Tiffin history
                                  </Button>
                                </Link>
                                <Button
                                className="w-full flex justify-start"
                                variant="ghost"
                              >
                                Recharge history
                              </Button>
                              <Button
                                className="w-full flex justify-start"
                                variant="ghost"
                              >
                                Add subscription
                              </Button>
                              </PopoverClose>
                            </PopoverContent>
                          </Popover> */}
                      </div>
                    </>
                  );
                })}
              </div>

              {/* {userName != "" && (
              <div className="w-[40%] ml-12 -mt-14">
                
              </div>
            )} */}
            </div>
          ))}
      </div>
    </div>
  );
};

export default page;
