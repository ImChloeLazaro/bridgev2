import { Pagination, Select, SelectItem } from "@nextui-org/react";

const CMSFooter = ({
  showFooter = true,
  displayedItemCount,
  totalItemCount = 0,
  pageRowsSelection,
  page = 1,
  setPage,
  rowsPerPage = [],
  setRowsPerPage,
  totalPages = 0,
}) => {
  const handleRowsPerPage = (select) => {
    setRowsPerPage(select);
  };

  return (
    <div
      data-show={showFooter}
      className={
        "hidden data-[show=true]:flex w-full items-center justify-center lg:justify-between px-0 lg:px-12 "
      }
    >
      <div className="hidden lg:block w-1/3 text-sm lg:text-md">
        <p>{`Showing ${displayedItemCount} out of ${totalItemCount} ${
          totalItemCount === 1 ? "result" : "results"
        } `}</p>
      </div>
      <div className="hidden lg:flex w-1/3 h-fit justify-center items-center py-2 gap-2">
        <p className="h-full text-sm lg:text-md">{`Rows per page: `}</p>
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
        aria-label={"CMS Page Footer User"}
        isCompact
        showControls
        total={totalPages <= 0 ? 1 : totalPages}
        initialPage={1}
        page={page}
        onChange={(page) => setPage(page)}
        className="px-0 lg:p-2.5 w-full lg:w-1/3 flex justify-center lg:justify-end data-[total]"
        classNames={{
          wrapper: "max-w-full lg:max-w-fit flex w-full justify-between",
          cursor: "hidden lg:flex bg-blue-default",
        }}
      />
    </div>
  );
};

export default CMSFooter;
