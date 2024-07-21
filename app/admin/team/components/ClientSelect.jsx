import { useState } from "react";
import { useAtomValue } from "jotai";
import { Select, SelectItem } from "@nextui-org/react";
import { clientsAtom } from "@/app/store/ClientStore";
import { subTeamMembersAtom } from "@/app/tl/cms/store/CMSTLStore";

const ClientSelect = ({ handleClientSelect }) => {
  const [selectedClients, setSelectedClients] = useState(new Set([]));
  const clients = useAtomValue(clientsAtom);
  const subTeamMembers = useAtomValue(subTeamMembersAtom);

  const filteredTeamClientsSelection = subTeamMembers
    .map((team) => team.client.map((member) => member))
    .flat()
    .filter(
      (obj1, i, arr) => arr.findIndex((obj2) => obj2._id === obj1._id) === i
    );

  const filteredClients = clients.filter((client) =>
    filteredTeamClientsSelection
      .map((client) => client._id)
      .includes(client._id)
  );
  const handleOnChangeSelect = (selected) => {
    const selectedClients = Array.from(selected)
      .map((key) => {
        const client = filteredClients.find((item) => item._id === key);
        return client
          ? {
              key: client.key,
              _id: client._id,
              name: client.company.name,
              email: client.company.email,
            }
          : null;
      })
      .filter(Boolean);
    setSelectedClients(selected);
    console.log("SELECTED CLIENTS", selectedClients);
    if (typeof handleClientSelect === "function") {
      handleClientSelect(selectedClients);
    }
  };
  return (
    <Select
      size="sm"
      label="Select Client"
      selectionMode="multiple"
      variant="bordered"
      className="w-full"
      selectedKeys={selectedClients}
      onSelectionChange={(selected) => handleOnChangeSelect(selected)}
    >
      {filteredClients.map((item) => (
        <SelectItem key={item._id}>{item.company.name}</SelectItem>
      ))}
    </Select>
  );
};
export default ClientSelect;
