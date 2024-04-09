"use client";

import { useTheme } from "next-themes";
import React from "react";
import { Toaster as Sonner } from "sonner";

// type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }) => {
  // : ToasterProps
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      // theme={theme as ToasterProps["theme"]}
      // className="toaster group"
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
