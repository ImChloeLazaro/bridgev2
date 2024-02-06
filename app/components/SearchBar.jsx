import React, { useState } from "react";
import { SelectItem } from "@nextui-org/react";
import { Select, Input, Chip } from "@nextui-org/react";
import { MdFilterAlt } from "react-icons/md";
import { LuSearch } from "react-icons/lu";
import { useAtomValue, useAtom } from "jotai";
import {
  filterKeysAtom,
  selectedFilterKeysAtom,
} from "../user/home/store/ManagePostStore";

const SearchBar = ({ searchItem, setSearchItem }) => {
  const [selectedFilterKeys, setSelectedFilterKeys] = useAtom(
    selectedFilterKeysAtom
  );
  const filterKeys = useAtomValue(filterKeysAtom);

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
        selectedKeys={selectedFilterKeys}
        className="max-w-xs"
        onSelectionChange={setSelectedFilterKeys}
        startContent={<MdFilterAlt size={24} />}
        classNames={{
          trigger: "min-h-unit-10 rounded-r-none",
          mainWrapper: "w-32 max-w-48",
        }}
      >
        {(filter) => <SelectItem key={filter.value}>{filter.label}</SelectItem>}
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
          inputWrapper: ["bg-white-default rounded-l-none"],
          mainWrapper: ["w-64 max-w-64"],
        }}
      />
    </div>
  );
};

export default SearchBar;
