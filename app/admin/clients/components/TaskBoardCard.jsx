import { showClientDetailsAtom } from "@/app/store/ClientStore";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Link, User } from "@nextui-org/react";
import { format } from "date-fns";
import { useSetAtom } from "jotai";
import { useState } from "react";
import { MdCalendarMonth, MdDragIndicator } from "react-icons/md";
import { showClientTaskAtom, showFooterAtom } from "../store/CMSAdminStore";

function TaskBoardCard({ task, deleteTask, updateTask }) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(true);

  const setShowClientDetails = useSetAtom(showClientDetailsAtom);
  const setShowFooter = useSetAtom(showFooterAtom);
  const setShowClientTask = useSetAtom(showClientTaskAtom);

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
    disabled: false,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const handleViewClientDetails = () => {
    setShowFooter(false);
    setShowClientTask(false);
    setShowClientDetails(true);
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
    console.log("CLICKED TASK CARD");
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="
        opacity-30
      bg-white-default p-2.5 h-[125px] min-h-[100px] items-center flex text-left rounded-xl border-2 border-blue-default cursor-grab relative
      "
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
      onClick={toggleEditMode}
      className="
      bg-white-default p-2.5 h-fit min-h-[125px] max-h-[200px]
      items-center flex text-left rounded-lg 
      hover:ring-2 hover:ring-inset hover:ring-blue-default 
      border border-grey-default
      cursor-grab relative shadow-md"
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
    >
      <div className="basis-[90%] flex flex-col justify-center px-2 my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
        {/* {task.content} */}
        <div className="mb-4">
          <Link
            href="#"
            underline="hover"
            className="text-lg font-medium text-black-default "
            onPress={handleViewClientDetails}
          >
            {task.name}
          </Link>
        </div>
        <div className=""></div>
        <div className="flex gap-2 justify-start items-center">
          <MdCalendarMonth size={20} />
          <Link
            href="#"
            underline="hover"
            className="text-sm font-medium text-black-default/80"
          >
            {format(task?.duration?.end, "d MMM yyyy")}
          </Link>
        </div>
        <div className="flex gap-2 justify-start items-center">
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
              src: task.reviewer[0].picture,
              size: "sm",
              classNames: { base: "w-[22px] h-[22px]" },
            }}
            classNames={{
              name: "text-sm font-medium",
              description: "text-xs font-medium",
            }}
          />
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
      <div className="basis-[10%] justify-center items-center">
        <MdDragIndicator size={24} />
      </div>
    </div>
  );
}

export default TaskBoardCard;
