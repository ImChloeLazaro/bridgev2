"use client"
import NavigationBar from "../navigation/components/NavigationBar";
import dynamic from "next/dynamic";

const SideBar = dynamic(() => import("../navigation/components/SideBar"), {
    ssr: false,
});

const UserLayout = ({ children }) => {
    return (
        <>
            <div className="flex h-screen max-h-screen top-0">
                <SideBar />
                <div className="flex flex-col w-full">
                    <div className="top-0">
                        <NavigationBar />
                    </div>
                    <div className="flex w-full max-h-screen overflow-y-scroll bg-background">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}
export default UserLayout