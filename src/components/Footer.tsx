import { SendHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
  return (
    <div id="contact" className="bg-[#f5f8f2] pt-12 pb-6 px-8 mt-20">
      <div>{/* <Image src='/' fill alt=''/> */}</div>
      <div className="sm:flex justify-between">
        <div className="sm:max-w-xs max-w-full justify-between flex sm:block">
          <div className="sm:text-[2.5rem] text-2xl font-bold max-w-[220px] sm:pb-4 sm:max-w-fit sm:leading-10">
            The best you can get at an affordable price
          </div>
          <div className="flex items-center flex-col w-fit">
            <img src="/QRcode.jpeg" alt="qr" className=" w-20 aspect-square" />
            <div className="text-xs mt-2">Scan this QR code</div>
          </div>
        </div>
        <div className="mt-10 sm:mt-0">
          <div className="font-bold mb-3 text-xl">Contact us</div>
          <ul className="font-semibold flex flex-col gap-1">
            <a
              href="https://wa.me/919509919001"
              className="flex gap-2 mb-2 sm:mb-0 mt-2 sm:mt-0"
            >
              <Image src="/whatsapp.svg" width={30} height={30} alt="" />
              <div>9509919001</div>
            </a>
            <a
              href="https://www.instagram.com/zoobalo/"
              className="flex gap-2 mb-2 sm:mb-0"
            >
              <Image src="/instagram.webp" width={30} height={30} alt="" />
              <div>zoobalo</div>
            </a>
            <a className="flex gap-2">
              <Image src="/phone.png" width={30} height={30} alt="" />
              <div>9509919001</div>
            </a>
          </ul>
        </div>
        <div className="mt-10 sm:mt-0">
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
      <div className="flex justify-between mt-10 sm:text-base text-[7px]">
        <span>Copyright © 2023. Zoobalo. All rights reserved.</span>
        <div className="flex gap-8">
          <Link href="privacyPolicy" className="text-sky-700">
            Privacy policy
          </Link>
          <Link href="refundPolicy" className="text-sky-700">
            Refund policy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
