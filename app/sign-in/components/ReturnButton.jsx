import React, { useState } from "react";
import { redirect } from "next/navigation";

import { Link, Button } from "@nextui-org/react";

const ReturnButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const reconnect = () => {
    setIsLoading(true);
    setIsDisabled(true);
    redirect("/");
  };

  return (
    <Button
      href="/"
      as={Link}
      isDisabled={isDisabled}
      isLoading={isLoading}
      onPress={reconnect}
      className="w-full text-lg font-medium text-white-default bg-orange-default"
      variant="flat"
      radius="lg"
    >
      {"Return to Home Page"}
    </Button>
  );
};

export default ReturnButton;
