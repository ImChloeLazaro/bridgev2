import { clientsAtom } from "@/app/store/ClientStore";
import { tasksAtom } from "@/app/store/TaskStore";
import { myTeamsAtom, userSubTeamsAtom } from "@/app/store/TeamStore";
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
import { MdKeyboardDoubleArrowUp } from "react-icons/md";

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
  const userSubTeams = get(userSubTeamsAtom);
  const myTeams = get(myTeamsAtom);
  const user = get(userAtom);

  const tasksList = get(tasksAtom)
    .filter((task) =>
      [userSubTeams, myTeams]
        .flat()
        .filter((teamTask) => teamTask.team || teamTask._id)
        .map((teamTask) => teamTask._id)
        .includes(task.team)
    )
    .map((task) => {
      return { ...task, key: task._id }; // task ID
    });

  const filteredTasksByUser = tasksList.filter((task) => {
    let assignees = [
      task.manager.sub,
      task.sla.map((sla) => sla.processor.map((user) => user.sub)).flat(),
      task.sla.map((sla) => sla.reviewer.map((user) => user.sub)).flat(),
    ].flat();

    return new Set(assignees).has(user.sub);
  });

  return filteredTasksByUser.filter((task) => task.status === "active");
});

// Clients to display on table and board view
export const clientListAtom = atom((get) => {
  const user = get(userAtom);

  const mySubTeam = get(userSubTeamsAtom).filter(
    (subTeam) =>
      subTeam.heads.map((head) => head.sub).includes(user.sub) ||
      subTeam.members.map((member) => member.sub).includes(user.sub)
  );

  const clientList = [...mySubTeam]
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

  return clientList;
});

export const updateSelectedProcessorAtom = atom(new Set([]));
export const updateSelectedReviewerAtom = atom(new Set([]));

// for selection in clients selection list when adding tasks to clients
export const selectedClientForTaskAtom = atom(new Set([]));

export const isUserHeadAtom = atom((get) => {
  const user = get(userAtom);
  const teams = get(userSubTeamsAtom)
    .filter((subTeam) =>
      subTeam.heads.map((head) => head.sub).includes(user.sub)
    )
    .map((team) => {
      return { ...team, key: team._id };
    });

  if (teams?.length) {
    return true;
  } else {
    return false;
  }
});

export const isUserHeadByClientAtom = atom((get) => {
  const user = get(userAtom);
  const selectedClient = get(selectedClientToViewAtom);
  const teams = get(userSubTeamsAtom)
    .filter(
      (subTeam) =>
        subTeam.heads.map((head) => head.sub).includes(user.sub) &&
        subTeam.client.map((client) => client._id).includes(selectedClient)
    )
    .map((team) => {
      return { ...team, key: team._id };
    });

  if (teams?.length) {
    return true;
  } else {
    return false;
  }
});

export const selectedTeamAtom = atom(new Set([]));
export const teamSelectionAtom = atom((get) => {
  const user = get(userAtom);
  const teams = get(userSubTeamsAtom)
    .filter((subTeam) =>
      subTeam.heads.map((head) => head.sub).includes(user.sub)
    )
    .map((team) => {
      return { ...team, key: team._id };
    });

  return teams;
});

export const selectedClientAtom = atom(new Set([]));
export const clientSelectionAtom = atom((get) => {
  const selectedTeam = get(selectedTeamAtom);
  const team = get(teamSelectionAtom)
    .filter((team) => Array.from(selectedTeam).includes(team?._id))
    .pop();

  if (!team?.length) {
    return (
      team?.client?.map((client) => {
        return {
          ...client,
          key: client._id,
          _id: client._id,
          client_id: client._id,
        };
      }) ?? []
    );
  } else {
    return [];
  }
});

export const selectedProcessorAtom = atom(new Set([]));
export const processorSelectionAtom = atom((get) => {
  const selectedTeam = get(selectedTeamAtom);
  const team = get(teamSelectionAtom)
    .filter((team) => Array.from(selectedTeam).includes(team?._id))
    .pop();

  if (!team?.length) {
    return (
      team?.members?.map((member) => {
        return {
          ...member,
          key: member.sub,
        };
      }) ?? []
    );
  } else {
    return [];
  }
});

export const selectedReviewerAtom = atom(new Set([]));
export const reviewerSelectionAtom = atom((get) => {
  const selectedTeam = get(selectedTeamAtom);
  const team = get(teamSelectionAtom)
    .filter((team) => Array.from(selectedTeam).includes(team?._id))
    .pop();

  if (!team?.length) {
    return (
      team?.members?.map((member) => {
        return {
          ...member,
          key: member.sub,
        };
      }) ?? []
    );
  } else {
    return [];
  }
});

export const selectedManagerAtom = atom(new Set([]));
export const managerSelectionAtom = atom((get) => {
  const selectedTeam = get(selectedTeamAtom);
  const team = get(teamSelectionAtom)
    .filter((team) => Array.from(selectedTeam).includes(team?._id))
    .pop();

  if (!team?.length) {
    const headsList =
      team?.heads?.map((head) => {
        return {
          ...head,
          key: head.sub,
        };
      }) ?? [];
    return headsList.filter(
      (obj1, i, arr) => arr.findIndex((obj2) => obj2.sub === obj1.sub) === i
    );
  } else {
    return [];
  }
});

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
    client: clientSelection?.filter((client) =>
      Array.from(selectedClient).includes(client?.key)
    )[0],
    manager: managerSelection?.filter((manager) =>
      Array.from(selectedManager).includes(manager?.sub)
    )[0],
    sla: [
      {
        name: get(taskNameAtom) === "" ? "Task Name" : get(taskNameAtom),
        escalate: false,
        processor: processorSelection?.filter((processor) =>
          Array.from(selectedProcessor).includes(processor.sub)
        ),
        reviewer: reviewerSelection?.filter((reviewer) =>
          Array.from(selectedReviewer).includes(reviewer.sub)
        ),
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

export const handleViewUserAtom = atom(null, (get, set, item) => {
  const id = item?.location_id;
  const newID = new Set([id]);
  set(selectedClientToViewAtom, id);
  set(selectedClientForTaskAtom, newID);
  set(showClientTaskAtom, true);
});
