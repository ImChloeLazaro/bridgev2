import { useState } from "react";
import { useAtomValue } from "jotai";
import { Select, SelectItem } from "@nextui-org/react";
import { clientsAtom } from "@/app/store/ClientStore";
import { teamsByClientSelectionAtom } from "@/app/tl/cms/store/CMSTLStore";
const ClientSelect = ({ 
  handleClientSelect,
  method = "all",
 }) => {
  const [selectedClients, setSelectedClients] = useState(new Set([]));
  let clients = []
  if(method === "all") {  
    clients = useAtomValue(clientsAtom);
  }else{
    clients = useAtomValue(teamsByClientSelectionAtom)
  }
  console.log("CLIENTS", clients)
  const handleOnChangeSelect = (selected) => {
    const selectedClients = Array.from(selected)
      .map((key) => {
        const client = clients.find((item) => item._id === key);
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
      {clients.map((item) => (
        <SelectItem key={item._id}>{item.company.name}</SelectItem>
      ))}
    </Select>
  );
};
export default ClientSelect;
