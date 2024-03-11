import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";
import { useAtomValue } from "jotai";
import { useState } from "react";
import {
  clientsListCountAtom,
  taskTableColsAtom,
  taskTableRowsAtom,
  taskTableRowsCountAtom,
} from "../store/CMSStore";
import ClientFooter from "./ClientFooter";
import ClientHeader from "./ClientHeader";

const ClientItemTable = ({ data }) => {
  const [searchItem, setSearchItem] = useState("");
  const [selectedAllClients, setSelectedAllClients] = useState(false);
  const [displayedClients, setDisplayedClients] = useState("10");
  const taskTableRowsCount = useAtomValue(taskTableRowsCountAtom);
  const taskTableRows = useAtomValue(taskTableRowsAtom);
  const taskTableCols = useAtomValue(taskTableColsAtom);

  const filteredTaskList = taskTableRows.filter((task) => {
    return task.task.toLowerCase().includes(searchItem.toLowerCase());
  });

  return (
    <div className="bg-white-default p-4 m-2 rounded-[1rem] max-h-screen">
      <ClientHeader
        searchItem={searchItem}
        setSearchItem={setSearchItem}
        selectedAllClients={selectedAllClients}
        setSelectedAllClients={setSelectedAllClients}
        showCheckBox={false}
        showActionButtons={false}
        className={"sticky top-0"}
      />
      <div className="p-4">
        <Table
          aria-label="Rows actions table example with dynamic content"
          // isStriped
          isHeaderSticky
          showSelectionCheckboxes
          selectionMode="multiple"
          selectionBehavior={"toggle"}
          onRowAction={(key) => alert(`Opening item ${key}...`)}
          emptyContent={"No rows to display."}
          classNames={{
            base: "rounded-[1rem] h-[50rem] ",
            table: "min-h-[420px]",
            wrapper:
              "relative max-w-full h-full max-h-screen text-clip justify-start items-start p-0 overflow-y-scroll",
            th: "text-lg font-extrabold text-darkgrey-hover h-16 max-h-sm pl-8 pr-4",
            td: "text-lg font-bold text-darkgrey-default h-18 max-h-sm pl-8 pr-4",
            tr: "text-lg max-h-sm",
          }}
        >
          <TableHeader columns={taskTableCols}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={filteredTaskList}>
            {(item) => (
              <TableRow key={item.key}>
                {(columnKey) => (
                  <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <ClientFooter
        clientsListCount={filteredTaskList.length}
        displayedClients={displayedClients}
        setDisplayedClients={setDisplayedClients}
      />
    </div>
  );
};

export default ClientItemTable;
