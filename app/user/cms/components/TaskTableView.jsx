import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";
import { AvatarGroup, Avatar } from "@nextui-org/react";

import { useAtom, useAtomValue } from "jotai";
import { useCallback, useState } from "react";

import ClientFooter from "./CMSFooter";
import ClientHeader from "./CMSHeader";
import { selectedClientAtom } from "@/app/store/ClientStore";
import {
  selectedTaskFilterKeysAtom,
  tableColumnsAtom,
  taskFilterKeysAtom,
  tasksAtom,
} from "@/app/store/TaskStore";

const TaskTableView = () => {
  const [searchItem, setSearchItem] = useState("");
  const [selectedAllClients, setSelectedAllClients] = useState(false);
  const [displayedClients, setDisplayedClients] = useState("10");

  const tasks = useAtomValue(tasksAtom);
  const tableColumns = useAtomValue(tableColumnsAtom);
  const selectedClient = useAtomValue(selectedClientAtom);

  const taskFilterKeys = useAtomValue(taskFilterKeysAtom);
  const [selectedTaskFilterKeys, setSelectedTaskFilterKeys] = useAtom(
    selectedTaskFilterKeysAtom
  );

  const tasksFromSelectedClient = tasks.filter(
    (task) => task.clientKey === selectedClient
  );

  const filteredTaskList = tasksFromSelectedClient.filter((task) => {
    return task.task.toLowerCase().includes(searchItem.toLowerCase());
  });

  const renderCell = useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    console.log("USER INSIDE RENDER CELL");

    switch (columnKey) {
      case "task":
        return <div>{"task"}</div>;

      case "status":
        return <div>{"status"}</div>;

      case "startDate":
        return <div>{"startDate"}</div>;

      case "endDate":
        return <div>{"endDate"}</div>;

      case "assignees":
        return (
          <div className="h-full flex justify-start">
            <AvatarGroup size="md" max={4} total={10}>
              <Avatar
                size="md"
                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
              />
            </AvatarGroup>
          </div>
        );

      default:
        return cellValue;
    }
  }, []);

  return (
    <div className="bg-white-default p-4 m-2 rounded-[1rem] max-h-screen">
      <ClientHeader
        searchItem={searchItem}
        setSearchItem={setSearchItem}
        selectedAllClients={selectedAllClients}
        setSelectedAllClients={setSelectedAllClients}
        showCheckBox={false}
        showActionButtons={false}
        filterKeys={taskFilterKeys}
        selectedFilterKeys={selectedTaskFilterKeys}
        setSelectedFilterKeys={setSelectedTaskFilterKeys}
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
          <TableHeader columns={tableColumns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={filteredTaskList}>
            {(item) => (
              <TableRow key={item.key}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
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

export default TaskTableView;
