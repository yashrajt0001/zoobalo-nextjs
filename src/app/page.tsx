import hero from '@/images/hero.jpg';
import tiffin from "@/images/tiffin.jpg";
import tick from "@/images/tick.png";
import whatsapp from "@/images/whatsapp.png";
import insta from "@/images/insta.png";
import net from "@/images/net.png";
import clock from "@/images/clock.png";
import cancel from "@/images/cancel.png";
import plate from "@/images/plate.png";
import Image from "next/image";
import wa from '@/images/whatsapp.svg'
import Link from 'next/link';
import EnqueryForm from './components/EnqueryForm';

function App() {

  return (
    <>
      <div className="sm:h-screen">
        <div className="flex justify-between items-center py-4 px-4 sm:px-2 ">
          <div className="bg-orange-400 rounded-full px-3 py-8 ml-6 ">
            <div className="text-white text-lg font-extrabold">Zoobalo</div>
          </div>
          <div className="sm:flex space-x-20 text-orange-400 mr-12 mt-[-0.5rem] hidden">
            <Link href="/" className="text-xl font-bold">
              Home
            </Link>
            <a href="#about" className="text-xl font-bold">
              About Us
            </a>
            <a href="#contact" className="text-xl font-bold">
              Contact Us
            </a>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="sm:ml-16 ml-4 mt-12 sm:w-[55%]">
            <div>
              <h1>
                <div className="text-lg sm:text-xl text-orange-400 font-medium tracking-widest">
                  OUR PRIORITY, YOURS SAFETY
                </div>
                <div className="text-7xl font-extrabold text-orange-400 mt-1 sm:mt-0">
                  SAFE FOOD
                </div>
                <div className="sm:text-[5rem] font-light text-orange-400 sm:mt-[-1rem] text-[2rem] mt-1">
                  FAST DELIVERY
                </div>
              </h1>
              <a className="cursor-pointer max-w-fit flex items-center gap-3 px-5 py-3 rounded-2xl text-white bg-orange-500 mt-10 font-bold ml-2">
                <div className="text-lg">Book now</div>
                <Image src={wa} alt="" height={30} width={30} />
              </a>
            </div>
          </div>
          <div className="sm:w-[45%] w-[100%] mt-8">
            <Image
              src={hero}
              className="bg-contain w-[80%] h-[80%] sm:ml-8"
              alt="logo"
            />
          </div>
        </div>
      </div>
      <div className="px-20 py-6 text-center text-lg text-slate-400 font-semibold bg-hangout">
        Welcome to Zoobalo - your ultimate online food delivery platform!
        Discover a diverse range thali food menu. Order effortlessly with just a
        few clicks on our whatsapp, enjoy fast and reliable delivery, and
        benefit from curated specials and offers. We prioritize your
        satisfaction, ensuring food safety and supporting local businesses.
        Treat yourself to a delightful dining experience anytime, anywhere with
        Zoobalo!
      </div>

      {/* Mid Section  */}

      <div className="flex py-8 sm:py-16" id="about">
        <div className="sm:w-[50%] hidden sm:flex">
          <Image src={tiffin} alt="tiffin-box" className="bg-contain w-[80%]" />
        </div>
        <div className="sm:w-[50%] ml-8 mt-12 w-[100%]">
          <h2 className="text-orange-400 text-3xl font-semibold">
            What We Offer
          </h2>
          <p className="w-[70%] mt-5 font-medium text-slate-400">
            Our motto is to feed every college going student delicious and
            nutritious food which others are not providing. We offer home made
            food at affordable rates.
          </p>
          <ul className="mt-10 ml-4 flex-col space-y-7">
            <li className="flex items-center space-x-5">
              <Image src={tick} alt="tick" className="w-10 h-10" />
              <h1 className="text-gray-400 md:text-2xl font-semibold xs:w-[70%]">
                Everyday new menu
              </h1>
            </li>
            <li className="flex items-center space-x-5">
              <Image src={tick} alt="tick" className="w-10 h-10" />
              <h1 className="text-gray-400 md:text-2xl font-semibold xs:w-[70%]">
                Two days special food in a week
              </h1>
            </li>
            <li className="flex items-center space-x-5">
              <Image src={tick} alt="tick" className="w-10 h-10" />
              <h1 className="text-gray-400 md:text-2xl font-semibold xs:w-[70%]">
                Fresh, Hygienic and Home made food
              </h1>
            </li>
            <li className="flex items-center space-x-5">
              <Image src={tick} alt="tick" className="w-10 h-10" />
              <h1 className="text-gray-400 md:text-2xl font-semibold xs:w-[70%]">
                Get exciting rewards and offers
              </h1>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex justify-center gap-10  md:gap-0 md:justify-between px-16 mb-14 mt-10 flex-wrap items-center">
        <div className="card c1">
          <div className="icon">
            <Image src={plate} alt="" />
          </div>
          <div className="content">
            <h2 className="font-bold font-sans text-3xl">Food variety</h2>
            <p className="font-semibold">
              Enjoy a wide variety of food from around udaipur, all in one
              place. Our menu offers rajasthani, punjabi and local dishes,
              something for every taste preference
            </p>
          </div>
        </div>
        <div className="card c2">
          <div className="icon">
            <Image src={clock} alt="" />
          </div>
          <div className="content">
            <h2 className="font-bold font-sans text-3xl">Fast Delivery</h2>
            <p className="font-semibold">
              We prioritize timely delivery to ensure your food arrives fresh
              and hot at your doorstep. Our efficient delivery system guarantees
              a seamless and reliable experience.
            </p>
          </div>
        </div>
        <div className="card c3">
          <div className="icon">
            <Image src={cancel} alt="" />
          </div>
          <div className="content">
            <h2 className="font-bold font-sans text-3xl">Cancel anytime</h2>
            <p className="font-semibold">
              At Zoobalo, we understand that plans can change, and we value your
              flexibility. That&apos;s why we offer the convenience of canceling
              your food order anytime before it&apos;s out for delivery.
            </p>
          </div>
        </div>
      </div>

      {/* contact section */}

      <EnqueryForm/>

      {/* footer Section  */}
      <div
        className="bg-[#363636] w-full h-auto px-12 sm:px-20 pt-24 pb-2"
        id="footer"
      >
        <div className=" text-white flex flex-col sm:flex-row">
          <div className="sm:w-[60%] w-[100%]">
            <div className="text-4xl font-bold">
              ZOO<span className="text-4xl text-orange-400">BALO</span>
            </div>
            <h2 className="sm:w-[60%] text-5xl font-bold mt-16 w-[100%] ">
              The Best you can get at an Affordable Price
            </h2>
            <div className="flex space-x-3 mt-16 text-2xl font-semibold text-[#787878]">
              BRING OUT CHANGE
            </div>
          </div>
          <div className="sm:w-[40%] sm:ml-24 w-[100%] mt-12">
            <div>
              <div className="text-2xl text-[#787878] font-extrabold">
                CONTACTS
              </div>
              <div className="flex space-x-3 mt-10">
                <Image src={whatsapp} alt="whatsapp" className="w-10 h-10" />
                <div className="text-2xl font-semibold">9509919001</div>
              </div>
              <div className="flex space-x-3 mt-10">
                <Image src={insta} alt="instagram" className="w-10 h-10" />
                <div className="text-2xl font-semibold">zoobalo</div>
              </div>
              <div className="flex space-x-3 mt-10">
                <Image src={net} alt="" className="w-10 h-10" />
                <div className="text-2xl font-semibold">www.zoobalo.com</div>
              </div>
            </div>
          </div>
        </div>
        <hr className="text-[#787878] mt-20" />
        <div className="flex justify-between">
          <p className="text-[#787878] mt-6 mb-2">
            Copyright © 2023. Zoobalo. All rights reserved.
          </p>
          <div className="flex space-x-2 mt-6 mb-2">
            <a href="#" className="text-[#787878]">
              Privacy Policy
            </a>
            <a href="#" className="text-[#787878]">
              Terms &amp; Services
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
