import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Avatar,
  AvatarGroup,
  Link,
  Spinner,
  User,
  cn,
  useDisclosure,
} from "@nextui-org/react";
import {
  differenceInDays,
  differenceInHours,
  compareAsc,
  getHours,
  format,
} from "date-fns";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { MdCalendarMonth, MdCheck } from "react-icons/md";
import LabelTagChip from "../LabelTagChip";
import TaskActionModal from "./TaskActionModal";
import TaskOptionsDropdown from "./TaskOptionsDropdown";
import {
  selectedTaskActionAtom,
  taskActionsAtom,
  taskActionWindowDetailsAtom,
} from "@/app/store/TaskStore";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import ConfirmationWindow from "../ConfirmationWindow";
import { MdTimer } from "react-icons/md";
import useSound from "use-sound";

function TaskBoardCard({
  task,
  deleteTask,
  updateTask,
  actions,
  tasksFromSelectedClient,
  selectedProcessorTaskAction,
  setSelectedProcessorTaskAction,
  selectedReviewerTaskAction,
  setSelectedReviewerTaskAction,
  isMobile,
}) {
  // const [mouseIsOver, setMouseIsOver] = useState(false);
  // const [editMode, setEditMode] = useState(true);
  const [play] = useSound("/notification_chime_1.mp3", { volume: 0.9 });

  const confirmationWindow = useDisclosure(); // confirmation window
  const taskActionWindow = useDisclosure(); // modal window for selecting processor and reviewer
  const [selectedTaskAction, setSelectedTaskAction] = useAtom(
    selectedTaskActionAtom
  );

  const taskActionWindowDetails = useAtomValue(taskActionWindowDetailsAtom);
  const taskActions = useSetAtom(taskActionsAtom);

  const difference =
    compareAsc(new Date(task.duration.end.slice(0, -1)), new Date()) < 0 &&
    task.status === "todo";
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    disabled: task.escalate || difference,
  });

  const actionOptions = [
    {
      key: "mark",
      status_id: task.status === "done" ? "forReview" : "done",
      color: task.status === "done" ? "yellow" : "green",
      label: task.status === "done" ? "Mark for review" : `Mark as done`,
      icon: <MdCheck size={18} />,
    },
    ...actions,
  ];

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  // const toggleEditMode = () => {
  //   setEditMode((prev) => !prev);
  //   setMouseIsOver(false);
  //   console.log("CLICKED TASK CARD");
  // };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        data-escalated={task.escalate}
        className={cn(
          "data-[escalated=true]:border-red-default",
          "data-[escalated=true]:border-4",
          "min-h-[10rem]",
          "bg-white-default p-2.5",
          "items-center flex text-left relative",
          "rounded-xl border-2 border-blue-default",
          "opacity-30 ",
          "cursor-grab"
        )}
      ></div>
    );
  }

  // if (editMode) {
  //   return (
  //     <div
  //       ref={setNodeRef}
  //       style={style}
  //       {...attributes}
  //       {...listeners}
  //       className="bg-white-default p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-blue-default cursor-grab relative"
  //     >
  //       <textarea
  //         className="
  //       h-[90%]
  //       w-full resize-none border-none rounded bg-transparent text-black-default focus:outline-none
  //       "
  //         value={task.content}
  //         autoFocus
  //         placeholder="Task content here"
  //         onBlur={toggleEditMode}
  //         onKeyDown={(e) => {
  //           if (e.key === "Enter" && e.shiftKey) {
  //             toggleEditMode();
  //           }
  //         }}
  //         onChange={(e) => updateTask(task.id, e.target.value)}
  //       />
  //     </div>
  //   );
  // }

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      // onClick={toggleEditMode}
      data-escalated={task.escalate}
      data-due={difference}
      className={cn(
        "data-[escalated=true]:!border-red-default",
        "data-[escalated=true]:border-3",
        "data-[escalated=true]:ring-0",
        "data-[escalated=true]:cursor-not-allowed",
        "data-[due=true]:border-orange-default",
        "data-[due=true]:border-3",
        "data-[due=true]:ring-0",
        "data-[due=true]:cursor-not-allowed",
        "min-h-fit",
        "bg-white-default p-2.5",
        "items-center flex text-left relative",
        "hover:ring-2 hover:ring-inset hover:ring-blue-default",
        "rounded-lg border border-grey-default",
        "shadow-md",
        "cursor-grab select-none touch-none"
      )}
      // onMouseEnter={() => {
      //   setMouseIsOver(true);
      // }}
      // onMouseLeave={() => {
      //   setMouseIsOver(false);
      // }}
    >
      <div className="flex flex-col gap-3 justify-start px-2 my-auto h-full w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
        <div className="flex justify-between items-start gap-2">
          <div className="mt-2">
            <Link
              href="#"
              underline="hover"
              className="text-lg font-bold text-black-default "
              // onPress={handleViewClientDetails}
            >
              {task?.name?.length ? task.name : ""}
            </Link>
            <p className="text-sm font-medium text-black-default line-clamp-3 min-h-[1.5rem]">
              {task?.instruction?.length ? task.instruction : ""}
            </p>
          </div>
          <TaskOptionsDropdown
            task_id={task?._id}
            tasks={tasksFromSelectedClient[0]}
            actions={actionOptions}
            trigger={<BiDotsHorizontalRounded size={24} />}
            isEscalated={task.escalate}
            isOverdue={difference}
            confirmationWindow={confirmationWindow}
            taskActionWindow={taskActionWindow}
            selectedProcessorTaskAction={selectedProcessorTaskAction}
            setSelectedProcessorTaskAction={setSelectedProcessorTaskAction}
            selectedReviewerTaskAction={selectedReviewerTaskAction}
            setSelectedReviewerTaskAction={setSelectedReviewerTaskAction}
          />
          <ConfirmationWindow
            message={taskActionWindowDetails[selectedTaskAction.key]?.message}
            description={
              taskActionWindowDetails[selectedTaskAction.key]?.description
            }
            title={taskActionWindowDetails[selectedTaskAction.key]?.title}
            type={taskActionWindowDetails[selectedTaskAction.key]?.type}
            action={taskActions}
            action_params={{
              sound: play,
              tasks: tasksFromSelectedClient[0],
              task_id: task?._id,
              selectedProcessorTaskAction: selectedProcessorTaskAction,
              selectedReviewerTaskAction: selectedReviewerTaskAction,
              setSelectedProcessorTaskAction: setSelectedProcessorTaskAction,
              setSelectedReviewerTaskAction: setSelectedReviewerTaskAction,
            }}
            isOpen={confirmationWindow.isOpen}
            onOpenChange={confirmationWindow.onOpenChange}
          />
          <TaskActionModal
            tasks={tasksFromSelectedClient[0]}
            isOpen={taskActionWindow.isOpen}
            onOpenChange={taskActionWindow.onOpenChange}
            onOpenAfterClose={confirmationWindow.onOpen}
            selectedTaskAction={selectedTaskAction}
            selectedProcessorTaskAction={selectedProcessorTaskAction}
            setSelectedProcessorTaskAction={setSelectedProcessorTaskAction}
            selectedReviewerTaskAction={selectedReviewerTaskAction}
            setSelectedReviewerTaskAction={setSelectedReviewerTaskAction}
          />
        </div>
        <div className="flex items-center justify-start gap-2">
          {task.escalate && (
            <LabelTagChip
              text="Escalation"
              color="red"
              isFilled={false}
              className={"py-0.5 px-1.5 lg:h-6"}
              classNameLabel={"lg:text-xs"}
            />
          )}
          {difference && (
            <LabelTagChip
              text="Overdue"
              color="orange"
              isFilled={false}
              className={"py-0.5 px-1.5 lg:h-6"}
              classNameLabel={"lg:text-xs"}
            />
          )}
        </div>
        {
          <div className="flex flex-col lg:flex-row justify-between">
            <div className="flex gap-2 justify-start items-center">
              <MdCalendarMonth size={20} />
              <Link
                href="#"
                isDisabled={task.status === "done" || difference}
                underline="hover"
                className={cn(
                  `${
                    task.status === "done" || difference ? "line-through" : ""
                  }`,
                  "text-sm font-bold text-black-default/80"
                )}
              >
                {task.status === "pending"
                  ? "Pending"
                  : task?.duration?.recurrence !== "none"
                  ? task?.duration?.start?.length
                    ? format(task.duration.start.slice(0, -1), "d MMM yyyy")
                    : ""
                  : task?.duration?.end?.length
                  ? format(task.duration.end.slice(0, -1), "d MMM yyyy")
                  : ""}
              </Link>
              <p>{"|"}</p>
              <p className="flex text-sm font-semibold text-black-default">
                {task?.duration?.recurrence === "none"
                  ? "No Recurrence"
                  : task?.duration?.recurrence[0].toUpperCase() +
                    task?.duration?.recurrence.slice(1)}
              </p>
            </div>
            <div className="flex gap-2 justify-start items-center">
              <MdTimer size={20} />
              <Link
                href="#"
                isDisabled={task.status === "done" || difference}
                underline="hover"
                className={cn(
                  `${
                    task.status === "done" || difference ? "line-through" : ""
                  }`,
                  "text-sm font-bold text-black-default/80"
                )}
              >
                {task.status === "pending"
                  ? "Pending"
                  : task?.duration?.end?.length
                  ? format(task.duration.end.slice(0, -1), "hh:mm aa")
                  : ""}
              </Link>
            </div>
          </div>
        }
        {task.status === "forReview" ? (
          <div className="flex gap-2 justify-start items-center mb-1">
            {task.reviewer?.length === 0 && (
              <p className="text-sm font-medium text-black-default">
                {"No reviewer is assigned yet."}
              </p>
            )}
            {task.reviewer.length === 1 && (
              <div className="flex gap-2 items-center justify-center">
                <p className="text-sm font-medium text-black-default">
                  {"Reviewed by: "}
                </p>
                <User
                  name={
                    <Link
                      href="#"
                      underline="hover"
                      className="text-sm font-medium text-black-default/80"
                    >
                      {task.reviewer[0].name}
                    </Link>
                  }
                  // description="Reviewer"
                  avatarProps={{
                    src: `${task.reviewer[0].picture}`,
                    size: "sm",
                    classNames: { base: "w-[24px] h-[24px]" },
                  }}
                  classNames={{
                    name: "text-sm font-medium",
                    description: "text-xs font-medium",
                  }}
                />
              </div>
            )}
            {task.reviewer.length > 1 && (
              <div className="flex gap-2 items-center justify-center">
                <p className="text-sm font-medium text-black-default">
                  {"Reviewed by: "}
                </p>
                <AvatarGroup max={isMobile ? 2 : 3}>
                  {task.reviewer.map((reviewer, index) => (
                    <Avatar
                      isBordered={true}
                      key={index}
                      showFallback
                      fallback={<Spinner />}
                      src={reviewer.picture}
                      classNames={{
                        base: [
                          "bg-blue-default ring-blue-default",
                          "w-[24px] h-[24px] text-large",
                        ],
                      }}
                    />
                  ))}
                </AvatarGroup>
              </div>
            )}
          </div>
        ) : null}
        {task.status === "done" && task.done_by ? (
          <div className="flex gap-2 justify-start items-center mb-1">
            <div className="flex gap-2 items-center justify-center">
              <p className="text-sm font-medium text-black-default">
                {"Completed by: "}
              </p>
              <User
                name={
                  <Link
                    href="#"
                    underline="hover"
                    className="text-sm font-medium text-black-default/80"
                  >
                    {task?.done_by?.name}
                  </Link>
                }
                // description="Reviewer"
                avatarProps={{
                  src: `${task?.done_by?.picture}`,
                  size: "sm",
                  classNames: { base: "w-[24px] h-[24px]" },
                }}
                classNames={{
                  name: "text-sm font-medium",
                  description: "text-xs font-medium",
                }}
              />
            </div>
          </div>
        ) : null}
        {(task.status === "todo" || task.status === "pending") &&
        task.processor?.length < 1 ? (
          <div className="flex gap-2 justify-start items-center mb-1">
            {
              <p className="text-sm font-medium text-black-default">
                {"No processor is assigned yet."}
              </p>
            }
          </div>
        ) : null}
      </div>

      {/* {mouseIsOver && (
        <button
          onClick={() => {
            deleteTask(task.id);
          }}
          className="stroke-white absolute right-4 top-1/2 -translate-y-1/2 bg-columnBackgroundColor p-2 rounded opacity-60 hover:opacity-100"
        >
          <BsFillTrash3Fill size={24}/>
        </button>
      )} */}
      {/* <div className="basis-[10%] justify-center items-center">
        <MdDragIndicator size={24} />
      </div> */}
    </div>
  );
}

export default TaskBoardCard;
