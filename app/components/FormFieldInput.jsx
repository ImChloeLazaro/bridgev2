import { Input, useDisclosure, cn } from "@nextui-org/react";
import { DatePicker } from "./DatePicker";
import IconButton from "./IconButton";
import { MdClose, MdFileUpload } from "react-icons/md";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useCallback, useMemo, useRef } from "react";
import CTAButtons from "./CTAButtons";

const FormFieldInput = ({
  placeholder = "",
  label = "",
  value,
  type = "text",
  inputType,
  inputFileRef,
  inputID,
  onValueChange,
  errorMessage,
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

  const handleUploadDocuments = useCallback(
    (e) => {
      const fileList = e.target.files;
      console.log("LIST", fileList[0].name);

      if (!fileList) {
        return;
      }

      onValueChange(fileList[0].name);
    },
    [onValueChange]
  );

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
      <>
        {/* Separate input file EndContent Component to its own component so it can be shared */}
        {!value ? (
          <CTAButtons
            color="clear"
            for={inputID}
            startContent={<MdFileUpload size={18} />}
          >
            <label for={inputID} className="font-medium text-sm lg:text-base">
              {"Upload File"}
            </label>
          </CTAButtons>
        ) : (
          <CTAButtons
            color="clear"
            for={inputID}
            startContent={<MdClose size={18} />}
            label={"Remove File"}
            onPress={() => {
              if (inputFileRef.current) {
                inputFileRef.current.value = "";
                inputFileRef.current.type = "text";
                inputFileRef.current.type = "file";
              }
              onValueChange("");
            }}
          />
        )}
        <input
          ref={inputFileRef}
          type="file"
          id={inputID}
          accept=".pdf"
          placeholder="Upload File"
          className="border-none hidden"
          onChange={(e) => handleUploadDocuments(e)}
        />
      </>
    ),
  };

  const errorMessages = {
    // `${label ? label : "Input"} is invalid or missing`
    email: "Please enter a valid email address",
    text: "No special characters allowed",
    number: "No characters or spaces allowed",
    date: "Please enter a valid date",
    file: "PDF file is only accepted",
  };

  const inputValidationType = {
    email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i,
    text: /^[A-Z0-9\s!?.%+;:'"()-_\\]+$/i,
    number: /^[0-9\s+()-]+$/i,
    date: /^[A-Z0-9\s,-\\]+$/i,
    file: /.*\.pdf$/,
  };

  const inputValidation = (input) => input?.match(inputValidationType[type]);

  const isInvalid = useMemo(() => {
    if (type === "date") return false;
    if (value === "") return false;

    return inputValidation(value) ? false : true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <>
      <Input
        type={inputType}
        placeholder={placeholder}
        aria-label={label}
        // isReadOnly={isReadOnly}
        isDisabled={isDisabled}
        isRequired={isRequired}
        isInvalid={isInvalid}
        size={"md"}
        label={label}
        fullWidth={fullWidth}
        endContent={endContent[endContentType]}
        errorMessage={
          isInvalid ? (errorMessage ? errorMessage : errorMessages[type]) : ""
        }
        data-label={Boolean(label)}
        value={
          new Date(date) > 0 && withDate ? format(date, "LLLL d, y") : value
        }
        onValueChange={(value) => {
          console.log("VALUE:", isInvalid, value);
          onValueChange(value);
        }}
        classNames={{
          base: [`${fullWidth ? "w-full" : "w-[370px]"}`],
          label: [
            `${isInvalid ? "!text-red-default" : "!text-black-default/80"}`,
            "after:!text-red-default",
            "text-sm font-medium",
            "min-w-fit tracking-tight mb-2.5",
          ],
          input: [
            `${
              isInvalid
                ? "!placeholder:text-red-default placeholder:text-red-default"
                : "!placeholder:text-black-default/90 placeholder:text-black-default/90"
            }`,
            // "placeholder:aria-invalid:text-red-default",
            "aria-invalid:!text-red-default",
            "text-sm font-medium",
          ],
          inputWrapper: cn(
            // `${
            //   isInvalid
            //     ? "!group-data-[focus=true]:bg-red-default/30 !data-[hover=true]:bg-red-default/30 !bg-red-default/10"
            //     : "group-data-[focus=true]:bg-darkgrey-default/20 data-[hover=true]:bg-darkgrey-default/20 bg-grey-default"
            // }`,
            "text-sm font-medium",
            "px-3 py-2"
          ),
          errorMessage: ["font-medium text-red-default"],
        }}
        {...props}
      />
    </>
  );
};

export default FormFieldInput;
