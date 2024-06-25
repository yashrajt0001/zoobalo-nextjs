"use client";

import { Card } from "@/components/Card";
import UserContext, { UserContextType } from "@/contextApi/user/UserContext";
import axios from "axios";
import { EllipsisIcon, Loader2 } from "lucide-react";
import React, { useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { PopoverClose } from "@radix-ui/react-popover";
import { useModal } from "@/hooks/use-modal-store";
import Link from "next/link";

const page = () => {
  const [users, setUsers] = useState([] as any);
  const [allUsers, setAllUsers] = useState([]);
  const [isFetchloading, setIsFetchloading] = useState(true);
  const [searchinput, setSearchinput] = useState("");
  const [results, setResults] = useState([]);
  const [showPending, setShowPending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [totalUsers, setTotalUsers] = useState(0);
  const [updateLoader, setUpdateLoader] = useState(false);
  const [tempResults, setTempResults] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [removeLoader, setRemoveLoader] = useState(0);

  const { onOpen } = useModal();

  const context = useContext(UserContext);
  const {
    userName,
    morningAddress,
    eveningAddress,
    dueTiffins,
    mob,
    balance,
    timing,
    setTiming,
    setUserName,
    setMorningAddress,
    setEveningAddress,
    setDueTiffins,
    setMob,
    setBalance,
    userId,
    setUserId,
    setUserDetails,
  } = context as UserContextType;

  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_HOST}/kitchenHead/users`,
          {
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
            },
          }
        );
        const res = data.AssignedKitchenHead[0].kitchen.UserDetails;
        setResults(res);
        setTempResults(res);
        setTotalUsers(res.length);
        setAllUsers(res);
      } catch (error: any) {
        toast.error(error.response.data);
      } finally {
        setIsFetchloading(false);
      }
    };
    getUsers();
  }, []);

  useEffect(() => {
    let finalResults = tempResults;

    if (searchinput) {
      finalResults = tempResults.filter((user: any) =>
        !showPending
          ? user.user.name.toLowerCase().includes(searchinput.toLowerCase())
          : user.user.name.toLowerCase().includes(searchinput.toLowerCase())
      );
    }
    setResults(finalResults);
    setTotalUsers(finalResults.length);
  }, [searchinput, tempResults]);

  const handleCancel = () => {
    setSelectedTab(2);
    setShowPending(false);
    const cancelledUsers = users.filter((user: any) => {
      for (const order of user.user.order) {
        if (order.NextMeal.isCancel) return true;
      }
    });
    setResults(cancelledUsers);
    setTempResults(cancelledUsers);
    setTotalUsers(cancelledUsers.length);
  };

  const handleAllUsers = () => {
    setSelectedTab(0);
    setShowPending(false);
    setResults(allUsers);
    setTempResults(allUsers);
    setTotalUsers(allUsers.length);
  };

  const handleSubscribe = () => {
    setSelectedTab(1);
    setShowPending(false);
    const subscribedUsers = allUsers.filter((user: any) => {
      return user.user.order.length > 0;
    });
    setResults(subscribedUsers);
    setTempResults(subscribedUsers);
    setTotalUsers(subscribedUsers.length);
  };

  const handlePaused = () => {
    setSelectedTab(3);
    setShowPending(false);
    const pausedUsers = users.filter((user: any) => {
      return user.user.order[0].NextMeal.isPause == true;
    });
    setResults(pausedUsers);
    setTempResults(pausedUsers);
    setTotalUsers(pausedUsers.length);
  };

  const handleUnsubscribed = () => {
    setSelectedTab(4);
    setShowPending(false);
    const unsubscribedUsers = allUsers.filter((user: any) => {
      return user.user.order.length == 0;
    });
    setResults(unsubscribedUsers);
    setTempResults(unsubscribedUsers);
    setTotalUsers(unsubscribedUsers.length);
  };

  const handlePendingDeliveries = async () => {
    setSelectedTab(5);
    setShowPending(true);
    setIsFetchloading(true);
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_HOST}/kitchenHead/queue`,
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      setResults(data);
      console.log("pending : ", data);
      setTempResults(data);
      setTotalUsers(data.length);
    } catch (error: any) {
      toast.error(error?.response?.data);
    } finally {
      setIsFetchloading(false);
    }
  };

  const handleLowBalance = async () => {
    setSelectedTab(6);
    setShowPending(false);
    const lowBalanceUser = users.filter((user: any) => {
      if (user.user.order[0].amount * 2 >= user.balance) return true;
    });

    setResults(lowBalanceUser);
    setTempResults(lowBalanceUser);
    setTotalUsers(lowBalanceUser.length);
  };

  const handleDeliveryBoyAssign = () => {
    setIsLoading(true);
    const subscribedUsers = allUsers.filter((user: any) => {
      return (
        user.order.length > 0 &&
        (user.order[0].status == true ||
          (user.order.length > 1 && user.order[1].status == true))
      );
    });
    try {
      subscribedUsers.map(async (user: any) => {
        await axios.post(
          `${process.env.NEXT_PUBLIC_HOST}/userAgent/assign`,
          {
            userId: user.id,
            agentId: 1,
          },
          {
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
            },
          }
        );
      });
    } catch (error: any) {
      toast.error(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async () => {
    setUpdateLoader(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/admin/user/update/${userId}`,
        {
          name: userName,
          phone: mob,
          morningAddress,
          eveningAddress,
          balance,
          dueTiffin: dueTiffins,
        },
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      console.log(res.data);
    } catch (error: any) {
      toast.error(error.response.data);
    } finally {
      setUpdateLoader(false);
    }
  };

  const handleAddOns = () => {
    setSelectedTab(7);
    setShowPending(false);
    const haveAddOn = users.filter((user: any) => {
      if (
        user.user.order[0].orderAddon.length > 0 ||
        (user.user.order.length > 1 && user.user.order[1].orderAddon.length > 0)
      )
        return true;
    });

    setResults(haveAddOn);
    setTempResults(haveAddOn);
    setTotalUsers(haveAddOn.length);
  };

  const handleAgentAssign = () => {
    setShowPending(false);
    const requestedUsers = allUsers.filter((user: any) => {
      return user.user.agentId == null;
    });
    setResults(requestedUsers);
    setTempResults(requestedUsers);
    setTotalUsers(requestedUsers.length);
  };

  return (
    <div className="flex h-[calc(100vh-65px)] bg-slate-50">
      <div className="flex-1 overflow-y-auto">
        <div className="flex sticky top-0 px-4 gap-12 border-b border-gray-300">
          <button
            className={`py-3 ${
              selectedTab == 0 ? "border-b-2 border-blue-400" : ""
            }`}
            onClick={handleAllUsers}
          >
            <h1
              className={`text-xl ${
                selectedTab == 0 ? "text-blue-400" : "text-gray-400"
              }`}
            >
              All Users
            </h1>
          </button>
          <button
            className={`py-3 ${
              selectedTab == 1 ? "border-b-2 border-blue-400" : ""
            }`}
            onClick={handleSubscribe}
          >
            <h1
              className={`text-xl ${
                selectedTab == 1 ? "text-blue-400" : "text-gray-400"
              }`}
            >
              Subscribed
            </h1>
          </button>
          <button
            className={`py-3 ${
              selectedTab == 2 ? "border-b-2 border-blue-400" : ""
            }`}
            onClick={handleCancel}
          >
            <h1
              className={`text-xl ${
                selectedTab == 2 ? "text-blue-400" : "text-gray-400"
              }`}
            >
              Cancelled
            </h1>
          </button>
          <button
            className={`py-3 ${
              selectedTab == 3 ? "border-b-2 border-blue-400" : ""
            }`}
            onClick={handlePaused}
          >
            <h1
              className={`text-xl ${
                selectedTab == 3 ? "text-blue-400" : "text-gray-400"
              }`}
            >
              Paused
            </h1>
          </button>

          <button
            className={`py-3 ${
              selectedTab == 4 ? "border-b-2 border-blue-400" : ""
            }`}
            onClick={handleUnsubscribed}
          >
            <h1
              className={`text-xl ${
                selectedTab == 4 ? "text-blue-400" : "text-gray-400"
              }`}
            >
              Unsubscribed
            </h1>
          </button>

          <button
            className={`py-3 ${
              selectedTab == 5 ? "border-b-2 border-blue-400" : ""
            }`}
            onClick={handlePendingDeliveries}
          >
            <h1
              className={`text-xl ${
                selectedTab == 5 ? "text-blue-400" : "text-gray-400"
              }`}
            >
              Pending
            </h1>
          </button>
          <button
            className={`py-3 ${
              selectedTab == 6 ? "border-b-2 border-blue-400" : ""
            }`}
            onClick={handleLowBalance}
          >
            <h1
              className={`text-xl ${
                selectedTab == 6 ? "text-blue-400" : "text-gray-400"
              }`}
            >
              Low Balance
            </h1>
          </button>
          <button
            className={`py-3 ${
              selectedTab == 7 ? "border-b-2 border-blue-400" : ""
            }`}
            onClick={handleAddOns}
          >
            <h1
              className={`text-xl ${
                selectedTab == 7 ? "text-blue-400" : "text-gray-400"
              }`}
            >
              Addons
            </h1>
          </button>
        </div>

        <div className="mt-6 ml-8">
          <input
            type="text"
            value={searchinput}
            onChange={(e) => setSearchinput(e.target.value)}
            placeholder="Search a User"
            className="p-2 border border-gray-200 rounded-lg outline-none w-[25%]"
          />

          <div className="flex justify-between w-1/2 items-center">
            <h1 className=" mt-6 text-3xl mb-5">Total Users: {totalUsers}</h1>
          </div>
          {isFetchloading ? (
            <Loader2 className="animate-spin w-8 h-8" />
          ) : !showPending ? (
            <div className="text-2xl w-[100%] pr-[6%]">
              <div className="flex mb-2 w-full font-semibold">
                <h1 className="w-[22%] text-center">Name</h1>
                <h1 className="w-[22%] text-center">Phone</h1>
                <h1 className="w-[22%] text-center">Balance</h1>
                <h1 className="w-[22%] text-center">Tiffin Time</h1>
                {/* <h1 className="w-[20%] text-center"></h1> */}
              </div>
              <div className="w-[100%]">
                {results.map((user: any) => {
                  return (
                    <>
                      <div className="bg-white border-b-2 border-gray-200 flex text-2xl py-3 px-2 relative">
                        <h1 className="w-[22%] text-center truncate">
                          {user?.user?.name}
                        </h1>
                        <h1 className="w-[22%] text-center truncate">
                          {user?.user?.phone}
                        </h1>
                        <h1 className="w-[22%] text-center truncate">
                          {user?.user?.balance?.toString()}
                        </h1>
                        <h1 className="w-[22%] text-center truncate">
                          {user?.user?.order?.length > 1
                            ? "BOTH"
                            : user?.user?.order[0]?.tiffinTime}
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
                                  setUserName(user.user.name);
                                  setMorningAddress(user.user.morningAddress);
                                  setEveningAddress(user.user.eveningAddress);
                                  setMob(user.user.phone);
                                  setBalance(user.user.balance);
                                  setTiming(
                                    user.user.order.length > 1
                                      ? "BOTH"
                                      : user.user.order[0].tiffinTime
                                  );
                                  setDueTiffins(user.user.order[0].dueTiffin);
                                  onOpen("userUpdate");
                                }}
                                className="w-full flex justify-center"
                                variant="ghost"
                              >
                                Update
                              </Button>
                              <Link
                                href={`/kitchenHead/user?userId=${user.user.id}&name=${user.user.name}&mobile=${user.user.phone}`}
                              >
                                <Button
                                  className="w-full flex justify-center"
                                  variant="ghost"
                                >
                                  Tiffin history
                                </Button>
                              </Link>
                              <Link
                                href={`/kitchenHead/user/recharges?userId=${user.user.id}&name=${user.user.name}&mobile=${user.user.phone}`}
                              >
                                <Button
                                  className="w-full flex justify-center"
                                  variant="ghost"
                                >
                                  Recharge history
                                </Button>
                              </Link>
                              {user.user.order.length > 0 && (
                                <>
                                  <Link
                                    href={`/kitchenHead/user/cancelPause?userId=${user.user.id}&name=${user.user.name}&mobile=${user.user.phone}`}
                                  >
                                    <Button
                                      onClick={() => setUserDetails(user.user)}
                                      className="w-full flex justify-center"
                                      variant="ghost"
                                    >
                                      Cancel / Pause
                                    </Button>
                                  </Link>

                                  <Button
                                    onClick={() => {
                                      setUserId(user.user.id);
                                      onOpen("userRecharge");
                                    }}
                                    className="w-full flex justify-center"
                                    variant="ghost"
                                  >
                                    Recharge
                                  </Button>
                                </>
                              )}
                              {user.agentId == null && (
                                <Button
                                  onClick={() => {
                                    setUserId(user.user.id);
                                    onOpen("assignAgent");
                                  }}
                                  className="w-full flex justify-center"
                                  variant="ghost"
                                >
                                  Assign
                                </Button>
                              )}
                            </PopoverClose>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          ) : (
            <>
              <div className="flex mb-2 w-full font-semibold text-2xl pr-[4%]">
                <h1 className="w-[26%] text-center">Name</h1>
                <h1 className="w-[26%] text-center">Phone</h1>
                <h1 className="w-[26%] text-center">Balance</h1>
                <h1 className="w-[18%] text-center"></h1>
              </div>
              <div className="flex flex-col pr-[4%]">
                {results.map((user: any) => {
                  return (
                    <>
                      <div className="bg-white border-b-2 border-gray-200 flex text-2xl py-3 px-2 relative">
                        <h1 className="w-[26%] text-center truncate">
                          {user?.user?.name}
                        </h1>
                        <h1 className="w-[26%] text-center truncate">
                          {user?.user?.phone}
                        </h1>
                        <h1 className="w-[26%] text-center truncate">
                          {user?.user?.balance?.toString()}
                        </h1>
                        <button
                          className="w-[18%] flex items-center justify-center text-red-500"
                          onClick={async () => {
                            setRemoveLoader(user.id);
                            try {
                              await axios.post(
                                `${process.env.NEXT_PUBLIC_HOST}/kitchenHead/queue/remove`,
                                {
                                  queueDeliveryId: user.id,
                                },
                                {
                                  headers: {
                                    "auth-token":
                                      localStorage.getItem("auth-token"),
                                  },
                                }
                              );
                              handlePendingDeliveries();
                            } catch (error: any) {
                              toast.error(error.response.data);
                            } finally {
                              setRemoveLoader(0);
                            }
                          }}
                        >
                          Remove
                          {removeLoader == user.id && (
                            <Loader2 className="animate-spin w-6 h-6 ml-3" />
                          )}
                        </button>
                      </div>
                    </>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
