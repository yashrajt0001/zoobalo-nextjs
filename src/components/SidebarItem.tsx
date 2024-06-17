import Link from "next/link";
import { FC } from "react";

interface SidebarItemProps {
  name: string;
  Icon: React.ReactNode | null;
  href: string;
}

const SidebarItem: FC<SidebarItemProps> = ({ name, Icon, href }) => {
  return (
    <Link href={href} className="py-2 px-4 text-black focus:bg-gray-200 group flex gap-2 hover:bg-gray-200 rounded-l-full rounded-r-full min-w-[200px]">
      {Icon ? Icon : null}
      <div className="group-focus:text-orange-400 font-semibold text-xl">{name}</div>
    </Link>
  );
};

export default SidebarItem;
