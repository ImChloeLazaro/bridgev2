import { Input } from "@nextui-org/react";
import { DatePicker } from "./DatePicker";

const FormFieldInput = ({
  label,
  value,
  onValueChange,
  isRequired,
  isDisabled,
  withDate = false,
  date,
  onDateChange,
  fullWidth = false,
  ...props
}) => {
  return (
    <Input
      aria-label={label}
      isDisabled={isDisabled}
      isRequired={isRequired}
      size={"md"}
      label={`${label.toUpperCase()}`}
      value={value}
      onValueChange={onValueChange}
      fullWidth={fullWidth}
      classNames={{
        base: [`${fullWidth ? "w-full" : "w-[370px]"}`],
        label: [
          "font-medium",
          "text-black-default/80",
          "text-sm",
          "group-data-[focus=true]:tracking-tight",
        ],
        input: [
          "font-medium",
          "group-data-[filled=true]:text-black-default/90",
          "text-sm",
        ],
        inputWrapper: ["font-medium", "text-black-default/90", "text-sm"],
        errorMessage: ["text-red-default"],
      }}
      endContent={
        withDate && <DatePicker date={date} onDateChange={onDateChange} />
      }
      {...props}
    />
  );
};

export default FormFieldInput;
