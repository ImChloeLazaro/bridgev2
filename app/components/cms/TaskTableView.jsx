import LabelTagChip from "@/app/components/LabelTagChip";
import { tableColumnsAtom } from "@/app/store/TaskStore";
import {
  Avatar,
  AvatarGroup,
  Image,
  Link,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Spinner,
} from "@nextui-org/react";
import { format } from "date-fns";
import { useAtomValue, useSetAtom } from "jotai";
import { useCallback, useMemo, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { MdRefresh } from "react-icons/md";
import TaskOptionsDropdown from "./TaskOptionsDropdown";
import { MdCheck } from "react-icons/md";

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
  selectedClientToView,
  actions,
  isLoading,
}) => {
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));

  const tableColumns = useAtomValue(tableColumnsAtom);

  const handleRefreshTable = () => {
    setShowClientTask(false);
  };

  const taskAlert = () => {};

  const sortedItemTasks = useMemo(() => {
    return [...itemTasks].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [itemTasks, sortDescriptor]);

  const renderCell = useCallback(
    (task, columnKey) => {
      const cellValue = task[columnKey];
      const processorList = task.processor?.length ? task.processor : [];
      const actionOptions = [
        {
          key: "mark",
          color: task.status === "done" ? "yellow" : "green",
          label: task.status === "done" ? "Mark for review" : `Mark as done`,
          icon: <MdCheck size={18} />,
        },
        ...actions,
      ];

      switch (columnKey) {
        case "task":
          return (
            <Link
              href="#"
              underline="hover"
              className="text-sm lg:text-lg font-bold text-black-default "
            >
              {task.name?.length ? task.name : ""}
            </Link>
          );

        case "status":
          return (
            <LabelTagChip
              size="md"
              text={`${
                task.status === "forReview" ? "For Review" : task.status
              }`}
              color={tagColors[task.status?.length ? task.status : ""]}
              type="label"
              isFilled
              className={"px-2 py-2"}
              classNameLabel={"text-sm lg:text-md"}
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
              <AvatarGroup max={3}>
                {processorList.map((processor) => {
                  return (
                    <Avatar
                      key={processor.sub}
                      // showFallback
                      // fallback={<Spinner />}
                      src={processor.picture}
                      classNames={{
                        base: [
  
                          " w-10 h-10 lg:w-12 lg:h-12 text-large",
                        ],
                      }}
                    />
                  );
                })}
              </AvatarGroup>
            </div>
          );

        case "action":
          return (
            <TaskOptionsDropdown
              id={task?._id}
              task={task}
              actions={actionOptions}
              trigger={<BiDotsVerticalRounded size={24} />}
            />
          );

        default:
          return cellValue;
      }
    },
    [actions]
  );

  return !selectedClientToView?.length ? (
    <div
      data-change={changeView}
      data-view={showClientTask}
      className="hidden data-[view=true]:flex data-[change=true]:hidden w-full h-full justify-center items-center text-clip"
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
      className="hidden data-[view=true]:flex data-[change=true]:hidden max-lg:h-full"
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
        // onRowAction={(key) => alert(`Opening item ${key}...`)}
        classNames={{
          base: "rounded-none lg:rounded-[1rem] h-full px-0 lg:px-2 xl:px-6",
          tbody: "h-full max-h-screen",
          wrapper: [
            "rounded-none lg:rounded-large",
            "relative justify-start items-start p-0",
            "overflow-y-scroll no-scrollbar",
            "max-w-full h-full max-h-screen",
          ],
          tr: "text-sm lg:text-lg h-18 max-h-sm ",
          th: "text-md lg:text-lg font-extrabold text-darkgrey-hover h-16 max-h-sm pl-2 pr-3 lg:pl-8 lg:pr-4 text-left",
          td: [
            "text-sm lg:text-lg font-bold text-black-default h-18 max-h-sm pl-2 pr-3 lg:pl-8 lg:pr-4 text-left",
            "group-data-[last=true]:before:w-3",
            "group-data-[hover=true]:bg-grey-default",
          ],
        }}
      >
        <TableHeader columns={tableColumns}>
          {(column) => (
            <TableColumn key={column.key} allowsSorting={column.sortable}>
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={"No available tasks."}
          items={isLoading ? [] : sortedItemTasks}
          isLoading={isLoading}
          loadingContent={
            <div className="flex justify-center items-center">
              <Spinner label="Loading..." />
            </div>
          }
        >
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
