import { Select, SelectItem } from "@nextui-org/react";
import { useAtom, useAtomValue } from "jotai";
import {
  mediaLayoutSelectionAtom,
  selectedMediaLayoutAtom,
  selectedMediaOrientationAtom,
} from "../../store/ManagePostStore";

const MediaLayoutSelect = () => {
  const [selectedMediaLayout, setSelectedMediaLayout] = useAtom(
    selectedMediaLayoutAtom
  );
  const [selectedMediaOrientation, setSelectedMediaOrientation] = useAtom(
    selectedMediaOrientationAtom
  );

  const mediaLayoutSelection = useAtomValue(mediaLayoutSelectionAtom);
  const selectedMediaLayoutString = Array.from(selectedMediaLayout).join("");

  return (
    <Select
      aria-label="Media Layout Selection"
      items={mediaLayoutSelection}
      disallowEmptySelection={true}
      placeholder="Choose Layout"
      selectedKeys={selectedMediaLayout}
      onSelectionChange={(key) => {
        console.log(key);
        setSelectedMediaLayout(key);
        selectedMediaLayoutString === "single"
          ? setSelectedMediaOrientation(new Set(["portrait"]))
          : setSelectedMediaOrientation(selectedMediaOrientation);
      }}
      classNames={{
        base: "",
        trigger: "min-h-unit-12 py-2",
      }}
    >
      {(layout) => (
        <SelectItem
          key={layout.value}
          value={layout.value}
          textValue={layout.label}
        >
          {layout.label}
        </SelectItem>
      )}
    </Select>
  );
};
export default MediaLayoutSelect;
