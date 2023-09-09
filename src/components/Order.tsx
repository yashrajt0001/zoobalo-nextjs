import Image from "next/image";
import { FC } from "react";

interface OrderProps {}

const Order: FC<OrderProps> = ({}) => {
  return (
    <div className="bg-[#ffded3] rounded-3xl pt-16 pl-20 w-[90%] mx-auto pb-10">
      <div>{/* <Image src="/" alt=""/> */}</div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <h3 className="text-[2.3rem] font-sans font-bold">
            Order on whatsapp
          </h3>
          <div className=" flex gap-3 ">
            <Image src="/whatsapp.svg" width={40} height={40} alt="" />
            <div className="text-[1.7rem] text-gray-800">9509919001</div>
          </div>
          <div className="text-lg">or</div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-[2.7rem] font-sans font-bold">Scan QR code</div>
          <Image src="/QRcode.jpeg" width={100} height={100} alt=""/>
        </div>
      </div>
    </div>
  );
};

export default Order;
 