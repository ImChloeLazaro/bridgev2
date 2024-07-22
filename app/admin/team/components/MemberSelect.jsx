import { Avatar, Chip, Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import { MdGroups } from "react-icons/md";

import {
  selectedTaggedPeopleAtom,
  taggedPeopleListAtom,
} from "@/app/user/home/store/ManagePostStore";
import { subTeamMembersAtom } from "@/app/tl/cms/store/CMSTLStore";

const MemberSelect = ({
  placeholder,
  name,
  handleInvitees,
  defaultSelectedKeys = new Set(),
  useGlobalState = false,
}) => {
  const [selectedInvitees, setSelectedInvitees] = useGlobalState
    ? useAtom(selectedTaggedPeopleAtom)
    : useState(defaultSelectedKeys);
  const PeopleList = useAtomValue(taggedPeopleListAtom);
  const subTeamMembers = useAtomValue(subTeamMembersAtom);

  const filteredTeamMembersSelection = subTeamMembers
    .map((team) => team.members.map((member) => member))
    .flat()
    .filter(
      (obj1, i, arr) => arr.findIndex((obj2) => obj2._id === obj1._id) === i
    );

  const handleSelectionChange = (selectedKeys) => {
    const selectedPeople = Array.from(selectedKeys)
      .map((key) => {
        const person = filteredTeamMembersSelection.find(
          (item) => item.sub === key
        );
        // Return only the required properties
        return person
          ? {
              sub: person.sub,
              email: person.email,
              name: person.name,
              picture: person.picture,
            }
          : null;
      })
      .filter(Boolean); // Filter out any null values (in case a person is not found)

    console.log("Selected people:", selectedPeople);
    if (useGlobalState) {
      setSelectedInvitees(selectedKeys);
    } else {
      setSelectedInvitees(selectedKeys);
    }

    if (typeof handleInvitees === "function") {
      handleInvitees(selectedPeople);
    }
  };

  return (
    <Select
      name={name}
      aria-label={placeholder}
      items={filteredTeamMembersSelection}
      variant="bordered"
      isMultiline={true}
      selectionMode="multiple"
      placeholder={placeholder}
      labelPlacement="outside"
      selectedKeys={selectedInvitees}
      onSelectionChange={(selectedKeys) => handleSelectionChange(selectedKeys)}
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
                  setSelectedInvitees(
                    (prev) =>
                      new Set(
                        [...prev].filter((item) => item !== displayItem.key)
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
        <SelectItem key={person.sub} textValue={person.name}>
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
                <span className="text-small ">{person.name}</span>
              ) : (
                <span className="text-small font-bold">{person.name}</span>
              )}
              <span className="text-tiny text-default-400">{person.email}</span>
            </div>
          </div>
        </SelectItem>
      )}
    </Select>
  );
};

export default MemberSelect;
