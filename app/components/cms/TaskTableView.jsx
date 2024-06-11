import LabelTagChip from "@/app/components/LabelTagChip";
import { tableColumnsAtom } from "@/app/store/TaskStore";
import {
  Avatar,
  AvatarGroup,
  Image,
  Link,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import { compareAsc, format } from "date-fns";
import { useAtomValue } from "jotai";
import { useCallback, useMemo, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { MdCheck, MdPerson, MdRefresh } from "react-icons/md";
import TaskActionModal from "./TaskActionModal";
import TaskOptionsDropdown from "./TaskOptionsDropdown";
// @refresh reset

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
  tasksFromSelectedClient,
  selectedProcessorTaskAction,
  setSelectedProcessorTaskAction,
  selectedReviewerTaskAction,
  setSelectedReviewerTaskAction,
  isLoading,
  isMobile,
}) => {
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));

  const tableColumns = useAtomValue(tableColumnsAtom);

  console.log(
    "TASK ID",
    itemTasks.filter((task) => task.clientKey === selectedClientToView)
  );

  const handleRefreshTable = () => {
    setShowClientTask(false);
  };

  const {
    // confirmation window
    isOpen: isOpenPopup,
    onOpen: onOpenPopup,
    onOpenChange: onOpenChangePopup,
  } = useDisclosure();

  const {
    // modal window for selecting processor and reviewer
    isOpen: isOpenTaskAction,
    onOpen: onOpenTaskAction,
    onOpenChange: onOpenChangeTaskAction,
  } = useDisclosure();

  const taskAlert = () => {};

  const sortedItemTasks = useMemo(() => {
    return [...itemTasks].sort((a, b) => {
      let first = a[sortDescriptor.column];
      let second = b[sortDescriptor.column];
      let cmp =
        (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

      if (sortDescriptor.column === "status") {
        first = Boolean(a["escalate"]);
        second = Boolean(b["escalate"]);
        cmp = first - second;
      }

      if (sortDescriptor.column === "startDate") {
        first = a["duration"].start;
        second = b["duration"].start;
        cmp = compareAsc(new Date(first), new Date(second));
      }

      if (sortDescriptor.column === "endDate") {
        first = a["duration"].end;
        second = b["duration"].end;
        cmp = compareAsc(new Date(first), new Date(second));
      }

      if (sortDescriptor.direction === "descending") {
        cmp *= -1;
      }

      return cmp;
    });
  }, [itemTasks, sortDescriptor]);

  const renderCell = useCallback(
    (task, columnKey) => {
      const cellValue = task[columnKey];
      const processorList = task.processor.map((processor) => (
        <Avatar
          key={processor.sub}
          src={processor.picture}
          classNames={{
            base: ["w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-large"],
          }}
        />
      ));

      const actionOptions = [
        {
          key: "mark",
          status_id: task.status === "done" ? "forReview" : "done",
          color: task.status === "done" ? "yellow" : "green",
          label: task.status === "done" ? "Mark for review" : "Mark as done",
          icon: <MdCheck size={18} />,
        },
        ...actions,
      ];

      switch (columnKey) {
        case "task":
          return (
            <p className="text-sm lg:text-lg font-bold text-black-default line-clamp-2">
              {task.name?.length ? task.name : ""}
            </p>
          );

        case "description":
          return (
            <p className="text-sm lg:text-lg font-bold text-black-default line-clamp-2">
              {task.instruction?.length ? task.instruction : ""}
            </p>
          );

        case "status":
          return (
            <div className="flex items-center justify-start gap-2">
              <LabelTagChip
                size="md"
                text={`${
                  task.status === "forReview" ? "For Review" : task.status
                }`}
                color={tagColors[task.status?.length ? task.status : ""]}
                type="label"
                isFilled
                className={"px-2 py-2"}
                classNameLabel={"text-sm lg:text-md capitalize"}
              />
              {task.escalate && (
                <LabelTagChip
                  size="md"
                  text={"Escalation"}
                  color={"red"}
                  type="label"
                  isFilled
                  className={"px-2 py-2"}
                  classNameLabel={"text-sm lg:text-md capitalize"}
                />
              )}
            </div>
          );

        case "startDate":
          return (
            <p className="min-w-fit text-sm lg:text-lg font-bold text-black-default">
              {format(
                task.duration.start?.length ? task.duration.start : "",
                "d  MMMM yyyy"
              )}
            </p>
          );

        case "endDate":
          return (
            <p className="min-w-fit text-sm lg:text-lg font-bold text-black-default">
              {format(
                task.duration.end?.length ? task.duration.end : "",
                "d  MMMM yyyy"
              )}
            </p>
          );

        case "assignees":
          return processorList?.length ? (
            <AvatarGroup
              max={isMobile ? 2 : 3}
              classNames={{
                base: "flex justify-start gap-1",
                count: "w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12",
              }}
            >
              {processorList}
            </AvatarGroup>
          ) : (
            <AvatarGroup>
              <Avatar
                isBordered={true}
                showFallback
                fallback={
                  <MdPerson
                    size={18}
                    className="text-white-default"
                    fill="currentColor"
                  />
                }
                src={null}
                classNames={{
                  base: [
                    "bg-blue-default ring-blue-default",
                    "w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-large",
                  ],
                }}
              />
            </AvatarGroup>
          );

        case "action":
          return (
            <TaskOptionsDropdown
              id={task?._id}
              tasks={tasksFromSelectedClient[0]}
              actions={actionOptions}
              trigger={<BiDotsVerticalRounded size={24} />}
              isEscalated={task.escalate}
              selectedProcessorTaskAction={selectedProcessorTaskAction}
              setSelectedProcessorTaskAction={setSelectedProcessorTaskAction}
              selectedReviewerTaskAction={selectedReviewerTaskAction}
              setSelectedReviewerTaskAction={setSelectedReviewerTaskAction}
              selectedClientToView={selectedClientToView}
              isOpenPopup={isOpenPopup}
              onOpenPopup={onOpenPopup}
              onOpenChangePopup={onOpenChangePopup}
              isOpenTaskAction={isOpenTaskAction}
              onOpenTaskAction={onOpenTaskAction}
              onOpenChangeTaskAction={onOpenChangeTaskAction}
              onOpenModal={onOpenTaskAction}
            />
          );

        default:
          return cellValue;
      }
    },
    [
      actions,
      isMobile,
      isOpenPopup,
      isOpenTaskAction,
      onOpenChangePopup,
      onOpenChangeTaskAction,
      onOpenPopup,
      onOpenTaskAction,
      selectedProcessorTaskAction,
      selectedReviewerTaskAction,
      setSelectedProcessorTaskAction,
      setSelectedReviewerTaskAction,
      tasksFromSelectedClient,
    ]
  );

  // console.log("selectedKeys", selectedKeys);

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
          base: "rounded-none lg:rounded-[1rem] h-full px-0 lg:px-2",
          tbody: "h-full max-h-screen",
          wrapper: [
            "rounded-none lg:rounded-large",
            "relative justify-start items-start p-0",
            "overflow-y-scroll no-scrollbar",
            "max-w-full h-full max-h-screen",
          ],
          tr: ["text-sm lg:text-lg h-12 max-h-sm"],
          th: [
            "h-16 max-h-sm pl-2 pr-3 lg:pl-8 lg:pr-4 text-left last:pr-8",
            "text-md lg:text-lg font-extrabold text-darkgrey-hover",
          ],
          td: [
            "[&:nth-child(8)]:w-1/12", // actions
            "[&:nth-child(7)]:w-1/12", // assignees
            "[&:nth-child(6)]:w-2/12", // end date
            "[&:nth-child(5)]:w-1/12", // start date
            "[&:nth-child(4)]:w-2/12", // status
            "[&:nth-child(3)]:w-4/12", // description
            "[&:nth-child(2)]:w-2/12", // task name
            "[&:nth-child(1)]:w-1/12", // checkbox
            "h-18 max-h-sm truncate",
            "text-sm lg:text-lg font-bold text-black-default",
            "pl-2 pr-3 lg:pl-8 lg:pr-4 text-left",
            "last:pr-1 last:pl-4 lg:last:pr-2 lg:last:pl-12",
            "group-data-[hover=true]:bg-grey-default",
            "group-data-[selected=true]:bg-grey-default",
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
      {/* <TaskActionModal
        isOpen={isOpenTaskAction}
        onOpenChange={onOpenChangeTaskAction}
        selectedProcessorTaskAction={selectedProcessorTaskAction}
              setSelectedProcessorTaskAction={setSelectedProcessorTaskAction}
              selectedReviewerTaskAction={selectedReviewerTaskAction}
              setSelectedReviewerTaskAction={setSelectedReviewerTaskAction}
        onOpenAnotherModal={onOpenPopup}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      /> */}
    </div>
  );
};

export default TaskTableView;
