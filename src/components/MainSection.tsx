import Image from "next/image";
import React from "react";
import Waiters from '../assets/images/Waiters.png'
import takeAway from '../assets/images/takeAway.png'
import orderFood from '../assets/images/orderFood.png'
import thali from '../assets/images/thali.png'
import tick from '../assets/images/check.png'

export const MainSection = () => {
  return (
    <>
      <div id="about" className="w-full sm:h-screen">
        <div className="flex justify-center">
          <div className="sm:w-[30%] text-4xl text-center font-bold text-orange-600 pt-4">
            <h1>Your Favourite Tiffin </h1>
            <h1 className="mt-3">Delivery Partner</h1>
          </div>
        </div>

        <div className="sm:flex mt-12 sm:ml-8 sm:gap-5">
          <div className="sm:w-[32%] text-center flex flex-col justify-center items-center mb-8 sm:mb-0">
            <Image src={Waiters} alt="logo" className="w-64 h-64 " />
            <div className="w-[80%]">
              <h1 className="text-green-500 text-xl font-bold">Diverse Food</h1>
              <p className="text-black font-medium">
                Enjoy Udaipur&apos;s tastes in one place. Our menu includes
                Rajasthani, Punjabi and local dishes for everyone&apos;s liking.
              </p>
            </div>
          </div>

          <div className="sm:w-[32%] text-center flex flex-col justify-center items-center mb-16 sm:mb-0">
            <Image src={takeAway} alt="logo" className="w-64 h-64" />
            <div className="w-[80%] mt-4">
              <h1 className="text-green-500 text-xl font-bold">
                Fast Delivery
              </h1>
              <p className="text-black font-medium">
                At Zoobalo, we respect your changing plans and offer the
                flexibility to cancel your food order before it&apos;s out for
                delivery.
              </p>
            </div>
          </div>

          <div className="sm:w-[32%]  text-center flex flex-col justify-center items-center sm:mb-0">
            <Image src={orderFood} alt="logo" className="w-56 h-56" />
            <div className="w-[80%] mt-6">
              <h1 className="text-green-500 text-xl font-bold">
                Cancel anytime
              </h1>
              <p className="text-black font-medium">
                Timely delivery for fresh, hot meals at your doorstep, backed by
                a realtime system.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="sm:flex w-full sm:h-screen">
        <div className=" hidden sm:w-[50%] sm:h-full sm:flex justify-center items-center">
          <Image src={thali} alt="thali" className="w-[26rem] h-[30rem]" />
        </div>
        <div className="sm:w-[50%] ml-6 sm:ml-0 h-full py-44 pt-32">
          <h1 className="text-4xl font-bold text-orange-500">Why choose us?</h1>
          <div className="flex-col">
            <div className="flex items-center mt-14">
              <Image src={tick} alt="tick" className="w-8 h-8 mt-2" />
              <h1 className="text-3xl ml-4">Everyday new menu</h1>
            </div>
            <div className="flex items-center mt-10">
              <Image src={tick} alt="tick" className="w-8 h-8 mt-2" />
              <h1 className="text-3xl ml-4">Two days special food in a week</h1>
            </div>
            <div className="flex items-center mt-10">
              <Image src={tick} alt="tick" className="w-8 h-8 mt-2" />
              <h1 className="text-3xl ml-4">
                Fresh, Hygienic and Home made food
              </h1>
            </div>
            <div className="flex items-center mt-10">
              <Image src={tick} alt="tick" className="w-8 h-8 mt-2" />
              <h1 className="text-3xl ml-4">Get exciting rewards and offers</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
