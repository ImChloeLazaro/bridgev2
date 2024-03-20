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
          "shadow-sm px-3 py-2 bg-default-100 data-[hover=true]:bg-default-200",
          " group-data-[focus=true]:bg-default-100 rounded-medium",
        ],
        wrapper: "px-2",
        label: "p-2 text-sm font-medium text-black-default/80",
      }}
      {...props}
    >
      {choices.map((choice, index) => (
        <Radio
          key={index}
          value={choice.value}
          classNames={{
            label: "text-sm font-normal text-black-default/90",
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
