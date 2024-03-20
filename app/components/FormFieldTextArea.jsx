import { Textarea } from "@nextui-org/react";

const FormFieldTextArea = ({
  placeholder = "",
  label,
  value,
  onValueChange,
  isRequired,
  isDisabled,
  fullWidth = false,
}) => {
  return (
    <Textarea
      aria-label={label}
      isDisabled={isDisabled}
      isRequired={isRequired}
      size={"lg"}
      fullWidth={fullWidth}
      label={label}
      value={value}
      onValueChange={onValueChange}
      cacheMeasurements={true}
      placeholder={placeholder}
      minRows={1}
      maxRows={4}
      classNames={{
        base: "max-w-full",
        label: "text-base font-medium text-black-default/80 px-2 py-2",
        input: "px-2",
      }}
    />
  );
};

export default FormFieldTextArea;
