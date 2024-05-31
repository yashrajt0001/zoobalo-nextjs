"use client";
import { ShowLogin } from "@/components/ShowLogin";
import axios from "axios";
import React, { useEffect, useState } from "react";

const page = () => {
  const [login, setLogin] = useState(true);
  const [kitchens, setKitchens] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState<undefined | string>(undefined);

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
          {showError && <div className="text-red-500 text-lg">{showError}</div>}
          <button
            onClick={handleLogin}
            className="p-3 text-[1.25rem] font-semibold w-[60%] bg-purple-400 rounded-xl text-white"
          >
            Submit
          </button>
        </div>
      </div>
      ) : (
        <div className="pb-8 min-h-full"></div>
      )}
    </div>
  );
};

export default page;
