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
      <div id="about" className="w-full">
        <div className="flex justify-center">
          <div className="sm:w-[70%] text-4xl text-center font-bold text-[#FF5823] pt-2">
            <img src="https://fontmeme.com/permalink/230915/ffa0729296ad4e7311fcadd60b293ad5.png" alt="अब टिफ़िन की टेंशन ख़तम" className="w-[70%] mx-auto" />
          </div>
        </div>

        <div className="sm:flex mt-6 sm:mt-14 sm:ml-8 sm:gap-5">
          <div className="sm:w-[32%] text-center flex flex-col justify-center items-center mb-4 sm:mb-0">
            <Image src={Waiters} alt="logo" className="w-64 h-64 " />
            <div className="w-[80%]">
              <h1 className="text-[#22AA00] text-xl font-bold">Diverse Food</h1>
              <p className="text-black font-medium mt-4">
                Enjoy Udaipur&apos;s tastes in one place. Our menu includes
                Rajasthani, Punjabi and local dishes for everyone&apos;s liking.
              </p>
            </div>
          </div>

          <div className="sm:w-[32%] text-center flex flex-col justify-center items-center mb-12 sm:mb-0">
            <Image src={takeAway} alt="logo" className="w-64 h-64" />
            <div className="w-[80%] mt-4 sm:mt-0">
              <h1 className="text-[#22AA00] text-xl font-bold">
                Fast delivery
              </h1>
              <p className="text-black font-medium mt-4">
                Timely delivery for fresh, hot meals at your doorstep, backed by
                best tiffin service in Udaipur.
              </p>
            </div>
          </div>

          <div className="sm:w-[32%]  text-center flex flex-col justify-center items-center sm:mb-0 sm:mt-7">
            <Image src={orderFood} alt="logo" className="w-56 h-56" />
            <div className="w-[80%] mt-6">
              <h1 className="text-[#22AA00] text-xl font-bold">
                Cancel anytime
              </h1>
              <p className="text-black font-medium mt-4">
                At Zoobalo, we respect your changing plans and offer the
                flexibility to cancel your food order before it&apos;s out for
                delivery.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="sm:flex w-full sm:mb-8 sm:mt-6">
        <div className=" hidden sm:w-[50%] sm:h-full sm:flex justify-center items-center">
          <Image src={thali} alt="thali" className="w-[24rem] h-[30rem]" />
        </div>
        <div className="sm:w-[50%] ml-6 sm:ml-0 h-full py-20 sm:py-26">
          <h1 className="text-4xl font-bold text-[#FF5823]">Why choose us?</h1>
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
