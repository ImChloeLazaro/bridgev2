import { authenticationAtom } from "@/app/store/AuthenticationStore";
import {
  managerSelectionAtom,
  processorSelectionAtom,
  reviewerSelectionAtom,
  tasksAtom,
} from "@/app/store/TaskStore";
import { userAtom } from "@/app/store/UserStore";
import { readwithparams } from "@/app/utils/amplify-rest";
import {
  getLocalTimeZone,
  parseTime,
  Time,
  toCalendarDateTime,
  today,
} from "@internationalized/date";
import { format } from "date-fns";
import { atom } from "jotai";
import { clientSubItemDataAtom } from "../../profile/store/ProfileStore";
import { clientsAtom } from "@/app/store/ClientStore";
export const changeViewAtom = atom(false);
export const showClientTaskAtom = atom(false);
export const showFooterAtom = atom(true);
export const showSearchBarAtom = atom(true);

export const selectedClientToViewAtom = atom("");
export const selectedClientFilterKeysAtom = atom(new Set(["all"]));
export const selectedTaskFilterKeysAtom = atom(new Set(["all"]));
export const showClientDetailsAtom = atom(false);

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

export const selectedPage = atom(1);

// TASK ESSENTIALS

export const selectedTeamForTaskAtom = atom(new Set([]));

export const selectedClientForTaskAtom = atom(new Set([]));
export const selectedProcessorAtom = atom(new Set([]));
export const selectedReviewerAtom = atom(new Set([]));
export const selectedManagerAtom = atom(new Set([]));
export const selectedRecurrenceAtom = atom(new Set(["daily"]));

export const teamsAtom = atom([]);

export const fetchTeamsAtom = atom(null, async (get, set, update) => {
  const user = await get(userAtom);
  const teams = await readwithparams("/teams/subteam/myUserSubTeam", {
    sub: user.sub,
  });
  if (teams?.success) {
    const convertedTeams = teams.response.map((team, index) => {
      return { ...team, key: team._id };
    });
    set(teamsAtom, convertedTeams);
  } else {
    console.error("Failed to fetch teams", teams?.error);
  }
});

export const teamSelectionAtom = atom((get) => {
  let teams = get(teamsAtom).filter((team) => {
    return team;
  });
  return teams;
});

export const teamsByClientSelectionAtom = atom(async (get) => {
  const user = await get(userAtom);
  let filteredTeamsByClient = get(teamsAtom).filter(
    (team) =>
      team.client.some(
        (client) =>
          client._id === Array.from(get(selectedClientForTaskAtom)).toString()
      ) && team.heads.some((head) => head.sub === user.sub)
  );

  console.log("filteredTeamsByClient", filteredTeamsByClient);

  return filteredTeamsByClient;
});

export const taskDurationAtom = atom("");

export const dateRangeAtom = atom({
  start: today(getLocalTimeZone()),
  end: today(getLocalTimeZone()).add({ days: 1 }),
});
export const startTimeAtom = atom(parseTime(format(new Date(), "HH:mm")));
export const endTimeAtom = atom(new Time(17));

export const taskNameAtom = atom("");
export const taskInstructionAtom = atom("");

export const taskDataAtom = atom(async (get) => {
  const selectedClientForTask = get(selectedClientForTaskAtom);
  const selectedProcessor = get(selectedProcessorAtom);
  const selectedReviewer = get(selectedReviewerAtom);
  const selectedManager = get(selectedManagerAtom);
  const selectedRecurrence = get(selectedRecurrenceAtom);

  const clientSelection = await get(clientSelectionForTaskAtom);
  const processorSelection = get(processorSelectionAtom);
  const reviewerSelection = get(reviewerSelectionAtom);
  const managerSelection = get(managerSelectionAtom);

  return {
    client: clientSelection.filter((client) =>
      Array.from(selectedClientForTask).includes(client?.key)
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
            get(dateRangeAtom).end,
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

// export const teamSelectionAtom = atom((get) =>
//   get(subTeamsAtom)
//     .map((team) => {
//       const user = get(authenticationAtom);
//       const selectedClient = get(selectedClientForTaskAtom);
//       console.log("Selected client", selectedClient);
//       if (
//         team.heads.some((team) => team.sub === user.value.sub) &&
//         team.client.some((cl) => cl?._id === selectedClient.anchorKey)
//       ) {
//         return {
//           ...team,
//           key: team._id,
//           value: team._id,
//           userSide: true,
//         };
//       } else {
//         return undefined;
//       }
//     })
//     .filter((team) => team !== undefined)
// );

// CLIENT ESSENTIALS

export const filterClientAtom = atom(async (get) => {
  const user = await get(userAtom);
  const filtered = await readwithparams("/teams/subteam/myUserSubTeam", {
    sub: user.sub,
    method: "filtered",
  });

  console.log("filtered", filtered);

  if (filtered?.success) {
    return filtered.response
      .map((filter) => filter.client)
      .flat()
      .filter(
        (obj1, i, arr) => arr.findIndex((obj2) => obj2._id === obj1._id) === i
      );
  } else {
    return {};
  }
});

// const subTeamsAtom = atom([]);
// export const fetchTeamsAtom = atom(null, async (get, set, update) => {
//   const subItemData = await get(clientSubItemDataAtom);
//   if (subItemData?.success) {
//     const convertedTeams = subItemData?.response?.map((team, index) => {
//       return { ...team, key: team._id };
//     });
//     set(subTeamsAtom, convertedTeams);
//   } else {
//     console.error("Failed to fetch teams", subItemData?.error);
//   }
// });
export const clientSelectionForTaskAtom = atom(async (get) => {
  let filterClient = await get(filterClientAtom);

  let filteredClients = get(clientsAtom).filter((client) =>
    filterClient.map((client) => client._id).includes(client._id)
  );

  let selection = filteredClients.map((client) => {
    return {
      client_id: client._id, // #[CHANGE KEY]: client_id => key / id
      key: client._id,
      name: client.company.name,
      email: client.company.email,
      picture: client.company.picture,
      team: "",
    };
  });

  return selection;
});
// export const clientSelectionForTaskAtom = atom(async (get) => {
//   const subItemData = await get(clientSubItemDataAtom);
//   const user = await get(userAtom);
//   const clientsMap = new Map();

//   subItemData?.response?.forEach((itemData) => {
//     if (itemData.heads.some((head) => head.sub === user.sub)) {
//       itemData.client.forEach((client) => {
//         if (!clientsMap.has(client.email)) {
//           clientsMap.set(client.email, {
//             client_id: client._id, // #[CHANGE KEY]: client_id => key / id
//             key: client._id,
//             name: client.name,
//             email: client.email,
//             picture: client?.picture || "",
//             team: "",
//           });
//         }
//       });
//     }
//   });

//   return Array.from(clientsMap.values());
// });

export const clientSelectionChangeAtom = atom(null, (get, set, update) => {
  const { key, operator } = update;
  const user = get(authenticationAtom);
  const clientSelectionChange = get(tasksAtom).filter(
    (task) => task.client?.client_id === key
  );

  const manager =
    operator === "USER"
      ? user.value.sub
      : clientSelectionChange[0]?.manager?.sub;

  if (typeof clientSelectionChange[0]?.client?.client_id === "string") {
    const selectedClient = [clientSelectionChange[0].client?.client_id] ?? [];
    const selectedProcessor =
      clientSelectionChange[0].processor.map((processor) => processor?.sub) ??
      [];
    const selectedReviewer =
      clientSelectionChange[0].reviewer.map((reviewer) => reviewer?.sub) ?? [];
    const selectedManager = typeof manager !== "string" ? [] : [manager];

    set(selectedClientForTaskAtom, new Set(selectedClient));
    set(selectedProcessorAtom, new Set(selectedProcessor));
    set(selectedReviewerAtom, new Set(selectedReviewer));
    set(selectedManagerAtom, new Set(selectedManager));
  } else {
    set(selectedProcessorAtom, new Set([]));
    set(selectedReviewerAtom, new Set([]));
    set(selectedManagerAtom, new Set([]));
  }
});
