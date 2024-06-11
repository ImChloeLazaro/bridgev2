import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@nextui-org/react";
import { useMemo, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import IconButton from "../IconButton";
import TaskBoardCard from "./TaskBoardCard";

function ColumnContainer({
  column,
  deleteColumn,
  updateColumn,
  createTask,
  tasks,
  deleteTask,
  updateTask,
  actions,
  tasksFromSelectedClient,
  selectedClientToView,
  selectedProcessorTaskAction,
  setSelectedProcessorTaskAction,
  selectedReviewerTaskAction,
  setSelectedReviewerTaskAction,
  isMobile,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const tasksCount = tasks?.length ? tasks.length : 0;
  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    // disabled: true,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className={cn(
          "h-[5rem] min-h-[5rem]",
          "opacity-40 rounded-lg cursor-grabbing",
          "flex flex-col w-full",
          "lg:h-full max-h-screen",
          "bg-grey-default",
          "border-2 border-blue-default",
          "transition-height duration-300 ease-in-out"
        )}
      ></div>
    );
  }

  const columnColors = {
    todo: "bg-blue-default border-blue-default ",
    inProgress: "bg-orange-default border-orange-default ",
    done: "bg-green-default border-green-default ",
    forReview: "bg-yellow-default border-yellow-default  ",
    due: "bg-red-default border-red-default ",
    pending: "bg-darkgrey-default border-darkgrey-default ",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        `${!isExpanded ? "h-[5rem] min-h-[5rem]" : "h-[28rem] min-h-[28rem] "}`,
        "touch-none rounded-lg",
        "flex flex-col min-w-64 w-full",
        "lg:h-full max-h-screen",
        "bg-grey-default",
        "transition-height duration-300 ease-in-out"
      )}
    >
      {/* Column title */}
      <div
        {...attributes}
        {...listeners}
        // onClick={() => {
        //   setEditMode(true);
        // }}
        className={`
        ${columnColors[column.id]} 
        ${isDragging ? "cursor-grabbing" : "cursor-grab"}
      text-md
      h-[60px]
      rounded-lg
      rounded-b-none
      p-3
      font-bold
      border-4
      flex
      items-center
      justify-between
      `}
      >
        <div className="flex items-center gap-3">
          <div
            className={`
        flex
        justify-center
        items-center
        bg-inherit
        px-3
        py-1
        text-sm
        rounded-full
        bg-white-default
        text-black-default
        `}
          >
            {tasksCount}
          </div>
          <div className="text-white-default text-shadow">{column.title}</div>

          {/* {editMode && (
            <input
              className="bg-black focus:border-rose-500 border rounded outline-none px-2"
              value={column.title}
              onChange={(e) => updateColumn(column.id, e.target.value)}
              autoFocus
              onBlur={() => {
                setEditMode(false);
              }}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setEditMode(false);
              }}
            />
          )} */}
        </div>
        <IconButton
          onPress={() => {
            setIsExpanded(!isExpanded);
          }}
          className={"flex lg:hidden bg-white-default/80"}
        >
          {!isExpanded ? (
            <MdKeyboardArrowDown size={24} />
          ) : (
            <MdKeyboardArrowUp size={24} />
          )}
        </IconButton>
        {/* <button
          onClick={() => {
            deleteColumn(column.id);
          }}
          className="
        stroke-gray-500
        hover:stroke-white
        hover:bg-columnBackgroundColor
        rounded
        px-1
        py-2
        "
        >
          <BsFillTrash3Fill size={24} />
        </button> */}
      </div>

      {/* Column task container */}
      <div
        data-show={isExpanded}
        className={cn(
          "hidden data-[show=true]:flex lg:flex h-full mb-3 flex-col gap-4 p-3",
          "overflow-x-hidden overflow-y-hidden lg:overflow-y-auto"
        )}
      >
        <SortableContext items={tasksIds}>
          {tasks?.length ? (
            tasks.map((task) => (
              <TaskBoardCard
                key={task.id}
                task={task}
                deleteTask={deleteTask}
                updateTask={updateTask}
                actions={actions}
                tasksFromSelectedClient={tasksFromSelectedClient}
                selectedClientToView={selectedClientToView}
                selectedProcessorTaskAction={selectedProcessorTaskAction}
                setSelectedProcessorTaskAction={setSelectedProcessorTaskAction}
                selectedReviewerTaskAction={selectedReviewerTaskAction}
                setSelectedReviewerTaskAction={setSelectedReviewerTaskAction}
              />
            ))
          ) : (
            <div className="flex justify-center items-center p-2 rounded-lg">
              {"No available tasks."}
            </div>
          )}
        </SortableContext>
      </div>
      {/* Column footer */}
      {/* <button
        className="flex gap-2 items-center border-columnBackgroundColor border-2 rounded-md p-4 border-x-columnBackgroundColor hover:bg-mainBackgroundColor hover:text-rose-500 active:bg-black"
        onClick={() => {
          createTask(column.id);
        }}
      >
        <MdOutlineAdd size={24} />
        Add task
      </button> */}
    </div>
  );
}

export default ColumnContainer;
