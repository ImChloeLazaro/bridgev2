import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { Link, Button } from "@nextui-org/react";

const ReturnButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const router = useRouter();

  const reconnect = () => {
    setIsLoading(true);
    setIsDisabled(true);
    router.back();
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
      {"Return"}
    </Button>
  );
};

export default ReturnButton;
