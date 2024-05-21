import { Button, cn } from "@nextui-org/react";

const IconButton = ({ className, children, ...props }) => {
  return (
    <Button
      isIconOnly
      variant="solid"
      className={cn("flex bg-transparent", className)}
      {...props}
    >
      {children}
    </Button>
  );
};

export default IconButton;
