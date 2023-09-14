import React from 'react'
import { ChevronRight } from 'lucide-react';

const TiffinPicks = () => {
    return (
      <div className="flex py-16 items-center bg-[#ffded3] overflow-x-auto no-scrollbar">
        <div className="gap-3 mx-12">
          <div className="text-[#ff5800] font-bold text-lg tracking-[2px] font-sans">
            POPULAR
          </div>
          <h2 className="font-sans font-bold text-[2.5rem] w-[350px]">
            Top-Rated Tiffin Picks
          </h2>
        </div>
        <div className="flex gap-10">
          <a
            href=""
            className={`relative rounded-3xl min-h-[320px] min-w-[280px] bg-thali1 bg-cover bg-left-bottom`}
          >
            <div className="bottom-5 left-5 absolute">
              <div className="py-3">
                <div className="text-white font-semibold text-2xl">Student thali</div>
                <div className="text-yellow-300 font font-semibold">
                  Rs. 60
                </div>
              </div>
              <div className="flex gap-2">
                <span className="text-white">Book Now</span>
                <ChevronRight className="text-white" />
              </div>
            </div>
          </a>
          <a
            href=""
            className={`relative rounded-3xl min-h-[320px] min-w-[280px] bg-thali2 bg-cover bg-left-bottom`}
          >
            <div className="bottom-5 left-5 absolute">
              <div className="py-3">
                <div className="text-white font-semibold text-2xl">Special thali</div>
                <div className="text-yellow-300 font font-semibold">
                  Rs. 80
                </div>
              </div>
              <div className="flex gap-2">
                <span className="text-white">Book Now</span>
                <ChevronRight className="text-white" />
              </div>
            </div>
          </a>
        </div>
      </div>
    );
}

export default TiffinPicks