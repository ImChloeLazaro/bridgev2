import {
  draggableTasksAtom,
  taskBoardColsAtom,
  tasksAtom,
  updateTaskStatusAtom,
} from "@/app/store/TaskStore";
import {
  closestCorners,
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { useAtom, useSetAtom } from "jotai";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import ColumnContainer from "./ColumnContainer";
import TaskBoardCard from "./TaskBoardCard";

const TaskBoardView = ({
  itemTasks,
  showClientTask,
  changeView,
  selectedClient,
}) => {
  const [columns, setColumns] = useAtom(taskBoardColsAtom);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const updateTaskStatus = useSetAtom(updateTaskStatusAtom);
  const [tasks, setTasks] = useState(itemTasks);

  const [taskStatusIndex, setTaskStatusIndex] = useState({});

  useEffect(() => {
    if (itemTasks) {
      setTasks(itemTasks);
    }
  }, [itemTasks]);

  const [activeColumn, setActiveColumn] = useState(null);
  const [activeTask, setActiveTask] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 20,
        tolerance: 100,
      },
    })
  );

  return (
    <div
      data-view={showClientTask}
      data-change={changeView}
      className="hidden data-[view=true]:flex data-[change=false]:hidden w-full h-full items-center overflow-x-auto overflow-y-hidden px-4 "
    >
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        {/* <div className="flex gap-4 w-screen h-full"> */}
        <div className="flex gap-4 w-full h-full">
          <SortableContext items={columnsId}>
            {columns.map((col) => (
              <ColumnContainer
                key={col.id}
                column={col}
                // deleteColumn={deleteColumn}
                // updateColumn={updateColumn}
                // createTask={createTask}
                // deleteTask={deleteTask}
                // updateTask={updateTask}
                // tasks={tasks.filter((task) => task.status === col.id)} // change to status as the filter key
                tasks={
                  col.id == "undefined"
                    ? tasks.filter((task) => task.status === undefined)
                    : tasks.filter((task) => task.status === col.id)
                }
              />
            ))}
          </SortableContext>
        </div>
        {/* <button
            onClick={() => {
              createNewColumn();
            }}
            className="
      h-[60px]
      w-[350px]
      min-w-[350px]
      cursor-pointer
      rounded-lg
      bg-mainBackgroundColor
      border-2
      border-columnBackgroundColor
      p-4
      ring-rose-500
      hover:ring-2
      flex
      gap-2
      "
          >
            <MdOutlineAdd size={24} />
            Add Column
          </button> */}
        {/* </div> */}

        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                // deleteColumn={deleteColumn}
                // updateColumn={updateColumn}
                // createTask={createTask}
                // deleteTask={deleteTask}
                // updateTask={updateTask}
                // tasks={tasks.filter((task) => task.status === activeColumn?.id)} // change to status as the filter key
                tasks={
                  activeColumn?.id == "undefined"
                    ? tasks.filter((task) => task.status === undefined)
                    : tasks.filter((task) => task.status === activeColumn?.id)
                }
              />
            )}
            {activeTask && (
              <TaskBoardCard
                task={activeTask}
                // deleteTask={deleteTask}
                // updateTask={updateTask}
              />
            )}
          </DragOverlay>,
          document.body // target DOM  element for creating portal overlay
        )}
      </DndContext>
    </div>
  );

  // function createTask(status) {
  //   const newTask = {
  //     id: generateId(),
  //     status,
  //     content: `Task ${tasks.length + 1}`,
  //   };

  //   setTasks([...tasks, newTask]);
  // }

  // function deleteTask(id) {
  //   const newTasks = tasks.filter((task) => task.id !== id);
  //   setTasks(newTasks);
  // }

  // function updateTask(id, content) {
  //   const newTasks = tasks.map((task) => {
  //     if (task.id !== id) return task;
  //     return { ...task, content };
  //   });

  //   setTasks(newTasks);
  // }

  // function createNewColumn() {
  //   const columnToAdd = {
  //     id: generateId(),
  //     title: `Column ${columns.length + 1}`,
  //   };

  //   setColumns([...columns, columnToAdd]);
  // }

  // function deleteColumn(id) {
  //   const filteredColumns = columns.filter((col) => col.id !== id);
  //   setColumns(filteredColumns);

  //   const newTasks = tasks.filter((t) => t.status !== id);
  //   setTasks(newTasks);
  // }

  // function updateColumn(id, title) {
  //   const newColumns = columns.map((col) => {
  //     if (col.id !== id) return col;
  //     return { ...col, title };
  //   });

  //   setColumns(newColumns);
  // }

  function onDragStart(event) {
    console.log("DRAG START:", event);
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragEnd(event) {
    console.log("DRAG END", event);

    console.log("selectedClient inside board card", selectedClient);

    updateTaskStatus({ sla: taskStatusIndex });

    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === "Column";
    if (!isActiveAColumn) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);

      const overColumnIndex = columns.findIndex((col) => col.id === overId);
      const taskIndexMoved = arrayMove(
        columns,
        activeColumnIndex,
        overColumnIndex
      );
      return taskIndexMoved;
    });
  }

  function onDragOver(event) {
    console.log("DRAG OVER", event);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    console.log("activeId", activeId);
    console.log("overId", overId);

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        tasks[activeIndex].status = tasks[overIndex].status;

        const taskIndexMoved = arrayMove(tasks, activeIndex, overIndex);
        setTaskStatusIndex(taskIndexMoved);
        return taskIndexMoved;
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);

        tasks[activeIndex].status = overId;

        const taskIndexMoved = arrayMove(tasks, activeIndex, activeIndex);
        setTaskStatusIndex(taskIndexMoved);
        return taskIndexMoved;
      });
    }
  }
};
export default TaskBoardView;
