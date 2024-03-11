import { Button, cn } from "@nextui-org/react";

const IconButton = ({ className, children, ...props }) => {
  return (
    <Button isIconOnly className={cn("bg-transparent", className)} {...props}>
      {children}
    </Button>
  );
};

export default IconButton;
