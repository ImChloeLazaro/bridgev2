"use client";
import React from "react";

import MiniUnderContstruction from "@/app/components/MiniUnderContstruction"

const Dashboard = () => {
  return (
    <div className="h-full w-full ">
      <MiniUnderContstruction src={"/imageUnderContstruction.png"} mini={false}/>
    </div>
  );
};

export default Dashboard;
