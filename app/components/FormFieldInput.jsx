import { Input, useDisclosure, cn, RangeCalendar } from "@nextui-org/react";
import { DatePicker } from "./DatePicker";
import { MdCalendarMonth } from "react-icons/md";
import IconButton from "./IconButton";
import { MdClose, MdFileUpload } from "react-icons/md";
import { format } from "date-fns";
import { useCallback, useMemo, useState } from "react";
import CTAButtons from "./CTAButtons";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import { parseDateTime, parseZonedDateTime } from "@internationalized/date";
import { getLocalTimeZone, parseDate, today } from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";

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
  fullWidth = false,
  className,
  ...props
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleUploadDocuments = useCallback(
    (e) => {
      const fileList = e.target.files;

      if (!fileList) {
        return;
      }

      onValueChange(fileList[0].name);
    },
    [onValueChange]
  );

  let [dateValue, setDateValue] = useState({
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()),
  });
  let [focusedValue, setFocusedValue] = useState(today(getLocalTimeZone()));
  let formatter = useDateFormatter({ dateStyle: "long" });

  const endContent = {
    date: (
      <Popover placement="bottom" showArrow={true}>
        <PopoverTrigger>
          <Button isIconOnly variant="solid" className="bg-transparent">
            <MdCalendarMonth size={20} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <RangeCalendar
            aria-label={label}
            isRequired={true}
            variant={"flat"}
            minValue={today(getLocalTimeZone())}
            visibleMonths={2}
            pageBehavior={"single"}
            value={dateValue}
            onChange={(value) => {
              setDateValue(value);
              onValueChange(value);
            }}
            focusedValue={focusedValue}
            onFocusChange={setFocusedValue}
            classNames={{
              base: "w-[512px]",
              content: "w-[512px]",
              gridWrapper: "bg-white-default/80",
              cellButton: [
                "data-[disabled=true]:text-lightgrey-default",
                "data-[unavailable=true]:text-lightgrey-default/70",
                "data-[selected=true]:data-[range-selection=true]:data-[outside-month=true]:text-black-default/80",
                "data-[selected=true]:data-[range-selection=true]:text-blue-default",
                "data-[selected=true]:data-[range-selection=true]:before:bg-blue-default/20",
                "data-[selected=true]:data-[selection-start=true]:data-[range-selection=true]:bg-blue-default/90 ",
                "data-[selected=true]:data-[selection-end=true]:data-[range-selection=true]:bg-blue-default/90 ",
                "data-[selected=true]:data-[selection-start=true]:data-[range-selection=true]:text-white-default",
                "data-[selected=true]:data-[selection-end=true]:data-[range-selection=true]:text-white-default",
              ],
            }}
          />
        </PopoverContent>
      </Popover>
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
    number: /^[0-9\s+.,()-]+$/i,
    date: /^(January|February|March|April|May|June|July|August|September|October|November|December)\s*([1-9]|[12][0-9]|3[01]),\s+(19|20)\d{2}$/g,
    file: /.*\.pdf$/,
  };

  const inputValidation = (input) => input?.match(inputValidationType[type]);

  const isInvalid = useMemo(() => {
    if (typeof value === "object") return false;
    if (value === "") return false;

    if (type === "date") {
      try {
        return false;
        // return inputValidation(format(date, "LLLL d, y")) ? false : true;
      } catch (err) {
        return true;
      }
    }

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
        validationBehavior={"native"}
        size={"md"}
        label={label}
        fullWidth={fullWidth}
        endContent={endContent[endContentType]}
        errorMessage={
          isInvalid ? (errorMessage ? errorMessage : errorMessages[type]) : ""
        }
        data-label={Boolean(label)}
        value={
          dateValue && withDate
            ? formatter.formatRange(
                dateValue.start.toDate(getLocalTimeZone()),
                dateValue.end.toDate(getLocalTimeZone())
              )
            : value
        }
        // value={value}
        onValueChange={(value) => {
          onValueChange(value);
        }}
        classNames={{
          base: [`${fullWidth ? "w-full" : "w-[370px]"}`],
          label: [
            // `${isInvalid ? "!text-red-default" : "!text-black-default/80"}`,
            "after:!text-red-default",
            "text-sm font-medium",
            "min-w-fit tracking-tight mb-2.5",
          ],
          input: [
            // `${
            //   isInvalid
            //     ? "!placeholder:text-red-default placeholder:text-red-default"
            //     : "!placeholder:text-black-default/90 placeholder:text-black-default/90"
            // }`,
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
