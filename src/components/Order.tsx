import Image from "next/image";
import { FC } from "react";

interface OrderProps {}

const Order: FC<OrderProps> = ({}) => {
  return (
    <div className="bg-[#ffded3] rounded-3xl py-12 sm:py-14 w-[90%] mx-auto">
      <div>{/* <Image src="/" alt=""/> */}</div>
      <div className="flex sm:flex-row flex-col items-center justify-evenly gap-2">
        <div className="flex flex-col gap-4 items-center">
          <h3 className="sm:text-[2.3rem] text-xl font-sans font-bold">
            Order on whatsapp
          </h3>
          <div className="flex gap-3">
            <Image src="/whatsapp.svg" width={40} height={40} alt="" />
            <div className="text-[1.7rem] text-gray-800">9509919001</div>
          </div>
        </div>
        <div className="flex flex-col gap-6 items-center">
          <div className="sm:text-[2.7rem] text-xl font-sans font-bold">Scan QR code</div>
          <Image src="/QRcode.jpeg" width={100} height={100} alt=""/>
        </div>
      </div>
    </div>
  );
};

export default Order;
 