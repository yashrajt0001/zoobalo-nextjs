import React from 'react'
import HowItWorksItem from './HowItWorksItem'

const HowItWorks = () => {
  return (
    <div className="flex flex-col gap-4 mt-16 sm:mt-28 sm:mb-20">
      <div className="text-center text-[2.3rem] font-extrabold text-[#ff5823] mb-10">
        <h2>How It Works?</h2>
      </div>
      <div className="sm:flex justify-between sm:px-20 mx-auto sm:mx-0">
        <HowItWorksItem
          image="/QR.png"
          title="Scan Or Whatsapp"
          desc="Simply scan the QR or message us on Whatsapp"
        />
        <HowItWorksItem
          image="/food.png"
          title="Browse and Select"
          desc="Explore our menu options and select favourite dishes"
        />
        <HowItWorksItem
          image="/board.png"
          title="Order with Ease"
          desc="Place your order Effortlessly and get ready to enjoy delicious tiffin meals delivered to your doorstep"
        />
      </div>
    </div>
  );
}

export default HowItWorks