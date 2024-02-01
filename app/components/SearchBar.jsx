import React from "react";
import { Select, Input } from "@nextui-org/react";
import { MdFilterAlt } from "react-icons/md";
import { LuSearch } from "react-icons/lu";

const SearchBar = () => {
  return (
    <div className="">
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
      />
    </div>
    // <MdFilterAlt size={24}/>
  );
};

export default SearchBar;
