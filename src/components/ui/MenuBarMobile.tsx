import React from "react";
import Link from "next/link";
import { Button } from "./button";
import { Menu } from "lucide-react";

export default function MenuBarMobile({
  setter,
}: {
  setter: (value: any) => void;
}) {
  return (
    <nav className="border border-gray-100 md:hidden z-20 fixed top-[65px] left-0 right-0 h-[60px] flex [&>*]:my-auto px-2">
      <Button
        onClick={() => {
          setter((oldVal: boolean) => !oldVal);
        }}
        variant="ghost"
      >
        <Menu className="w-6 h-6 text-black/80" />
      </Button>
    </nav>
  );
}
