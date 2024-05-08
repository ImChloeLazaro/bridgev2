import { Button, cn } from "@nextui-org/react";

const CTAButtons = ({
  radius = 'sm',
  label,
  color,
  className,
  size = "sm",
  startContent,
  endContent,
  showButton = true,
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
      aria-label={label}
      startContent={startContent}
      endContent={endContent}
      radius={radius}
      variant="solid"
      className={cn(
        "hidden data-[show=true]:flex ",
        "px-5 py-0.5 font-bold text-base",
        buttonColor,
        className
      )}
      size={size}
      {...props}
    >
      {label}
    </Button>
  );
};
export default CTAButtons;
