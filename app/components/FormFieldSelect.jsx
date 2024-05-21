import {
  Divider,
  Input,
  Chip,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";

const FormFieldSelect = ({
  label,
  items = { label: "label", key: "key", value: "value" },
  placeholder = "",
  selectionMode = "single",
  selectedKeys,
  selectionContent,
  onSelectionChange,
  renderContent,
  renderClose,
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
      onSelectionChange={(key) => onSelectionChange(key)}
      classNames={{
        base: "",
        trigger: "min-h-unit-12 py-2 rounded-small",
      }}
      {...props}
      //   renderValue={(displayItems) => {
      //     return renderContent;
      //   }}
    >
      {selectionContent ? selectionContent : (item) => (
        <SelectItem key={item.value} value={item.value} textValue={item.label}>
          {item.label ? item.label : item.name}
        </SelectItem>
      )}
    </Select>
  );
};

export default FormFieldSelect;
