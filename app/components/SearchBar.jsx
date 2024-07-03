import { Input, Select, SelectItem } from "@nextui-org/react";
import { LuSearch } from "react-icons/lu";
import { MdFilterAlt } from "react-icons/md";

const SearchBar = ({
  disabledSearch = false,
  disabledFilter = false,
  showSearchBar,
  type = "filter",
  endLabel = "Search",
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
          <div className="hidden md:block text-lightgrey-default">
            <LuSearch size={18} />
          </div>
        }
        endContent={
          <>
            <div className="block md:hidden text-lightgrey-default mx-2">
              <LuSearch size={18} />
            </div>

            <div
              data-show={Boolean(searchItem?.length)}
              className="data-[show=true]:hidden flex pointer-events-none items-center mx-2 min-w-fit"
            >
              <p className="text-darkgrey-hover text-small">{endLabel}</p>
            </div>
          </>
        }
        classNames={{
          base: "w-full min-w-20",
          inputWrapper: ["px-3 bg-white-default border shadow-sm"],
          mainWrapper: ["w-full"],
          input: "mt-1",
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
            base: "data-[disabled=true]:cursor-not-allowed w-full min-w-16 max-w-28 md:max-w-32 lg:max-w-48",
            trigger: "min-h-10 rounded-r-none border border-r-0 shadow-sm",
            value:
              "hidden min-[320px]:block min-[320px]:w-2/3 min-[320px]:truncate",
            popoverContent: "min-w-fit",
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
          aria-label={"SearchBar search function"}
          isDisabled={disabledSearch}
          value={searchItem}
          onValueChange={setSearchItem}
          labelPlacement={"outside"}
          startContent={
            <div className="hidden md:block text-lightgrey-default">
              <LuSearch size={18} />
            </div>
          }
          endContent={
            <>
              <div className="block md:hidden text-lightgrey-default mx-2">
                <LuSearch size={18} />
              </div>

              <div
                data-show={Boolean(searchItem?.length)}
                className="data-[show=true]:hidden flex pointer-events-none items-center mx-2 min-w-fit"
              >
                <p className="text-darkgrey-hover text-small">{endLabel}</p>
              </div>
            </>
          }
          classNames={{
            base: "w-full lg:w-96",
            inputWrapper: [
              "px-3 bg-white-default rounded-l-none border border-l-0 shadow-sm",
            ],
            mainWrapper: ["w-full"],
            input: "mt-1",
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
