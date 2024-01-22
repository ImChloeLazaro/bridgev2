import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@nextui-org/react";

const ReconnectButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const router = useRouter();

  const reconnect = () => {
    setIsLoading(true);
    setIsDisabled(true);
    router.reload();
  };

  return (
    <Button
      href="/"
      isDisabled={isDisabled}
      isLoading={isLoading}
      onPress={reconnect}
      className="w-full text-lg font-medium text-white-default bg-orange-default"
      variant="flat"
      radius="lg"
    >
      {"Reconnect"}
    </Button>
  );
};

export default ReconnectButton;
