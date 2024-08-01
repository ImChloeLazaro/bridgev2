import { clientsAtom } from "@/app/store/ClientStore";
import {
  managerSelectionAtom,
  processorSelectionAtom,
  reviewerSelectionAtom,
  tasksAtom,
} from "@/app/store/TaskStore";
import { userSubTeamsAtom, teamClientsAtom } from "@/app/store/TeamStore";
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
export const tasksListAtom = atom((get) => {
  const clients = get(clientsAtom);
  const user = get(userAtom);

  const tasksList = get(tasksAtom)
    .filter(
      (task) =>
        clients.map((client) => client._id).includes(task.client.client_id) &&
        // task.manager.sub === user.sub
        [
          ...task.processor.map((user) => user.sub),
          ...task.reviewer.map((user) => user.sub),
          task.manager.sub,
        ].includes(user.sub)
    )
    .map((task) => {
      return { ...task, key: task._id }; // task ID
    });
  return tasksList;
});

// Clients to display on table and board view
export const clientListAtom = atom((get) => {
  const user = get(userAtom);
  const mySubTeam = get(userSubTeamsAtom).filter(
    (subTeam) =>
      subTeam.heads.map((head) => head.sub).includes(user.sub) ||
      subTeam.members.map((member) => member.sub).includes(user.sub)
  );

  const clientsList = mySubTeam
    .map((subTeam) =>
      subTeam.client.map((client) => {
        return {
          ...client,
          key: client._id,
          _id: client._id,
          client_id: client._id,
        };
      })
    )
    .flat()
    .filter(
      (obj1, i, arr) => arr.findIndex((obj2) => obj2._id === obj1._id) === i
    );
  return clientsList;
});

export const updateSelectedProcessorAtom = atom(new Set([]));
export const updateSelectedReviewerAtom = atom(new Set([]));

// for selection in clients selection list when adding tasks to clients
export const selectedClientForTaskAtom = atom(new Set([]));

export const selectedClientAtom = atom(new Set([]));
export const clientSelectionAtom = atom((get) => {
  const clients = get(clientsAtom);
  const user = get(userAtom);
  const mySubTeam = get(userSubTeamsAtom).filter((subTeam) =>
    subTeam.heads.map((head) => head.sub).includes(user.sub)
  );

  const clientsList = clients
    .filter((client) =>
      mySubTeam
        .map((subTeam) => subTeam.client.map((client) => client._id))
        .flat()
        .includes(client._id)
    )
    .map((client) => {
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
  const user = get(userAtom);
  return get(userSubTeamsAtom)
    .filter((subTeam) =>
      subTeam.heads.map((head) => head.sub).includes(user.sub)
    )
    .map((team) => {
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
  const selectedTeam = get(selectedTeamAtom);
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
    team: Array.from(selectedTeam).toString(),
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
    key: "escalate",
    status_id: "tl",
    color: "orange",
    label: "Escalate to TL",
    icon: <MdKeyboardDoubleArrowUp size={18} />,
  },
  // {
  //   key: "resolve",
  //   status_id: "user",
  //   color: "green",
  //   label: "Resolve Escalation",
  //   icon: <MdFactCheck size={18} />,
  // },
]);
