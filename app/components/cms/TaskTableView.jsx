import LabelTagChip from "@/app/components/LabelTagChip";
import { selectedClientToViewAtom } from "@/app/store/ClientStore";
import { tableColumnsAtom } from "@/app/store/TaskStore";
import {
  Avatar,
  AvatarGroup,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Link,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { format } from "date-fns";
import { useAtomValue, useSetAtom } from "jotai";
import { useCallback, useMemo, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { MdRefresh } from "react-icons/md";

const tagColors = {
  todo: "blue",
  inProgress: "orange",
  done: "green",
  forReview: "yellow",
  due: "red",
  pending: "darkgrey",
};

const TaskTableView = ({
  itemTasks,
  showClientTask,
  changeView,
  sortDescriptor,
  setSortDescriptor,
  setShowClientTask,
}) => {
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));

  const selectedClientToView = useAtomValue(selectedClientToViewAtom);
  const tableColumns = useAtomValue(tableColumnsAtom);

  const handleRefreshTable = () => {
    setShowClientTask(false);
  };

  const sortedItemTasks = useMemo(() => {
    return [...itemTasks].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [itemTasks, sortDescriptor]);

  const renderCell = useCallback((task, columnKey) => {
    const cellValue = task[columnKey];
    const processorList = task.processor?.length ? task.processor : [];

    switch (columnKey) {
      case "task":
        return (
          <Link
            href="#"
            underline="hover"
            className="text-xl font-semibold text-black-default "
          >
            {task.name?.length ? task.name : ""}
          </Link>
        );

      case "status":
        return (
          <LabelTagChip
            size="md"
            text={
              task.status?.length
                ? `${task.status === "forReview" ? "For Review" : task.status}`
                : ""
            }
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
                    src={processor.picture}
                  />
                );
              })}
            </AvatarGroup>
          </div>
        );

      case "action":
        return (
          <Dropdown>
            <DropdownTrigger>
              <Button
                aria-label={"Shortcut Options"}
                isIconOnly
                className="bg-transparent"
              >
                <div className="">
                  <BiDotsVerticalRounded size={24} />
                </div>
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Action event example"
              onAction={(key) => alert(key)}
            >
              <DropdownItem key="new">New file</DropdownItem>
              <DropdownItem key="copy">Copy link</DropdownItem>
              <DropdownItem key="edit">Edit file</DropdownItem>
              <DropdownItem key="delete" className="text-danger" color="danger">
                Delete file
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        );

      default:
        return cellValue;
    }
  }, []);

  return !selectedClientToView?.length ? (
    <div
      data-view={showClientTask}
      className="hidden data-[view=true]:flex w-full h-full justify-center items-center text-clip"
    >
      <div className="flex flex-col items-center justify-center">
        <Image width={450} height={450} alt={"No Data"} src={"/no-data.webp"} />
        <p className="text-lg font-medium text-black-default/80">
          {"No Data to Display"}
        </p>

        <Link
          href="#"
          underline="hover"
          className="text-lg font-medium text-black-default/80 flex gap-1"
          onPress={handleRefreshTable}
        >
          <MdRefresh size={20} />
          <p>{"Refresh"}</p>
        </Link>
      </div>
    </div>
  ) : (
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
            <TableRow key={item._id}>
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
