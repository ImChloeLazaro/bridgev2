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
        endContent={
          <>
            <div className="text-lightgrey-default">
              <LuSearch size={18} />
            </div>
          </>
        }
        classNames={{
          base: "w-20 min-[320px]:w-24 min-[425px]:w-32 md:w-full",
          inputWrapper: ["bg-white-default border shadow-sm"],
          mainWrapper: ["w-full"],
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
          // selectionMode="multiple"
          disallowEmptySelection={true}
          selectedKeys={selectedFilterKeys}
          onSelectionChange={setSelectedFilterKeys}
          startContent={<MdFilterAlt size={20} />}
          classNames={{
            base: "data-[disabled=true]:cursor-not-allowed w-full max-w-48 md:max-w-56",
            trigger: "min-h-10 rounded-r-none border border-r-0 shadow-sm",
            mainWrapper: "w-full",
            value:
              "hidden min-[320px]:block min-[320px]:w-2/3 min-[320px]:truncate",
          }}
        >
          {(filter) => (
            <SelectItem key={filter.value} id={filter.value}>
              {filter.label}
            </SelectItem>
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
            <div className="hidden md:block text-lightgrey-default">
              <LuSearch size={18} />
            </div>
          }
          endContent={
            <>
              <div className="block md:hidden text-lightgrey-default">
                <LuSearch size={18} />
              </div>
              <div className="hidden md:flex pointer-events-none items-center">
                <span className="text-darkgrey-hover text-small">
                  {"Search"}
                </span>
              </div>
            </>
          }
          classNames={{
            base: "w-full",
            inputWrapper: [
              "bg-white-default rounded-l-none border border-l-0 shadow-sm",
            ],
            mainWrapper: ["w-full"],
          }}
        />
      </>
    ),
  };
  return (
    <div
      data-show={showSearchBar}
      className="w-full flex justify-start data-[show=false]:hidden gap-0 "
    >
      {typeVariant[type]}
    </div>
  );
};

export default SearchBar;
