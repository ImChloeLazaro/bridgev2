import { RadioGroup, Radio, cn } from "@nextui-org/react";

const FormFieldRadio = ({
  label,
  value,
  onValueChange,
  isRequired,
  isDisabled,
  fullWidth = false,
  choices = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ],
  ...props
}) => {
  const validChoices = choices.map((choice) => choice.value);

  const isInvalid = ![...validChoices, false].includes(value);

  console.log("RADIO VALUE", isInvalid, value);

  return (
    <RadioGroup
      aria-label={label}
      isDisabled={isDisabled}
      isRequired={isRequired}
      isInvalid={isInvalid}
      errorMessage={isInvalid ? "Please select a valid choice" : ""}
      size={"lg"}
      label={label}
      value={value}
      onValueChange={(value) => {
        console.log("VALUE:", isInvalid, value);
        onValueChange(value);
      }}
      classNames={{
        base: cn(
          `${fullWidth ? "w-full" : "max-w-full"}`,
          "relative inline-flex tap-highlight-transparent",
          "shadow-sm px-1.5 py-2 bg-grey-default hover:bg-default-200",
          "group-data-[focus=true]:bg-grey-default rounded-medium",
          "transition-background motion-reduce:transition-none !duration-150 justify-between"
        ),
        wrapper: "px-2",
        label: ["p-2", "text-sm font-medium", "text-black-default/80"],
      }}
      {...props}
    >
      {choices.map((choice, index) => (
        <Radio
          key={index}
          value={choice.value}
          classNames={{
            wrapper:
              "bg-white-default w-4 h-4 group-data-[selected=true]:border-blue-default",
            label: "text-sm font-medium text-black-default",
            control: "bg-blue-default",
          }}
        >
          {choice.label}
        </Radio>
      ))}
    </RadioGroup>
  );
};

export default FormFieldRadio;
