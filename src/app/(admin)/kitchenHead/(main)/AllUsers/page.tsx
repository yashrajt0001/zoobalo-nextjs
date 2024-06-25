"use client";

import { Card } from "@/components/Card";
import UserContext, { UserContextType } from "@/contextApi/user/UserContext";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";

const page = () => {
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [isFetchloading, setIsFetchloading] = useState(true);
  const [searchinput, setSearchinput] = useState("");
  const [results, setResults] = useState([]);
  const [showPending, setShowPending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [totalUsers, setTotalUsers] = useState(0);
  const [updateLoader, setUpdateLoader] = useState(false);
  const [tempResults, setTempResults] = useState([]);

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
    userId
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
          ? user.name.toLowerCase().includes(searchinput.toLowerCase())
          : user.user.name.toLowerCase().includes(searchinput.toLowerCase())
      );
    }
    setResults(finalResults);
    setTotalUsers(finalResults.length);
  }, [searchinput, tempResults]);

  const handleCancel = () => {
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

  const handleAllUsers = () => {
    setShowPending(false);
    setResults(allUsers);
    setTempResults(allUsers);
    setTotalUsers(allUsers.length);
  };

  // const handleSubscribe = () => {
  //   setShowPending(false);
  //   const subscribedUsers = allUsers.filter((user: any) => {
  //     return user.order.length > 0;
  //   });
  //   setResults(subscribedUsers);
  //   setTempResults(subscribedUsers);
  //   setTotalUsers(subscribedUsers.length);
  // };

  const handlePaused = () => {
    setShowPending(false);
    const pausedUsers = users.filter((user: any) => {
      return user.order[0].NextMeal.isPause == true;
    });
    setResults(pausedUsers);
    setTempResults(pausedUsers);
    setTotalUsers(pausedUsers.length);
  };

  // const handleUnsubscribed = () => {
  //   setShowPending(false);
  //   const unsubscribedUsers = allUsers.filter((user: any) => {
  //     return user.order.length == 0;
  //   });
  //   setResults(unsubscribedUsers);
  //   setTempResults(unsubscribedUsers);
  //   setTotalUsers(unsubscribedUsers.length);
  // };

  const handlePendingDeliveries = async () => {
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
      console.log("pending : ",data);
      setTempResults(data);
      setTotalUsers(data.length);
    }
    catch (error: any) {
      toast.error(error?.response?.data);
    }
    finally {
      setIsFetchloading(false);
    }
  };

  const handleLowBalance = async () => {
    setShowPending(false);
    const lowBalanceUser = users.filter((user: any) => {
      if (user.order[0].amount * 2 >= user.balance) return true;
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

  const handleAgentAssign = () => {
    setShowPending(false);
    const requestedUsers = allUsers.filter((user: any) => {
      return user.agentId == null;
    });
    setResults(requestedUsers);
    setTempResults(requestedUsers);
    setTotalUsers(requestedUsers.length);
  };

  return (
    <>
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
              onClick={handleAllUsers}
              className="bg-orange-500 items-center justify-center h-fit w-fit py-2 px-4 rounded-lg text-white flex gap-2"
            >
              All Users
            </button>

            <button
              onClick={handleCancel}
              className="bg-red-400 items-center justify-center h-fit w-fit py-2 px-4 rounded-lg text-white flex gap-2"
            >
              Cancelled
            </button>

            <button
              onClick={handlePaused}
              className="bg-yellow-400 items-center justify-center h-fit w-fit py-2 px-4 rounded-lg text-white flex gap-2"
            >
              Paused
            </button>

            <button
              onClick={handlePendingDeliveries}
              className="bg-yellow-400 items-center justify-center h-fit w-fit py-2 px-4 rounded-lg text-white flex gap-2"
            >
              Pending
            </button>

            <button
              onClick={handleLowBalance}
              className="bg-red-400 items-center justify-center h-fit w-fit py-2 px-4 rounded-lg text-white flex gap-2"
            >
              Low balance
            </button>

            <button
              onClick={handleAddOns}
              className="bg-green-400 items-center justify-center h-fit w-fit py-2 px-4 rounded-lg text-white flex gap-2"
            >
              AddOns
            </button>

            <button
              onClick={handleAgentAssign}
              className="bg-yellow-400 items-center justify-center h-fit w-fit py-2 px-4 rounded-lg text-white flex gap-2"
            >
              Assign agent
            </button>
          </div>
        </div>

        <div className="flex justify-between w-1/2 items-center">
          <h1 className=" mt-6 text-3xl mb-5">Total Users: {totalUsers}</h1>
        </div>
        {isFetchloading ? (
          <Loader2 className="animate-spin w-8 h-8" />
        ) : !showPending ? (
          <div className="flex w-full">
            <div className="flex flex-col gap-3 w-[50%]">
              {results.map((user: any) => {
                return (
                  <Card
                    className={`flex`}
                    id={user.user.id}
                    key={user.id}
                    _name={user?.user?.name}
                    _morningAddress={user?.user?.morningAddress}
                    _eveningAddress={user?.user?.eveningAddress}
                    _balance={user?.user?.balance?.toString()}
                    _mobile={user?.user?.phone}
                    dueTiffin={user?.user?.dueTiffin}
                    _type={
                      user?.user?.order?.length > 1
                        ? "BOTH"
                        : user?.user?.order[0]?.tiffinTime
                    }
                    _isSubscribed={user?.user?.order.length == 0 ? false : true}
                    _isPaused={
                      user.user.order.length > 0 &&
                      user.user.order[0].NextMeal.isPause
                        ? true
                        : false
                    }
                    _order={user.user.order}
                    nextMeal={
                      user.user.order.length > 0
                        ? user.user.order[0].NextMeal
                        : {}
                    }
                    user={user}
                  isPending={showPending}
                  />
                );
              })}
            </div>

            {userName != "" && (
              <div className="w-[40%] ml-12 -mt-14">
                <div className="sticky top-24 z-10 bg-white flex flex-col gap-2">
                  <h1 className="text-3xl">Update:</h1>
                  <input
                    type="text"
                    placeholder="Name"
                    className="px-5 py-4 outline-none border-[2px] border-gray-200 rounded-lg"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />

                  {(timing == "MORNING" || timing == "BOTH") && (
                    <input
                      type="text"
                      placeholder="Morning Address"
                      className="px-5 py-4 outline-none border-[2px] border-gray-200 rounded-lg"
                      value={morningAddress}
                      onChange={(e) => setMorningAddress(e.target.value)}
                    />
                  )}

                  {(timing == "EVENING" || timing == "BOTH") && (
                    <input
                      type="text"
                      placeholder="Evening Address"
                      className="px-5 py-4 outline-none border-[2px] border-gray-200 rounded-lg"
                      value={eveningAddress}
                      onChange={(e) => setEveningAddress(e.target.value)}
                    />
                  )}
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="px-5 py-4 outline-none border-[2px] border-gray-200 rounded-lg"
                    value={mob}
                    maxLength={10}
                    onChange={(e) => setMob(e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="User's Balance"
                    className="px-5 py-4 outline-none border-[2px] border-gray-200 rounded-lg"
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                  />

                  <input
                    type="number"
                    placeholder="Due Tiffins"
                    className="px-5 py-4 outline-none border-[2px] border-gray-200 rounded-lg"
                    value={dueTiffins}
                    onChange={(e) => setDueTiffins(e.target.value)}
                  />
                  {/* <div className="border-2 pr-4 border-gray-200 rounded-lg flex">
                    <select
                      onChange={(e) => {
                        setTiming(e.target.value);
                      }}
                      name="type"
                      id="type"
                      className="p-5 w-full"
                      value={timing}
                    >
                      <option value="MORNING">MORNING</option>
                      <option value="EVENING">EVENING</option>
                      <option value="BOTH">BOTH</option>
                    </select>
                  </div> */}
                  <button
                    onClick={handleUpdate}
                    className={`px-4 py-2 flex items-center rounded-lg text-xl text-white bg-green-500 w-fit`}
                  >
                    Update{" "}
                    {updateLoader && <Loader2 className="animate-spin mr-2" />}
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {results.map((user: any) => {
              return (
                <Card
                  className={`flex w-[50%]`}
                  id={user.user.id}
                  key={user.id}
                  _name={user?.user?.name}
                  _morningAddress={user?.user?.morningAddress}
                  _eveningAddress={user?.user?.eveningAddress}
                  _balance={user?.user?.balance?.toString()}
                  _mobile={user?.user?.phone}
                  dueTiffin={user?.user?.dueTiffin}
                  _type={
                    user?.user?.order?.length > 1
                      ? "BOTH"
                      : user?.user?.order[0]?.tiffinTime
                  }
                  _isSubscribed={user?.user?.order.length == 0 ? false : true}
                  _isPaused={
                    user.user.order.length > 0 &&
                    user.user.order[0].NextMeal.isPause
                      ? true
                      : false
                  }
                  _order={user.user.order}
                  nextMeal={
                    user.user.order.length > 0
                      ? user.user.order[0].NextMeal
                      : {}
                  }
                  user={user}
                  isPending={showPending}
                />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default page;
