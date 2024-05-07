import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Link, User, cn } from "@nextui-org/react";
import { format } from "date-fns";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { MdCalendarMonth } from "react-icons/md";
import TaskOptionsDropdown from "./TaskOptionsDropdown";
import { MdCheck } from "react-icons/md";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { MdOutlineAssignment } from "react-icons/md";
import { MdRemoveCircleOutline } from "react-icons/md";

function TaskBoardCard({ task, deleteTask, updateTask }) {
  // const [mouseIsOver, setMouseIsOver] = useState(false);
  // const [editMode, setEditMode] = useState(true);

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
    // disabled: false,
  });

  const actions = [
    {
      key: "mark",
      color: task.status === "done" ? "yellow" : "green",
      label: task.status === "done" ? "Mark for review" : `Mark as done`,
      icon: <MdCheck size={18} />,
    },
    {
      key: "escalate",
      color: "red",
      label: "Escalate to team lead",
      icon: <MdKeyboardDoubleArrowUp size={18} />,
    },
    {
      key: "assign",
      color: "orange",
      label: "Assign to a team member",
      icon: <MdOutlineAssignment size={18} />,
    },
  ];

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const cardSize = "min-h-[10rem]";

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
        className={cn(
          cardSize,
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
      className={cn(
        cardSize,
        "bg-white-default p-2.5",
        "items-center flex text-left relative",
        "rounded-xl border border-grey-default",
        "hover:ring-2 hover:ring-inset hover:ring-blue-default ",
        "shadow-md",
        "cursor-grab select-none"
      )}
      // onMouseEnter={() => {
      //   setMouseIsOver(true);
      // }}
      // onMouseLeave={() => {
      //   setMouseIsOver(false);
      // }}
    >
      <div className="flex flex-col gap-3 justify-start px-2 my-auto h-full w-full max-w-xs overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
        {/* {task.content} */}
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
            id={task?._id}
            task={task}
            actions={actions}
            trigger={<BiDotsHorizontalRounded size={24} />}
          />
        </div>

        <div className="flex gap-2 justify-start items-center">
          <MdCalendarMonth size={24} />
          <Link
            href="#"
            underline="hover"
            className={cn(
              `${task.status === "done" ? "line-through" : ""}`,
              "text-sm font-medium text-black-default/80"
            )}
          >
            {task?.duration?.end?.length
              ? format(task.duration.end, "d MMM yyyy")
              : ""}
          </Link>
        </div>
        <div className="flex gap-2 justify-start items-center mb-1">
          {task.reviewer.map((reviewer, index) => {
            return (
              <User
                key={index}
                name={
                  <Link
                    href="#"
                    underline="hover"
                    className="text-sm font-medium text-black-default/80"
                  >
                    {/* {reviewer.name} */}
                  </Link>
                }
                // description="Reviewer"
                avatarProps={{
                  src: `${reviewer.picture}`,
                  size: "sm",
                  classNames: { base: "w-[24px] h-[24px]" },
                }}
                classNames={{
                  name: "text-sm font-medium",
                  description: "text-xs font-medium",
                }}
              />
            );
          })}
        </div>
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
