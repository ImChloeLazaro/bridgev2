import {
  destroywithparams,
  restdestroy,
  restinsert,
  restread,
  restupdate,
} from "@/app/utils/amplify-rest";
import { atom } from "jotai";
import { clientsAtom, selectedClientToViewAtom } from "./ClientStore";
import { userAtom, userListAtom } from "./UserStore";
import { useMemo } from "react";
import { authenticationAtom } from "./AuthenticationStore";

export const tasksAtom = atom([]);

export const draggableTasksAtom = atom([]);

export const addTaskAtom = atom(null, async (get, set, update) => {
  const {
    manager = {},
    client = {},
    processor = [],
    reviewer = [],
    duration,
    sla = [],
  } = update;

  console.log("selectedClient: ", client);

  const clientAlreadyHaveTask = get(tasksAtom).filter(
    (task) => task.client?.client_id === client?.client_id
  );

  console.log("clientAlreadyHaveTask: ", clientAlreadyHaveTask[0]);

  // if (client && clientAlreadyHaveTask?.length) {
  //   console.log("CLIENT HAS TASK");

  //   const response = await restupdate("/cms/task", {
  //     ...clientAlreadyHaveTask[0],
  //     sla: [...clientAlreadyHaveTask[0].sla, ...sla],
  //   });
  //   console.log("RESPONSE HAS TASK FROM API", response);

  //   if (response.success) {
  //     console.log("ADDED TASK", response.response);
  //     return { success: true };
  //   } else {
  //     console.log("FAILED ADDING TASK");
  //     return { success: false };
  //   }
  // } else {
  //   console.log("CLIENT HAS NO TASK");
  //   const response = await restinsert("/cms/task", {
  //     manager,
  //     client,
  //     processor,
  //     reviewer,
  //     duration,
  //     sla,
  //   });
  //   console.log("RESPONSE HAS NO TASK FROM API", response);

  //   if (response.success) {
  //     console.log("ADDED TASK", response.response);
  //     return { success: true };
  //   } else {
  //     console.log("FAILED ADDING TASK");
  //     return { success: false };
  //   }
  // }
});
export const updateTaskAtom = atom();
export const deleteTaskAtom = atom(null, async (get, set, update) => {
  const response = await destroywithparams("/cms/task", {
    _id: "66149efa8cf1401df0973562", // "660fa0db6c5775f281500e3d"
  });
  if (response.success) {
    console.log("DELETED TASK", response.response);

    return { success: true };
  } else {
    console.log("FAILED DELETED TASK");
    return { success: false };
  }
});

export const updateTaskStatusAtom = atom(null, async (get, set, update) => {
  const { sla, client_id } = update;

  const taskToBeUpdated = get(tasksAtom).filter(
    (task) => task.client?.client_id === client_id
  );

  const response = await restupdate("/cms/task", {
    ...taskToBeUpdated[0],
    sla: [...sla],
  });
  console.log("RESPONSE FROM API", response);

  if (response.success) {
    const updatedTask = get(tasksAtom).map((task) => {
      if (task.client?.client_id === client_id) {
        return { ...task, sla: sla };
      }
      return task;
    });
    set(tasksAtom, updatedTask);

    return { success: true };
  } else {
    console.log("FAILED UPDATING TASK");
    return { success: false };
  }
});

export const tableColumnsAtom = atom([
  { label: "Task  Name", key: "name", sortable: true },
  { label: "Status", key: "status", sortable: true },
  { label: "Start Date", key: "startDate", sortable: true },
  { label: "End Date", key: "endDate", sortable: true },
  { label: "Assignees", key: "assignees", sortable: false },
  { label: "Actions", key: "action", sortable: false },
]);

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
  // {
  //   id: "undefined",
  //   title: "Undefined",
  // },
]);

export const taskBoardColsCountAtom = atom(
  (get) => get(taskBoardColsAtom).length
);

export const fetchTaskAtom = atom(null, async (get, set, sub) => {
  const tasks = await restread("/cms/task");

  if (tasks?.success) {
    console.log("TASKS SUCCESS FETCH", tasks.response);
    const convertedTasks = tasks.response.map((task, index) => {
      return {
        ...task,
        key: task.client?.client_id,
        id: `${(index += 1)}`,
        sla: [...task.sla],
      };
    });
    console.log("convertedTasks", convertedTasks);

    set(tasksAtom, convertedTasks);
  } else {
    console.log("TASKS FAILED FETCH", tasks);
  }
});

export const clientSelectionForTaskAtom = atom((get) =>
  get(clientsAtom).map((client) => {
    return {
      client_id: client._id,
      name: client.company.name,
      email: client.company.email,
      picture: client.company.picture,
      team: "",
    };
  })
);

let processorIndex = 0;
export const processorSelectionAtom = atom((get) => {
  const list = get(userListAtom);
  const peopleList = list.map((person) => ({
    ...person,
    id: (processorIndex += 1),
    key: `processor-${processorIndex}`,
  }));
  return peopleList;
});
//   [
//   {
//     id: (processorIndex += 1),
//     sub: `processor-${processorIndex}`,
//     name: "Tatiana Philips",
//     email: "tatiana.philips@aretex.com.au",
//     picture: "/Tatiana Philips.png",
//     team: "DMS - Bea",
//   },
//   {
//     id: (processorIndex += 1),
//     sub: `processor-${processorIndex}`,
//     name: "Aspen Donin",
//     email: "aspen.donin@aretex.com.au",
//     picture: "/Aspen Donin.png",
//     team: "DMS - James",
//   },
//   {
//     id: (processorIndex += 1),
//     sub: `processor-${processorIndex}`,
//     name: "Kaylynn Bergson",
//     email: "kaylynn.bergson@aretex.com.au",
//     picture: "/Kaylynn Bergson.png",
//     team: "DMS - Dennis",
//   },
//   {
//     id: (processorIndex += 1),
//     sub: `processor-${processorIndex}`,
//     name: "Eddie Lake",
//     email: "eddie.lake@aretex.com.au",
//     picture: "/Eddie Lake.png",
//     team: "DMS - Dennis",
//   },
//   {
//     id: (processorIndex += 1),
//     sub: `processor-${processorIndex}`,
//     name: "John Dukes",
//     email: "john.dukes@aretex.com.au",
//     picture: "/John Dukes.png",
//     team: "Financials - Dom",
//   },
//   {
//     id: (processorIndex += 1),
//     sub: `processor-${processorIndex}`,
//     name: "Katie Sims",
//     email: "katie.sims@aretex.com.au",
//     picture: "/Katie Sims.png",
//     team: "SD - Charlene",
//   },
// ]
// export const selectedProcessorAtom = atom(new Set([]));

let reviewerIndex = 0;
export const reviewerSelectionAtom = atom((get) => {
  const list = get(userListAtom);
  const peopleList = list.map((person) => ({
    ...person,
    id: (reviewerIndex += 1),
    key: `reviewer-${reviewerIndex}`,
  }));
  return peopleList;
});
// [
// {
//   id: (reviewerIndex += 1),
//   sub: `reviewer-${reviewerIndex}`,
//   name: "Madelyn Septimus",
//   email: "madelyn.septimus@aretex.com.au",
//   picture: "/Madelyn Septimus.png",
//   team: "DMS - Dennis",
// },
// {
//   id: (reviewerIndex += 1),
//   sub: `reviewer-${reviewerIndex}`,
//   name: "Skylar Curtis",
//   email: "skylar.curtis@aretex.com.au",
//   picture: "/Skylar Curtis.png",
//   team: "Financials - Jess",
// },
// {
//   id: (reviewerIndex += 1),
//   sub: `reviewer-${reviewerIndex}`,
//   name: "Joshua Jones",
//   email: "joshua.jones@aretex.com.au",
//   picture: "/Joshua Jones.png",
//   team: "AP - Lady",
// },
// {
//   id: (reviewerIndex += 1),
//   sub: `reviewer-${reviewerIndex}`,
//   name: "Patricia Sanders",
//   email: "patricia.sanders@aretex.com.au",
//   picture: "/Patricia Sanders.png",
//   team: "SD - Raquel",
// },
// ]

// export const selectedReviewerAtom = atom(new Set([]));

let managerIndex = 0;
export const managerSelectionAtom = atom((get) => {
  const list = get(userListAtom);
  const peopleList = list.map((person) => ({
    ...person,
    id: (managerIndex += 1),
    key: `manager-${managerIndex}`,
  }));
  return peopleList;
});
//   [
//   {
//     id: (managerIndex += 1),
//     sub: `manager-${managerIndex}`,
//     name: "Wilson Herwitz",
//     email: "wilson.herwitz@aretex.com.au",
//     picture: "/Wilson Herwitz.png",
//     team: "AP - Richmond",
//   },
//   {
//     id: (managerIndex += 1),
//     sub: `manager-${managerIndex}`,
//     name: "Corina McCoy",
//     email: "corina.mccoy@aretex.com.au",
//     picture: "/Corina McCoy.png",
//     team: "AP - Richmond",
//   },
// ]

// export const selectedManagerAtom = atom(new Set([]));

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
