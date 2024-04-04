import { Button, cn } from "@nextui-org/react";

const IconButton = ({ className, children, showSearchBar, ...props }) => {
  return (
    <Button
      data-show={showSearchBar}
      isIconOnly
      className={cn("flex data-[show=false]:hidden bg-transparent", className)}
      {...props}
    >
      {children}
    </Button>
  );
};

export default IconButton;
