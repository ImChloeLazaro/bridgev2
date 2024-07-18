import { Avatar, Chip, Select, SelectItem } from "@nextui-org/react";
import { useAtom, useAtomValue } from "jotai";
import { MdGroups } from "react-icons/md";
import {
  selectedTaggedPeopleAtom,
  taggedPeopleListAtom,
} from "../../store/ManagePostStore";

const TagPersonSelect = () => {
  const [selectedTaggedPeople, setSelectedTaggedPeople] = useAtom(
    selectedTaggedPeopleAtom
  );
  const taggedPeopleList = useAtomValue(taggedPeopleListAtom);

  const keys = taggedPeopleList.map((tag) => {
    if (tag.key !== "all") {
      return tag.key;
    }
  });

  return (
    <>
      <Select
        aria-label="Tag People Selection"
        items={taggedPeopleList}
        variant="bordered"
        selectionMode="multiple"
        placeholder="Tag people"
        labelPlacement="outside"
        selectedKeys={selectedTaggedPeople}
        disabledKeys={
          Array.from(selectedTaggedPeople).join("") === "all" ? keys : null
        }
        onSelectionChange={setSelectedTaggedPeople}
        classNames={{
          base: "",
          trigger: "min-h-unit-12 py-2",
        }}
        renderValue={(displayItems) => {
          return (
            <div className="flex flex-wrap gap-2">
              {displayItems.map((displayItem) => (
                <Chip
                  key={displayItem.key}
                  startContent={displayItem.data.picture}
                  onClose={() => {
                    setSelectedTaggedPeople(() =>
                      Array.from(selectedTaggedPeople).filter(
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
        {(person) => (
          <SelectItem key={person.key} textValue={person.name}>
            <div className="flex gap-2 items-center">
              <Avatar
                alt={person.name}
                size="sm"
                src={person.picture}
                showFallback
                fallback={<MdGroups size={18} />}
                className="flex-shrink-0 bg-blue-default text-white-default"
              />
              <div className="flex flex-col">
                {person.picture ? (
                  <p className="text-small ">{person.name}</p>
                ) : (
                  <p className="text-small font-bold">{person.name}</p>
                )}

                <p className="text-xs text-darkgrey-default">
                  {person.key === "all"
                    ? "aretex.family@aretex.com.au"
                    : person.email}
                </p>
              </div>
            </div>
          </SelectItem>
        )}
      </Select>
    </>
  );
};
export default TagPersonSelect;
