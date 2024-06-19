import { Navbar } from "@/components/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import UserState from "@/contextApi/user/UserState";
import { Toaster } from "react-hot-toast";

import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import ModalProvider from "@/components/providers/model-provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Zoobalo",
  description: "Your online tiffin delivery service",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Toaster containerClassName="text-3xl" position="bottom-center" />
        <ModalProvider />
        <UserState>{children}</UserState>
      </body>
    </html>
  );
}
