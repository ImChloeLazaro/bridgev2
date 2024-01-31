import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ContinueButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const router = useRouter();

  const reconnect = () => {
    setIsLoading(true);
    setIsDisabled(true);
    router.push("/");
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
      {"Continue"}
    </Button>
  );
};

export default ContinueButton;
