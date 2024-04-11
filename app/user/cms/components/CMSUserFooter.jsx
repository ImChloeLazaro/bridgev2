import { Pagination, Select, SelectItem } from "@nextui-org/react";
import { useAtomValue } from "jotai";
import { pageRowsSelectionAtom } from "../store/CMSUserStore";

const CMSUserFooter = ({
  showFooter = true,
  displayedItemCount,
  totalItemCount = 0,
  page = 1,
  setPage,
  rowsPerPage = [],
  setRowsPerPage,
  totalPages = 0,
}) => {
  const pageRowsSelection = useAtomValue(pageRowsSelectionAtom);

  const handleRowsPerPage = (select) => {
    setRowsPerPage(select);
  };

  return (
    <div
      data-show={showFooter}
      className={
        "hidden data-[show=true]:flex w-full items-center justify-between px-12 "
      }
    >
      <div className="w-1/3">
        <p>{`Showing ${displayedItemCount} out of ${totalItemCount} results`}</p>
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
        total={totalPages <= 0 ? 1 : totalPages}
        initialPage={1}
        page={page}
        onChange={(page) => setPage(page)}
        className="w-1/3 flex justify-end"
        classNames={{ cursor: "bg-blue-default" }}
      />
    </div>
  );
};

export default CMSUserFooter;
