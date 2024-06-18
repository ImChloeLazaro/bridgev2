import {
  Divider,
  Input,
  Chip,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";
import { useAtom, useAtomValue } from "jotai";
import { MdGroups, MdPerson } from "react-icons/md";
const FormFieldSelect = ({
  label,
  items = { label: "label", key: "key", value: "value" },
  placeholder = "",
  selectionMode = "single",
  selectedKeys,
  onSelectionChange,
  // selectionContent,
  isRequired,
  isDisabled,
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
              {displayItem.data.picture ? (
                <p className="font-sm">{displayItem.data.name}</p>
              ) : (
                <p className="font-bold">{displayItem.data.name}</p>
              )}
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
              {displayItem.data.name}
            </p>
          ))}
        </div>
      );
    },
  };
  let selection = new Set([...items]) ?? new Set([]);
  return (
    <Select
      label={label}
      aria-label={label}
      items={selection}
      isRequired={isRequired}
      isDisabled={isDisabled ? isDisabled : selection.size === 0}
      disallowEmptySelection={true}
      placeholder={placeholder}
      selectionMode={selectionMode}
      selectedKeys={new Set([...selectedKeys])}
      onSelectionChange={onSelectionChange}
      className={className}
      classNames={{
        base: `h-full ${
          selection.size === 0 ? "cursor-not-allowed pointer-events-auto" : ""
        }`,
        label: "mt-2",
        trigger: [
          `${renderType === "dropdown" ? "py-0" : "py-2"}`,
          "justify-start min-h-unit-12 h-full rounded-small",
        ],
        selectorIcon: "justify-center data[has-label=true]:mt-4",
      }}
      {...props}
      renderValue={renderItemType[renderType]}
    >
      {(item) => {
        return (
          <SelectItem
            key={item.key ? item.key : item.sub ? item.sub : item._id}
            value={item.value}
            textValue={item.label}
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
