import { restread } from "@/app/utils/amplify-rest";
import { format } from "date-fns";
import { atom } from "jotai";

export const tasksAtom = atom([]);

export const addTaskAtom = atom();
export const updateTaskAtom = atom();
export const deleteTaskAtom = atom();

export const taskNameAtom = atom();

let clientIndex = 0;
export const clientListAtom = atom([
  {
    id: (clientIndex += 1),
    key: `client-${clientIndex}`,
    name: "Blooms",
    email: "tatiana.philips@aretex.com.au",
    picture: "https://picsum.photos/200",
    team: "",
  },
  {
    id: (clientIndex += 1),
    key: `client-${clientIndex}`,
    name: "Grey Fade",
    email: "aspen.donin@aretex.com.au",
    picture: "https://picsum.photos/200",
    team: "",
  },
  {
    id: (clientIndex += 1),
    key: `client-${clientIndex}`,
    name: "Auto Works",
    email: "kaylynn.bergson@aretex.com.au",
    picture: "https://picsum.photos/200",
    team: "",
  },
  {
    id: (clientIndex += 1),
    key: `client-${clientIndex}`,
    name: "Pro Property Maintenance",
    email: "madelyn.septimus@aretex.com.au",
    picture: "https://picsum.photos/200",
    team: "",
  },
  {
    id: (clientIndex += 1),
    key: `client-${clientIndex}`,
    name: "Tam's Stationers",
    email: "skylar.curtis@aretex.com.au",
    picture: "https://picsum.photos/200",
    team: "",
  },
  {
    id: (clientIndex += 1),
    key: `client-${clientIndex}`,
    name: "Total Network Development",
    email: "wilson.herwitz@aretex.com.au",
    picture: "https://picsum.photos/200",
    team: "",
  },
]);
export const selectedClientAtom = atom(new Set([]));

let processorIndex = 0;
export const processorListAtom = atom([
  {
    id: (processorIndex += 1),
    key: `processor-${processorIndex}`,
    name: "Tatiana Philips",
    email: "tatiana.philips@aretex.com.au",
    picture: "/Tatiana Philips.png",
    team: "DMS-BEA",
  },
  {
    id: (processorIndex += 1),
    key: `processor-${processorIndex}`,
    name: "Aspen Donin",
    email: "aspen.donin@aretex.com.au",
    picture: "/Aspen Donin.png",
    team: "DMS-JAMES",
  },
  {
    id: (processorIndex += 1),
    key: `processor-${processorIndex}`,
    name: "Kaylynn Bergson",
    email: "kaylynn.bergson@aretex.com.au",
    picture: "/Kaylynn Bergson.png",
    team: "DMS-DENNIS",
  },
]);
export const selectedProcessorAtom = atom(new Set([]));

let reviewerIndex = 0;
export const reviewerListAtom = atom([
  {
    id: (reviewerIndex += 1),
    key: `reviewer-${reviewerIndex}`,
    name: "Madelyn Septimus",
    email: "madelyn.septimus@aretex.com.au",
    picture: "/Madelyn Septimus.png",
    team: "DMS-FAST",
  },
  {
    id: (reviewerIndex += 1),
    key: `reviewer-${reviewerIndex}`,
    name: "Skylar Curtis",
    email: "skylar.curtis@aretex.com.au",
    picture: "/Skylar Curtis.png",
    team: "Financials",
  },
  {
    id: (reviewerIndex += 1),
    key: `reviewer-${reviewerIndex}`,
    name: "Wilson Herwitz",
    email: "wilson.herwitz@aretex.com.au",
    picture: "/Wilson Herwitz.png",
    team: "AP",
  },
]);
export const selectedReviewerAtom = atom(new Set([]));

export const tableColumnsAtom = atom([
  { label: "Tasks", key: "task", sortable: true },
  { label: "Status", key: "status", sortable: true },
  { label: "Start Date", key: "startDate", sortable: true },
  { label: "End Date", key: "endDate", sortable: true },
  { label: "Assignees", key: "assignees", sortable: true },
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
