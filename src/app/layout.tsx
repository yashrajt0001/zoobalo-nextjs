import { Navbar } from "@/components/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import UserState from "@/contextApi/user/UserState";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <body className={inter.className}>
        <UserState>
        {children}
        </UserState>
      </body>
    </html>
  );
}
