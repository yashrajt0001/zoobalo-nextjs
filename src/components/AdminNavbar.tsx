"use client";

import { FC, useEffect, useState } from "react";
import Image from "next/image";
import logo1 from "../assets/images/logo1.png";
import MenuBarMobile from "./ui/MenuBarMobile";

interface adminNavbarProps {
  setter: (value: any)=> void
}

const AdminNavbar: FC<adminNavbarProps> = ({setter}) => {
  const [login, setLogin] = useState(true);

  useEffect(() => {
    setLogin(!localStorage.getItem("auth-token"));
  }, []);

  return (
    <div className="bg-white border-b border-slate-200 sticky top-0 flex justify-between px-8 sm:px-12 py-2 z-[10000]">
      <div className="flex w-full items-center justify-between">
        <Image src={logo1} alt="logo" className="w-28 h-12" />
        <MenuBarMobile setter={setter} />
        {/* <div className="hidden sm:flex items-center gap-7 ml-12 text-lg font-medium flex-wrap">
          <Link href="/admin">Home</Link>
          {!login && <Link href="/admin/AllUsers">Users</Link>}
          {!login && <Link href="/admin/inventory">Today's tiffin</Link>}
          {!login && <Link href="/admin/tiffinHistory">All history</Link>}
          {!login && <Link href="/admin/feedbacks">Feedbacks</Link>}
          {!login && <Link href="/admin/deliveryAgents">Delivery Agents</Link>}
          {!login && <Link href="/admin/demoTiffins">Demo Tiffins</Link>}
          {!login && <Link href="/admin/kitchens">Kitchens</Link>}
          {!login && <Link href="/admin/notifications">Notifications</Link>}
        </div> */}
      </div>
    </div>
  );
};

export default AdminNavbar;
