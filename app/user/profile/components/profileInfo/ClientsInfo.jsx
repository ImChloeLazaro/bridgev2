import React, { useEffect, useState } from "react";
import MiniUnderConstruction from "@/app/components/MiniUnderConstruction";

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
import { clientSubItemDataAtom } from "../../store/ProfileStore";
import { columnData, subTeamData } from "./UserClientStore";
import UserClientTable from "./Components/UserClientTable";

const ClientsInfo = () => {
  const newData = useAtomValue(clientSubItemDataAtom);
  const columns = columnData;
  const data = newData.response.filter((subTeamNewData) => {
    return subTeamNewData.status === "active";
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClient, setSelectedClient] = useState("All");
  const [filteredData, setFilteredData] = useState(data);
  const filterDataOption = () => {
    const clientData = new Set();
    data.map((newData) => {
      newData?.client?.map((newClient) => {
        clientData.add(newClient?.name);
      });
    });
    return Array.from(clientData);
  };
  const clientOption = filterDataOption();
  useEffect(() => {
    let newFilteredData = data;
    if (selectedClient !== "All") {
      newFilteredData = newFilteredData.filter((item) =>
        item.client.some((client) => client.name === selectedClient)
      );
    }
    if (searchQuery) {
      newFilteredData = newFilteredData.filter((item) => {
        const searchString = searchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(searchString) ||
          item.head?.name?.toLowerCase().includes(searchString) ||
          item.members.some((member) =>
            member.name.toLowerCase().includes(searchString)
          ) ||
          item.client.some((client) =>
            client.name.toLowerCase().includes(searchString)
          )
        );
      });
    }

    setFilteredData(newFilteredData);
  }, [selectedClient, searchQuery]);

  console.log("filteredData", filteredData);
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row items-center gap-3 ">
        <Dropdown>
          <DropdownTrigger startContent={<FaFilter size={14} />}>
            <Button variant="bordered" className="capitalize">
              {selectedClient}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Single selection example"
            variant="flat"
            disallowEmptySelection
            selectionMode="single"
          >
            <DropdownItem key="All" onClick={() => setSelectedClient("All")}>
              All
            </DropdownItem>
            {clientOption?.map((client) => (
              <DropdownItem
                key={client}
                onClick={() => setSelectedClient(client)}
              >
                {client}
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
      <UserClientTable data={filteredData} columns={columns} />
    </div>
  );
};

export default ClientsInfo;
