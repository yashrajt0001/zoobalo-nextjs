"use client";

import { FC, useEffect, useState } from "react";
import Image from "next/image";
import logo1 from "../assets/images/logo1.png";
import Link from "next/link";

interface adminNavbarProps {}

const AdminNavbar: FC<adminNavbarProps> = ({}) => {
  const [login, setLogin] = useState(true);

  useEffect(() => {
    setLogin(!localStorage.getItem("auth-token"));
  }, []);

  return (
    <div className="bg-white border-b border-slate-200 sticky top-0 flex justify-between px-8 sm:px-12 py-6 z-10">
      <div className="flex items-center justify-center">
        <Image src={logo1} alt="logo" className="w-28 h-12" />
        <div className="hidden sm:flex items-center  gap-10 ml-12 text-lg font-medium">
          <Link href="/admin">Home</Link>
          {!login && <Link href="/admin/AllUsers">Users</Link>}
          {!login && <Link href="/admin/inventory">Today's tiffin</Link>}
          {!login && <Link href="/admin/tiffinHistory">All history</Link>}
          {!login && <Link href="/admin/feedbacks">Feedbacks</Link>}
          {!login && <Link href="/admin/deliveryAgents">Delivery Agents</Link>}
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
