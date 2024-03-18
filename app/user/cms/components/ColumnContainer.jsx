import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { BsFillTrash3Fill } from "react-icons/bs";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import { MdOutlineAdd } from "react-icons/md";

import TaskBoardCard from "./TaskBoardCard";
import { Image } from "@nextui-org/react";
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
      opacity-40
      border-2
      border-blue-default

      bg-grey-default
      
      h-full
      max-h-screen
      rounded-lg
      flex
      flex-col
      grow-1
      basis-1/6
      "
      ></div>
    );
  }

  const columnColors = {
    todo: "bg-blue-default border-blue-default text-white-default",
    inProgress: "bg-orange-default border-orange-default text-white-default",
    done: "bg-green-default border-green-default text-white-default",
    forReview: "bg-yellow-default border-yellow-default text-white-default",
    due: "bg-red-default border-red-default text-white-default",
    pending: "bg-darkgrey-default border-darkgrey-default text-white-default",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="
    bg-grey-default
    
    h-full
    max-h-screen
    rounded-lg
    flex
    flex-col
    grow-1
    basis-1/6
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
        ${columnColors[column.id]}
      text-md
      h-[60px]
      cursor-grab
      rounded-md
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
          <div className="">{column.title}</div>
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
      <div className="h-full mb-6 flex flex-col gap-4 p-3 overflow-x-hidden overflow-y-auto ">
        <SortableContext items={tasksIds}>
          {tasks?.length ? (
            tasks.map((task) => (
              <TaskBoardCard
                key={task.id}
                task={task}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            ))
          ) : (
            <div className="flex justify-center items-center p-2 rounded-lg">
              {"No data to display"}
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
