import AdminNavbar from "@/components/AdminNavbar";
import { FC } from "react";

interface layoutProps {
  children: React.ReactNode;
}

const Layout: FC<layoutProps> = ({ children }) => {
  return (
    <div className="h-screen">
      {children}
    </div>
  );
};

export default Layout;
