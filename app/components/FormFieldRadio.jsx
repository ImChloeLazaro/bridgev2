import { RadioGroup, Radio } from "@nextui-org/react";

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
  return (
    <RadioGroup
      aria-label={label}
      isDisabled={isDisabled}
      isRequired={isRequired}
      size={"lg"}
      label={label}
      value={value}
      onValueChange={onValueChange}
      classNames={{
        base: [
          `${fullWidth ? "w-full" : "max-w-full"}`,
          "relative inline-flex tap-highlight-transparent",
          "shadow-sm px-3 py-2 bg-grey-default hover:bg-background",
          "group-data-[focus=true]:bg-grey-default rounded-medium",
          "transition-background motion-reduce:transition-none !duration-150",
        ],
        wrapper: "px-2",
        label: "p-2 text-sm font-medium text-black-default",
      }}
      {...props}
    >
      {choices.map((choice, index) => (
        <Radio
          key={index}
          value={choice.value}
          classNames={{
            wrapper: "bg-white-default ",
            label: "text-sm font-normal text-black-default",
            circle: "bg-blue-default",
          }}
        >
          {choice.label}
        </Radio>
      ))}
    </RadioGroup>
  );
};

export default FormFieldRadio;
