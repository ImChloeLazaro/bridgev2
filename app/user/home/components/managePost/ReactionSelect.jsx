import React from "react";
import { Select, SelectItem, Avatar, Chip } from "@nextui-org/react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { reactionIcons } from "../post/ReactionIcons";
// ### TODO Add Functionality

const reactions = [
  {
    id: 1,
    key: "love",
    label: "Love",
    selectIcon: reactionIcons.love.badge,
    displayIcon: reactionIcons.love.borderBadge,
  },
  {
    id: 2,
    key: "birthday",
    label: "Birthday",
    selectIcon: reactionIcons.birthday.badge,
    displayIcon: reactionIcons.birthday.borderBadge,
  },
  {
    id: 3,
    key: "star",
    label: "Star",
    selectIcon: reactionIcons.star.badge,
    displayIcon: reactionIcons.star.borderBadge,
  },
  {
    id: 4,
    key: "happy",
    label: "Happy",
    selectIcon: reactionIcons.happy.badge,
    displayIcon: reactionIcons.happy.borderBadge,
  },
];

const ReactionSelect = () => {
  const [values, setValues] = React.useState(new Set([]));
  return (
    <Select
      aria-label="Reaction Selection"
      items={reactions}
      variant="bordered"
      isMultiline={true}
      selectionMode="multiple"
      description="This will be the displayed reaction on your post"
      placeholder="Select reaction/s"
      labelPlacement="outside"
      defaultSelectedKeys={"all"}
      selectedKeys={values}
      onSelectionChange={setValues}
      classNames={{
        base: "max-w-xs",
        trigger: "min-h-unit-12 py-2",
      }}
      renderValue={(displayItems) => {
        console.log("displayItems: ", displayItems);
        return (
          <div className="flex flex-wrap gap-2">
            {displayItems.map((displayItem) => (
              <Chip
                key={displayItem.key}
                startContent={displayItem.data.displayIcon}
                onClose={() => {
                  setValues(() =>
                    Array.from(values).filter(
                      (item) => item !== displayItem.key
                    )
                  );
                }}
              >
                {displayItem.data.name}
              </Chip>
            ))}
          </div>
        );
      }}
    >
      {(reaction) => (
        <SelectItem key={reaction.id} textValue={reaction.label}>
          <div className="flex gap-2 items-center">
            {reaction.selectIcon}
            {reaction.label}
          </div>
        </SelectItem>
      )}
    </Select>
  );
};
export default ReactionSelect;
