"use client";

import React from "react";
import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
  return (
    <Sonner
      toastOptions={{
        classNames: {
          toast: "bg-white-default border-2 border-grey-default border-solid",
          title: "text-black-default",
          description: "text-darkgrey-default",
          actionButton: "bg-blue-default p-4",
          cancelButton: "bg-red-default",
          closeButton: "bg-grey-default",
          error: "bg-red-default",
          success: "bg-green-default",
          warning: "bg-orange-default",
          info: "bg-blue-default",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
