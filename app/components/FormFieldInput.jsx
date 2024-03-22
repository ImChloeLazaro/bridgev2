import { Input } from "@nextui-org/react";
import { DatePicker } from "./DatePicker";
import IconButton from "./IconButton";
import { MdFileUpload } from "react-icons/md";

const FormFieldInput = ({
  placeholder = "",
  label = "",
  value,
  onValueChange,
  isRequired = false,
  isDisabled = false,
  isReadOnly = false,
  withFile = false,
  withDate = false,
  date,
  onDateChange,
  fullWidth = false,
  ...props
}) => {
  const handleEndContent = () => {
    if (withDate) {
      return <DatePicker date={date} onDateChange={onDateChange} />;
    }
    if (withFile) {
      return (
        <IconButton>
          <MdFileUpload size={16} />
        </IconButton>
      );
    }
  };

  return (
    <Input
      placeholder={placeholder}
      aria-label={label}
      isReadOnly={isReadOnly}
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
