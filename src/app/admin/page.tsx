import React from "react";
import Image from "next/image";
import whatsapp from "../../assets/images/whatsapp.png";
import logo1 from "../../assets/images/logo1.png";
import Link from "next/link";

const page = () => {
  return (
    <div>
      <div className="bg-white border-b border-slate-200 sticky top-0 flex justify-between px-8 sm:px-12 py-6 z-10">
        <div className="flex items-center justify-center">
          <Image src={logo1} alt="logo" className="w-28 h-12" />
          <div className="hidden sm:flex items-center  gap-10 ml-12 text-lg font-medium">
            <Link href="/users">Users</Link>
          </div>
        </div>
        <div className="">
          <a
            href="https://wa.me/919509919001"
            className="text-white py-3 px-4 bg-[#FF5823] rounded-2xl flex"
          >
            <Image src={whatsapp} alt="logo" className="w-6 h-6 mr-3" />
            Book Now
          </a>
        </div>
      </div>
      <h1 className="text-4xl mt-5 ml-12 text-[#FF5F1F]">
        Hi! <span className="text-green-500">Admin</span>{" "}
      </h1>
      <div className="flex">
        <div className="ml-16 flex flex-col gap-3 w-[40%]">
          <h1 className="text-3xl mt-5">Create a User:</h1>
          <input
            type="text"
            placeholder="Name"
            className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
          />
          <input
            type="text"
            placeholder="Address"
            className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
          />
          <input
            type="tel"
            placeholder="User's Balance"
            className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
          />
          <button
            type="submit"
            className="p-2 rounded-lg text-xl text-white bg-green-500 w-[22%]"
          >
            Create
          </button>
        </div>

        <div className="ml-24 flex flex-col gap-3 w-[40%]">
          <h1 className="text-3xl mt-5">Create a Delivery Boy Account:</h1>
          <input
            type="text"
            placeholder="Name"
            className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
          />
          <input
            type="email"
            placeholder="Email Address"
            className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
          />
          <input
            type="password"
            placeholder="Password"
            className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
          />
          <button
            type="submit"
            className="p-2 rounded-lg text-xl text-white bg-green-500 w-[22%]"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
