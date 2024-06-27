import {
  destroywithparams,
  restinsert,
  restread,
  restupdate,
} from "@/app/utils/amplify-rest";
import { atom } from "jotai";
import { toast } from "sonner";
import { clientsAtom } from "./ClientStore";
import { userAtom, userListAtom } from "./UserStore";
import { format } from "date-fns";
import { sendNotification } from "../utils/notificationUtils";
import { notificationSocketRefAtom } from "../navigation/store/NotificationsStore";

export const tasksAtom = atom([]);

export const selectedTaskActionAtom = atom({
  key: "",
  status_id: "",
});

export const addTaskAtom = atom(null, async (get, set, update) => {
  const {
    manager = {},
    client = {},
    processor = [],
    reviewer = [],
    duration,
    sla = [],
  } = update;

  const clientAlreadyHaveTask = get(tasksAtom).filter(
    (task) => task.client?.client_id === client?.client_id
  );

  if (client && clientAlreadyHaveTask?.length) {
    const response = await restupdate("/cms/task", {
      ...clientAlreadyHaveTask[0],
      manager: manager,
      client: client,
      processor: [...clientAlreadyHaveTask[0].processor, ...processor],
      reviewer: [...clientAlreadyHaveTask[0].reviewer, ...reviewer],
      sla: [...clientAlreadyHaveTask[0].sla, ...sla],
    });

    if (response.success) {
      return { success: true };
    } else {
      return { success: false };
    }
  } else {
    const response = await restinsert("/cms/task", {
      manager,
      client,
      processor,
      reviewer,
      duration,
      sla,
    });

    if (response.success) {
      return { success: true };
    } else {
      return { success: false };
    }
  }
});
export const updateTaskAtom = atom(null, async (get, set, update) => {
  const { action, tasks, _id, reviewer, processor } = update;

  const updatedAssignees = {
    _id,
    reviewer,
    processor,
  };

  if (action === "remove") {
    const response = await Promise.all([
      await restupdate("/cms/task/remove-processor", updatedAssignees),
      await restupdate("/cms/task/remove-reviewer", updatedAssignees),
    ]);
  }
  if (action === "assign") {
    const response = await Promise.all([
      await restupdate("/cms/task/update-processor", updatedAssignees),
      await restupdate("/cms/task/update-reviewer", updatedAssignees),
    ]);
  }
});

export const deleteTaskAtom = atom(null, async (get, set, update) => {
  const response = await destroywithparams("/cms/client", {
    // _id of sla #/cms/task
    // _id of client obj #/cms/client
    _id: "665922e6167b35aedc883977", // "665922e6167b35aedc883977"
  });
  if (response.success) {
    return { success: true };
  } else {
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

  if (response === undefined) return { success: false };

  if (response?.success) {
    const updatedTask = get(tasksAtom).map((task) => {
      if (task.client?.client_id === client_id) {
        return { ...task, sla: sla };
      }
      return task;
    });
    set(tasksAtom, updatedTask);

    return { success: true };
  } else {
    return { success: false };
  }
});

export const taskActionsAtom = atom(null, async (get, set, update) => {
  const {
    sound,
    tasks,
    task_id,
    selectedProcessorTaskAction,
    selectedReviewerTaskAction,
    setSelectedProcessorTaskAction,
    setSelectedReviewerTaskAction,
  } = update;

  const { key, status_id } = get(selectedTaskActionAtom);
  const user = await get(userAtom);

  const clientKey = tasks.client.client_id;
  const clientName = tasks.client.name;
  const dateTaskDone = new Date();

  if (key === "mark") {
    let taskName;
    if (status_id === "forReview" || status_id === "done") {
      const updateSelectedTask = tasks.sla.map((task) => {
        if (task._id === task_id) {
          taskName = task?.name;

          if (status_id === "done") {
            return {
              ...task,
              status: status_id,
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
              status: status_id,
            };
          }
        }
        return task;
      });

      console.log("SEND NOTIFICATION TO: ", [
        tasks.processor.map((user) => user.sub),
        tasks.reviewer.map((user) => user.sub),
      ]);
      const socketRef = get(notificationSocketRefAtom);

      if (status_id === "done") {
        sendNotification({
          socketRef: socketRef,
          action: "notification",
          subs: tasks.processor?.map((user) => user.sub),
          title: `${user?.name} has completed [${taskName}] for ${clientName}.`,
          type: ["mentioned"],
          description: `Task Completed: ${format(dateTaskDone, "PPpp")}`,
          notified_from: user,
          route: "set",
        });
      }

      if (status_id === "forReview") {
        sendNotification({
          socketRef: socketRef,
          action: "notification",
          subs: tasks.reviewer?.map((user) => user.sub),
          title: `${user?.name} has completed [${taskName}] for ${clientName}.`,
          type: ["mentioned"],
          description: `Task Marked for Review: ${format(
            dateTaskDone,
            "PPpp"
          )}`,
          notified_from: user,
          route: "set",
        });
      }

      console.log(
        `${user?.name} has completed [${taskName}] for ${clientName}.`
      );
      console.log(
        `${user?.name} has marked [${taskName}] ready to review for ${clientName}.`
      );
      console.log(
        `${user?.name} has escalated [${taskName}] for ${clientName}.`
      );

      const promise = async () =>
        new Promise((resolve) =>
          setTimeout(
            async () =>
              resolve(
                await set(updateTaskStatusAtom, {
                  sla: updateSelectedTask,
                  client_id: clientKey,
                }),
                await set(fetchTaskAtom, {})
              ),
            2000
          )
        );
      toast.promise(promise, {
        description: `${format(dateTaskDone, "PPpp")}`,
        loading: "Updating Task Status...",
        success: () => {
          sound();
          return `${
            status_id === "done" ? "Task Completed" : "Task Marked for Review"
          }: ${taskName}`;
        },

        error: "Error Updating Task Status",
      });
    }
  }

  if (key === "escalate" || key === "resolve") {
    const updateSelectedTask = tasks.sla.map((task) => {
      if (task._id === task_id) {
        if (!Boolean(task.escalate)) {
          // if task is not escalated, set true
          return { ...task, escalate: true };
        } else {
          // resolve task escalation, set to false
          return { ...task, escalate: false };
        }
      }
      return task;
    });

    const promise = async () =>
      new Promise((resolve) =>
        setTimeout(
          async () =>
            resolve(
              await set(updateTaskStatusAtom, {
                sla: updateSelectedTask,
                client_id: clientKey,
              }),
              await set(fetchTaskAtom, {})
            ),
          2000
        )
      );
    toast.promise(promise, {
      description: `${format(dateTaskDone, "PPpp")}`,
      loading: `Escalating Task to ${
        status_id[0].toUpperCase() + status_id.slice(1)
      }`,
      success: () => {
        return "Please wait for further instructions";
      },

      error: "Error Escalating Task",
    });
  }

  if (key === "assign") {
    const assignProcessorAssignees = get(userListAtom).filter(
      (user) =>
        Array.from(selectedProcessorTaskAction).includes(user.sub) &&
        !tasks.processor.map((processor) => processor.sub).includes(user.sub)
    );
    const assignReviewerAssignees = get(userListAtom).filter(
      (user) =>
        Array.from(selectedReviewerTaskAction).includes(user.sub) &&
        !tasks.reviewer.map((reviewer) => reviewer.sub).includes(user.sub)
    );

    const promise = async () =>
      new Promise((resolve) =>
        setTimeout(
          async () =>
            resolve(
              await set(updateTaskAtom, {
                action: key,
                tasks: tasks,
                _id: tasks._id,
                processor: assignProcessorAssignees,
                reviewer: assignReviewerAssignees,
              }),
              await set(fetchTaskAtom, {})
            ),
          2000
        )
      );
    toast.promise(promise, {
      loading: "Assigning New Member...",
      success: () => {
        return `New Member Assigned successfully`;
      },
      error: "Error assigning new member",
    });
    setSelectedProcessorTaskAction(new Set([]));
    setSelectedReviewerTaskAction(new Set([]));
  }

  if (key === "remove") {
    const removeProcessorAssignees = tasks.processor.filter((user) =>
      Array.from(selectedProcessorTaskAction).includes(user.sub)
    );
    const removeReviewerAssignees = tasks.reviewer.filter((user) =>
      Array.from(selectedReviewerTaskAction).includes(user.sub)
    );

    /// ### For removing any task done by when removing processor/s and reviewer/s?
    /// ### Checks whether the soon to be removed processor/s and reviewer/s has any task done by and removes it

    // const processorSubs = tasks.processor.map((processor) => processor.sub);

    // const removeDoneBy = tasks.sla.map((task) => {
    //   console.log("task.done_by.sub", task.done_by.sub);
    //   console.log(
    //     "processorSubs.includes(task.done_by.sub)",
    //     processorSubs.includes(task.done_by.sub)
    //   );

    //   if (
    //     task.status !== "done" &&
    //     processorSubs.includes(task.done_by.sub)
    //   ) {
    //     return { ...task, done_by: {} };
    //   }
    //   return task;
    // });

    const promise = async () =>
      new Promise((resolve) =>
        setTimeout(
          async () =>
            resolve(
              // ### Removes any task done by first before removing processor/s and reviewer/s

              // await set(updateTaskStatusAtom, {
              //   sla: removeDoneBy,
              //   client_id: clientKey,
              // }),

              await set(updateTaskAtom, {
                action: key,
                tasks: tasks,
                _id: tasks._id,
                processor: removeProcessorAssignees,
                reviewer: removeReviewerAssignees,
              }),

              await set(fetchTaskAtom, {})
            ),
          2000
        )
      );
    toast.promise(promise, {
      loading: "Removing Member...",
      success: () => {
        return `Member Removed successfully`;
      },
      error: "Error removing member",
    });
    setSelectedProcessorTaskAction(new Set([]));
    setSelectedReviewerTaskAction(new Set([]));
  }
});

export const taskActionWindowDetailsAtom = atom((get) => {
  return {
    mark: {
      done: {
        title: "Complete Task",
        message: "You are about to mark this task as done",
        description: "",
        type: "confirm",
      },
      forReview: {
        title: "Review Task",
        message: "You are about to mark this task for review",
        description: "",
        type: "confirm",
      },
      title: `${
        get(selectedTaskActionAtom).status_id === "done" ? "Complete Task" : ""
      } ${
        get(selectedTaskActionAtom).status_id === "forReview"
          ? "Review Task"
          : ""
      }`,
      message: `${
        get(selectedTaskActionAtom).status_id === "done"
          ? "You are about to mark this task as done."
          : ""
      } ${
        get(selectedTaskActionAtom).status_id === "forReview"
          ? "You are about to mark this task for review."
          : ""
      }`,
      description: `${
        get(selectedTaskActionAtom).status_id === "done"
          ? "Make sure to double check if this task is completed properly."
          : ""
      } ${
        get(selectedTaskActionAtom).status_id === "forReview"
          ? "This will notify your reviewer/s to review the task."
          : ""
      }`,
      type: "confirm",
    },
    escalate: {
      title: "Escalate Task",
      message: "Do you confirm escalating this task to a team lead?",
      description:
        "This action is irreversible. Make sure to contact your team leader",
      type: "warning",
    },
    resolve: {
      title: "Resolve Escalation",
      message: "Do you confirm resolving this escalation?",
      description: "",
      type: "warning",
    },
    reassign: {
      title: "Re-assign Task",
      message: "Do you confirm re-assigning this task?",
      description: "",
      type: "warning",
    },
    assign: {
      title: "Assign team member",
      message: "Do you confirm assigning this task?",
      description: "",
      type: "info",
    },
    remove: {
      title: "Remove team member",
      message: "Do you confirm removing this team member?",
      description: "",
      type: "warning",
    },
  };
});

export const tableColumnsAtom = atom([
  { label: "Task  Name", key: "name", sortable: true },
  { label: "Description", key: "description", sortable: false },
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
    const convertedTasks = tasks.response.map((task, index) => {
      return {
        ...task,
        key: task.client?.client_id,
        // id: `${(index += 1)}`, // !important
        // sla: [...task.sla],
      };
    });

    set(tasksAtom, convertedTasks);
  } else {
  }
});

export const clientSelectionForTaskAtom = atom((get) =>
  get(clientsAtom).map((client) => {
    return {
      client_id: client._id, // #[CHANGE KEY]: client_id => key / id
      key: client._id,
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
  }));
  return peopleList;
});

let reviewerIndex = 0;
export const reviewerSelectionAtom = atom((get) => {
  const list = get(userListAtom);
  const peopleList = list.map((person) => ({
    ...person,
    id: (reviewerIndex += 1),
  }));
  return peopleList;
});

let managerIndex = 0;
export const managerSelectionAtom = atom((get) => {
  const list = get(userListAtom);
  const peopleList = list.map((person) => ({
    ...person,
    id: (managerIndex += 1),
  }));
  return peopleList;
});

let intervalIndex = 0;
export const recurrenceSelectionAtom = atom([
  {
    id: (intervalIndex += 1),
    key: `daily`,
    label: "Daily",
  },
  {
    id: (intervalIndex += 1),
    key: `weekly`,
    label: "Weekly",
  },
  {
    id: (intervalIndex += 1),
    key: `monthly`,
    label: "Monthly",
  },
  {
    id: (intervalIndex += 1),
    key: `quarterly`,
    label: "Quarterly",
  },
  {
    id: (intervalIndex += 1),
    key: `yearly`,
    label: "Yearly",
  },
  {
    id: (intervalIndex += 1),
    key: `none`,
    label: "No Recurrence",
  },
  //Daily, Weekly, Monthly, Quarterly, Yearly
]);
