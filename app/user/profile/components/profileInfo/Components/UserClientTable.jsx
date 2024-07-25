import React, { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Pagination, Select, SelectItem } from "@nextui-org/react";
import { Button, Dropdown } from "react-day-picker";

const UserClientTable = ({ data, columns }) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const rowOptions = ["5", "10", "15", "20"];

  columns;
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });

  const handleClick = (row) => {
    // row.getToggleSelectedHandler();
    console.log("Row: ", row?.original);
  };

  return (
    <>
      <table className="table-auto w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  style={{
                    position: "relative",
                    maxwidth: header.getSize(),
                  }}
                >
                  {header.isPlaceholder ? null : (
                    <div className="min-w-[40px]">
                      {flexRender(
                        header.column.columnDef.Header,
                        header.getContext()
                      )}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:cursor-pointer">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  style={{ width: cell.column.getSize() }}
                  className={`${
                    row.getIsSelected() ? "bg-gray-200" : "border-b"
                  } py-[10px]`}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className=" flex grid grid-cols-4">
        <div className="flex justify-start items-center text-sm text-darkgrey-default">
          Page {table.getState().pagination.pageIndex + 1} out of{" "}
          {table.getPageCount().toLocaleString()}
        </div>
        <div className="flex justify-center items-center col-span-2">
          <Pagination
            total={table.getPageCount()}
            isCompact
            initialPage={1}
            showControls
            onChange={(e) => {
              table.setPageIndex(Number(e - 1));
            }}
            classNames={{
              wrapper: "max-w-full lg:max-w-fit flex w-full justify-between",
              cursor: "hidden lg:flex bg-blue-default",
            }}
          />
        </div>
        <div className="flex justify-end items-center">
          <p className="text-sm text-darkgrey-default text-center hidden sm:block">
            Rows Per Page
          </p>
          <Select
            defaultSelectedKeys={["5"]}
            className="max-w-16"
            classNames={{ popoverContent: "w-20" }}
            size="sm"
            aria-label="Rows to Show"
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {rowOptions.map((option) => (
              <SelectItem key={option}>{option}</SelectItem>
            ))}
          </Select>
        </div>
      </div>
    </>
  );
};

export default UserClientTable;
