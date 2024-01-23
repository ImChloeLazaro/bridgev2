"use client";
import NavigationBar from "../navigation/components/NavigationBar";
import dynamic from "next/dynamic";

// //// To fix ReferenceError due to window being accessing before sent to client (Sidebar Component)
const SideBar = dynamic(() => import("../navigation/components/SideBar"), {
  ssr: false,
});
// ////####################################################################/////

export default function HRLayout({ children }) {
  
  return (
    <div className="flex h-screen top-0">
      <SideBar />
      <div className="flex flex-col w-full">
        <div className="top-0">
          <NavigationBar />
        </div>
        <div className="">{children}</div>
      </div>
    </div>
  );
}
