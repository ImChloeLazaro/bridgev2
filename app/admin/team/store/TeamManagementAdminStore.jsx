import { clientsAtom } from "@/app/store/ClientStore";
import { userListAtom } from "@/app/store/UserStore";
import {
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

export const selectedTeamAtom = atom();

export const selectedMemberAtom = atom({});

export const memberPositionAtom = atom("");
export const memberStatusAtom = atom(new Set());
export const memberEmploymentStatusAtom = atom(new Set());

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
      value: department.name,
    };
  })
);

export const teamSelectionAtom = atom((get) =>
  get(teamsAtom).map((team) => {
    return {
      ...team,
      key: team._id,
      value: team.name,
    };
  })
);

export const teamClientSelectionAtom = atom((get) =>
  get(clientsAtom).map((client) => {
    return {
      _id: client._id,
      name: client.company.name,
      email: client.company.email,
      key: client._id,
      value: client.name,
    };
  })
);

export const teamHeadSelectionAtom = atom((get) =>
  get(userListAtom).map((user) => {
    return { ...user, key: user.sub, value: user.sub };
  })
);

export const teamMemberSelectionAtom = atom((get) =>
  get(userListAtom).map((user) => {
    return { ...user, key: user.sub, value: user.sub };
  })
);

export const teamDataAtom = atom((get) => {
  const selectedTeamID = get(selectedTeamIDAtom);
  const selectedTeamName = get(selectedTeamNameAtom);
  const selectedTeamHead = get(selectedTeamHeadsAtom);
  const selectedTeamDepartment = get(selectedTeamDepartmentAtom);
  const selectedTeamMembers = get(selectedTeamMembersAtom);
  const selectedTeamClient = get(selectedTeamClientAtom);

  const teamClientSelection = get(teamClientSelectionAtom);
  const teamHeadSelection = get(teamHeadSelectionAtom);
  const teamMembersSelection = get(teamMemberSelectionAtom);
  const teamDepartmentSelection = get(teamDepartmentSelectionAtom);

  return {
    _id: selectedTeamID,
    name: selectedTeamName,
    department: teamDepartmentSelection.filter((department) =>
      Array.from(selectedTeamDepartment).includes(department.key)
    ),
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
    name: teamData.name,
    department: teamData.department,
    heads: teamData.heads,
    members: teamData.members,
    client: teamData.client,
  };

  const promise = async () =>
    new Promise((resolve) =>
      setTimeout(
        async () =>
          resolve(
            await restinsert("/teams/team", teamData),
            await set(fetchTeamsAtom, {})
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
            await set(fetchTeamsAtom, {})
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
            await set(fetchTeamsAtom, {})
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

  const promise = async () =>
    new Promise((resolve) =>
      setTimeout(
        async () =>
          resolve(
            await restupdate("/teams/team/activeOrArchive", teamData),
            await set(fetchTeamsAtom, {})
          ),
        2000
      )
    );
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
            await set(fetchTeamsAtom, {})
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
