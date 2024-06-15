"use client";
import { ShowLogin } from "@/components/ShowLogin";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

const page = () => {
  const [login, setLogin] = useState(true);
  const [kitchens, setKitchens] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState<undefined | string>(undefined);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [userDetails, setUserDetails] = useState({
    name: "",
    phone: "",
  });
  const [userloader, setUserloader] = useState(false);
  const [delBoyDetails, setDelBoyDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [delBoyLoader, setDelBoyLoader] = useState(false);

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
        console.log(res.data);
        setKitchens(res.data);
      } catch (error: any) {
        console.log(error.response.data);
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
        setShowError("Please enter email and password");
        return;
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
      setShowError(error.response.data);
      console.log(error.response.data);
    }
  };

  const handleCreate = async () => {
    if (!userDetails.name || !userDetails.phone) {
      return setShowError("Please enter details!");
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

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      console.log("Please select a file");
      return;
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
      console.log("Image uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
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
                setShowError("");
              }}
              className="p-2 outline-none border-b-[1.5px] border-purple-300 w-[70%]"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setShowError("");
              }}
              className="p-2 outline-none mb-10 border-b-[1.5px] border-purple-300 w-[70%]"
            />
            {showError && (
              <div className="text-red-500 text-lg">{showError}</div>
            )}
            <button
              onClick={handleLogin}
              className="p-3 text-[1.25rem] font-semibold w-[60%] bg-purple-400 rounded-xl text-white"
            >
              Submit
            </button>
          </div>
        </div>
      ) : (
        <div className="pb-8 min-h-full">
          <div className="flex items-center">
            <h1 className="text-4xl mt-5 ml-12 text-[#FF5F1F]">
              Hi! <span className="text-green-500">Admin</span>{" "}
            </h1>
          </div>

          {showError && (
            <div className="text-red-500 ml-12 text-2xl mt-4">{showError}</div>
          )}
          <div className="flex mb-6">
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

          <div className="flex ml-16">
            <div className="flex flex-col gap-4 w-[40%]">
              <h1 className="text-3xl">Upload Image:</h1>
              <input type="file" onChange={handleFileChange} />
              <button
                className="bg-green-500 px-3 py-2 rounded-lg text-xl w-fit flex items-center text-white"
                onClick={handleUpload}
              >
                Upload Image
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
