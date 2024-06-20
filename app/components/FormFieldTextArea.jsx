import { Textarea, cn } from "@nextui-org/react";
import { useMemo } from "react";

const FormFieldTextArea = ({
  placeholder = "",
  label = "",
  value,
  onValueChange,
  errorMessage,
  isRequired,
  isDisabled,
  fullWidth = false,
}) => {
  // Temporary workaround to prevent textarea from being
  // small and not taking up the whole space

  // let elements = document.getElementsByTagName("textarea");
  // const element = elements[0];
  // element?.setAttribute("style", "height: 100% !important");

  const inputValidation = (input) =>
    input?.match(/^[A-Z0-9\s!?.%+;:'"()-_\\]+$/i);

  const isInvalid = useMemo(() => {
    if (value === "") return false;

    return inputValidation(value) ? false : true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <Textarea
      title={label}
      style={{ margin: "1px", height: "100% !important" }}
      aria-label={label}
      isDisabled={isDisabled}
      isRequired={isRequired}
      isInvalid={isInvalid}
      validationBehavior={"native"}
      errorMessage={
        isInvalid
          ? errorMessage
            ? errorMessage
            : "No special characters allowed"
          : ""
      }
      label={label}
      value={value ?? ""}
      onValueChange={onValueChange}
      cacheMeasurements={true}
      placeholder={placeholder}
      minRows={2}
      maxRows={4}
      classNames={{
        base: [`${fullWidth ? "w-full" : "w-[370px]"}`, "h-full flex-col"],
        label: [
          `${isInvalid ? "!text-red-default" : "!text-black-default/80"}`,
          "text-sm font-medium",
          "px-2 py-2",
        ],
        input: "!h-full text-sm font-medium px-1.5",
        inputWrapper: cn(
          // `${
          //   isInvalid
          //     ? "!group-data-[focus=true]:bg-red-default/30 !data-[hover=true]:bg-red-default/30 !bg-red-default/10"
          //     : "group-data-[focus=true]:bg-darkgrey-default/20 data-[hover=true]:bg-darkgrey-default/20 bg-grey-default"
          // }`,
          "text-sm font-medium text-black-default/90",
          "px-3 py-2",
          "!h-full px-1.5"
        ),
      }}
    />
  );
};

export default FormFieldTextArea;
