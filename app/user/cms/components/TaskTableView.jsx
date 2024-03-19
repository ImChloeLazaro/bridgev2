import {
  Avatar,
  AvatarGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

import { useAtom, useAtomValue } from "jotai";
import { useCallback, useState } from "react";

import { selectedClientToViewAtom } from "@/app/store/ClientStore";
import {
  selectedTaskFilterKeysAtom,
  tableColumnsAtom,
  taskFilterKeysAtom,
  tasksAtom,
} from "@/app/store/TaskStore";
import CMSFooter from "./CMSFooter";
import ClientHeader from "./CMSHeader";
import LabelTagChip from "@/app/components/LabelTagChip";

const tagColors = {
  todo: "blue",
  inProgress: "orange",
  done: "green",
  forReview: "yellow",
  due: "red",
  pending: "darkgrey",
};

const TaskTableView = ({ searchItem, showClientTask, changeView }) => {
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [selectedAllClients, setSelectedAllClients] = useState(false);
  const [displayedClients, setDisplayedClients] = useState("10");

  const tasks = useAtomValue(tasksAtom);
  const tableColumns = useAtomValue(tableColumnsAtom);
  const selectedClientToView = useAtomValue(selectedClientToViewAtom);
  const taskFilterKeys = useAtomValue(taskFilterKeysAtom);
  const [selectedTaskFilterKeys, setSelectedTaskFilterKeys] = useAtom(
    selectedTaskFilterKeysAtom
  );

  console.log("tasks", tasks);

  const tasksFromSelectedClient = tasks.filter(
    (task) => task.clientKey === selectedClientToView
  );

  const filteredTask = selectedTaskFilterKeys.has("all")
    ? tasksFromSelectedClient
    : tasksFromSelectedClient.filter((task) => {
        return selectedTaskFilterKeys.has(task.status.toLowerCase());
      });

  const filteredTaskList = filteredTask.filter((task) => {
    return task.name.toLowerCase().includes(searchItem.toLowerCase());
  });

  const renderCell = useCallback((task, columnKey) => {
    const cellValue = task[columnKey];

    switch (columnKey) {
      case "task":
        return <div>{task.name}</div>;

      case "status":
        return (
          <LabelTagChip
            size="md"
            text={task.status.toLowerCase()}
            color={tagColors[task.status.toLowerCase()]}
          />
        );

      case "startDate":
        return <div>{task.startDate}</div>;

      case "endDate":
        return <div>{task.endDate}</div>;

      case "assignees":
        return (
          <div className="h-full flex justify-start">
            <AvatarGroup size="md" max={4} total={10}>
              {task.processor.map((assignee) => {
                return (
                  <Avatar key={assignee._id} size="md" src={assignee.picture} />
                );
              })}
            </AvatarGroup>
          </div>
        );

      default:
        return cellValue;
    }
  }, []);

  return (
    <div
      data-change={changeView}
      data-view={showClientTask}
      className="hidden data-[view=true]:flex data-[change=true]:hidden "
    >
      <Table
        aria-label="Rows actions table example with dynamic content"
        // isStriped
        isHeaderSticky
        // showSelectionCheckboxes
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        selectionBehavior={"toggle"}
        onRowAction={(key) => alert(`Opening item ${key}...`)}
        classNames={{
          base: "rounded-[1rem] h-full px-6 ",
          tbody: "h-full max-h-screen ",
          wrapper:
            "relative max-w-full h-full max-h-screen text-clip justify-start items-start p-0 overflow-y-scroll no-scrollbar",
          th: "text-lg font-extrabold text-darkgrey-hover h-16 max-h-sm pl-8 pr-4 text-left",
          td: "text-lg font-bold text-darkgrey-default h-18 max-h-sm pl-8 pr-4 text-left",
          tr: "text-lg h-18 max-h-sm",
        }}
      >
        <TableHeader columns={tableColumns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={"No rows to display."}
          items={filteredTaskList}
        >
          {(item) => (
            <TableRow key={item.index}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TaskTableView;
