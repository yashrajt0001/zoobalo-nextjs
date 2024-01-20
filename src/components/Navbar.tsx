import Image from 'next/image'
import React from 'react'
import whatsapp from "../assets/images/whatsapp.png";
import logo1 from "../assets/images/logo1.png";

export const Navbar = () => {
  return (
    <div className="bg-white border-b border-slate-200 sticky top-0 flex justify-between px-8 sm:px-12 py-6 z-10">
    <div className="flex items-center justify-center">
      <Image src={logo1} alt="logo" className="w-28 h-12" />
      <div className="hidden sm:flex items-center  gap-10 ml-12 text-lg font-medium">
        <a href="/#home">Home</a>
        <a href="/#about">About us</a>
        <a href="/#contact">Contact us</a>
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
  )
}
