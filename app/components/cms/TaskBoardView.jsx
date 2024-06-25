import {
  fetchTaskAtom,
  taskBoardColsAtom,
  updateTaskStatusAtom,
} from "@/app/store/TaskStore";
import { userAtom } from "@/app/store/UserStore";
import {
  closestCorners,
  DndContext,
  DragOverlay,
  useSensor,
  useSensors,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { Image, Link } from "@nextui-org/react";
import { format } from "date-fns";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { MdRefresh } from "react-icons/md";
import { toast } from "sonner";
import ColumnContainer from "./ColumnContainer";
import TaskBoardCard from "./TaskBoardCard";
import {
  restrictToHorizontalAxis,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers";

const TaskBoardView = ({
  itemTasks,
  showClientTask,
  changeView,
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
  const user = useAtomValue(userAtom);
  const fetchTask = useSetAtom(fetchTaskAtom);

  const [columns, setColumns] = useAtom(taskBoardColsAtom);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const updateTaskStatus = useSetAtom(updateTaskStatusAtom);
  const [tasks, setTasks] = useState(itemTasks);

  const [taskStatusIndex, setTaskStatusIndex] = useState({});

  const [activeColumn, setActiveColumn] = useState(null);
  const [activeTask, setActiveTask] = useState(null);

  const [taskStatusBeforeDone, setTaskStatusBeforeDone] = useState();

  const mouseSensor = useSensor(MouseSensor, {
    // Require the mouse to move by 10 pixels before activating
    activationConstraint: {
      distance: 10,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    // Press delay of 250ms, with tolerance of 5px of movement
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });

  const keyboardSensor = useSensor(KeyboardSensor);

  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

  const handleRefreshTable = () => {
    setShowClientTask(false);
  };

  useEffect(() => {
    if (itemTasks) {
      setTasks(itemTasks);
    }
  }, [itemTasks]);

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
      data-view={showClientTask}
      data-change={changeView}
      className="hidden data-[view=true]:flex data-[change=false]:hidden w-full h-full items-center overflow-x-auto px-4 lg:px-0 "
    >
      <DndContext
        // modifiers={[restrictToHorizontalAxis]}
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="flex flex-col lg:flex-row gap-4 w-full h-full">
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
                actions={actions}
                tasksFromSelectedClient={tasksFromSelectedClient}
                selectedProcessorTaskAction={selectedProcessorTaskAction}
                setSelectedProcessorTaskAction={setSelectedProcessorTaskAction}
                selectedReviewerTaskAction={selectedReviewerTaskAction}
                setSelectedReviewerTaskAction={setSelectedReviewerTaskAction}
                isMobile={isMobile}
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
                actions={actions}
                tasksFromSelectedClient={tasksFromSelectedClient}
                selectedProcessorTaskAction={selectedProcessorTaskAction}
                setSelectedProcessorTaskAction={setSelectedProcessorTaskAction}
                selectedReviewerTaskAction={selectedReviewerTaskAction}
                setSelectedReviewerTaskAction={setSelectedReviewerTaskAction}
                isMobile={isMobile}
              />
            )}
            {activeTask && (
              <TaskBoardCard
                task={activeTask}
                actions={actions}
                tasksFromSelectedClient={tasksFromSelectedClient}
                selectedProcessorTaskAction={selectedProcessorTaskAction}
                setSelectedProcessorTaskAction={setSelectedProcessorTaskAction}
                selectedReviewerTaskAction={selectedReviewerTaskAction}
                setSelectedReviewerTaskAction={setSelectedReviewerTaskAction}
                isMobile={isMobile}
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

      setTaskStatusBeforeDone(event.active.data.current?.task?.status);
      return;
    }
  }

  function onDragEnd(event) {
    console.log("DRAG END", event);

    if (Object.keys(taskStatusIndex).length !== 0) {
      updateTaskStatus({
        sla: taskStatusIndex,
        client_id: selectedClientToView,
      });
    }

    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const taskActive = active.data.current?.task;
    const taskOver = over.data.current?.task?._id;

    if (taskActive?.status === "done") {
      if (taskStatusBeforeDone !== taskActive.status) {
        const dateTaskDone = new Date();

        const updateSelectedTask = tasksFromSelectedClient[0].sla.map(
          (task) => {
            if (task._id === taskActive._id) {
              if (taskActive.status === "done") {
                return {
                  ...task,
                  status: taskActive.status,
                  done_by: {
                    sub: user?.sub,
                    name: user?.name,
                    email: user?.email,
                    picture: user?.picture,
                  },
                };
              } else {
                return {
                  ...task,
                  status: taskActive.status,
                };
              }
            }
            return task;
          }
        );

        const promise = async () =>
          new Promise((resolve) =>
            setTimeout(
              async () =>
                resolve(
                  await updateTaskStatus({
                    sla: updateSelectedTask,
                    client_id: taskActive.client_id,
                  }),
                  await fetchTask()
                ),
              2000
            )
          );
        toast.promise(promise, {
          description: `${format(dateTaskDone, "PPpp")}`,
          loading: "Updating Task Status...",
          success: () => {
            return `Task Completed: ${taskActive.name} `;
          },

          error: "Error Updating Task Status",
        });
      }
    }

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
