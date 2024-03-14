import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { BsFillTrash3Fill } from "react-icons/bs";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import { MdOutlineAdd } from "react-icons/md";

import TaskBoardCard from "./TaskBoardCard";

function ColumnContainer({
  column,
  deleteColumn,
  updateColumn,
  createTask,
  tasks,
  deleteTask,
  updateTask,
}) {
  const [editMode, setEditMode] = useState(false);

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
    disabled: editMode,
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
        className="
      bg-grey-default
      opacity-40
      border-2
      border-pink-500
      w-[450px]
      h-full
      max-h-screen
      rounded-md
      flex
      flex-col
      "
      ></div>
    );
  }

  const tagColors = {
    todo: "bg-blue-default border-blue-default",
    inProgress: "bg-orange-default border-orange-default",
    done: "bg-green-default border-green-default",
    forReview: "bg-yellow-default border-yellow-default",
    due: "bg-red-default border-red-default",
    pending: "bg-darkgrey-default border-darkgrey-default",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="
  bg-grey-default
  w-[450px]
  h-full
  max-h-screen
  rounded-lg
  flex
  flex-col
  "
    >
      {/* Column title */}
      <div
        {...attributes}
        {...listeners}
        // onClick={() => {
        //   setEditMode(true);
        // }}
        className={`
        ${tagColors[column.id]}
      text-md
      h-[60px]
      cursor-grab
      rounded-md
      rounded-b-none
      p-3
      font-bold
      text-white-default
      border-4
      flex
      items-center
      justify-between
      `}
      >
        <div className="flex items-center gap-2">
          <div
            className={`
        flex
        justify-center
        items-center
        bg-inherit
        px-2
        py-1
        text-sm
        rounded-full
        `}
          >
            12
          </div>
          <div className="">{!editMode && column.title}</div>
          {editMode && (
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
          )}
        </div>
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
      <div className="h-full mb-6 flex flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto ">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskBoardCard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
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
