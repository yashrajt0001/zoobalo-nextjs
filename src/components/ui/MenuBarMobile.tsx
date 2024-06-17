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
    <nav className="md:hidden z-20 fixed top-0 left-0 right-0 h-[60px] bg-black flex [&>*]:my-auto px-2">
      <Button
        className="text-4xl flex text-white"
        onClick={() => {
          setter((oldVal: boolean) => !oldVal);
        }}
        variant="ghost"
          >
              <Menu className="w-4 h-4"/>
      </Button>
      <Link href="/" className="mx-auto">
        {/*eslint-disable-next-line*/}
        ZOobalo
      </Link>
      <Link className="text-3xl flex text-white" href="/login">
        User
      </Link>
    </nav>
  );
}
