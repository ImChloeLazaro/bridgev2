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
import { useMemo, useState } from "react";

import CMSFooter from "./CMSFooter";
import ClientHeader from "./CMSHeader";
import ClientItemCard from "./ClientItemCard";
import {
  clientFilterKeysAtom,
  clientsAtom,
  clientsCountAtom,
  selectedClientAtom,
  selectedClientFilterKeysAtom,
  showClientDetailsAtom,
} from "@/app/store/ClientStore";
import ClientDetails from "./ClientDetails";
import TaskBoardView from "./TaskBoardView";
import ClientList from "./ClientList";
import TaskTableView from "./TaskTableView";

const Clients = () => {
  const [searchItem, setSearchItem] = useState("");
  const [selectedAllClients, setSelectedAllClients] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const showClientDetails = useAtomValue(showClientDetailsAtom);

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

  const [rowsPerPage, setRowsPerPage] = useState(new Set(["10"]));
  const [page, setPage] = useState(1);

  let rowsPerPageNumber = isNaN(parseInt(Array.from(rowsPerPage).join("")))
    ? 10
    : parseInt(Array.from(rowsPerPage).join(""));

  const totalPages = Math.ceil(sortedClients.length / rowsPerPageNumber);
  console.log("totalPages", totalPages);

  const itemClients = useMemo(() => {
    const start = (page - 1) * rowsPerPageNumber;
    const end = start + rowsPerPageNumber;

    return sortedClients.slice(start, end);
  }, [page, rowsPerPageNumber, sortedClients]);

  const s = (page - 1) * rowsPerPageNumber;
  console.log(
    "CURRENT ITEMS DISPLAYED",
    (page - 1) * rowsPerPageNumber + rowsPerPageNumber
  );

  return (
    <Card className="w-full h-full px-2 py-1.5 drop-shadow shadow-none bg-white-default">
      <CardHeader className="">
        <ClientHeader
          searchItem={searchItem}
          setSearchItem={setSearchItem}
          selectedAllClients={selectedAllClients}
          setSelectedAllClients={setSelectedAllClients}
          showCheckBox={false}
          showActionButtons={false}
          showOptions={showOptions}
          filterKeys={clientFilterKeys}
          selectedFilterKeys={selectedClientFilterKeys}
          setSelectedFilterKeys={setSelectedClientFilterKeys}
        />
      </CardHeader>
      <CardBody className="w-full max-h-screen">
        {/* <ClientList
          showClientDetails={showClientDetails}
          selectedClient={selectedClient}
          setSelectedClient={setSelectedClient}
          itemClients={itemClients}
        /> */}
        {/* <TaskTableView changeView={false} /> */}
        <TaskBoardView changeView={false} />
        {/* {<ClientDetails showClientDetails={showClientDetails} />} */}
      </CardBody>
      <CardFooter className="">
        <CMSFooter
          currentItemsCount={itemClients.length}
          itemListCount={clientsCount}
          startPage={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          totalPages={totalPages}
        />
      </CardFooter>
    </Card>
  );
};

export default Clients;
