import { Avatar, Chip, Select, SelectItem } from "@nextui-org/react";
import { useAtom, useAtomValue } from "jotai";
import { MdGroups } from "react-icons/md";
import {
  selectedTaggedPeopleAtom,
  taggedPeopleListAtom,
} from "../../store/ManagePostStore";
import { restread } from "@/app/utils/amplify-rest";
import { useState, useEffect } from "react";

const TagPersonSelect = () => {

  
  let taggedIndex = 0;
  const [taggedPeopleList, setTaggedPeopleList] = useState([]);
  const [selectedTaggedPeople, setSelectedTaggedPeople] = useState(new Set([]));

  useEffect(()=> {
    const fetchData = async () => {
      try {
        const response = await restread("/user/tagged");
        // Assign IDs to tagged people and update the state
        const updatedTaggedPeople = response.result.map(person => ({
          ...person,
          id: ++taggedIndex,
          key: person._id,
        }));

        // Extract emails from fetched data
        const emails = response.result.map(person => person.email);
        console.log("wrappedEmails", emails); 
        setTaggedPeopleList([
          {
              id: "all",
              key: "all",
              name: "@all",
              email: [emails],
              picture: null,
          },
          ...updatedTaggedPeople
      ]);
      
      } catch (error) {
        console.error("Error fetching tagged people:", error);
      }
    };
    return () => fetchData();
  },[])
  // const taggedPeopleList = [
  //   {
  //     id: (taggedIndex += 1),
  //     key: "all",
  //     name: "@all",
  //     email: "tagged everyone",
  //     picture: null,
  //     team: "",
  //   },
  //   {
  //     id: (taggedIndex += 1),
  //     key: "team",
  //     name: "@team",
  //     email: "tagged your team",
  //     picture: null,
  //     team: "",
  //   },
  //   {
  //     id: (taggedIndex += 1),
  //     key: "tatiana philips",
  //     name: "Tatiana Philips",
  //     email: "tatiana.philips@aretex.com.au",
  //     picture: "/Tatiana Philips.png",
  //     team: "",
  //   },
  //   {
  //     id: (taggedIndex += 1),
  //     key: "aspen donin",
  //     name: "Aspen Donin",
  //     email: "aspen.donin@aretex.com.au",
  //     picture: "/Aspen Donin.png",
  //     team: "",
  //   },
  //   {
  //     id: (taggedIndex += 1),
  //     key: "kaylynn bergson",
  //     name: "Kaylynn Bergson",
  //     email: "kaylynn.bergson@aretex.com.au",
  //     picture: "/Kaylynn Bergson.png",
  //     team: "",
  //   },
  //   {
  //     id: (taggedIndex += 1),
  //     key: "madelyn septimus",
  //     name: "Madelyn Septimus",
  //     email: "madelyn.septimus@aretex.com.au",
  //     picture: "/Madelyn Septimus.png",
  //     team: "",
  //   },
  //   {
  //     id: (taggedIndex += 1),
  //     key: "skylar curtis",
  //     name: "Skylar Curtis",
  //     email: "skylar.curtis@aretex.com.au",
  //     picture: "/Skylar Curtis.png",
  //     team: "",
  //   },
  //   {
  //     id: (taggedIndex += 1),
  //     key: "wilson herwitz",
  //     name: "Wilson Herwitz",
  //     email: "wilson.herwitz@aretex.com.au",
  //     picture: "/Wilson Herwitz.png",
  //     team: "",
  //   },
  // ]

  return (
    <Select
      aria-label="Tag People Selection"
      items={taggedPeopleList}
      variant="bordered"
      isMultiline={true}
      selectionMode="multiple"
      placeholder="Tag people"
      labelPlacement="outside"
      defaultSelectedKeys={"all"}
      selectedKeys={selectedTaggedPeople}
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
export default TagPersonSelect;
