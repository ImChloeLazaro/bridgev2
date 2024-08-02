import { userAtom } from "@/app/store/UserStore";
import {
  readwithparams,
  restdestroy,
  restinsert,
  restread,
  restupdate,
} from "@/app/utils/amplify-rest";
import { format } from "date-fns";
import { atom } from "jotai";
import { toast } from "sonner";

export const teamFilterKeysAtom = atom([
  {
    label: "All",
    value: "all",
  },
  {
    label: "BLOOMS",
    value: "blooms",
  },
  {
    label: "AP",
    value: "ap",
  },
  {
    label: "ADMIN",
    value: "admin",
  },
  {
    label: "OPS",
    value: "ops",
  },
  {
    label: "DMS",
    value: "dms",
  },
  {
    label: "FINANCIALS",
    value: "financials",
  },
]);

export const selectedTeamFilterKeysAtom = atom(new Set(["all"]));

export const teamsAtom = atom([]);
export const subTeamsAtom = atom([]);
export const departmentAtom = atom([]);

export const fetchTeamsAtom = atom(null, async (get, set, update) => {
  const teams = await restread("/teams/team");
  if (teams?.success) {
    const convertedTeams = teams.response.map((team, index) => {
      return { ...team, key: team._id };
    });
    set(teamsAtom, convertedTeams);
  } else {
    console.error("Failed to fetch teams", teams?.error);
  }
});
export const fetchMyTeamsAtom = atom(null, async (get, set, update) => {
  const user = get(userAtom);
  const teams = await readwithparams("/teams/team/myTeam", { sub: user.sub });
  if (teams?.success) {
    const convertedTeams = teams.response.map((team, index) => {
      return { ...team, key: team._id };
    });
    console.log("convertedTeams", convertedTeams);
    set(teamsAtom, convertedTeams);
  } else {
    console.error("Failed to fetch teams", teams?.error);
  }
});
export const fetchMySubTeamsAtom = atom(null, async (get, set, update) => {
  const user = get(userAtom);
  const teams = await readwithparams("/teams/subteam/mySubTeam", {
    sub: user.sub,
  });
  if (teams?.success) {
    const convertedTeams = teams.response.map((team, index) => {
      return { ...team, key: team._id };
    });
    set(subTeamsAtom, convertedTeams);
  } else {
    console.error("Failed to fetch teams", teams?.error);
  }
});

export const fetchDepartmentsAtom = atom(null, async (get, set, update) => {
  const teams = await restread("/teams/department");
  if (teams?.success) {
    const convertedDepartments = teams.response.map((department, index) => {
      return { ...department, key: department._id };
    });
    set(departmentAtom, convertedDepartments);
  } else {
    console.error("Failed to fetch teams", teams?.error);
  }
});

export const teamMembersTableRowsAtom = atom([
  {
    key: "1",
    name: "Tony Reichert",
    role: "CEO",
    status: "Active",
  },
]);

export const teamMembersTableColumnsAtom = atom([
  {
    label: "Name",
    key: "name",
    sortable: true,
  },
  {
    label: "Clients",
    key: "clients",
    sortable: false,
  },
  {
    label: "Heads",
    key: "heads",
    sortable: false,
  },
  {
    label: "Status",
    key: "status",
    sortable: true,
  },
  {
    label: "Members",
    key: "members",
    sortable: true,
  },
]);

export const selectedTeamAtom = atom();

export const selectedMemberAtom = atom({});

export const memberPositionAtom = atom("");
export const memberStatusAtom = atom(new Set());
export const memberEmploymentStatusAtom = atom(new Set());

export const selectedTeamIdentifierAtom = atom(new Set([]));
export const selectedTeamNameAtom = atom("");
export const selectedTeamDepartmentNameAtom = atom("");
export const selectedTeamClientAtom = atom(new Set([]));
export const selectedTeamHeadsAtom = atom(new Set([]));
export const selectedTeamMembersAtom = atom(new Set([]));
export const selectedTeamDepartmentAtom = atom(new Set([]));

export const selectedTeamNameArchiveAtom = atom(new Set([]));
export const selectedTeamIDAtom = atom("");

export const teamDepartmentSelectionAtom = atom((get) =>
  get(departmentAtom).map((department) => {
    return {
      ...department,
      key: department._id,
      value: department._id,
    };
  })
);

export const teamSelectionAtom = atom((get) =>
  get(teamsAtom).map((team) => {
    return {
      ...team,
      key: team._id,
      value: team._id,
    };
  })
);

export const teamClientSelectionAtom = atom([]);

export const teamHeadSelectionAtom = atom((get) => {
  return get(teamsAtom)
    .map((team) => team.heads)
    .flat()
    .map((user) => {
      return { ...user, key: user.sub, value: user.sub };
    })
    .filter(
      (obj1, i, arr) => arr.findIndex((obj2) => obj2.sub === obj1.sub) === i
    );
});

export const teamMemberSelectionAtom = atom((get) => {
  return get(teamsAtom)
    .map((team) => team.members)
    .flat()
    .map((user) => {
      return { ...user, key: user.sub, value: user.sub };
    })
    .filter(
      (obj1, i, arr) => arr.findIndex((obj2) => obj2.sub === obj1.sub) === i
    );
});

export const fetchTeamClientsAtom = atom(null, async (get, set, update) => {
  const user = get(userAtom);
  const filtered = await readwithparams("/teams/team/filterClient", {
    sub: user.sub,
    method: "filtered",
  });

  if (filtered?.success) {
    const filteredClients = filtered.response.map((client) => {
      return {
        ...client,
        key: client._id,
        value: client._id,
      };
    });
    set(teamClientSelectionAtom, filteredClients);
    return filtered.response;
  } else {
    return {};
  }
});

export const teamDataAtom = atom((get) => {
  const selectedTeamID = get(selectedTeamIDAtom);
  const selectedTeam = get(selectedTeamIdentifierAtom);
  const selectedTeamName = get(selectedTeamNameAtom);
  const selectedTeamHead = get(selectedTeamHeadsAtom);
  const selectedTeamMembers = get(selectedTeamMembersAtom);
  const selectedTeamClient = get(selectedTeamClientAtom);

  const teamClientSelection = get(teamClientSelectionAtom);
  const teamHeadSelection = get(teamHeadSelectionAtom);
  const teamMembersSelection = get(teamMemberSelectionAtom);

  console.log("teamClientSelection", teamClientSelection);
  console.log("selectedTeamClient", selectedTeamClient);

  return {
    _id: selectedTeamID,
    team: Array.from(selectedTeam).toString(),
    tl: {
      sub: get(userAtom).sub,
      name: get(userAtom).name,
      email: get(userAtom).email,
      picture: get(userAtom).picture,
    },
    name: selectedTeamName,
    heads: teamHeadSelection.filter((head) =>
      Array.from(selectedTeamHead).includes(head.sub)
    ),
    members: teamMembersSelection.filter((member) =>
      Array.from(selectedTeamMembers).includes(member.sub)
    ),
    client: teamClientSelection.filter((client) =>
      Array.from(selectedTeamClient).includes(client._id)
    ),
  };
});

export const addTeamAtom = atom(null, async (get, set, update) => {
  let teamData = get(teamDataAtom);
  teamData = {
    team: teamData.team,
    tl: teamData.tl,
    name: teamData.name,
    heads: teamData.heads,
    members: teamData.members,
    client: teamData.client,
  };

  console.log("teamData", teamData);

  const promise = async () =>
    new Promise((resolve) =>
      setTimeout(
        async () =>
          resolve(
            await restinsert("/teams/subteam", teamData),
            await set(fetchMyTeamsAtom, {}),
            await set(fetchMySubTeamsAtom, {})
          ),
        2000
      )
    );
  toast.promise(promise, {
    description: `${format(new Date(), "PPpp")}`,
    loading: "Adding Team...",
    success: () => {
      return `Team added successfully`;
    },
    error: "Error Adding Team",
  });
});

export const addDepartmentAtom = atom(null, async (get, set, update) => {
  let departmentData = {};
  departmentData = {
    name: get(selectedTeamDepartmentNameAtom),
  };

  const promise = async () =>
    new Promise((resolve) =>
      setTimeout(
        async () =>
          resolve(
            await restinsert("/teams/department", departmentData),
            await set(fetchDepartmentsAtom, {})
          ),
        2000
      )
    );
  toast.promise(promise, {
    description: `${format(new Date(), "PPpp")}`,
    loading: "Adding Department...",
    success: () => {
      return `Department added successfully`;
    },

    error: "Error Adding Department",
  });
});

export const updateTeamAtom = atom(null, async (get, set, update) => {
  let teamData = get(teamDataAtom);

  const promise = async () =>
    new Promise((resolve) =>
      setTimeout(
        async () =>
          resolve(
            await restupdate("/teams/team", teamData),
            await set(fetchMyTeamsAtom, {}),
            await set(fetchMySubTeamsAtom, {})
          ),
        2000
      )
    );
  toast.promise(promise, {
    description: `${format(new Date(), "PPpp")}`,
    loading: "Updating Team Details...",
    success: () => {
      return `Team details updated successfully`;
    },

    error: "Error Updating Team Details",
  });
});

export const updateTeamMemberAtom = atom(null, async (get, set, update) => {
  const memberPosition = get(memberPositionAtom);
  const memberStatus = get(memberStatusAtom);
  const memberEmploymentStatus = get(memberEmploymentStatusAtom);
  const selectedMember = get(selectedMemberAtom);
  const selectedTeamID = get(selectedTeamIDAtom);

  const memberData = {
    _id: selectedTeamID,
    status: {
      ...selectedMember,
      position: memberPosition,
      status: Array.from(memberStatus).toString(),
      employment_status: Array.from(memberEmploymentStatus).toString(),
      _id: selectedMember._id,
    },
  };

  const promise = async () =>
    new Promise((resolve) =>
      setTimeout(
        async () =>
          resolve(
            await restupdate("/teams/team/updateMember", memberData),
            await set(fetchMyTeamsAtom, {}),
            await set(fetchMySubTeamsAtom, {})
          ),
        2000
      )
    );
  toast.promise(promise, {
    description: `${format(new Date(), "PPpp")}`,
    loading: "Updating Member Details...",
    success: () => {
      return `Member details updated successfully`;
    },
    error: "Error Updating Member Details",
  });
});

export const archiveTeamAtom = atom(null, async (get, set, update) => {
  const { action, team_id } = update;
  let teamData = {
    status: action,
    _id: team_id,
  };

  console.log("teamData", teamData);
  const promise = async () =>
    new Promise((resolve) =>
      setTimeout(
        async () =>
          resolve(
            await restupdate("/teams/subteam/activeOrArchive", teamData),
            await set(fetchMyTeamsAtom, {}),
            await set(fetchMySubTeamsAtom, {})
          ),
        2000
      )
    );
  console.log("promise", promise);
  toast.promise(promise, {
    description: `${format(new Date(), "PPpp")}`,
    loading: `${
      action === "archive" ? "Archiving Team..." : "Setting Team Active..."
    }`,
    success: () => {
      return `${
        action === "archive"
          ? "Team archived successfully"
          : "Team activated successfully"
      }`;
    },

    error: "Error Archiving Team",
  });
});

export const archiveTeamMultipleAtom = atom(null, async (get, set, update) => {
  const selectedTeamNameArchive = get(selectedTeamNameArchiveAtom);
  const teamsToBeArchived = get(teamsAtom).filter((team) =>
    Array.from(selectedTeamNameArchive).includes(team._id)
  );

  const promise = async () =>
    new Promise((resolve) =>
      setTimeout(
        async () =>
          resolve(
            await Promise.all(
              teamsToBeArchived.map(async (task) => {
                let teamData = {
                  status: "archive",
                  _id: task._id,
                };
                const response = await restupdate(
                  "/teams/team/activeOrArchive",
                  teamData
                );
                return { success: response?.success ?? false };
              })
            ),
            await set(fetchTeamsAtom, {})
          ),
        2000
      )
    );

  toast.promise(promise, {
    description: `${format(new Date(), "PPpp")}`,
    loading: `Archiving Teams...`,
    success: (data) => {
      return `Archived ${data.length} ${
        data.length > 1 ? "teams" : "team"
      } successfully`;
    },
    error: "Error Archiving Multiple Team",
  });
});

export const deleteTeamAtom = atom(null, async (get, set, update) => {
  const { team_id } = update;

  // const response = await destroywithparams("/teams/team", {
  //   sub: team_id,
  // });
  // console.log("response", response);
  // if (response?.success) {
  //   set(fetchTeamsAtom, {});
  //   return { success: true };
  // } else {
  //   return { success: false };
  // }
  const promise = async () =>
    new Promise((resolve) =>
      setTimeout(
        async () =>
          resolve(
            await restdestroy("/teams/team", {
              sub: team_id,
            }),
            await set(fetchMyTeamsAtom, {}),
            await set(fetchMySubTeamsAtom, {})
          ),
        2000
      )
    );
  toast.promise(promise, {
    description: `${format(new Date(), "PPpp")}`,
    loading: `Deleting Team...`,
    success: () => {
      return `Team deleted successfully`;
    },

    error: "Error Deleting Team",
  });
});
