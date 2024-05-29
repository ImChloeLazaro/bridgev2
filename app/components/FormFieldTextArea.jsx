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
      minRows={2}
      maxRows={4}
      classNames={{
        base: "w-full flex-row",
        label: "text-sm font-semibold text-black-default/80 px-2 py-2",
        input: "!h-full text-sm font-medium text-black-default px-1.5",
        inputWrapper: "h-full px-1.5",
      }}
    />
  );
};

export default FormFieldTextArea;
