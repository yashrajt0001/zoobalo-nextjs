"use client";
import React, { useState } from "react";

export const Card = () => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [mob, setMob] = useState("");
    const [balance, setBalance] = useState("");

  return (
    <div className="flex">
      <div className="w-[50%] p-6 bg-lime-200 rounded-xl h-[40%]">
        <h1 className="mt-2 text-2xl font-bold">Rudra Pratap Singh</h1>
        <h1 className="mt-2 text-lg">
          Pipli Gali, Ganesh Nagar, University Road
        </h1>
        <h1 className="mt-2">
          Mob No: <span className="ml-2">+91 8503079734</span>{" "}
        </h1>
        <div className="mt-5 flex gap-3">
          <button onClick={() => setShow(true)} className="p-3 bg-white font-bold rounded-xl">Update</button>
          <button className="p-3 bg-white font-bold rounded-xl">
            Show History
          </button>
        </div>
      </div>

        <div className={`${show ? 'ml-32 flex flex-col gap-3' :'hidden'}`}>
        <h1 className="text-3xl mt-5">Update:</h1>
        <input
          type="text"
          placeholder="Name"
                  className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
                  className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Phone Number"
                  className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
                  value={mob}
                  onChange={(e) => setMob(e.target.value)}
        />
        <input
          type="tel"
          placeholder="User's Balance"
                  className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
                  value={balance}
                  onChange={(e) => setBalance(e.target.value)}
        />
        <button
          type="submit"
                  className="p-2 rounded-lg text-xl text-white bg-green-500 w-[30%]"
                  onClick={() => setShow(false)}
        >
          Update
        </button>
      </div>
    </div>
  );
};
