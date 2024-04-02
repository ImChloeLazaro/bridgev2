import { restinsert, restread } from "@/app/utils/amplify-rest";
import { format } from "date-fns";
import { atom } from "jotai";

export const tasksAtom = atom([
  {
    client: {
      client_id: "client-123",
      name: "BLOOMS UMINA",
      email: "blooms.umina@blooms.com.au",
      picture: "https://www.fluvouchers.com.au/logos/profile/limage-4224.jpg",
    },
    duration: {
      start: "2024-02-16T02:21:48.455Z",
      end: "2024-03-16T02:21:48.455Z",
    },
    _id: "65dbe8aea9d595dfef10fa1e",
    name: "Dailies Review 1",
    processor: [
      {
        sub: "d0229811-67cc-4fb8-915b-38d8029b85df",
        name: "Chloe Lazaro",
        email: "chloe.lazaro@aretex.com.au",
        picture:
          "https://lh3.googleusercontent.com/a/ACg8ocIxaddCAyXN_wh9WLB3DrR4tqUJOMWc31qXCUmmCtrLaA=s96-c",
        _id: "65dbe8aea9d595dfef10fa1f",
      },
      {
        sub: "a8dfd442-2977-499b-a917-a0e226c6c089",
        name: "Cyrus Layugan",
        email: "cyrus.layugan@aretex.com.au",
        picture:
          "https://lh3.googleusercontent.com/a/ACg8ocLpwxhx9lINMohpX7A8ewFwV4G9dKZ_oB2TK42jxweJ=s96-c",
        _id: "65dbe8aea9d595dfef10fa20",
      },
    ],
    reviewer: [
      {
        sub: "1857671a-fad8-4dcb-b7ae-171be5845fe5",
        name: "Reinier Silo",
        email: "reinier.silo@aretex.com.au",
        picture:
          "https://lh3.googleusercontent.com/a/ACg8ocJUEKZAPNJj_fRKTTZHj5G0ucsGyD4Zo2OJLhCs6mPSOyM=s96-c",
        _id: "65dbe8aea9d595dfef10fa21",
      },
    ],
    status: "pending",
    __v: 0,
    key: "65dbe8aea9d595dfef10fa1e",
    id: "4",
    clientKey: "client-4",
    columnId: "pending",
  },
  {
    client: {
      client_id: "client-123",
      name: "BLOOMS UMINA",
      email: "blooms.umina@blooms.com.au",
      picture: "https://www.fluvouchers.com.au/logos/profile/limage-4224.jpg",
    },
    duration: {
      start: "2024-02-16T02:21:48.455Z",
      end: "2024-03-16T02:21:48.455Z",
    },
    _id: "65dbe8aea9d595dfef10fa1v",
    name: "Dailies Review",
    processor: [
      {
        sub: "d0229811-67cc-4fb8-915b-38d8029b85df",
        name: "Chloe Lazaro",
        email: "chloe.lazaro@aretex.com.au",
        picture:
          "https://lh3.googleusercontent.com/a/ACg8ocIxaddCAyXN_wh9WLB3DrR4tqUJOMWc31qXCUmmCtrLaA=s96-c",
        _id: "65dbe8aea9d595dfef10fa1f",
      },
      {
        sub: "a8dfd442-2977-499b-a917-a0e226c6c089",
        name: "Cyrus Layugan",
        email: "cyrus.layugan@aretex.com.au",
        picture:
          "https://lh3.googleusercontent.com/a/ACg8ocLpwxhx9lINMohpX7A8ewFwV4G9dKZ_oB2TK42jxweJ=s96-c",
        _id: "65dbe8aea9d595dfef10fa20",
      },
    ],
    reviewer: [
      {
        sub: "1857671a-fad8-4dcb-b7ae-171be5845fe5",
        name: "Reinier Silo",
        email: "reinier.silo@aretex.com.au",
        picture:
          "https://lh3.googleusercontent.com/a/ACg8ocJUEKZAPNJj_fRKTTZHj5G0ucsGyD4Zo2OJLhCs6mPSOyM=s96-c",
        _id: "65dbe8aea9d595dfef10fa21",
      },
    ],
    status: "inProgress",
    __v: 0,
    key: "65dbe8aea9d595dfef10fa1v",
    id: "5",
    clientKey: "client-5",
    columnId: "inProgress",
  },
  {
    client: {
      client_id: "client-123",
      name: "BLOOMS UMINA",
      email: "blooms.umina@blooms.com.au",
      picture: "https://www.fluvouchers.com.au/logos/profile/limage-4224.jpg",
    },
    duration: {
      start: "2024-02-16T02:21:48.455Z",
      end: "2024-03-16T02:21:48.455Z",
    },
    _id: "65dbe8aea9d595dfef10fa1a",
    name: "Dailies Review",
    processor: [
      {
        sub: "d0229811-67cc-4fb8-915b-38d8029b85df",
        name: "Chloe Lazaro",
        email: "chloe.lazaro@aretex.com.au",
        picture:
          "https://lh3.googleusercontent.com/a/ACg8ocIxaddCAyXN_wh9WLB3DrR4tqUJOMWc31qXCUmmCtrLaA=s96-c",
        _id: "65dbe8aea9d595dfef10fa1f",
      },
      {
        sub: "a8dfd442-2977-499b-a917-a0e226c6c089",
        name: "Cyrus Layugan",
        email: "cyrus.layugan@aretex.com.au",
        picture:
          "https://lh3.googleusercontent.com/a/ACg8ocLpwxhx9lINMohpX7A8ewFwV4G9dKZ_oB2TK42jxweJ=s96-c",
        _id: "65dbe8aea9d595dfef10fa20",
      },
    ],
    reviewer: [
      {
        sub: "1857671a-fad8-4dcb-b7ae-171be5845fe5",
        name: "Reinier Silo",
        email: "reinier.silo@aretex.com.au",
        picture:
          "https://lh3.googleusercontent.com/a/ACg8ocJUEKZAPNJj_fRKTTZHj5G0ucsGyD4Zo2OJLhCs6mPSOyM=s96-c",
        _id: "65dbe8aea9d595dfef10fa21",
      },
    ],
    status: "done",
    __v: 0,
    key: "65dbe8aea9d595dfef10fa1a",
    id: "6",
    clientKey: "client-6",
    columnId: "done",
  },
]);

export const addTaskAtom = atom();
export const updateTaskAtom = atom();
export const deleteTaskAtom = atom();

export const taskNameAtom = atom();

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
export const insertTaskAtom = atom(null, async (get, set, update) => {
  const { name, client, processor, reviewer, duration, status } = update;

  await restinsert("/cms/task", {
    name,
    client,
    processor,
    reviewer,
    duration,
    status,
  });

  console.log("INSERT TASK");
  //Add another function to fetch the tasks.
});

export const fetchTaskAtom = atom(null, async (get, set, sub) => {
  const tasks = await restread("/cms/task");
  const taskcount = tasks.response;
  
  const statusCount = taskcount.reduce((status, task) => {
      task.sla.forEach(sla => {
          if (sla.status === 'pending') {
              status.pending++;
          } else if (sla.status === 'todo') {
              status.todo++;
          } else if (sla.status === 'done') {
              status.done++;
          }
      });
      return status;
  }, { pending: 0, todo: 0, done: 0 });
  
  console.log("STATUS COUNT:", statusCount);
  
  if (tasks.success) {
    console.log("TASKS SUCCESS FETCH", tasks.response);
    const convertedTasks = tasks.response.map((task, index) => {
      return {
        ...task,
        key: task._id,
        id: `${(index += 1)}`,
        status: task.status.toLowerCase(),
        columnId: task.status.toLowerCase(),
      };
    });
    console.log("convertedTasks", convertedTasks);

    // set(tasksAtom, [...get(tasksAtom), convertedTasks]);
    set(tasksAtom, convertedTasks);
  } else {
    console.log("TASKS FAILED FETCH", tasks);
  }
});

let clientIndex = 0;
export const clientSelectionAtom = atom([
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
export const processorSelectionAtom = atom([
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
export const reviewerSelectionAtom = atom([
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

let intervalIndex = 0;
export const intervalSelectionAtom = atom([
  {
    id: (intervalIndex += 1),
    key: `interval-${intervalIndex}`,
    label: "Daily",
  },
  {
    id: (intervalIndex += 1),
    key: `interval-${intervalIndex}`,
    label: "Weekly",
  },
  {
    id: (intervalIndex += 1),
    key: `interval-${intervalIndex}`,
    label: "Monthly",
  },
  {
    id: (intervalIndex += 1),
    key: `interval-${intervalIndex}`,
    label: "Custom",
  },
]);
export const selectedIntervalAtom = atom(new Set([]));

export const startDateAtom = atom("");
export const startTimeAtom = atom("");
export const endDateAtom = atom("");
export const endTimeAtom = atom("");
