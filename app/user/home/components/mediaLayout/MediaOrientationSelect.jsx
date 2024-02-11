import { Avatar, Chip, Select, SelectItem } from "@nextui-org/react";
import { useAtom, useAtomValue } from "jotai";
import { MdGroups } from "react-icons/md";
import {
  mediaOrientationSelectionAtom,
  selectedMediaLayoutAtom,
  selectedMediaOrientationAtom,
  selectedTaggedPeopleAtom,
  taggedPeopleListAtom,
} from "../../store/ManagePostStore";

const MediaOrientationSelect = () => {
  const [selectedMediaOrientation, setSelectedMediaOrientation] = useAtom(
    selectedMediaOrientationAtom
  );
  const mediaOrientationSelection = useAtomValue(mediaOrientationSelectionAtom);
  const selectedMediaLayout = useAtomValue(selectedMediaLayoutAtom);

  const selectedMediaLayoutString = Array.from(selectedMediaLayout).join("");

  return (
    <Select
      isDisabled={selectedMediaLayoutString === "single"}
      aria-label="Media Layout Selection"
      items={mediaOrientationSelection}
      disallowEmptySelection={true}
      placeholder="Choose Orientation"
      selectedKeys={
        selectedMediaLayoutString === "single"
          ? new Set(["portrait"])
          : selectedMediaOrientation
      }
      onSelectionChange={(key) => setSelectedMediaOrientation(key)}
      classNames={{
        base: "max-w-sm",
        trigger: "min-h-unit-12 py-2",
      }}
    >
      {(orientation) => (
        <SelectItem
          key={orientation.value}
          value={orientation.value}
          textValue={orientation.label}
        >
          {orientation.label}
        </SelectItem>
      )}
    </Select>
  );
};
export default MediaOrientationSelect;
