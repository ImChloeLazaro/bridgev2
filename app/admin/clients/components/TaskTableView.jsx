import LabelTagChip from "@/app/components/LabelTagChip";
import { tableColumnsAtom, tasksAtom } from "@/app/store/TaskStore";
import {
  Avatar,
  AvatarGroup,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { format } from "date-fns";
import { useAtomValue } from "jotai";
import { useMemo } from "react";
import { useCallback, useState } from "react";

const tagColors = {
  todo: "blue",
  inProgress: "orange",
  done: "green",
  forReview: "yellow",
  due: "red",
  pending: "darkgrey",
};

const TaskTableView = ({
  sortedItemTasks,
  showClientTask,
  changeView,
  sortDescriptor,
  setSortDescriptor,
}) => {
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));

  const tasks = useAtomValue(tasksAtom);
  const tableColumns = useAtomValue(tableColumnsAtom);

  // console.log("itemTasks after", itemTasks);

  // const [sortDescriptor, setSortDescriptor] = useState({
  //   column: "name",
  //   direction: "ascending",
  // });

  const renderCell = useCallback((task, columnKey) => {
    const cellValue = task[columnKey];
    const processorList = task.processor?.length ? task.processor : [];

    switch (columnKey) {
      case "task":
        return <div>{task.name?.length ? task.name : ""}</div>;

      case "status":
        return (
          <LabelTagChip
            size="md"
            text={task.status?.length ? task.status : ""}
            color={tagColors[task.status?.length ? task.status : ""]}
          />
        );

      case "startDate":
        return (
          <div>
            {format(
              task.duration.start?.length ? task.duration.start : "",
              "d  MMMM yyyy"
            )}
          </div>
        );

      case "endDate":
        return (
          <div>
            {format(
              task.duration.end?.length ? task.duration.end : "",
              "d  MMMM yyyy"
            )}
          </div>
        );

      case "assignees":
        return (
          <div className="h-full flex justify-start">
            <AvatarGroup size="md" max={3}>
              {processorList.map((processor) => {
                return (
                  <Avatar
                    key={processor.sub}
                    size="md"
                    src={"https://picsum.photos/200"}
                  />
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
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
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
            <TableColumn key={column.key} allowsSorting={column.sortable}>
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No rows to display."} items={sortedItemTasks}>
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
  );
};

export default TaskTableView;
