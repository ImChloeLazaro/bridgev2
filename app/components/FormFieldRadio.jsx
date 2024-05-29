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
  className,
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
        base: cn(
          `${fullWidth ? "w-full" : "max-w-full"}`,
          "relative inline-flex tap-highlight-transparent",
          "shadow-sm px-3 py-2 bg-grey-default hover:bg-default-200",
          "group-data-[focus=true]:bg-grey-default rounded-medium",
          "transition-background motion-reduce:transition-none !duration-150",
          className
        ),
        wrapper: "px-2",
        label: "p-2 text-sm font-semibold text-black-default/80",
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
