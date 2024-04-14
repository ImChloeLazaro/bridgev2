import { Input, Select, SelectItem } from "@nextui-org/react";
import { LuSearch } from "react-icons/lu";
import { MdFilterAlt } from "react-icons/md";

const SearchBar = ({
  disabledSearch = false,
  disabledFilter = false,
  showSearchBar,
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
        radius={"sm"}
        aria-label="SearchBar search function"
        isDisabled={disabledSearch}
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
            <span className="text-darkgrey-default text-small">
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
          isDisabled={disabledFilter}
          size="sm"
          radius={"sm"}
          aria-label="SearchBar filter function"
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
            mainWrapper: "w-44 max-w-48",
          }}
        >
          {(filter) => (
            <SelectItem key={filter.value} id={filter.value}>{filter.label}</SelectItem>
          )}
        </Select>
        <Input
          radius={"sm"}
          aria-label="SearchBar search function"
          isDisabled={disabledSearch}
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
              <span className="text-darkgrey-hover text-small">
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
  return (
    <div
      data-show={showSearchBar}
      className="flex data-[show=false]:hidden gap-0 "
    >
      {typeVariant[type]}
    </div>
  );
};

export default SearchBar;
