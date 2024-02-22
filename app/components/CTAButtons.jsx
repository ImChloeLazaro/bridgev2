import { Button, cn } from "@nextui-org/react";

const CTAButtons = ({ label, color, className, ...props }) => {
  const colors = {
    red: "bg-red-default text-white-default",
    orange: "bg-orange-default text-white-default",
    yellow: "bg-yellow-default text-white-default",
    green: "bg-green-default text-white-default",
    blue: "bg-blue-default text-white-default",
    black: "bg-black-default/90 text-white-default",
    grey: "bg-grey-default/90 text-white-default",
    clear:
      "bg-transparent text-black-default hover:underline hover:underline-offset-2",
  };

  let buttonColor = colors[color];
  return (
    <Button
      size="sm"
      radius="sm"
      variant="solid"
      className={cn("px-5 py-0.5 font-bold text-base", buttonColor, className)}
      {...props}
    >
      {label}
    </Button>
  );
};
export default CTAButtons;
