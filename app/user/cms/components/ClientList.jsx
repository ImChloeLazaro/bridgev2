import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  CheckboxGroup,
  ScrollShadow,
  cn,
} from "@nextui-org/react";
import { useAtom, useAtomValue } from "jotai";
import { useState } from "react";

import ClientFooter from "./CMSFooter";
import ClientHeader from "./CMSHeader";
import ClientItemCard from "./ClientItemCard";
import {
  clientFilterKeysAtom,
  clientsAtom,
  clientsCountAtom,
  selectedClientAtom,
  selectedClientFilterKeysAtom,
} from "@/app/store/ClientStore";

const ClientList = () => {
  const [searchItem, setSearchItem] = useState("");
  const [selectedAllClients, setSelectedAllClients] = useState(false);
  const [displayedClients, setDisplayedClients] = useState("10");

  const clientFilterKeys = useAtomValue(clientFilterKeysAtom);
  const [selectedClientFilterKeys, setSelectedClientFilterKeys] = useAtom(
    selectedClientFilterKeysAtom
  );
  const [selectedClient, setSelectedClient] = useAtom(selectedClientAtom);
  const clientsCount = useAtomValue(clientsCountAtom);
  const clients = useAtomValue(clientsAtom);

  const filteredClientList = clients.filter((client) => {
    return (
      client.name.toLowerCase().includes(searchItem.toLowerCase()) ||
      client.address.toLowerCase().includes(searchItem.toLowerCase())
    );
  });

  const sortedClients = filteredClientList.sort(
    (a, b) => new Date(b.datetimeOnboarded) - new Date(a.datetimeOnboarded)
  );

  return (
    <Card className="w-full h-full px-2 py-1.5 drop-shadow shadow-none bg-white-default">
      <CardHeader className="">
        <ClientHeader
          searchItem={searchItem}
          setSearchItem={setSearchItem}
          selectedAllClients={selectedAllClients}
          setSelectedAllClients={setSelectedAllClients}
          showCheckBox={true}
          showActionButtons={true}
          filterKeys={clientFilterKeys}
          selectedFilterKeys={selectedClientFilterKeys}
          setSelectedFilterKeys={setSelectedClientFilterKeys}
        />
      </CardHeader>
      <CardBody className="w-full max-h-screen">
        <ScrollShadow
          size={25}
          className="w-full h-screen flex flex-col items-center gap-4 px-6"
        >
          <CheckboxGroup
            aria-label="Client Item Card Checkbox Group"
            value={selectedClient}
            onValueChange={(value) => {
              setSelectedClient(value);
              console.log("SELECTED CLIENT:", value);
            }}
            className="w-full"
          >
            <div className="flex flex-col w-full gap-y-3">
              {sortedClients.map((client, index) => (
                <Checkbox
                  value={client.key}
                  key={index}
                  aria-label="Client Item Card Checkbox"
                  classNames={{
                    base: cn(
                      "w-full max-w-full bg-white-default m-0",
                      "hover:bg-lightgrey-hover flex items-center justify-start",
                      "cursor-pointer rounded-lg gap-6 py-0 pr-0 pl-6 border-[0.4px] shadow",
                      "data-[selected=true]:border-3",
                      "data-[selected=true]:border-blue-default/60"
                    ),
                    label: "w-full",
                  }}
                >
                  <ClientItemCard data={client} />
                </Checkbox>
              ))}
            </div>
          </CheckboxGroup>
        </ScrollShadow>
      </CardBody>
      <CardFooter className="">
        <ClientFooter
          clientsListCount={clientsCount}
          displayedClients={displayedClients}
          setDisplayedClients={setDisplayedClients}
        />
      </CardFooter>
    </Card>
  );
};

export default ClientList;
