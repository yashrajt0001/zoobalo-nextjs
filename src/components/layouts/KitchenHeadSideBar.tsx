import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  show: Boolean;
  setter: (value: any) => void;
}

interface MenuItemProps {
  icon?: React.ReactNode;
  name: string;
  route: string;
}

const items = [
  {
    name: "Home",
    icon: null,
    route: "/kitchenHead",
  },
  {
    name: "Users",
    icon: null,
    route: "/kitchenHead/AllUsers",
  },
  {
    name: "Today's History",
    icon: null,
    route: "/kitchenHead/inventory",
  },
  {
    name: "All History",
    icon: null,
    route: "/kitchenHead/tiffinHistory",
  },
  {
    name: "Demo Tiffins",
    icon: null,
    route: "/kitchenHead/demoTiffins",
  },
  {
    name: "Recharges",
    icon: null,
    route: "/kitchenHead/recharges",
  },
  {
    name: "Feedback",
    icon: null,
    route: "/kitchenHead/feedbacks",
  },
  {
    name: "Extra Tiffins",
    icon: null,
    route: "/kitchenHead/extraTiffin",
  },
];

export default function KitchenHeadSidebar({ show, setter }: SidebarProps) {
  const pathname = usePathname();
  const className =
    "bg-black w-[250px] transition-[margin-left] ease-in-out duration-500 fixed md:static h-[calc(100vh-65px)] md:top-0 top-[65px] bottom-0 left-0 z-40";
  const appendClass = show ? " ml-0" : " ml-[-250px] md:ml-0";

  const MenuItem = ({ icon, name, route }: MenuItemProps) => {
    const colorClass =
      pathname === route ? "text-white" : "text-white/50 hover:text-white";

    return (
      <Link
        href={route}
        onClick={() => {
          setter((oldVal: boolean) => !oldVal);
        }}
        className={`flex gap-1 [&>*]:my-auto text-md pl-6 py-3 border-b-[1px] border-b-white/10 ${colorClass}`}
      >
        {icon ? (
          <div className="text-xl flex [&>*]:mx-auto w-[30px]">{icon}</div>
        ) : null}
        <div>{name}</div>
      </Link>
    );
  };

  const ModalOverlay = () => (
    <div
      className={`flex md:hidden fixed top-0 right-0 bottom-0 left-0 bg-black/50 z-30`}
      onClick={() => {
        setter((oldVal: boolean) => !oldVal);
      }}
    />
  );

  return (
    <>
      <div className={`${className}${appendClass}`}>
        <div className="flex flex-col py-6">
          {items.map((item) => {
            return (
              <MenuItem name={item.name} icon={item.icon} route={item.route} />
            );
          })}
        </div>
      </div>
      {show ? <ModalOverlay /> : <></>}
    </>
  );
}
