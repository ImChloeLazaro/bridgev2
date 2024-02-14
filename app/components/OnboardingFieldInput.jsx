import { Input } from "@nextui-org/react";

const OnboardingFieldInput = ({
  label,
  value,
  onValueChange,
  isRequired,
  isDisabled,
}) => {
  return (
    <Input
      isDisabled={isDisabled}
      isRequired={isRequired}
      size="md"
      label={`${label.toUpperCase()}`}
      value={value}
      onValueChange={onValueChange}
      classNames={{
        base: ["w-[370px]"],
        label: [
          "font-medium",
          "text-black-default/70",
          "text-sm",
          "group-data-[focus=true]:tracking-tight",
        ],
        input: [
          "font-medium",
          "group-data-[filled=true]:text-black-default/80",
          "text-sm",
        ],
        inputWrapper: ["font-medium", "text-black-default/90", "text-sm"],
        errorMessage: ["text-red-default"],
      }}
    />
  );
};

export default OnboardingFieldInput;
