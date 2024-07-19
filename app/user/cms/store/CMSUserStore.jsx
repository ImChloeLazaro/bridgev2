import { userAtom } from "@/app/store/UserStore";
import { readwithparams } from "@/app/utils/amplify-rest";
import { atom } from "jotai";

export const changeViewAtom = atom(false);
export const showClientTaskAtom = atom(false);
export const showFooterAtom = atom(true);
export const showSearchBarAtom = atom(true);

export const selectedClientForTaskAtom = atom(new Set([]));
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

// CLIENT ESSENTIALS

export const filterClientAtom = atom(async (get) => {
  const user = await get(userAtom);
  const filtered = await readwithparams("/teams/team/filterClient", {
    sub: user.sub,
    method: "filtered",
  });

  if (filtered?.success) {
    return filtered.response;
  } else {
    return {};
  }
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

