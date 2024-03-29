"use client";
import Footer from "@/components/Footer";
import { Hero } from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import { MainSection } from "@/components/MainSection";
import { Navbar } from "@/components/Navbar";
import Order from "@/components/Order";
import TiffinPicks from "@/components/TiffinPicks";
// import Script from 'next/script'

export default function Home() {
  return (
    <>
      {/* <Script src="https://www.googletagmanager.com/gtag/js?id=G-1HFXCRPML6" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-1HFXCRPML6');
        `}
      </Script> */}
          <Navbar />
          <Hero />
          <MainSection />
          <TiffinPicks />
          <HowItWorks />
          <Order />
          <Footer />
    </>
  );
}
