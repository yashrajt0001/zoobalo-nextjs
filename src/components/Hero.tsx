import React from "react";
import logo1 from "../assets/images/logo1.png";
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
              src={logo1}
              alt="logo"
              className="w-28 h-20 sm:w-36 sm:h-20 ml-8 sm:mt-3 mt-4"
            />
            <div className="hidden sm:flex gap-10 pt-9 ml-12 text-lg font-medium">
              <a href="#home">Home</a>
              <a href="#about">About us</a>
              <a href="#contact">Contact us</a>
            </div>
          </div>
          <div className="pt-7 mr-8">
            <a
              href="https://wa.me/919509919001"
              className="text-white py-3 px-4 bg-[#FF5823] rounded-2xl flex"
            >
              <Image src={whatsapp} alt="logo" className="w-6 h-6 mr-3" />
              Book Now
            </a>
          </div>
        </div>

        {/* Main Hero Section  */}

        <div className="sm:flex justify-between pt-16 sm:pt-20">
          <div className="sm:w-[45%] ml-14">
            <h1 className="text-[#FF5823] text-6xl">
              Delicacies Delivered to You:{" "}
              <span className="text-[#22AA00]">Your Daily Tiffin Solution</span>
            </h1>
            <p className="hidden sm:block mt-6">
              Explore our tempting thali menus, order effortlessly via WhatsApp,
              best tiffin facility in Udaipur, quality food at your fingertips.
            </p>
              <a
                href="https://wa.me/919509919001"
                className="text-white py-3 px-4 bg-[#FF5823] rounded-2xl flex mt-12 sm:mt-10 w-fit"
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
