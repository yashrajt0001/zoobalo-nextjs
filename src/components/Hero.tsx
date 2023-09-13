import React from "react";
import logo from "../assets/images/logo.jpg";
import whatsapp from "../assets/images/whatsapp.png";
import Image from "next/image";
import tiffin from "../assets/images/tiffin.png";

export const Hero = () => {
  return (
    <>
      <div id='home' className="w-full sm:h-screen mb-16 sm:mb-0">
        {/* NavBar */}

        <div className="flex justify-between">
          <div className="flex">
            <Image
              src={logo}
              alt="logo"
              className="w-40 h-44 sm:w-40 sm:h-40 ml-5 -mt-8"
            />
            <div className="hidden sm:flex gap-10 pt-8 ml-7 text-lg">
              <a href="#home">Home</a>
              <a href="#about">About us</a>
              <a href="#contact">Contact us</a>
            </div>
          </div>
          <div className="pt-7 mr-8">
            <a
              href="https://wa.me/919509919001"
              className="text-white py-3 px-4 bg-orange-500 rounded-2xl flex"
            >
              <Image src={whatsapp} alt="logo" className="w-6 h-6 mr-3" />
              Book Now
            </a>
          </div>
        </div>

        {/* Main Hero Section  */}

        <div className="sm:flex justify-between pt-10">
          <div className="sm:w-[45%] ml-14">
            <h1 className="text-orange-600 text-6xl">
              Delicacies Delivered to You:{" "}
              <span className="text-green-600">Your Daily Tiffin Solution</span>
            </h1>
            <p className="hidden sm:block mt-4">
              Explore our tempting thali menus, order effortlessly via WhatsApp,
              enjoy speedy delivery, and savor exclusive specials.
            </p>
              <a
                href="https://wa.me/919509919001"
                className="text-white py-3 px-4 bg-orange-500 rounded-2xl flex mt-12 sm:mt-6 w-fit"
              >
                <Image src={whatsapp} alt="logo" className="w-6 h-6 mr-3" />
                Book Now
              </a>
          </div>

          <div className="mt-24">
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
