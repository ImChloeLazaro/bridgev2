import React from "react";
import { Select, SelectItem, Avatar, Chip } from "@nextui-org/react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { reactionIcons } from "./ReactionIcons";
import {
  reactionsSelectionAtom,
  selectedReactionsAtom,
} from "../../store/ManagePostStore";
import { useAtomValue, useAtom } from "jotai";

const ReactionSelect = () => {
  const [selectedReactions, setSelectedReactions] = useAtom(
    selectedReactionsAtom
  );
  const reactionsSelection = useAtomValue(reactionsSelectionAtom);

  return (
    <Select
      aria-label="Reaction Selection"
      items={reactionsSelection}
      variant="bordered"
      isMultiline={true}
      selectionMode="single"
      description="This will be the default reaction displayed on your post"
      placeholder="Select reaction"
      labelPlacement="outside"
      defaultSelectedKeys={"all"}
      selectedKeys={selectedReactions}
      onSelectionChange={setSelectedReactions}
      classNames={{
        base: "max-w-sm",
        trigger: "min-h-unit-12 py-2",
      }}
      renderValue={(displayItems) => {
        return (
          <div className="flex flex-wrap gap-2 items-center">
            {displayItems.map((displayItem) => (
              // <Chip
              //   key={displayItem.key}
              //   startContent={displayItem.data.displayIcon}
              //   onClose={() => {
              //     setSelectedReactions(() =>
              //       Array.from(selectedReactions).filter(
              //         (item) => item !== displayItem.key
              //       )
              //     );
              //   }}
              // >
              //   {displayItem.data.name}
              // </Chip>
              <>
                <div className="">{displayItem.data.displayIcon}</div>
                <div className="text-sm text-black-default">
                  {displayItem.data.label}
                </div>
              </>
            ))}
          </div>
        );
      }}
    >
      {(reaction) => (
        <SelectItem key={reaction.key} textValue={reaction.label}>
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
