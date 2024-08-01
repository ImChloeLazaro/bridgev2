import SearchBar from "@/app/components/SearchBar";
import { useAtom, useAtomValue } from "jotai";
import { useState } from "react";
import {
  clientSubItemDataAtom,
  selectedMemberFilterKeysAtom,
} from "../../store/ProfileStore";
import TeamLists from "./Components/TeamLists";

const TeamInfo = () => {
  const newData = useAtomValue(clientSubItemDataAtom);
  const data = newData?.response.filter((subTeamNewData) => {
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
