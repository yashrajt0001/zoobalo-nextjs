"use client";

import axios from "axios";
import { Loader2, CheckCircle2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const page = () => {
  const [lowNotificationDetails, setLowNotificationDetails] = useState({
    title: "",
    body: "",
  });

  const [globalNotificationDetails, setGlobalNotificationDetails] = useState({
    title: "",
    body: "",
  });

  const [personalNotificationDetails, setPersonalNotificationDetails] =
    useState({
      title: "",
      body: "",
    });

  const [lowNotificationLoader, setLowNotificationLoader] = useState(false);
  const [globalNotificationLoader, setGlobalNotificationLoader] =
    useState(false);
  const [personalNotificationLoader, setPersonalNotificationLoader] =
    useState(false);
  const [globalScreen, setGlobalScreen] = useState("");
  const [globalType, setGlobalType] = useState("");
  const [personalScreen, setPersonalScreen] = useState("");
  const [personalType, setPersonalType] = useState("");
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [usersArray, setUsersArray] = useState([] as any);
  const [selectedTab, setSelectedTab] = useState(0);

  // sends notification to all users with low balance
  const handleSendLowNotification = async () => {
    setLowNotificationLoader(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/admin/notification/low`,
        {
          title: lowNotificationDetails.title,
          body: lowNotificationDetails.body,
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
      setLowNotificationLoader(false);
    }
  };

  // sends notification to all users
  const handleSendGlobalNotification = async () => {
    setGlobalNotificationLoader(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/admin/notification`,
        {
          title: globalNotificationDetails.title,
          body: globalNotificationDetails.body,
          screen: globalScreen,
          type: globalType,
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
      setGlobalNotificationLoader(false);
    }
  };

  //sends personal notification to selected users
  const handleSendPersonalNotification = async () => {
    setPersonalNotificationLoader(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/admin/notification/personalized`,
        {
          users: usersArray,
          title: personalNotificationDetails.title,
          body: personalNotificationDetails.body,
          screen: personalScreen,
          type: personalType,
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
      setPersonalNotificationLoader(false);
    }
  };

  // get users according to searchinput
  const getUsers = async (e: any) => {
    try {
      setSearch(e.target.value);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_HOST}/admin/searchUser?search=${e.target.value}`,
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      setUsers(res.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  // get all users at mount
  useEffect(() => {
    async function getUser() {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_HOST}/admin/searchUser?search=${search}`,
          {
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
            },
          }
        );
        setUsers(res.data);
      } catch (error: any) {
        toast.error(error.response.data);
      }
    }
    getUser();
  }, []);

  return (
    <div className="flex h-[calc(100vh-65px)]">
      <div className="flex-1 overflow-y-auto">
        <div className="pb-8 bg-slate-50">
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
                Low Balance
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
                Personalized
              </h1>
            </button>
            <button
              className={`py-3 ${
                selectedTab == 2 ? "border-b-2 border-blue-400" : ""
              }`}
              onClick={() => setSelectedTab(2)}
            >
              <h1
                className={`text-xl ${
                  selectedTab == 2 ? "text-blue-400" : "text-gray-400"
                }`}
              >
                Send All
              </h1>
            </button>
          </div>

          {selectedTab == 0 && (
            <div className="w-[40%] ml-16 mt-8">
              <h1 className="text-3xl">Send Low Balance Notification :</h1>

              <div className="flex flex-col">
                <input
                  type="text"
                  name="title"
                  value={lowNotificationDetails.title}
                  onChange={(e) => {
                    setLowNotificationDetails({
                      ...lowNotificationDetails,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  placeholder="Title of the Notification"
                  className="p-5 outline-none border-[2px] border-gray-200 rounded-lg mt-4"
                />

                <input
                  type="text"
                  name="body"
                  value={lowNotificationDetails.body}
                  onChange={(e) => {
                    setLowNotificationDetails({
                      ...lowNotificationDetails,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  placeholder="Body of the Notification"
                  className="p-5 outline-none border-[2px] border-gray-200 rounded-lg mt-4"
                />
              </div>

              <div className="flex justify-end mt-4">
                <button
                  onClick={handleSendLowNotification}
                  className="flex items-center px-6 py-2 rounded-lg text-xl text-white bg-green-500 w-fit"
                >
                  {lowNotificationLoader && (
                    <Loader2 className=" animate-spin mr-2" />
                  )}{" "}
                  Send
                </button>
              </div>
            </div>
          )}
          {selectedTab == 2 && (
            <div className="w-[40%] ml-16 mt-8">
              <h1 className="text-3xl">Send Notification to All :</h1>

              <div className="flex flex-col">
                <input
                  type="text"
                  name="title"
                  value={globalNotificationDetails.title}
                  onChange={(e) => {
                    setGlobalNotificationDetails({
                      ...globalNotificationDetails,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  placeholder="Title of the Notification"
                  className="p-5 outline-none border-[2px] border-gray-200 rounded-lg mt-4"
                />

                <input
                  type="text"
                  name="body"
                  value={globalNotificationDetails.body}
                  onChange={(e) => {
                    setGlobalNotificationDetails({
                      ...globalNotificationDetails,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  placeholder="Body of the Notification"
                  className="p-5 outline-none border-[2px] border-gray-200 rounded-lg mt-4"
                />

                <select
                  onChange={(e) => setGlobalScreen(e.target.value)}
                  value={globalScreen}
                  className="py-4 px-4 text-center rounded-md mt-4 bg-white border-[2px] border-gray-200"
                >
                  <option value="" disabled>
                    Select a Screen
                  </option>
                  <option value="recharge">RECHARGE</option>
                  <option value="notification">NOTIFICATION</option>
                </select>

                <select
                  onChange={(e) => setGlobalType(e.target.value)}
                  value={globalType}
                  className="py-4 px-4 text-center rounded-md mt-4 bg-white border-[2px] border-gray-200"
                >
                  <option value="" disabled>
                    Select Type of Notification
                  </option>
                  <option value="RECHARGE">RECHARGE</option>
                  <option value="FEEDBACK">FEEDBACK</option>
                  <option value="DELIVERED">DELIVERED</option>
                </select>
              </div>

              <div className="flex justify-end mt-4">
                <button
                  onClick={handleSendGlobalNotification}
                  className="flex items-center px-6 py-2 rounded-lg text-xl text-white bg-green-500 w-fit"
                >
                  {globalNotificationLoader && (
                    <Loader2 className=" animate-spin mr-2" />
                  )}{" "}
                  Send
                </button>
              </div>
            </div>
          )}

          {selectedTab == 1 && (
            <div className="w-[40%] ml-16 mt-8">
              <h1 className="text-3xl">Send Notification Personally: </h1>

              <div className="flex flex-col">
                <div className="relative">
                  <button
                    onClick={() => setOpen(true)}
                    className="mt-5 w-full border border-gray-200 p-3"
                  >
                    <h1 className="text-xl">Select User</h1>
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
                        const temp = usersArray.filter(
                          (iterator: any) => iterator == user.id
                        );
                        return temp.length > 0 ? (
                          <button
                            className="border-b mb-1 text-lg flex items-center justify-between px-1"
                            onClick={() => {
                              const temp2 = usersArray.filter(
                                (iterator: any) => iterator != user.id
                              );
                              setUsersArray(temp2);
                              setOpen(false);
                            }}
                          >
                            {user.name}
                            <CheckCircle2 className="text-[#22AA00]" />
                          </button>
                        ) : (
                          <button
                            className="border-b mb-1 text-lg"
                            onClick={() => {
                              setUsersArray([...usersArray, user.id]);
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

                <input
                  type="text"
                  name="title"
                  value={personalNotificationDetails.title}
                  onChange={(e) => {
                    setPersonalNotificationDetails({
                      ...personalNotificationDetails,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  placeholder="Title of the Notification"
                  className="p-5 outline-none border-[2px] border-gray-200 rounded-lg mt-4"
                />

                <input
                  type="text"
                  name="body"
                  value={personalNotificationDetails.body}
                  onChange={(e) => {
                    setPersonalNotificationDetails({
                      ...personalNotificationDetails,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  placeholder="Body of the Notification"
                  className="p-5 outline-none border-[2px] border-gray-200 rounded-lg mt-4"
                />

                <select
                  onChange={(e) => setPersonalScreen(e.target.value)}
                  value={personalScreen}
                  className="py-4 px-4 text-center rounded-md mt-4 bg-white border-[2px] border-gray-200"
                >
                  <option value="" disabled>
                    Select a Screen
                  </option>
                  <option value="recharge">RECHARGE</option>
                  <option value="notification">NOTIFICATION</option>
                </select>

                <select
                  onChange={(e) => setPersonalType(e.target.value)}
                  value={personalType}
                  className="py-4 px-4 text-center rounded-md mt-4 bg-white border-[2px] border-gray-200"
                >
                  <option value="" disabled>
                    Select Type of Notification
                  </option>
                  <option value="RECHARGE">RECHARGE</option>
                  <option value="FEEDBACK">FEEDBACK</option>
                  <option value="DELIVERED">DELIVERED</option>
                </select>

                <div className="flex justify-end mt-4">
                  <button
                    onClick={handleSendPersonalNotification}
                    className="flex items-center px-6 py-2 rounded-lg text-xl text-white bg-green-500 w-fit"
                  >
                    {personalNotificationLoader && (
                      <Loader2 className=" animate-spin mr-2" />
                    )}{" "}
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
