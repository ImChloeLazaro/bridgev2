import {
  managerSelectionAtom,
  processorSelectionAtom,
  reviewerSelectionAtom,
  tasksAtom,
} from "@/app/store/TaskStore";
import { subTeamsAtom, teamClientsAtom } from "@/app/store/TeamStore";
import { userAtom } from "@/app/store/UserStore";
import {
  getLocalTimeZone,
  parseTime,
  Time,
  toCalendarDateTime,
  today,
} from "@internationalized/date";
import { format } from "date-fns";
import { atom } from "jotai";
import {
  MdDelete,
  MdFactCheck,
  MdKeyboardDoubleArrowUp,
  MdOutlineAssignment,
  MdRemoveCircleOutline,
} from "react-icons/md";

// Essentials for CMS
export const changeViewAtom = atom(false);
export const showClientTaskAtom = atom(false);
export const showFooterAtom = atom(true);
export const showSearchBarAtom = atom(true);
export const showClientDetailsAtom = atom(false);

export const selectedClientFilterKeysAtom = atom(new Set(["all"]));
export const selectedTaskFilterKeysAtom = atom(new Set(["all"]));

// from ClientItemCard for selecting clients to view
export const selectedClientToViewAtom = atom("");

// for tracking tasks, per sla ID inside task object
export const selectedTaskAtom = atom("");

// for tracking tasks, task object ID
export const selectedTaskIDAtom = atom("");

// Tasks to display on table and board view
export const tasksListAtom = atom(async (get) => {
  const clients = get(teamClientsAtom);
  const user = await get(userAtom);

  const tasksList = get(tasksAtom)
    .filter(
      (task) =>
        clients.map((client) => client._id).includes(task.client.client_id) &&
        (task.manager.sub === user.sub ||
          task.processor.some((processor) => processor.sub === user.sub) ||
          task.reviewer.some((reviewer) => reviewer.sub === user.sub))
    )
    .map((task) => {
      return { ...task, key: task._id }; // task ID
    });
  console.log(tasksList);
  return tasksList;
});

// Clients to display on table and board view
export const clientListAtom = atom((get) => {
  const clients = get(teamClientsAtom);

  const clientsList = clients.map((client) => {
    return {
      ...client,
      key: client._id,
      _id: client._id,
      client_id: client._id,
    };
  });
  return clientsList;
});

export const updateSelectedProcessorAtom = atom(new Set([]));
export const updateSelectedReviewerAtom = atom(new Set([]));

// for selection in clients selection list when adding tasks to clients
export const selectedClientForTaskAtom = atom(new Set([]));

export const selectedClientAtom = atom(new Set([]));
export const clientSelectionAtom = atom((get) => {
  const clientsList = get(teamClientsAtom).map((client) => {
    return {
      ...client,
      key: client._id,
      _id: client._id,
      client_id: client._id,
    };
  });
  return clientsList;
});

export const selectedTeamAtom = atom(new Set([]));
export const teamSelectionAtom = atom((get) => {
  return get(subTeamsAtom).map((team) => {
    return { ...team, key: team._id };
  });
});

// selection from task store since admin sees all
export const selectedProcessorAtom = atom(new Set([]));
export const selectedReviewerAtom = atom(new Set([]));
export const selectedManagerAtom = atom(new Set([]));

// task details
export const taskNameAtom = atom("");
export const taskInstructionAtom = atom("");
export const selectedRecurrenceAtom = atom(new Set(["daily"])); // selection from task store since admin sees all
export const taskDurationAtom = atom("");
export const dateRangeAtom = atom({
  start: today(getLocalTimeZone()).set({ hour: 8 }),
  end: today(getLocalTimeZone()),
});
export const startTimeAtom = atom(parseTime(format(new Date(), "HH:mm")));
export const endTimeAtom = atom(new Time(17));

export const taskDataAtom = atom((get) => {
  const selectedClient = get(selectedClientAtom);
  const selectedProcessor = get(selectedProcessorAtom);
  const selectedReviewer = get(selectedReviewerAtom);
  const selectedManager = get(selectedManagerAtom);
  const selectedRecurrence = get(selectedRecurrenceAtom);

  const clientSelection = get(clientSelectionAtom);
  const processorSelection = get(processorSelectionAtom);
  const reviewerSelection = get(reviewerSelectionAtom);
  const managerSelection = get(managerSelectionAtom);

  return {
    client: clientSelection.filter((client) =>
      Array.from(selectedClient).includes(client?.key)
    )[0],
    processor: processorSelection.filter((processor) =>
      Array.from(selectedProcessor).includes(processor.sub)
    ),
    reviewer: reviewerSelection.filter((reviewer) =>
      Array.from(selectedReviewer).includes(reviewer.sub)
    ),
    manager: managerSelection.filter((manager) =>
      Array.from(selectedManager).includes(manager?.sub)
    )[0],
    sla: [
      {
        name: get(taskNameAtom) === "" ? "Task Name" : get(taskNameAtom),
        escalate: false,
        instruction:
          get(taskInstructionAtom) === ""
            ? "Add Instructions"
            : get(taskInstructionAtom),
        status: "todo", //todo, pending, to review, done
        progress: "good", //good, overdue, adhoc
        duration: {
          start: toCalendarDateTime(
            get(dateRangeAtom).start,
            get(startTimeAtom)
          ).toString(),
          end: toCalendarDateTime(
            get(dateRangeAtom).start,
            get(endTimeAtom)
          ).toString(),
          recurrence:
            //Daily, Weekly, Monthly, Quarterly, Yearly
            Array.from(selectedRecurrence).join("") === ""
              ? "daily"
              : Array.from(selectedRecurrence).join(""),
        },
      },
    ],
  };
});

export const taskActionsDetailsAtom = atom([
  {
    key: "delete",
    status_id: "tl",
    color: "red",
    label: "Delete task from client",
    icon: <MdDelete size={18} />,
  },
  {
    key: "escalate",
    status_id: "admin",
    color: "orange",
    label: "Escalate to admin",
    icon: <MdKeyboardDoubleArrowUp size={18} />,
  },
  {
    key: "resolve",
    status_id: "tl",
    color: "green",
    label: "Resolve Escalation",
    icon: <MdFactCheck size={18} />,
  },
  {
    key: "assign",
    status_id: "tl",
    color: "blue",
    label: "Assign to a team member",
    icon: <MdOutlineAssignment size={18} />,
  },
  {
    key: "remove",
    status_id: "tl",
    color: "red",
    label: "Remove a team member",
    icon: <MdRemoveCircleOutline size={18} />,
  },
]);
