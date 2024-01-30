import React from "react";
import { Button } from "@nextui-org/react";

// ### TODO Add clear variant as a prop instead to create a combination of clear background and colored text

const CTAButtons = ({ label, color, ...props }) => {
  const colors = {
    red: "bg-red-default text-white-default",
    orange: "bg-orange-default text-white-default",
    yellow: "bg-yellow-default text-white-default",
    green: "bg-green-default text-white-default",
    blue: "bg-blue-default text-white-default",
    black: "bg-black-default/90 text-white-default",
    clear:
      "bg-transparent text-black-default hover:underline hover:underline-offset-2",
  };

  let buttonColor = colors[color];
  return (
    <Button
      size="sm"
      radius="sm"
      variant="solid"
      className={`px-5 py-0.5 ${buttonColor} font-bold text-base`}
      {...props}
    >
      {label}
    </Button>
  );
};
export default CTAButtons;
