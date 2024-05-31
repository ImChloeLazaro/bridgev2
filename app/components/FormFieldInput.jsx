import { Input, useDisclosure, cn } from "@nextui-org/react";
import { DatePicker } from "./DatePicker";
import IconButton from "./IconButton";
import { MdFileUpload } from "react-icons/md";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";

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
  endContentType,
  date,
  onDateChange,
  isDateModal = false,
  fullWidth = false,
  className,
  ...props
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const endContent = {
    date: (
      <DatePicker
        date={date}
        onDateChange={onDateChange}
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        isDateModal={isDateModal}
      />
    ),
    file: (
      <IconButton>
        <MdFileUpload size={16} />
      </IconButton>
    ),
  };

  return (
    <>
      <Input
        placeholder={placeholder}
        aria-label={label}
        isReadOnly={isReadOnly}
        isDisabled={isDisabled}
        isRequired={isRequired}
        size={"md"}
        label={`${label}`}
        data-label={Boolean(label)}
        value={
          new Date(date) > 0 && withDate
            ? format(date, "LLLL d, y")
            : value ?? ""
        }
        onValueChange={onValueChange}
        fullWidth={fullWidth}
        classNames={{
          base: [`${fullWidth ? "w-full" : "w-[370px]"}`],
          label: [
            "text-sm font-medium text-black-default/80",
            "min-w-fit tracking-tight mb-2.5",
          ],
          input: ["text-sm font-medium text-black-default/90"],
          inputWrapper: cn(
            "text-sm font-medium text-black-default/90",
            "bg-grey-default",
            "px-3",
            className
          ),
          errorMessage: ["text-red-default"],
        }}
        endContent={endContent[endContentType]}
        {...props}
      />
    </>
  );
};

export default FormFieldInput;
