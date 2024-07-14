import { Avatar, Chip, Select, SelectItem } from "@nextui-org/react";
import { useMemo, useState } from "react";
import { MdPerson } from "react-icons/md";

const FormFieldSelect = ({
  label,
  items = { label: "label", key: "key", value: "value" },
  placeholder = "",
  selectionMode = "single",
  selectedKeys,
  onSelectionChange,
  isRequired,
  isDisabled,
  disabledValidation = false,
  errorMessage,
  renderItemPicture = false,
  renderType = "dropdown",
  className,
  ...props
}) => {
  const renderItemType = {
    chip: (displayItems) => {
      return (
        <div className="flex flex-wrap gap-2 py-2 max-h-32 overflow-y-auto">
          {displayItems.map((displayItem) => (
            <Chip
              key={displayItem.key}
              startContent={displayItem.data.picture}
              onClose={() => {
                onSelectionChange(() =>
                  Array.from(selectedKeys).filter(
                    (item) => item !== displayItem.key
                  )
                );
              }}
            >
              {
                <p className="font-sm">
                  {displayItem.data.label
                    ? displayItem.data.label
                    : displayItem.data.name}
                </p>
              }
            </Chip>
          ))}
        </div>
      );
    },
    dropdown: (displayItems) => {
      return (
        <div className="flex flex-wrap gap-2 py-2 max-h-32 overflow-y-auto">
          {displayItems.map((displayItem) => (
            <p
              key={displayItem.key}
              className="text-sm font-medium text-black-default"
            >
              {displayItem.data.label
                ? displayItem.data.label
                : displayItem.data.name}
            </p>
          ))}
        </div>
      );
    },
  };
  const [touched, setTouched] = useState(false);

  let selection = new Set([...items]) ?? new Set([]);
  let selected = useMemo(() => {
    return new Set([...selectedKeys]) ?? new Set([]);
  }, [selectedKeys]);

  const errorMessages = {
    selection: "Please select an item.",
  };

  const isInvalid = useMemo(() => {
    if (disabledValidation) {
      return false;
    }
    let validSelections = new Set(
      [...items].map((item) => (item?.sub ? item?.sub : item?.key))
    );

    return validSelections.intersection(selected)?.size === 0;
  }, [disabledValidation, items, selected]);

  return (
    <Select
      label={label}
      aria-label={label ?? "Selection"}
      items={selection}
      isRequired={true}
      isDisabled={isDisabled ? isDisabled : selection.size === 0}
      isInvalid={!isInvalid || !touched ? false : true}
      validationBehavior={"native"}
      disallowEmptySelection={true}
      placeholder={placeholder}
      selectionMode={selectionMode}
      selectedKeys={selected}
      onSelectionChange={onSelectionChange}
      renderValue={renderItemType[renderType]}
      onClose={() => setTouched(true)}
      errorMessage={
        isInvalid || !touched
          ? errorMessage
            ? errorMessage
            : errorMessages["selection"]
          : ""
      }
      className={className}
      classNames={{
        base: `h-full mb-1 ${
          selection.size === 0 ? "cursor-not-allowed pointer-events-auto" : ""
        }`,
        label: "mt-2",
        trigger: [
          `${renderType === "dropdown" ? "" : "py-2"}`,
          "justify-start min-h-unit-12 h-full rounded-small",
          ,
        ],
        selectorIcon: ["group-data-[has-label=true]:mt-3"],
        value: [
          // `${
          //   isInvalid
          //     ? "!text-red-default !placeholder:text-red-default "
          //     : "!text-black-default/90 !placeholder:text-black-default/90"
          // }`,
        ],
      }}
      {...props}
    >
      {(item) => {
        return (
          <SelectItem
            key={item.key ? item.key : item.sub ? item.sub : item._id}
            textValue={item.key ? item.key : item.sub ? item.sub : item._id}
          >
            <div className="flex gap-2 items-center">
              {renderItemPicture && item.picture ? (
                <Avatar
                  alt={item.name}
                  size="sm"
                  src={item.picture}
                  showFallback
                  fallback={
                    <MdPerson
                      size={18}
                      className="text-white-default"
                      fill="currentColor"
                    />
                  }
                  className="flex-shrink-0 bg-blue-default text-white-default"
                />
              ) : null}
              <p className="text-sm font-medium text-black-default">
                {item.label ? item.label : item.name}
              </p>
            </div>
          </SelectItem>
        );
      }}
    </Select>
  );
};

export default FormFieldSelect;
