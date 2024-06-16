"use client";
import { ShowLogin } from "@/components/ShowLogin";
import axios from "axios";
import { CheckCircle2, Loader2 } from "lucide-react";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

const page = () => {
  const [login, setLogin] = useState(true);
  const [kitchens, setKitchens] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [userDetails, setUserDetails] = useState({
    name: "",
    phone: "",
  });
  const [userloader, setUserloader] = useState(false);
  const [delBoyDetails, setDelBoyDetails] = useState({
    name: "",
    phone: "",
    code: "",
    alternateNumber: "",
    kitchenId:""
  });
  const [delBoyLoader, setDelBoyLoader] = useState(false);
  const [timing, setTiming] = useState("");
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [usersArray, setUsersArray] = useState([] as any);
  const [open, setOpen] = useState(false);
  const [addUserLoader, setAddUserLoader] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    setLogin(!localStorage.getItem("auth-token"));
    async function getAllKitchens() {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_HOST}/kitchenHead/kitchens`,
          {
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
            },
          }
        );
        setKitchens(res.data);
      } catch (error: any) {
        toast.error(error.response.data);
      }
    }
    getAllKitchens();
  }, []);

  const isLoggedIn = () => {
    setLogin(false);
  };

  const handleLogin = async () => {
    try {
      if (!username || !password) {
        return toast.error("Please enter email and password");
      }
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/kitchenHead/login`,
        {
          username,
          password,
        }
      );
      localStorage.setItem("auth-token", data.token);
      isLoggedIn();
    } catch (error: any) {
      toast.error(error.response.data);
    }
  };

  const handleCreate = async () => {
    if (!userDetails.name || !userDetails.phone) {
      return toast.error("Please enter details!");
    }
    setUserloader(true);
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/kitchenHead/user/create`,
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
    } catch (error: any) {
      toast.error(error.response.data);
    } finally {
      setUserloader(false);
    }

    setUserDetails({
      name: "",
      phone: "",
    });
  };

  const handleDelBoySubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (
      !delBoyDetails.name ||
      !delBoyDetails.phone ||
      !delBoyDetails.code ||
      !delBoyDetails.alternateNumber ||
      !delBoyDetails.kitchenId
    ) {
      return toast.error("Please enter details!");
    }

    try {
      setDelBoyLoader(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/agent/create`,
        {
          name:delBoyDetails.name,
          phone:delBoyDetails.phone,
          status:true,
          partnerCode:delBoyDetails.code,
          alternateNumber:delBoyDetails.alternateNumber,
          kitchenId: parseInt(delBoyDetails.kitchenId)
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
      setDelBoyLoader(false);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      return toast.error("please select a file");
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
      toast.success("Image uploaded successfully.");
    } catch (error) {
      toast.error("Error uploading image:");
    }
  };

  const getUsers = async (e: any) => {
    try {
      setSearch(e.target.value);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/kitchenHead/queue/search?search=${e.target.value}`,
        {
          tiffinTime: timing,
        },
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
  };

  const handleAdd = async () => {
    setAddUserLoader(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/kitchenHead/queue/add`,
        {
          userId: selectedUserId,
          tiffinTime: timing,
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
      setAddUserLoader(false);
    }
  };

  return (
    <div>
      {login ? (
        <div className="flex items-center h-screen w-full">
          <div className="w-[60%] bg-purple-500 h-screen flex justify-center items-center">
            <h1 className="text-5xl w-[70%] mb-32 font-semibold leading-tight text-[#dcd8d8]">
              Hello! Welcome in your Space
            </h1>
          </div>
          <div className="w-[40%] h-[70%] bg-white rounded-lg flex flex-col items-center p-10 gap-8 z-20">
            <h2 className="text-4xl font-semibold mb-10">Login</h2>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              className="p-2 outline-none border-b-[1.5px] border-purple-300 w-[70%]"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="p-2 outline-none mb-10 border-b-[1.5px] border-purple-300 w-[70%]"
            />
            <button
              onClick={handleLogin}
              className="p-3 text-[1.25rem] font-semibold w-[60%] bg-purple-400 rounded-xl text-white"
            >
              Submit
            </button>
          </div>
        </div>
      ) : (
        <div className="pb-16 min-h-full">
          <div className="flex items-center">
            <h1 className="text-4xl mt-5 ml-12 text-[#FF5F1F]">
              Hi! <span className="text-green-500">Admin</span>{" "}
            </h1>
          </div>

          <div className="flex mb-6">
            <div className="ml-16 flex flex-col gap-3 w-[40%]">
              <h1 className="text-3xl mt-5">Create a User:</h1>
              <input
                type="text"
                value={userDetails.name}
                name="name"
                onChange={(e) => {
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

            <div className="ml-16 flex flex-col gap-3 w-[40%] mt-5">
              <h1 className="text-3xl mb-4">Add User in Delivery Queue :</h1>
              <div className="flex items-center">
                <h1 className="text-xl mr-4">QueueDelivery Timing :</h1>
                <select
                  onChange={(e) => {
                    setTiming(e.target.value);
                    async function getUsersForCurrentTiming() {
                      try {
                        const res = await axios.post(
                          `${process.env.NEXT_PUBLIC_HOST}/kitchenHead/queue/search?search=${search}`,
                          {
                            tiffinTime: e.target.value,
                          },
                          {
                            headers: {
                              "auth-token": localStorage.getItem("auth-token"),
                            },
                          }
                        );
                        setUsers(res.data);
                        console.log("data: ", res.data);
                      } catch (error: any) {
                        console.log(error.response.data);
                      }
                    }
                    getUsersForCurrentTiming();
                  }}
                  value={timing}
                  className="py-2 px-4 text-center rounded-md w-[40%]"
                >
                  <option value="" disabled>
                    Select Timing
                  </option>
                  <option value="MORNING">MORNING</option>
                  <option value="EVENING">EVENING</option>
                </select>
              </div>
              {timing != "" && (
                <>
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
                        {users.map((user: any) => (
                          <button
                            key={user.id}
                            className="border-b mb-1 text-lg"
                            onClick={() => {
                              setSelectedUserId(user.id);
                              setOpen(false);
                            }}
                          >
                            {user.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end mt-8">
                    <button
                      onClick={handleAdd}
                      className="flex items-center px-6 py-2 rounded-lg text-xl text-white bg-green-500 w-fit"
                    >
                      {addUserLoader && (
                        <Loader2 className="animate-spin mr-2" />
                      )}{" "}
                      Add
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex ml-16">
            <div className="flex flex-col gap-4 w-[45%]">
              <h1 className="text-3xl">Upload Image:</h1>
              <input type="file" onChange={handleFileChange} />
              <button
                className="bg-green-500 px-3 py-2 rounded-lg text-xl w-fit flex items-center text-white"
                onClick={handleUpload}
              >
                Upload Image
              </button>
            </div>

            <form
              onSubmit={handleDelBoySubmit}
              className="ml-10 flex flex-col gap-3 w-[40%]"
            >
              <h1 className="text-3xl">Create a Delivery Boy Account:</h1>
              <input
                type="text"
                name="name"
                value={delBoyDetails.name}
                onChange={(e) => {
                  setDelBoyDetails({
                    ...delBoyDetails,
                    [e.target.name]: e.target.value,
                  });
                }}
                placeholder="Name"
                className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
              />
              <input
                type="tel"
                name="phone"
                value={delBoyDetails.phone}
                onChange={(e) => {
                  setDelBoyDetails({
                    ...delBoyDetails,
                    [e.target.name]: e.target.value,
                  });
                }}
                placeholder="Phone Number"
                className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
              />
              <input
                type="text"
                name="code"
                value={delBoyDetails.code}
                onChange={(e) => {
                  setDelBoyDetails({
                    ...delBoyDetails,
                    [e.target.name]: e.target.value,
                  });
                }}
                placeholder="Partner Code"
                className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
                />
                <input
                type="tel"
                name="alternateNumber"
                value={delBoyDetails.alternateNumber}
                onChange={(e) => {
                  setDelBoyDetails({
                    ...delBoyDetails,
                    [e.target.name]: e.target.value,
                  });
                }}
                placeholder="ALternate Number"
                className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
                />
                <input
                type="number"
                name="kitchenId"
                value={delBoyDetails.kitchenId}
                onChange={(e) => {
                  setDelBoyDetails({
                    ...delBoyDetails,
                    [e.target.name]: e.target.value,
                  });
                }}
                placeholder="Kitchen Id"
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
    </div>
  );
};

export default page;
