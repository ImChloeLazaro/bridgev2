import { Button, cn } from "@nextui-org/react";
import { isValidElement } from "react";

const CTAButtons = ({
  radius = "sm",
  label,
  color,
  className,
  size = "sm",
  startContent,
  endContent,
  showButton = true,
  children,
  ...props
}) => {
  const colors = {
    red: "bg-red-default text-white-default",
    orange: "bg-orange-default text-white-default",
    yellow: "bg-yellow-default text-white-default",
    green: "bg-green-default text-white-default",
    blue: "bg-blue-default text-white-default",
    black: "bg-black-default text-white-default",
    grey: "bg-grey-default/90 text-white-default",
    white: "bg-white-default/90 text-black-default",
    clear:
      "bg-transparent text-black-default hover:underline hover:underline-offset-2",
  };

  let buttonColor = colors[color];
  return (
    <Button
      data-show={showButton}
      aria-label={isValidElement(label) ? "Action Button" : label}
      startContent={
        startContent ? <div className="min-h-3 min-w-3">{startContent}</div> : null
      }
      endContent={endContent}
      radius={radius}
      variant="solid"
      className={cn(
        "hidden data-[show=true]:flex items-center",
        "px-4 py-0.5 gap-3",
        buttonColor,
        className
      )}
      size={size}
      {...props}
    >
      {children ? (
        children
      ) : (
        <p className="font-bold text-sm lg:text-base">{label}</p>
      )}
    </Button>
  );
};
export default CTAButtons;
