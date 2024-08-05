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
import { useAtom, useAtomValue } from "jotai";
import {
  userTeamsAtom,
  selectedClientFilterKeysAtom,
} from "../../store/ProfileStore";
import { columnData, subTeamData } from "./UserClientStore";
import UserClientTable from "./Components/UserClientTable";
import SearchBar from "@/app/components/SearchBar";

const ClientsInfo = () => {
  const newData = useAtomValue(userTeamsAtom);
  const columns = columnData;
  const data = newData.filter((subTeamNewData) => {
    return subTeamNewData.status === "active";
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClient, setSelectedClient] = useState("All");
  const [filteredData, setFilteredData] = useState(data);

  const filterDataOption = () => {
    const clientData = new Set();
    clientData.add({ label: "All", value: "All" });
    data.map((newData) => {
      newData?.client?.map((newClient) => {
        let alreadyExists = false;

        for (let client of clientData) {
          if (client.label === newClient?.name) {
            alreadyExists = true;
            break;
          }
        }

        if (!alreadyExists) {
          clientData.add({ label: newClient?.name, value: newClient?.name });
        }
      });
    });
    return Array.from(clientData);
  };

  const clientOption = filterDataOption();

  const [selectedClientFilterKeys, setSelectedClientFilterKeys] = useAtom(
    selectedClientFilterKeysAtom
  );

  // useEffect(() => {
  //   let newFilteredData = data;
  //   if (selectedClient !== "All") {
  //     newFilteredData = newFilteredData.filter((item) =>
  //       item.client.some(
  //         (client) => client.name === selectedClientFilterKeys.anchorKey
  //       )
  //     );
  //   }
  //   if (searchQuery) {
  //     newFilteredData = newFilteredData.filter((item) => {
  //       const searchString = searchQuery.toLowerCase();
  //       return (
  //         item.name.toLowerCase().includes(searchString) ||
  //         item.head?.name?.toLowerCase().includes(searchString) ||
  //         item.members.some((member) =>
  //           member.name.toLowerCase().includes(searchString)
  //         ) ||
  //         item.client.some((client) =>
  //           client.name.toLowerCase().includes(searchString)
  //         )
  //       );
  //     });
  //   }

  //   setFilteredData(newFilteredData);

  //   if (selectedClientFilterKeys.anchorKey) {
  //     setSelectedClient(selectedClientFilterKeys.anchorKey);
  //   }
  // }, [selectedClient, searchQuery, selectedClientFilterKeys, data]);

  return (
    <div className="flex flex-col gap-3">
      <SearchBar
        searchItem={searchQuery}
        setSearchItem={setSearchQuery}
        type="filter"
        filterKeys={clientOption}
        selectedFilterKeys={selectedClientFilterKeys}
        setSelectedFilterKeys={setSelectedClientFilterKeys}
      />
      <UserClientTable data={filteredData} columns={columns} />
    </div>
  );
};

export default ClientsInfo;
