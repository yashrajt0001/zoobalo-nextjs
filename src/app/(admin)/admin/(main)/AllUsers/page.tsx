"use client";

import { Card } from "@/components/Card";
import UserContext, { UserContextType } from "@/contextApi/user/UserContext";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";

const page = () => {
  const [users, setUsers] = useState([]); // conatins subscribed users
  const [allUsers, setAllUsers] = useState([]); // conatains all users
  const [isFetchloading, setIsFetchloading] = useState(true); // loading state shown before all users are displayed
  const [searchinput, setSearchinput] = useState(""); // state to handle search input text
  const [results, setResults] = useState([]); // array which is used to map all users and show them
  const [showPending, setShowPending] = useState(false); // state which determines the display of pending deliveries
  const [isLoading, setIsLoading] = useState(false); // loader when delivery boy is assigned
  const [totalUsers, setTotalUsers] = useState(0); // state that holds total user's number
  const [updateLoader, setUpdateLoader] = useState(false); // loader when a user's details are updated
  const [tempResults, setTempResults] = useState([]); // temp results stores all users which helps in searching user
  const [selectedTab, setSelectedTab] = useState(0);

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
        toast.error(error.response.data);
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
      toast.error(error.response.data);
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
      toast.error(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  // update details of a user
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
    } catch (error: any) {
      toast.error(error.response.data);
    } finally {
      setUpdateLoader(false);
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
    <>
      <div className="flex px-4 gap-12 border-b border-gray-300 ">
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
        <div className="flex items-center">
          <input
            type="text"
            value={searchinput}
            onChange={(e) => setSearchinput(e.target.value)}
            placeholder="Search a User"
            className="p-2 border border-gray-200 rounded-lg outline-none w-[25%]"
          />
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
        <div className="flex justify-between w-1/2 items-center">
          <h1 className=" mt-6 text-3xl mb-5">Total Users: {totalUsers}</h1>
        </div>
        {isFetchloading ? (
          <Loader2 className="animate-spin w-8 h-8" />
        ) : !showPending ? (
          <div className="flex w-full">
            <div className="flex flex-col gap-3 w-[50%]">
              {results.map((user: any, index) => {
                return (
                  <Card
                    className={`flex`}
                    id={user.id}
                    key={index}
                    _name={user?.name}
                    _morningAddress={user?.morningAddress}
                    _eveningAddress={user?.eveningAddress}
                    _balance={user?.balance?.toString()}
                    _location={user?.location}
                    _mobile={user?.phone}
                    dueTiffin={user?.dueTiffin}
                    _type={
                      user?.order?.length > 1
                        ? "BOTH"
                        : user?.order[0]?.tiffinTime
                    }
                    _isSubscribed={user?.order.length == 0 ? false : true}
                    _isPaused={
                      user.order.length > 0 && user.order[0].NextMeal.isPause
                        ? true
                        : false
                    }
                    _order={user.order}
                    nextMeal={
                      user.order.length > 0 ? user.order[0].NextMeal : {}
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
            {results.map((user: any, index) => {
              return (
                <Card
                  className={`flex w-[50%]`}
                  id={user.id}
                  key={index}
                  _name={user?.user?.name}
                  _morningAddress={user?.user?.morningAddress}
                  _eveningAddress={user?.user?.eveningAddress}
                  _balance={user?.user?.balance?.toString()}
                  _location={user?.user?.address}
                  _mobile={user?.user?.phone}
                  dueTiffin={user?.dueTiffin}
                  _type={user?.order?.tiffinTime}
                  _isSubscribed={user?.order?.length == 0 ? false : true}
                  _isPaused={
                    user.order.length > 0 && user.order[0].NextMeal.isPause
                      ? true
                      : false
                  }
                  _order={user.order}
                  nextMeal={user.order.length > 0 ? user.order[0].NextMeal : {}}
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
