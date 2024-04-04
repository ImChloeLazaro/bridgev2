import { restinsert, restread } from "@/app/utils/amplify-rest";
import { format } from "date-fns";
import { atom } from "jotai";
import { clientsAtom } from "./ClientStore";

export const tasksAtom = atom([]);

export const addTaskAtom = atom();
export const updateTaskAtom = atom();
export const deleteTaskAtom = atom();

export const updateTaskStatusAtom = atom(null, (get, set, update) => {
  const updatedTask = get(tasksAtom).map(
    // (task) => task.clientKey === get(selectedClientToViewAtom)
    (task) => {
      if (task.client.client_id === "client456") {
        return { ...task, sla: update };
      }
      return task;
    }
  );

  console.log("TASKS BEFORE", get(tasksAtom));
  console.log("TASKS AFTER", updatedTask);

  set(tasksAtom, updatedTask);
});

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
    label: "Done",
    value: "done",
  },
  {
    label: "For Review",
    value: "forReview",
  },
  {
    label: "Pending",
    value: "pending",
  },
]);

export const taskBoardColsAtom = atom([
  {
    id: "forReview",
    title: "For Review",
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

export const taskBoardColsCountAtom = atom(
  (get) => get(taskBoardColsAtom).length
);

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

// export const convertedTasks = atom()

export const fetchTaskAtom = atom(null, async (get, set, sub) => {
  const tasks = await restread("/cms/task");
  const taskcount = tasks.response;

  const statusCount = taskcount.reduce(
    (status, task) => {
      task.sla.forEach((sla) => {
        if (sla.status === "pending") {
          status.pending++;
        } else if (sla.status === "todo") {
          status.todo++;
        } else if (sla.status === "done") {
          status.done++;
        }
      });
      return status;
    },
    { pending: 0, todo: 0, done: 0 }
  );

  console.log("STATUS COUNT:", statusCount);

  if (tasks.success) {
    console.log("TASKS SUCCESS FETCH", tasks.response);
    const convertedTasks = tasks.response.map((task, index) => {
      return {
        ...task,
        key: task.client.client_id,
        id: `${(index += 1)}`,
      };
    });
    console.log("convertedTasks", convertedTasks);

    // set(tasksAtom, [...get(tasksAtom), convertedTasks]);
    set(tasksAtom, convertedTasks);
  } else {
    console.log("TASKS FAILED FETCH", tasks);
  }
});

export const clientTaskStatusCountAtom = atom((get) => {
  console.log("HERE HERE CLIENT TASK 1:", get(tasksAtom));
  const tasks = get(tasksAtom);
  const statusCount = tasks.map((task) => {
    // if (task.client.client_id === selectedClientToView) {
    if (task.client.client_id === "client456") {
      return task.sla.map((sla) => sla.status);
    }
  });

  console.log("HERE HERE CLIENT TASK 2:", statusCount);

  const count = statusCount[0]?.reduce(
    (acc, curr) => {
      return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
    },
    { pending: 0, todo: 0, done: 0, forReview: 0 }
  );
  return count;
});

export const clientTaskProcessorsCountAtom = atom((get) => {
  const processorCount = get(tasksAtom).map((task) => {
    // if (task.client.client_id === selectedClientToView) {
    if (task.client.client_id === "client456") {
      return task.processor;
    }
  });
  console.log("processorCount", processorCount);
  return processorCount[0];
});

export const taskNameAtom = atom("");
export const taskInstructionAtom = atom("");

export const clientSelectionForTaskAtom = atom((get) =>
  get(clientsAtom).map((client) => {
    return {
      key: client._id,
      name: client.company.name,
      email: client.company.email,
      picture: client.company.picture,
      team: "",
    };
  })
);

export const selectedClientForTaskAtom = atom(new Set([]));

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
]);
export const selectedReviewerAtom = atom(new Set([]));

let managerIndex = 0;
export const managerSelectionAtom = atom([
  {
    id: (managerIndex += 1),
    key: `manager-${managerIndex}`,
    name: "Wilson Herwitz",
    email: "wilson.herwitz@aretex.com.au",
    picture: "/Wilson Herwitz.png",
    team: "AP",
  },
  {
    id: (managerIndex += 1),
    key: `manager-${managerIndex}`,
    name: "Wilson Ferry Herwitz",
    email: "wilson.herwitz@aretex.com.au",
    picture: "/Wilson Herwitz.png",
    team: "AP",
  },
]);
export const selectedManagerAtom = atom(new Set([]));

let intervalIndex = 0;
export const recurrenceSelectionAtom = atom([
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
    label: "Quarterly",
  },
  {
    id: (intervalIndex += 1),
    key: `interval-${intervalIndex}`,
    label: "Yearly",
  },
  {
    id: (intervalIndex += 1),
    key: `interval-${intervalIndex}`,
    label: "No Recurrence",
  },
  //Daily, Weekly, Monthly, Quarterly, Yearly
]);
export const selectedRecurrenceAtom = atom(new Set([]));

export const startDateAtom = atom("");
export const startTimeAtom = atom("");
export const endDateAtom = atom("");
export const endTimeAtom = atom("");

export const taskDataAtom = atom((get) => {
  const selectedClient = get(selectedClientForTaskAtom);
  const selectedProcessor = get(selectedProcessorAtom);
  const selectedReviewer = get(selectedReviewerAtom);
  const selectedManager = get(selectedManagerAtom);
  const selectedInterval = get(selectedRecurrenceAtom);

  const clientSelection = get(clientSelectionForTaskAtom);
  const processorSelection = get(processorSelectionAtom);
  const reviewerSelection = get(reviewerSelectionAtom);
  const managerSelection = get(managerSelectionAtom);

  return {
    manager: managerSelection.filter((manager) =>
      Array.from(selectedManager).includes(manager.key)
    )[0],
    client: clientSelection.filter((client) =>
      Array.from(selectedClient).includes(client.key)
    )[0],
    processor: processorSelection.filter((processor) =>
      Array.from(selectedProcessor).includes(processor.key)
    ),
    reviewer: reviewerSelection.filter((reviewer) =>
      Array.from(selectedReviewer).includes(reviewer.key)
    ),
    recurrence: Array.from(selectedInterval).join(""), //Daily, Weekly, Monthly, Quarterly, Yearly
    sla: [
      {
        name: get(taskNameAtom),
        instruction: get(taskInstructionAtom),
        status: "todo", //todo, pending, to review, done
        progress: "Good", //Good, Overdue, Adhoc
        duration: {
          start: get(startDateAtom),
          end: get(endDateAtom),
        },
        done_by: {
          sub: String,
          name: String,
          email: String,
          picture: String,
        }, //sub
      },
    ],
  };
});
