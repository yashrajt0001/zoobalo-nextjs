import React from "react";
import whatsapp from "../assets/images/whatsapp.png";
import Image from "next/image";
import tiffin from "../assets/images/tiffin.png";

export const Hero = () => {
  return (
    <>
      <div id="home" className="w-full sm:h-screen mb-16 sm:mb-0">
        {/* Main Hero Section  */}

        <div className="sm:flex justify-between pt-16 sm:pt-20">
          <div className="sm:w-[45%] ml-14">
            <h1 className="text-[#FF5823] text-6xl">
              Delicious Delivered to You:{" "}
              <span className="text-[#22AA00]">Your Daily Tiffin Solution</span>
            </h1>
            <p className="hidden sm:block mt-6">
              Welcome to Zoobalo in Udaipur!
              Our Tiffin Meals are prepared with love and care by our talented
              chefs, using fresh, locally sourced ingredients. Explore our
              diverse menu to discover a variety of options.
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
