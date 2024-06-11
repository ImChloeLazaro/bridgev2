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
  selectionContent,
  onSelectionChange,
  renderItemPicture = false,
  renderType = "dropdown",
  classNames,
  ...props
}) => {
  const type = {
    chip: "",
    dropdown: "",
  };
  return (
    <Select
      aria-label={label}
      items={items}
      disallowEmptySelection={true}
      placeholder={placeholder}
      selectionMode={selectionMode}
      selectedKeys={selectedKeys}
      onSelectionChange={onSelectionChange}
      classNames={{
        base: "h-full",
        trigger: "min-h-unit-12 h-full py-2 rounded-small",
      }}
      {...props}
      renderValue={(displayItems) => {
        return (
          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
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
      }}
    >
      {(item) => (
        <SelectItem
          key={item.key ? item.key : item._id}
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
      )}
    </Select>
  );
};

export default FormFieldSelect;
