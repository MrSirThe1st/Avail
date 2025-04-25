import React from "react";
import Navbar from "./navbar/navbar";

interface LayoutProps {
  children: React.ReactNode;
  hideNavbar?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, hideNavbar = false }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {!hideNavbar && <Navbar />}
      <main className="flex-grow">{children}</main>
    </div>
  );
};

export default Layout;
