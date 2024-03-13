import React, { useState } from "react";
import { SelectItem } from "@nextui-org/react";
import { Select, Input, Chip } from "@nextui-org/react";
import { MdFilterAlt } from "react-icons/md";
import { LuSearch } from "react-icons/lu";

const SearchBar = ({
  type = "filter",
  searchItem,
  setSearchItem,
  filterKeys,
  selectedFilterKeys,
  setSelectedFilterKeys,
}) => {
  const typeVariant = {
    search: (
      <Input
        value={searchItem}
        onValueChange={setSearchItem}
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
        classNames={{
          inputWrapper: ["bg-white-default border shadow-sm"],
          mainWrapper: ["w-64 max-w-64"],
        }}
      />
    ),
    filter: (
      <>
        <Select
          size="sm"
          radius="lg"
          aria-label="Post Filter Selection"
          items={filterKeys}
          variant="flat"
          isMultiline={true}
          placeholder="All"
          disallowEmptySelection={true}
          selectedKeys={selectedFilterKeys}
          className="max-w-xs"
          onSelectionChange={setSelectedFilterKeys}
          startContent={<MdFilterAlt size={24} />}
          classNames={{
            trigger: "min-h-unit-10 rounded-r-none border border-r-0 shadow-sm",
            mainWrapper: "w-32 max-w-48",
          }}
        >
          {(filter) => (
            <SelectItem key={filter.value}>{filter.label}</SelectItem>
          )}
        </Select>
        <Input
          value={searchItem}
          onValueChange={setSearchItem}
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
          classNames={{
            inputWrapper: [
              "bg-white-default rounded-l-none border border-l-0 shadow-sm",
            ],
            mainWrapper: ["w-64 max-w-64"],
          }}
        />
      </>
    ),
  };
  return <div className="flex gap-0">{typeVariant[type]}</div>;
};

export default SearchBar;
