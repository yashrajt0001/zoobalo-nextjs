import { SendHorizontal } from "lucide-react";
import Image from "next/image";
import { FC } from "react";

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
  return (
    <div className="bg-[#f5f8f2] pt-14 px-16 mt-20">
      <div>{/* <Image src='/' fill alt=''/> */}</div>
      <div className="flex justify-between">
        <div className="max-w-xs">
          <div className="text-[2.3rem] font-bold mb-4">
            The best you can get at an affordable price
          </div>
          <div>
            <Image src='/QRcode.jpeg' alt="" width={100} height={100}/>
            <div className="text-xs">Scan this QR code</div>
          </div>
        </div>
        <div>
          <div className="font-bold mb-3 text-xl">Contact us</div>
          <ul className="font-semibold flex flex-col gap-1">
            <li className="flex gap-2">
              <Image src="/whatsapp.svg" width={30} height={30} alt="" />
              <div>9509919001</div>
            </li>
            <li className="flex gap-2">
              <Image src="/instagram.webp" width={30} height={30} alt="" />
              <div>zoobalo</div>
            </li>
            <li className="flex gap-2">
              <Image src="/phone.png" width={30} height={30} alt="" />
              <div>9509919001</div>
            </li>
          </ul>
        </div>
        <div>
          <div className="font-bold mb-3 text-xl">Get in touch</div>
          <ul className="font-semibold flex flex-col gap-2">
            <li>Question or Feedback?</li>
            <li>we&apos;d love to hear from you</li>
            <li>
              <a
                href="/"
                className="w-fit mt-4 gap-2 border-[#009900] text-[#009900] flex border px-4 py-2 rounded-full"
              >
                <div className="font-medium">Email address</div>
                <SendHorizontal />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-between mt-10">
        <span>Copyright © 2023. Zoobalo. All rights reserved.</span>
        <span>Privacy Policy Terms and Services</span>
      </div>
    </div>
  );
};

export default Footer;
