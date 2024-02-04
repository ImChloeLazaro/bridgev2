import React, { useState } from "react";
import { SelectItem } from "@nextui-org/react";
import { Select, Input, Chip } from "@nextui-org/react";
import { MdFilterAlt } from "react-icons/md";
import { LuSearch } from "react-icons/lu";

const filterKeys = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "DMS",
    value: "dms",
  },
  {
    label: "Financials",
    value: "financials",
  },
];

const SearchBar = () => {
  const [values, setValues] = useState(new Set([]));

  return (
    <div className="flex gap-0">
      <Select
        size="sm"
        radius="lg"
        aria-label="Post Filter Selection"
        items={filterKeys}
        variant="flat"
        isMultiline={true}
        placeholder="All"
        selectedKeys={values}
        className="max-w-xs"
        onSelectionChange={setValues}
        startContent={<MdFilterAlt size={24} />}
        classNames={{
          trigger: "min-h-unit-10 rounded-r-none",
          // mainWrapper: "w-fit",
        }}
        // renderValue={(displayItems) => {
        //   console.log("displayItems: ", displayItems);
        //   return (
        //     <div className="flex flex-wrap gap-2">
        //       {displayItems.map((displayItem) => (
        //         <Chip
        //           key={displayItem.key}
        //           onClose={() => {
        //             setValues(() =>
        //               Array.from(values).filter(
        //                 (item) => item !== displayItem.key
        //               )
        //             );
        //           }}
        //         >
        //           {displayItem.data.label}
        //         </Chip>
        //       ))}
        //     </div>
        //   );
        // }}
      >
        {(filter) => <SelectItem key={filter.value}>{filter.label}</SelectItem>}
      </Select>
      <Input
        labelPlacement="outside"
        startContent={
          <div className="text-lightgrey-default">
            <LuSearch size={18} />
          </div>
        }
        endContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-lightgrey-default text-small">
              {"Search"}
            </span>
          </div>
        }
        classNames={{ inputWrapper: ["bg-white-default rounded-l-none"], mainWrapper:["w-64"] }}
      />
    </div>
  );
};

export default SearchBar;
