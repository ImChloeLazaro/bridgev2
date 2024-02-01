import { useState } from "react";
import { Select, SelectItem, Avatar, Chip } from "@nextui-org/react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { reactionIcons } from "../post/ReactionIcons";
// ### TODO Add Functionality

const people = [
  {
    id: 1,
    name:"Tatiana Philips",
    email:"tatiana.philips@aretex.com.au",
    picture: "/Tatiana Philips.png",
  },
  {
    id: 2,
    name:"Aspen Donin",
    email:"aspen.donin@aretex.com.au",
    picture: "/Aspen Donin.png",
  },
  {
    id: 3,
    name:"Kaylynn Bergson",
    email:"kaylynn.bergson@aretex.com.au",
    picture: "/Kaylynn Bergson.png",
  },
  {
    id: 4,
    name:"Madelyn Septimus",
    email:"madelyn.septimus@aretex.com.au",
    picture: "/Madelyn Septimus.png",
  },
  {
    id: 5,
    name:"Skylar Curtis",
    email:"skylar.curtis@aretex.com.au",
    picture: "/Skylar Curtis.png",
  },
  {
    id: 6,
    name:"Wilson Herwitz",
    email:"wilson.herwitz@aretex.com.au",
    picture: "/Wilson Herwitz.png",
  },
];

const TagPersonSelect = () => {
  const [values, setValues] = useState(new Set([]));
  return (
    <Select
      aria-label="Tag People Selection"
      items={people}
      variant="bordered"
      isMultiline={true}
      selectionMode="multiple"
    //   description="This will be the displayed reaction on your post"
      placeholder="Tag people"
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
                startContent={displayItem.data.picture}
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
      {(person) => (
        <SelectItem key={person.id} textValue={person.name}>
          <div className="flex gap-2 items-center">
            <Avatar alt={person.name} className="flex-shrink-0" size="sm" src={person.picture} />
            <div className="flex flex-col">
              <span className="text-small">{person.name}</span>
              <span className="text-tiny text-default-400">{person.email}</span>
            </div>
          </div>
        </SelectItem>
      )}
    </Select>
  );
};
export default TagPersonSelect;
