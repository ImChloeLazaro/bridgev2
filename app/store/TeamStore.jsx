import {
  readwithparams,
  restinsert,
  restread,
  restupdate,
} from "@/app/utils/amplify-rest";
import { format } from "date-fns";
import { atom } from "jotai";
import { toast } from "sonner";
import { notificationSocketRefAtom } from "../navigation/store/NotificationsStore";
import { sendNotification } from "../utils/notificationUtils";
import { userAtom, userListAtom } from "./UserStore";

export const teamsAtom = atom([]); // admin side

export const fetchTeamsAtom = atom(null, async (get, set, update) => {
  const teams = await restread("/teams/team");

  if (teams?.success) {
    const convertedTeams = teams.response.map((team, index) => {
      return {
        ...team,
        index: index,
      };
    });

    set(teamsAtom, convertedTeams);
  } else {
    set(teamsAtom, []);
  }
});

export const myTeamsAtom = atom([]); // admin side

export const fetchMyTeamsAtom = atom(null, async (get, set, update) => {
  const user = get(userAtom);
  const teams = await readwithparams("/teams/team/myTeam", {
    sub: user.sub,
  });
  if (teams?.success) {
    const convertedMyTeams = teams.response.map((team, index) => {
      return {
        ...team,
        index: index,
      };
    });

    set(myTeamsAtom, convertedMyTeams);
  } else {
    set(teamsAtom, []);
  }
});

export const subTeamsAtom = atom([]); // TL side

export const fetchSubTeamsAtom = atom(null, async (get, set, update) => {
  const user = get(userAtom);
  const subTeams = await readwithparams("/teams/subteam/mySubTeam", {
    sub: user.sub,
  });

  if (subTeams?.success) {
    const convertedSubTeams = subTeams.response.map((subTeam, index) => {
      return {
        ...subTeam,
        index: index,
      };
    });

    set(subTeamsAtom, convertedSubTeams);
  } else {
    set(subTeamsAtom, []);
  }
});

export const userSubTeamsAtom = atom([]); // User side

export const fetchUserSubTeamsAtom = atom(null, async (get, set, update) => {
  const user = get(userAtom);
  const userSubTeams = await readwithparams("/teams/subteam/myUserSubTeam", {
    sub: user.sub,
  });

  if (userSubTeams?.success) {
    const convertedUserSubTeams = userSubTeams.response.map(
      (userSubTeam, index) => {
        return {
          ...userSubTeam,
          index: index,
        };
      }
    );

    set(userSubTeamsAtom, convertedUserSubTeams);
  } else {
    set(userSubTeamsAtom, []);
  }
});

export const teamClientsAtom = atom([]); // Get team's clients

export const fetchTeamClientsAtom = atom(null, async (get, set, update) => {
  const user = get(userAtom);
  const teamClients = await readwithparams("/teams/team/filterClient", {
    sub: user.sub,
    method: "filtered",
  });

  if (teamClients?.success) {
    const convertedTeamClients = teamClients.response.map(
      (teamClient, index) => {
        return {
          ...teamClient,
          index: index,
        };
      }
    );

    set(teamClientsAtom, convertedTeamClients);
  } else {
    set(teamClientsAtom, []);
  }
});
