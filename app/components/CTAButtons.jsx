import React from "react";
import { Button } from "@nextui-org/react";
const CTAButtons = ({ label, color, ...props }) => {
  const colors = {
    red: "bg-red-default",
    orange: "bg-orange-default",
    yellow: "bg-yellow-default",
    green: "bg-green-default",
    blue: "bg-blue-default",
    black: "bg-black-default/90",
    clear: "bg-transparent",
  };

  let buttonColor = colors[color];
  return (
    <Button
      size="sm"
      radius="sm"
      variant="solid"
      className={`px-5 py-0.5 ${buttonColor} text-white-default font-bold text-base`}
      {...props}
    >
      {label}
    </Button>
  );
};
export default CTAButtons;
