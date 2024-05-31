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
  // let elements = document.getElementsByTagName("textarea");
  // const element = elements[0];
  // element?.setAttribute("style", "height: 100% !important");

  return (
    <Textarea
      title={label}
      style={{ margin: "1px", height: "100% !important" }}
      aria-label={label}
      isDisabled={isDisabled}
      isRequired={isRequired}
      // fullWidth={fullWidth}
      label={label}
      value={value ?? ""}
      onValueChange={onValueChange}
      cacheMeasurements={true}
      placeholder={placeholder}
      minRows={2}
      maxRows={4}
      classNames={{
        base: [`${fullWidth ? "w-full" : "w-[370px]"}`, "flex-row"],
        label: "text-sm font-semibold text-black-default/80 px-2 py-2",
        input: "!h-full text-sm font-medium text-black-default px-1.5",
        inputWrapper: "h-full px-1.5",
      }}
    />
  );
};

export default FormFieldTextArea;
