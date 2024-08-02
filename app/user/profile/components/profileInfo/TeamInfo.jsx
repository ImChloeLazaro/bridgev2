import SearchBar from "@/app/components/SearchBar";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import {
  userTeamsAtom,
  selectedMemberFilterKeysAtom,
} from "../../store/ProfileStore";
import TeamLists from "./Components/TeamLists";
import { fetchUserSubTeamsAtom } from "@/app/store/TeamStore";

const TeamInfo = () => {
  const userTeams = useAtomValue(userTeamsAtom);
  const fetchUserSubTeams = useSetAtom(fetchUserSubTeamsAtom);
  const data = userTeams?.filter((subTeamNewData) => {
    return subTeamNewData.status === "active";
  });

  const [searchQuery, setSearchQuery] = useState("");

  const nameArray = [
    { label: "All", value: "All" },
    ...(data?.map((item) => ({
      label: item.name,
      value: item.name,
      ...item,
    })) || []),
  ];

  const [selectedMemberFilterKeys, setSelectedMemberFilterKeys] = useAtom(
    selectedMemberFilterKeysAtom
  );

  useEffect(() => {
    fetchUserSubTeams();
  }, [fetchUserSubTeams]);

  return (
    <div className="flex flex-col gap-3">
      <SearchBar
        searchItem={searchQuery}
        setSearchItem={setSearchQuery}
        type="filter"
        filterKeys={nameArray}
        selectedFilterKeys={selectedMemberFilterKeys}
        setSelectedFilterKeys={setSelectedMemberFilterKeys}
      />

      <TeamLists
        selectedData={nameArray}
        filter={selectedMemberFilterKeys}
        searchQuery={searchQuery}
      />
    </div>
  );
};

export default TeamInfo;
