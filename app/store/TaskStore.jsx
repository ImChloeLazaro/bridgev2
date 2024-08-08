import { restinsert, restread, restupdate } from "@/app/utils/amplify-rest";
import { format } from "date-fns";
import { atom } from "jotai";

import { toast } from "sonner";
import { notificationSocketRefAtom } from "../navigation/store/NotificationsStore";
import { sendNotification } from "../utils/notificationUtils";
import { userAtom, userListAtom } from "./UserStore";

export const tasksAtom = atom([]);

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

export const selectedTaskActionAtom = atom({
  key: "",
  status_id: "",
  sla_id: "",
});

let pageRowIndex = 0;
export const pageRowsSelectionAtom = atom([
  {
    key: `pageRow-${(pageRowIndex += 1)}`,
    label: "10",
    value: "10",
  },
  {
    key: `pageRow-${(pageRowIndex += 1)}`,
    label: "20",
    value: "20",
  },
  {
    key: `pageRow-${(pageRowIndex += 1)}`,
    label: "50",
    value: "50",
  },
  {
    key: `pageRow-${(pageRowIndex += 1)}`,
    label: "100",
    value: "100",
  },
  {
    key: `pageRow-${(pageRowIndex += 1)}`,
    label: "200",
    value: "200",
  },
]);

export const addTaskAtom = atom(null, async (get, set, update) => {
  const { team = "", manager = {}, client = {}, sla = [] } = update;
  console.log("update", update);

  if (!client?.length) {
    return;
  }

  const tasks = get(tasksAtom);
  const existingTasks = tasks.filter(
    (task) => task?.team == team && client?.client_id === task?.client.client_id
  );

  console.log("existingTasks", existingTasks);

  if (existingTasks?.length) {
    const response = await restupdate("/cms/task", {
      ...existingTasks[0],
      team: team,
      manager: manager,
      client: client,
      sla: [...existingTasks[0].sla, ...sla],
    });
    if (response?.success) {
      return { success: true };
    } else {
      return { success: false };
    }
  } else {
    const response = await restinsert("/cms/task", {
      team,
      manager,
      client,
      sla,
    });

    if (response?.success) {
      return true;
    } else {
      return false;
    }
  }

  //test for uploading new tasks
  // Potential bug discovered since adding task just inserts a
  // new task every time, updating it via dragging the task will cause duplication
  // resulting appending the selected task to an existing task obj and restricts the
  // user to drag it further since task keys are conflicting

  // When team id is available for tasks, revert functionality from before cleaned up
  // to insert new tasks to existing teams and create new tasks for new teams
});

export const updateTaskAtom = atom(null, async (get, set, update) => {
  const { action, _id, reviewer, processor, sla_id } = update;

  const updatedAssignees = {
    _id,
    reviewer,
    processor,
    sla_id
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
  const { task_id, sla_id } = update;
  // console.log("task_id", task_id);
  // console.log("sla_id", sla_id);

  const tasks = get(tasksAtom);
  // console.log("tasks", tasks);
  const response = await restupdate("/cms/task/remove-sla", {
    _id: task_id,
    sla_id: sla_id,
  });
  // const response = await destroywithparams("/cms/task", {
  //   _id: "6692445d6cfba3f344a17dc6",
  // });
  // console.log("response", response);
  if (response?.success) {
    return { success: true };
  } else {
    return { success: false };
  }
});

export const updateTaskStatusAtom = atom(null, async (get, set, update) => {
  const { sla, client_id, task_id } = update;

  const taskObj = get(tasksAtom).filter((task) => task._id === task_id)[0];

  const taskToBeUpdated = get(tasksAtom).filter(
    (task) => task.client?.client_id === client_id
  );

  const removedDuplicateSLA = [...sla, ...taskObj.sla].filter(
    (obj1, i, arr) => arr.findIndex((obj2) => obj2._id === obj1._id) === i
  );

  const response = await restupdate("/cms/task", {
    ...taskObj,
    sla: [...removedDuplicateSLA],
  });

  if (response?.success) {
    set(fetchTaskAtom, {});

    return { success: true };
  } else {
    return { success: false };
  }
});

export const taskStatusUpdateAtom = atom(null, async (get, set, update) => {
  const { taskObj, sla } = update;

  const response = await restupdate("/cms/task", {
    ...taskObj,
    sla: sla,
  });

  if (response?.success) {
    set(fetchTaskAtom, {});

    return { success: true };
  } else {
    return { success: false };
  }
});

export const taskActionsAtom = atom(null, (get, set, update) => {
  const {
    sound,
    tasks,
    taskId,
    updateSelectedProcessor,
    setUpdateSelectedProcessor,
    updateSelectedReviewer,
    setUpdateSelectedReviewer,
  } = update;

  // console.log("task actions", update);

  const { key, status_id, sla_id } = get(selectedTaskActionAtom);
  const user = get(userAtom);

  const taskObj = get(tasksAtom).filter((task) => task._id === taskId)[0];
  const slaToBeUpdated = {
    // done_by: tasks.done_by,
    duration: tasks.duration,
    escalate: tasks.escalate,
    instruction: tasks.instruction,
    name: tasks.name,
    progress: tasks.progress,
    status: tasks.status,
    _id: tasks._id,
  };

  // Notifications Details to display
  const taskName = tasks.name;
  const clientKey = tasks.client_id;
  const clientName = tasks.client_name;
  const dateTaskAction = new Date();

  const processors = tasks.processor?.map((user) => user.sub);
  const reviewers = tasks.reviewer?.map((user) => user.sub);
  const everyone = [...processors, ...reviewers, tasks.manager.sub];

  const assigneeCountMsg = (list) => {
    let size = list.length;

    if (size > 3) {
      return `${list.slice(0, 2).join(", ")} and ${size - 2} others`;
    }
    if (size == 3) {
      return `${list.slice(0, 2).join(", ")} and ${list.slice(-1)}`;
    }

    return list.join(size == 2 ? " & " : ", ");
  };

  if (key === "mark") {
    if (status_id === "forReview" || status_id === "done") {
      const updateSelectedTask = taskObj.sla.map((task) => {
        if (task._id === sla_id) {
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

      const socketRef = get(notificationSocketRefAtom);

      if (status_id === "done") {
        sendNotification({
          socketRef: socketRef,
          action: "notification",
          subs: [...processors, taskObj.manager.sub],
          title: `${user?.name} has completed task [${taskName}] for ${clientName}.`,
          type: ["mentioned"],
          description: `Task Completed: ${format(dateTaskAction, "PPpp")}`,
          notified_from: user,
          route: "set",
        });
      }

      if (status_id === "forReview") {
        sendNotification({
          socketRef: socketRef,
          action: "notification",
          subs: [...reviewers, taskObj.manager.sub],
          title: `${user?.name} has marked [${taskName}] ready to review for ${clientName}.`,
          type: ["mentioned"],
          description: `Task Marked for Review: ${format(
            dateTaskAction,
            "PPpp"
          )}`,
          notified_from: user,
          route: "set",
        });
      }

      const promise = async () =>
        new Promise((resolve) =>
          setTimeout(
            async () =>
              resolve(
                await set(taskStatusUpdateAtom, {
                  taskObj: taskObj,
                  sla: updateSelectedTask,
                }),
                await set(fetchTaskAtom, {})
              ),
            2000
          )
        );
      toast.promise(promise, {
        description: `${format(dateTaskAction, "PPpp")}`,
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

  if (key === "delete") {
    const socketRef = get(notificationSocketRefAtom);
    sendNotification({
      socketRef: socketRef,
      action: "notification",
      subs: everyone,
      title: `${user?.name} has deleted task [${taskName}] for ${clientName}.`,
      type: ["mentioned"],
      description: `Task Deleted: ${format(dateTaskAction, "PPpp")}`,
      notified_from: user,
      route: "set",
    });
    const promise = async () =>
      new Promise((resolve) =>
        setTimeout(
          async () =>
            resolve(
              await set(deleteTaskAtom, {
                task_id: taskId,
                sla_id: sla_id,
              }),
              await set(fetchTaskAtom, {})
            ),
          2000
        )
      );
    toast.promise(promise, {
      description: `${format(dateTaskAction, "PPpp")}`,
      loading: `Deleting Task...`,
      success: () => {
        sound();
        return `Task Deleted: ${taskName}`;
      },

      error: "Error Deleting Task",
    });
  }

  if (key === "escalate" || key === "resolve") {
    const updateSelectedTask = taskObj.sla.map((task) => {
      if (task._id === sla_id) {
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

    const socketRef = get(notificationSocketRefAtom);
    if (key === "escalate") {
      sendNotification({
        socketRef: socketRef,
        action: "notification",
        subs: everyone,
        title: `${user?.name} has escalated [${taskName}] for ${clientName}.`,
        type: ["mentioned"],
        description: `Task Escalation: ${format(dateTaskAction, "PPpp")}`,
        notified_from: user,
        route: "set",
      });
      const promise = async () =>
        new Promise((resolve) =>
          setTimeout(
            async () =>
              resolve(
                await set(taskStatusUpdateAtom, {
                  taskObj: taskObj,
                  sla: updateSelectedTask,
                }),
                await set(fetchTaskAtom, {})
              ),
            2000
          )
        );
      toast.promise(promise, {
        description: `${format(dateTaskAction, "PPpp")}`,
        loading: `Escalating Task to ${
          status_id[0].toUpperCase() + status_id.slice(1)
        }`,
        success: () => {
          sound();
          return "Please wait for further instructions";
        },

        error: "Error Escalating Task",
      });
    }

    if (key === "resolve") {
      sendNotification({
        socketRef: socketRef,
        action: "notification",
        subs: everyone,
        title: `${user?.name} has resolved escalation of [${taskName}] for ${clientName}.`,
        type: ["mentioned"],
        description: `Task Escalation Resolved: ${format(
          dateTaskAction,
          "PPpp"
        )}`,
        notified_from: user,
        route: "set",
      });
      const promise = async () =>
        new Promise((resolve) =>
          setTimeout(
            async () =>
              resolve(
                await set(taskStatusUpdateAtom, {
                  taskObj: taskObj,
                  sla: updateSelectedTask,
                }),
                await set(fetchTaskAtom, {})
              ),
            2000
          )
        );
      toast.promise(promise, {
        description: `${format(dateTaskAction, "PPpp")}`,
        loading: `Resolving Task [${taskName}]`,
        success: () => {
          sound();
          return "Task Resolved Successfully";
        },

        error: "Error Resolving Task Escalation",
      });
    }
  }

  if (key === "assign") {
    const assignProcessorAssignees = get(userListAtom).filter(
      (user) =>
        Array.from(updateSelectedProcessor).includes(user.sub) &&
        !tasks.processor.map((processor) => processor.sub).includes(user.sub)
    );
    const assignReviewerAssignees = get(userListAtom).filter(
      (user) =>
        Array.from(updateSelectedReviewer).includes(user.sub) &&
        !tasks.reviewer.map((reviewer) => reviewer.sub).includes(user.sub)
    );

    const newAssignees = [
      ...assignProcessorAssignees.map((assignee) => assignee?.name),
      ...assignReviewerAssignees.map((assignee) => assignee?.name),
    ];

    // console.log("newAssignees", newAssignees);

    const socketRef = get(notificationSocketRefAtom);
    sendNotification({
      socketRef: socketRef,
      action: "notification",
      subs: everyone,
      title: `${user?.name} has assigned ${assigneeCountMsg(
        newAssignees
      )} for ${clientName}.`,
      type: ["mentioned"],
      description: `New Task Assignee: ${format(dateTaskAction, "PPpp")}`,
      notified_from: user,
      route: "set",
    });

    const promise = async () =>
      new Promise((resolve) =>
        setTimeout(
          async () =>
            resolve(
              await set(updateTaskAtom, {
                action: key,
                _id: taskId,
                processor: assignProcessorAssignees,
                reviewer: assignReviewerAssignees,
                sla_id: sla_id
              }),
              await set(fetchTaskAtom, {})
            ),
          2000
        )
      );
    toast.promise(promise, {
      loading: "Assigning New Member...",
      success: () => {
        sound();
        return `New Member Assigned successfully`;
      },
      error: "Error assigning new member",
    });
    setUpdateSelectedProcessor(new Set([]));
    setUpdateSelectedReviewer(new Set([]));
  }

  if (key === "remove") {
    const removeProcessorAssignees = tasks.processor.filter((user) =>
      Array.from(updateSelectedProcessor).includes(user.sub)
    );
    const removeReviewerAssignees = tasks.reviewer.filter((user) =>
      Array.from(updateSelectedReviewer).includes(user.sub)
    );

    // console.log("removeProcessorAssignees", removeProcessorAssignees);
    // console.log("removeReviewerAssignees", removeReviewerAssignees);

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

    const removeAssignees = [
      ...removeProcessorAssignees.map((assignee) => assignee?.name),
      ...removeReviewerAssignees.map((assignee) => assignee?.name),
    ];

    const socketRef = get(notificationSocketRefAtom);
    sendNotification({
      socketRef: socketRef,
      action: "notification",
      subs: [...reviewers, tasks.manager.sub],
      title: `${user?.name} has removed ${assigneeCountMsg(
        removeAssignees
      )} for ${clientName}.`,
      type: ["mentioned"],
      description: `Remove Task Assignee: ${format(dateTaskAction, "PPpp")}`,
      notified_from: user,
      route: "set",
    });

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
                _id: taskId,
                processor: removeProcessorAssignees,
                reviewer: removeReviewerAssignees,
                sla_id: sla_id
              }),

              await set(fetchTaskAtom, {})
            ),
          2000
        )
      );
    toast.promise(promise, {
      loading: "Removing Member...",
      success: () => {
        sound();
        return `Member Removed successfully`;
      },
      error: "Error removing member",
    });
    setUpdateSelectedProcessor(new Set([]));
    setUpdateSelectedReviewer(new Set([]));
  }
});

export const actionButtonsAtom = atom({
  task: {
    color: "blue",
    label: "Create Task",
  },
  client: {
    color: "orange",
    label: "Onboard Client",
  },
});

export const taskActionWindowDetailsAtom = atom((get) => {
  return {
    mark: {
      // done: {
      //   title: "Complete Task",
      //   message: "You are about to mark this task as done",
      //   description: "",
      //   type: "confirm",
      // },
      // forReview: {
      //   title: "Review Task",
      //   message: "You are about to mark this task for review",
      //   description: "",
      //   type: "confirm",
      // },
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
    delete: {
      title: "Delete Task",
      message: "You are about to delete this task.",
      description:
        "This action is irreversible. Make sure this task is ready to be deleted.",
      type: "warning",
    },
    escalate: {
      title: "Escalate Task",
      message: "Do you confirm escalating this task?",
      description:
        "This action is irreversible. Make sure to contact your team leader.",
      type: "warning",
    },
    resolve: {
      title: "Resolve Escalation",
      message: "You are about to resolve this escalation.",
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
      message: "Do you confirm assigning a team member/s to this task?",
      description: "",
      type: "info",
    },
    remove: {
      title: "Remove team member",
      message: "You are about to remove a team member/s.",
      description:
        "This action will remove the team member from access to this task.",
      type: "warning",
    },
  };
});

export const tableColumnsAtom = atom([
  { label: "Task  Name", key: "name", sortable: true },
  { label: "Description", key: "description", sortable: false },
  { label: "Status", key: "status", sortable: true },
  { label: "Due Date", key: "dueDate", sortable: true },
  { label: "Assignees", key: "assignees", sortable: false },
  { label: "Actions", key: "action", sortable: false },
]);

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
    id: "pending",
    title: "Pending",
  },
  {
    id: "todo",
    title: "To Do",
  },
  {
    id: "forReview",
    title: "For Review",
  },
  {
    id: "done",
    title: "Done",
  },
  // {
  //   id: "undefined",
  //   title: "Undefined",
  // },
]);

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
