import {
  getLocalTimeZone,
  Time,
  toCalendarDateTime,
  today,
  isWeekend,
  CalendarDate,
} from "@internationalized/date";
import {
  Button,
  Calendar,
  cn,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  RangeCalendar,
  TimeInput,
} from "@nextui-org/react";
import { format, isSameDay, isValid } from "date-fns";
import { useCallback, useMemo } from "react";
import {
  MdAccessTime,
  MdCalendarMonth,
  MdClose,
  MdFileUpload,
} from "react-icons/md";
import CTAButtons from "./CTAButtons";
import { useLocale } from "@react-aria/i18n";

const FormFieldInput = ({
  placeholder = "",
  label = "",
  type = "text",
  value,
  onValueChange,
  errorMessage,
  isRequired = false,
  isDisabled = false,
  isReadOnly = false,
  withFile = false,
  withDate = false,
  withTime = false,
  isDateRange = false,
  showPastDate = true,
  fullWidth = false,
  inputType,
  inputFileRef,
  inputID,
  dateRangeValue,
  onDateRangeValueChange,
  timeStartValue,
  onTimeStartValueChange,
  timeEndValue,
  onTimeEndValueChange,
  className,
  ...props
}) => {
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

  let { locale } = useLocale();

  let isDateUnavailable = (date) => isWeekend(date, locale);
  let minimumDateTime = new CalendarDate(2000, 1, 1);

  const endContent = {
    date: (
      <Popover
        placement="top"
        showArrow={true}
        backdrop="opaque"
        classNames={{
          base: "w-full",
          content: "w-full",
          backdrop: "bg-black-default/40",
        }}
      >
        <PopoverTrigger>
          <Button isIconOnly variant="solid" className="bg-transparent">
            <MdCalendarMonth size={20} />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={`bg-grey-default ${withTime ? "p-0" : "pb-4 pt-0 px-0"}`}
        >
          {isDateRange ? (
            <RangeCalendar
              aria-label={label}
              variant={"flat"}
              minValue={
                showPastDate ? minimumDateTime : today(getLocalTimeZone())
              }
              focusedValue={today(getLocalTimeZone())}
              visibleMonths={2}
              pageBehavior={"single"}
              value={dateRangeValue}
              onChange={(dateRange) => {
                onDateRangeValueChange(dateRange);
                onValueChange(
                  isSameDay(
                    dateRange.start.toString(),
                    dateRange.end.toString()
                  )
                    ? format(
                        toCalendarDateTime(
                          dateRange.start,
                          timeStartValue
                        ).toString(),
                        withTime ? "PPp" : "PP"
                      )
                    : format(
                        toCalendarDateTime(
                          dateRange.start,
                          timeStartValue
                        ).toString(),
                        withTime ? "PPp" : "PP"
                      ) +
                        " - " +
                        format(
                          toCalendarDateTime(
                            dateRange.end,
                            timeEndValue
                          ).toString(),
                          withTime ? "PPp" : "PP"
                        )
                );
              }}
              classNames={{
                base: "w-[512px] bg-white-default/80 shadow-none",
                content: "w-[512px] bg-white-default/80",
                title: "font-bold text-black-default",
                headerWrapper: "bg-white-default",
                gridHeader: "bg-white-default",
                gridHeaderRow: "font-normal text-black-default gap-3",
                gridBody: "bg-grey-default",
                gridBodyRow: "gap-3",
                gridWrapper: "bg-white-default/80 pb-0",
                cellButton: [
                  "data-[hover=true]:bg-orange-default/60",
                  "data-[hover=true]:text-white-default",
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
              bottomContent={
                withTime && (
                  <div className="flex bg-white-default">
                    <TimeInput
                      label="Start Time"
                      minValue={new Time()}
                      value={timeStartValue}
                      onChange={(timeStart) => {
                        onTimeStartValueChange(timeStart);
                        onValueChange(
                          format(
                            toCalendarDateTime(
                              dateRangeValue.start,
                              timeStart
                            ).toString(),
                            withTime ? "PPp" : "PP"
                          ) +
                            " - " +
                            format(
                              toCalendarDateTime(
                                dateRangeValue.end,
                                timeEndValue
                              ).toString(),
                              withTime ? "PPp" : "PP"
                            )
                        );
                      }}
                      startContent={<MdAccessTime size={16} />}
                      classNames={{
                        label: "text-xs font-medium text-black-default",
                        inputWrapper:
                          "pl-6 shadow-none rounded-none bg-white-default",
                      }}
                    />
                    <TimeInput
                      label="Due Time"
                      minValue={new Time()}
                      value={timeEndValue}
                      onChange={(timeEnd) => {
                        onTimeEndValueChange(timeEnd);
                        onValueChange(
                          format(
                            toCalendarDateTime(
                              dateRangeValue.start,
                              timeStartValue
                            ).toString(),
                            withTime ? "PPp" : "PP"
                          ) +
                            " - " +
                            format(
                              toCalendarDateTime(
                                dateRangeValue.end,
                                timeEnd
                              ).toString(),
                              withTime ? "PPp" : "PP"
                            )
                        );
                      }}
                      startContent={<MdAccessTime size={16} />}
                      classNames={{
                        label: "text-xs font-medium text-black-default",
                        inputWrapper:
                          "pl-6 shadow-none rounded-none bg-white-default",
                      }}
                    />
                  </div>
                )
              }
            />
          ) : (
            <Calendar
              isDateUnavailable={isDateUnavailable}
              showMonthAndYearPickers={true}
              aria-label={label}
              variant={"flat"}
              minValue={
                showPastDate ? minimumDateTime : today(getLocalTimeZone())
              }
              value={dateRangeValue?.start}
              onChange={(dateRange) => {
                onDateRangeValueChange((prev) => {
                  return { ...prev, start: dateRange };
                });
                onValueChange(
                  format(
                    toCalendarDateTime(dateRange).toString(),
                    withTime ? "PPp" : "PP"
                  )
                );
              }}
              classNames={{
                base: "w-full bg-white-default/80 shadow-none",
                content: "w-full bg-white-default/80",
                title: "font-bold text-black-default",
                headerWrapper: "bg-white-default",
                gridHeader: "bg-white-default",
                gridHeaderRow: "font-normal text-black-default gap-3",
                gridBody: "bg-grey-default",
                gridBodyRow: "gap-3",
                gridWrapper: "bg-white-default/80 pb-0",
                cellButton: [
                  "data-[hover=true]:bg-orange-default/60",
                  "data-[hover=true]:text-white-default",
                  "data-[disabled=true]:text-lightgrey-default",
                  "data-[unavailable=true]:text-lightgrey-default/70",
                  "data-[selected=true]:bg-blue-default/90",
                  "data-[selected=true]:text-white-default",
                  "data-[selected=true]:data-[hover=true]:bg-blue-default/90",
                  "data-[selected=true]:data-[hover=true]:text-white-default",
                  "data-[unavailable=true]:no-underline",
                ],
              }}
            />
          )}
        </PopoverContent>
      </Popover>
    ),
    file: (
      <>
        {/* Separate input file EndContent Component to its own component so it can be shared */}
        {!value ? (
          <CTAButtons
            color="clear"
            htmlFor={inputID}
            startContent={<MdFileUpload size={18} />}
          >
            <label
              htmlFor={inputID}
              className="font-medium text-sm lg:text-base"
            >
              {"Upload File"}
            </label>
          </CTAButtons>
        ) : (
          <CTAButtons
            color="clear"
            htmlFor={inputID}
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
    date: "Please enter a valid date time",
    file: "PDF file is only accepted",
    phone: "Please enter a valid phone number",
  };

  // fix validation for datetime
  const inputValidationType = {
    email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i,
    text: /^[\u00D1\u00F1A-Z0-9\s!?.%&#+;:'"()-_\\]+$/i,
    number: /^[0-9\s+.,()-]+$/i,
    file: /.*\.pdf$/,
    phone: /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/gm, // with area code e.g. (+63: PH +61: AU)
  };

  const inputValidation = (input) => input?.match(inputValidationType[type]);

  const isInvalid = useMemo(() => {
    if (value === "") return false;

    if (type === "date") {
      if (isDateRange) {
        return !(
          isValid(
            toCalendarDateTime(dateRangeValue.start, timeStartValue).toDate()
          ) &&
          isValid(
            toCalendarDateTime(dateRangeValue.end, timeEndValue).toDate()
          ) &&
          timeStartValue?.compare(timeEndValue) < 0
        );
      } else {
        return !(
          isValid(
            toCalendarDateTime(dateRangeValue.start, timeStartValue).toDate()
          ) &&
          isValid(toCalendarDateTime(dateRangeValue.end, timeEndValue).toDate())
        );
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
        isReadOnly={withFile || withDate || withTime}
        isDisabled={isDisabled}
        isRequired={isRequired}
        isInvalid={isInvalid}
        validationBehavior={"native"}
        size={"md"}
        label={label}
        fullWidth={fullWidth}
        endContent={endContent[type]}
        errorMessage={
          isInvalid ? (errorMessage ? errorMessage : errorMessages[type]) : ""
        }
        data-label={Boolean(label)}
        value={value}
        onValueChange={onValueChange}
        classNames={{
          base: [`${fullWidth ? "w-full" : "w-[370px]"}`],
          label: [
            "after:!text-red-default",
            "text-sm font-medium",
            "min-w-fit tracking-tight mb-2.5",
          ],
          input: ["aria-invalid:!text-red-default", "text-sm font-medium"],
          inputWrapper: cn("text-sm font-medium", "px-3 py-2"),
          errorMessage: ["font-medium text-red-default"],
        }}
        {...props}
      />
    </>
  );
};

export default FormFieldInput;
