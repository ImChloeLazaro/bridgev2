import { Pagination, Select, SelectItem, cn } from "@nextui-org/react";
import { useAtomValue } from "jotai";
import { useState } from "react";
import { pageRowsSelectionAtom } from "../store/CMSStore";

const CMSFooter = ({
  showFooter,
  currentItemsCount,
  itemListCount,
  startPage,
  setPage,
  rowsPerPage = [],
  setRowsPerPage,
  totalPages,
  className,
}) => {
  
  let rowsPerPageNumber = isNaN(parseInt(Array.from(rowsPerPage).join("")))
    ? 10
    : parseInt(Array.from(rowsPerPage).join(""));

  console.log("rowsPerPage", rowsPerPageNumber);

  const pageRowsSelection = useAtomValue(pageRowsSelectionAtom);
  const isDisabled = itemListCount <= rowsPerPageNumber;

  const handleRowsPerPage = (select) => {
    setRowsPerPage(select);
  };

  return (
    <div
    data-show={showFooter}
      className={cn(
        "flex data-[show=true]:hidden w-full items-center justify-between px-12 ",
        className
      )}
    >
      <div className="w-1/3">
        <p>{`Showing ${
          isDisabled ? currentItemsCount : rowsPerPageNumber
        } of ${itemListCount} results`}</p>
      </div>
      <div className="w-1/3 h-fit flex justify-center items-center py-2 gap-2">
        <div className="h-full">{`Rows per page: `}</div>
        <Select
          items={pageRowsSelection}
          aria-label="Rows per Page Filter"
          disallowEmptySelection
          variant={"underlined"}
          selectedKeys={rowsPerPage}
          className="max-w-16 mb-0"
          onSelectionChange={(select) => {
            handleRowsPerPage(select);
          }}
          // onSelectionChange={setRowsPerPage}
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
        // showShadow
        isDisabled={isDisabled}
        total={totalPages}
        initialPage={1}
        page={startPage}
        onChange={(page) => setPage(page)}
        className="w-1/3 flex justify-end"
        classNames={{ cursor: "bg-blue-default" }}
      />
    </div>
  );
};

export default CMSFooter;
