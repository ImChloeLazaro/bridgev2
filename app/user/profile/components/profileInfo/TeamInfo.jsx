import React, { useEffect, useState } from "react";
import { atom, useAtom, useAtomValue } from "jotai";
import {
  clientItemDataAtom,
  selectedMemberFilterKeysAtom,
} from "../../store/ProfileStore";
import UserClientTable from "./Components/UserClientTable";
import { teamColumnData } from "./UserClientStore";
import TeamLists from "./Components/TeamLists";
import SearchBar from "@/app/components/SearchBar";
import { se } from "date-fns/locale";
import { ConsoleLogger } from "aws-amplify/utils";

const TeamInfo = () => {
  const newData = useAtomValue(clientItemDataAtom);
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

  console.log("the set")
  console.log(nameArray)

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
