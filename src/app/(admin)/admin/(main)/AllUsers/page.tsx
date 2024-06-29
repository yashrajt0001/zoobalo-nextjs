"use client";

import { Card } from "@/components/Card";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import UserContext, { UserContextType } from "@/contextApi/user/UserContext";
import { PopoverClose } from "@radix-ui/react-popover";
import axios from "axios";
import {
  Ellipsis,
  EllipsisIcon,
  EllipsisVertical,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import { useModal } from "@/hooks/use-modal-store";
import { createErrorMessage } from "@/lib/utils";

const page = () => {
  const [users, setUsers] = useState([]); // conatins subscribed users
  const [allUsers, setAllUsers] = useState([]); // conatains all users
  const [isFetchloading, setIsFetchloading] = useState(true); // loading state shown before all users are displayed
  const [searchinput, setSearchinput] = useState(""); // state to handle search input text
  const [results, setResults] = useState([]); // array which is used to map all users and show them
  const [showPending, setShowPending] = useState(false); // state which determines the display of pending deliveries
  const [isLoading, setIsLoading] = useState(false); // loader when delivery boy is assigned
  const [totalUsers, setTotalUsers] = useState(0); // state that holds total user's number
  const [tempResults, setTempResults] = useState([]); // temp results stores all users which helps in searching user
  const [selectedTab, setSelectedTab] = useState(0);
  const [showDropDown, setShowDropDown] = useState(null);
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
    setUserName,
    setMorningAddress,
    setEveningAddress,
    setDueTiffins,
    setMob,
    setBalance,
    setTiming,
    userId,
  } = context as UserContextType;

  // get all users during mounting
  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_HOST}/admin/user/get`,
          {
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
            },
          }
        );
        setIsFetchloading(false);
        const subscribedUsers = data.filter((user: any) => {
          return user.order.length > 0;
        });
        setUsers(subscribedUsers);
        setResults(data);
        setTempResults(data);
        setTotalUsers(data.length);
        setAllUsers(data);
      } catch (error: any) {
        toast.error(createErrorMessage(error));
      }
    };
    getUsers();
  }, []);

  // handles search functionality
  useEffect(() => {
    let finalResults = tempResults;

    if (searchinput) {
      finalResults = tempResults.filter((user: any) =>
        !showPending
          ? user.name.toLowerCase().includes(searchinput.toLowerCase())
          : user.user.name.toLowerCase().includes(searchinput.toLowerCase())
      );
    }
    setResults(finalResults);
    setTotalUsers(finalResults.length);
  }, [searchinput, tempResults]);

  // shows users who have cancelled meal
  const handleCancel = () => {
    setSelectedTab(2);
    setShowPending(false);
    const cancelledUsers = users.filter((user: any) => {
      for (const order of user.order) {
        if (order.NextMeal.isCancel) return true;
      }
    });
    setResults(cancelledUsers);
    setTempResults(cancelledUsers);
    setTotalUsers(cancelledUsers.length);
  };

  // shows all users
  const handleAllUsers = () => {
    setSelectedTab(0);
    setShowPending(false);
    setResults(allUsers);
    setTempResults(allUsers);
    setTotalUsers(allUsers.length);
  };

  // show subscribed users
  const handleSubscribe = () => {
    setSelectedTab(1);
    setShowPending(false);
    const subscribedUsers = allUsers.filter((user: any) => {
      return user.order.length > 0;
    });
    setResults(subscribedUsers);
    setTempResults(subscribedUsers);
    setTotalUsers(subscribedUsers.length);
  };

  // shows users who have paused meal
  const handlePaused = () => {
    setSelectedTab(3);
    setShowPending(false);
    const pausedUsers = users.filter((user: any) => {
      return user.order[0].NextMeal.isPause == true;
    });
    setResults(pausedUsers);
    setTempResults(pausedUsers);
    setTotalUsers(pausedUsers.length);
  };

  // shows unsubscribed users
  const handleUnsubscribed = () => {
    setSelectedTab(4);
    setShowPending(false);
    const unsubscribedUsers = allUsers.filter((user: any) => {
      return user.order.length == 0;
    });
    setResults(unsubscribedUsers);
    setTempResults(unsubscribedUsers);
    setTotalUsers(unsubscribedUsers.length);
  };

  // shows pending deliveries or deliveries which are present in queue delivery
  const handlePendingDeliveries = async () => {
    setSelectedTab(5);
    setShowPending(true);
    setIsFetchloading(true);
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_HOST}/admin/deliveries/get`,
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      const res = data.filter((order: any) => {
        return order.isDelivered == false;
      });
      setResults(res);
      setTempResults(res);
      setTotalUsers(res.length);
    } catch (error: any) {
      toast.error(createErrorMessage(error));
    } finally {
      setIsFetchloading(false);
    }
  };

  // shows users with low balance
  const handleLowBalance = async () => {
    setSelectedTab(6);
    setShowPending(false);
    const lowBalanceUser = users.filter((user: any) => {
      if (user.order[0].amount * 2 >= user.balance) return true;
    });

    setResults(lowBalanceUser);
    setTempResults(lowBalanceUser);
    setTotalUsers(lowBalanceUser.length);
  };

  // assigns delivery boy to all subscribed users
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
      toast.error(createErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  // shows users who have addons
  const handleAddOns = () => {
    setSelectedTab(7);
    setShowPending(false);
    const haveAddOn = users.filter((user: any) => {
      if (
        user.order[0].orderAddon.length > 0 ||
        (user.order.length > 1 && user.order[1].orderAddon.length > 0)
      )
        return true;
    });

    setResults(haveAddOn);
    setTempResults(haveAddOn);
    setTotalUsers(haveAddOn.length);
  };

  return (
    <div className="flex h-[calc(100vh-65px)]">
      <div className="flex-1 overflow-y-auto">
        <div className="w-[100%] pb-8">
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

          <div className="bg-slate-50 pl-12 mt-6">
            <div>
              <input
                type="text"
                value={searchinput}
                onChange={(e) => setSearchinput(e.target.value)}
                placeholder="Search a User"
                className="p-2 border border-gray-200 rounded-lg outline-none w-[25%]"
              />
            </div>

            <div>
              <h1 className="mt-6 text-3xl mb-5">Total Users: {totalUsers}</h1>
            </div>
            {/* <div className="flex items-center gap-2">
          <button
            onClick={handleDeliveryBoyAssign}
            disabled={isLoading}
            className={`mt-4 items-center justify-center h-fit w-fit py-2 px-4 rounded-lg text-white flex gap-2 ${
              isLoading ? "bg-[#949494]" : "bg-orange-500"
            } `}
          >
            Assign Delivery
            {isLoading && <Loader2 className="animate-spin w-8 h-8 ml-3" />}
          </button>
        </div> */}
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
                              {/* <div className="font-semibold text-base mb-2">
                              Actions
                            </div>
                            <Separator/> */}
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
                                <Link
                                  href={`/admin/user?userId=${user.id}&name=${user.name}&mobile=${user.phone}`}
                                >
                                  <Button
                                    className="w-full flex justify-start"
                                    variant="ghost"
                                  >
                                    Tiffin history
                                  </Button>
                                </Link>
                                {/* <Button
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
                              </Button> */}
                              </PopoverClose>
                            </PopoverContent>
                          </Popover>
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
            ) : (
              <>
                <div className="flex mb-2 w-full font-semibold text-2xl pr-[4%]">
                  <h1 className="w-[24%] text-center">Name</h1>
                  <h1 className="w-[24%] text-center">Phone</h1>
                  <h1 className="w-[24%] text-center">Balance</h1>
                  <h1 className="w-[24%] text-center">Tiffin Time</h1>
                  {/* <h1 className="w-[20%] text-center"></h1> */}
                </div>
                <div className="flex flex-col pr-[4%]">
                  {results.map((user: any) => {
                    return (
                      <>
                        <div className="bg-white border-b-2 border-gray-200 flex text-2xl py-3 px-2 relative">
                          <h1 className="w-[24%] text-center truncate">
                            {user?.user?.name}
                          </h1>
                          <h1 className="w-[24%] text-center truncate">
                            {user?.user?.phone}
                          </h1>
                          <h1 className="w-[24%] text-center truncate">
                            {user?.user?.balance?.toString()}
                          </h1>
                          <h1 className="w-[24%] text-center truncate">
                            {user?.order?.length > 1
                              ? "BOTH"
                              : user?.order?.tiffinTime}
                          </h1>
                          {/* <button
                          className="w-[20%] flex items-center justify-center text-red-500"
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
                              toast.error(createErrorMessage(error));
                            } finally {
                              setRemoveLoader(0);
                            }
                          }}
                        >
                          Remove
                          {removeLoader == user.id && (
                            <Loader2 className="animate-spin w-6 h-6 ml-3" />
                          )}
                        </button> */}
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
    </div>
  );
};

export default page;
