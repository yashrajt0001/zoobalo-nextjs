import { ChevronRight } from 'lucide-react'
import React from 'react'

interface TiffinItemProps {
    title: string
    price: string
}

const TiffinItem = ({ title, price }: TiffinItemProps) => {
  return (
    <a
      href=""
      className={`relative rounded-3xl min-h-[320px] min-w-[280px] bg-TiffinPick bg-cover bg-left-bottom`}
    >
      <div className="bottom-5 left-5 absolute">
        <div className="py-3">
          <div className="text-white font-semibold text-2xl">{title}</div>
          <div className="text-yellow-300 font font-semibold">Rs. {price}</div>
        </div>
        <div className="flex gap-2">
          <span className="text-white">Book Now</span>
          <ChevronRight className="text-white" />
        </div>
      </div>
    </a>
  );
};

export default TiffinItem