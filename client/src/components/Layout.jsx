import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <main className="bg-[#f5f6f8] min-h-full">
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
}
