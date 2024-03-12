import { Pagination, Select, SelectItem, cn } from "@nextui-org/react";
import { useAtomValue } from "jotai";
import { useState } from "react";
import { pageRowsSelectionAtom } from "../store/CMSStore";

const ClientFooter = ({
  clientsListCount,
  displayedClients,
  setDisplayedClients,
  className,
}) => {
  const [value, setValue] = useState(new Set(["10"]));

  const pageRowsSelection = useAtomValue(pageRowsSelectionAtom);
  const isDisabled = clientsListCount <= displayedClients;

  const handleRowsPerPage = (select) => {
    setValue(select);
    setDisplayedClients(Array.from(select).join(""));
  };

  return (
    <div
      className={cn(
        "w-full flex items-center justify-between px-12",
        className
      )}
    >
      <div className="w-1/3">
        <p>{`Showing ${
          isDisabled ? clientsListCount : displayedClients
        } of ${clientsListCount} results`}</p>
      </div>
      <div className="w-1/3 h-fit flex justify-center items-center py-2 gap-2">
        <div className="h-full">{`Rows per page: `}</div>
        <Select
          items={pageRowsSelection}
          aria-label="Client Select Filter"
          disallowEmptySelection
          variant={"underlined"}
          selectedKeys={value}
          className="max-w-16 mb-0"
          onSelectionChange={(select) => {
            handleRowsPerPage(select);
          }}
          classNames={{ popoverContent: "w-20" }}
        >
          {(pageRow) => (
            <SelectItem key={pageRow.value} value={pageRow.value}>
              {pageRow.label}
            </SelectItem>
          )}
        </Select>
      </div>
      <Pagination
        isCompact
        showControls
        isDisabled={isDisabled}
        total={
          isDisabled
            ? clientsListCount
            : Math.ceil(clientsListCount / displayedClients) +
              Math.ceil(clientsListCount % displayedClients)
        }
        initialPage={1}
        className="w-1/3 flex justify-end"
        classNames={{ cursor: "bg-blue-default" }}
      />
    </div>
  );
};

export default ClientFooter;
