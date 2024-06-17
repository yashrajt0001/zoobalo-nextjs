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
    <nav className="md:hidden z-20 flex [&>*]:my-auto px-2">
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
