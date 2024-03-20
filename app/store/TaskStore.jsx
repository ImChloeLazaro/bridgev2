import { restinsert, restread } from "@/app/utils/amplify-rest";
import { format } from "date-fns";
import { atom } from "jotai";

export const tasksAtom = atom([]);

export const addTaskAtom = atom();
export const updateTaskAtom = atom();
export const deleteTaskAtom = atom();

export const tableColumnsAtom = atom([
  { label: "Tasks", key: "task" },
  { label: "Status", key: "status" },
  { label: "Start Date", key: "startDate" },
  { label: "End Date", key: "endDate" },
  { label: "Assignees", key: "assignees" },
]);

export const selectedTaskAtom = atom([]);
export const selectedTaskFilterKeysAtom = atom(new Set(["all"]));

export const tasksCountAtom = atom((get) => get(tasksAtom).length);

export const taskFilterKeysAtom = atom([
  {
    label: "All", 
    value: "all",
  },
  {
    label: "To Do",
    value: "todo",
  },
  {
    label: "In Progress",
    value: "inProgress",
  },
  {
    label: "Done",
    value: "done",
  },
  {
    label: "For Review",
    value: "forReview",
  },
  {
    label: "Due",
    value: "due",
  },
  {
    label: "Pending",
    value: "pending",
  },
]);

export const taskBoardColsAtom = atom([
  {
    id: "due",
    title: "Due",
  },
  {
    id: "forReview",
    title: "For Review",
  },
  {
    id: "inProgress",
    title: "In Progress",
  },
  {
    id: "done",
    title: "Done",
  },
  {
    id: "todo",
    title: "To Do",
  },
  {
    id: "pending",
    title: "Pending",
  },
]);
export const insertTaskAtom = atom(null, async (get, set, update) => {
  const {name, client, processor, reviewer, duration, status} = update;
  
  await restinsert("/cms/task", {
    name,
    client,
    processor,
    reviewer,
    duration, 
    status
  })

  console.log("INSERT TASK")
  //Add another function to fetch the tasks.

})

export const fetchTaskAtom = atom(null, async (get, set, sub) => {
  const tasks = await restread("/cms/task");
  if (tasks.success) {
    console.log("TASKS SUCCESS FETCH", tasks.body);
    const convertedTasks = tasks.body.map((task, index) => {
      return {
        ...task,
        key: task._id,
        id: `${(index += 1)}`,
        clientKey: `client-${(index += 1)}`,
        startDate: format(task.duration.start, "d  MMMM yyyy"),
        endDate: format(task.duration.end, "d  MMMM yyyy"),
        status: task.status.toLowerCase(),
        columnId: task.status.toLowerCase(),
      };
    });
    console.log("convertedTasks", convertedTasks);

    set(tasksAtom, convertedTasks);
  } else {
    console.log("TASKS FAILED FETCH", tasks);
  }
});
