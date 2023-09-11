import React from "react";
import logo from "../assets/images/logo.jpg";
import whatsapp from "../assets/images/whatsapp.png";
import Image from "next/image";
import tiffin from "../assets/images/tiffin.png";

export const Hero = () => {
  return (
    <>
      <div className="w-full sm:h-screen mb-16 sm:mb-0">
        {/* NavBar */}

        <div className="flex justify-between">
          <div className="flex">
            <Image
              src={logo}
              alt="logo"
              className="w-40 h-44 sm:w-40 sm:h-40 ml-5 -mt-8"
            />
            <div className="hidden sm:flex gap-10 pt-8 ml-7 text-lg">
              <h1>Home</h1>
              <h1>About us</h1>
              <h1>Contact us</h1>
            </div>
          </div>
          <div className="pt-7 mr-10">
            <button className="text-white py-3 px-4 bg-orange-500 rounded-2xl flex">
              <Image src={whatsapp} alt="logo" className="w-6 h-6 mr-3" />
              Book Now
            </button>
          </div>
        </div>

        {/* Main Hero Section  */}

        <div className="flex-col sm:flex justify-between pt-20">
          <div className="sm:w-[45%] ml-14">
            <h1 className="text-orange-600 text-6xl">
              Delicacies Delivered to You:{" "}
              <span className="text-green-600">Your Daily Tiffin Solution</span>
            </h1>
            <p className="hidden sm:block mt-4">
              Explore our tempting thali menus, order effortlessly via WhatsApp,
              enjoy speedy delivery, and savor exclusive specials.
            </p>
            <button className="text-white py-3 px-4 bg-orange-500 rounded-2xl flex mt-12 sm:mt-6">
              <Image src={whatsapp} alt="logo" className="w-6 h-6 mr-3" />
              Book Now
            </button>
          </div>

          <div className="mt-24 sm:mt-0">
            <Image
              src={tiffin}
              alt="tiffin"
              className="mx-auto w-96 h-96 sm:mr-24 sm:mt-[-25%]"
            />
          </div>
        </div>
      </div>
    </>
  );
};
