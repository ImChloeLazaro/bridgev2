import MiniUnderConstruction from "@/app/components/MiniUnderConstruction";
import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Input,
} from "@nextui-org/react";
import { FaFilter } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { useAtomValue } from "jotai";
import { clientItemDataAtom } from "../../store/ProfileStore";
import UserClientTable from "./Components/UserClientTable";
import { teamColumnData } from "./UserClientStore";
import TeamLists from "./Components/TeamLists";
const TeamInfo = () => {
  const newData = useAtomValue(clientItemDataAtom);
  const data = newData?.response.filter((subTeamNewData) => {
    return subTeamNewData.status === "active";
  });
  const [selectedData, setSelectedData] = useState(data[0]);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row items-center gap-3 ">
        <Dropdown>
          <DropdownTrigger startContent={<FaFilter size={14} />}>
            <Button variant="bordered" className="capitalize">
              {selectedData?.name}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Single selection example"
            variant="flat"
            disallowEmptySelection
            selectionMode="single"
          >
            {data?.map((head, index) => (
              <DropdownItem key={index} onClick={() => setSelectedData(head)}>
                {head.name}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        <div className="bg-white rounded-r-lg flex">
          <Input
            placeholder="Search"
            className="p-2 bg-none rounded-r-lg"
            startContent={<CiSearch size={24} />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <TeamLists selectedData={selectedData} />
    </div>
  );
};

export default TeamInfo;
