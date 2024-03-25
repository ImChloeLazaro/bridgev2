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
  selectedClientToViewAtom,
  showClientDetailsAtom,
} from "@/app/store/ClientStore";
import ClientDetails from "./ClientDetails";
import TaskBoardView from "./TaskBoardView";
import ClientList from "./ClientList";
import TaskTableView from "./TaskTableView";
import {
  changeViewAtom,
  showActionButtonsAtom,
  showCheckBoxAtom,
  showClientTaskAtom,
  showFooterAtom,
  showOptionsAtom,
} from "../store/CMSStore";
import {
  selectedTaskFilterKeysAtom,
  taskFilterKeysAtom,
} from "@/app/store/TaskStore";

const Clients = () => {
  const [searchClientItem, setSearchClientItem] = useState("");
  const [searchTaskItem, setSearchTaskItem] = useState("");
  const [selectedAllClients, setSelectedAllClients] = useState(false);

  const [showFooter, setShowFooter] = useAtom(showFooterAtom);
  const [showOptions, setShowOptions] = useAtom(showOptionsAtom);
  const [showCheckBox, setShowCheckBox] = useAtom(showCheckBoxAtom);
  const [showActionButtons, setShowActionButtons] = useAtom(
    showActionButtonsAtom
  );

  const [changeView, setChangeView] = useAtom(changeViewAtom);

  const showClientDetails = useAtomValue(showClientDetailsAtom);

  const clientFilterKeys = useAtomValue(clientFilterKeysAtom);
  const [selectedClientFilterKeys, setSelectedClientFilterKeys] = useAtom(
    selectedClientFilterKeysAtom
  );

  const taskFilterKeys = useAtomValue(taskFilterKeysAtom);
  const [selectedTaskFilterKeys, setSelectedTaskFilterKeys] = useAtom(
    selectedTaskFilterKeysAtom
  );

  const [selectedClient, setSelectedClient] = useAtom(selectedClientAtom);
  const [selectedClientToView, setSelectedClientToView] = useAtom(
    selectedClientToViewAtom
  );
  const [showClientTask, setShowClientTask] = useAtom(showClientTaskAtom);
  const clientsCount = useAtomValue(clientsCountAtom);
  const clients = useAtomValue(clientsAtom);

  const filteredClientList = clients.filter((client) => {
    return (
      client.name.toLowerCase().includes(searchClientItem.toLowerCase()) ||
      client.address.toLowerCase().includes(searchClientItem.toLowerCase())
    );
  });

  const sortedClients = filteredClientList.sort(
    (a, b) => new Date(b.datetimeOnboarded) - new Date(a.datetimeOnboarded)
  );

  const [clientRowsPerPage, setClientRowsPerPage] = useState(new Set(["10"]));
  const [clientPage, setClientPage] = useState(1);

  let clientRowsPerPageNumber = isNaN(parseInt(Array.from(clientRowsPerPage).join("")))
    ? 10
    : parseInt(Array.from(clientRowsPerPage).join(""));

  const clientTotalPages = Math.ceil(sortedClients.length / clientRowsPerPageNumber);
  // console.log("totalPages", totalPages);

  const itemClients = useMemo(() => {
    const start = (clientPage - 1) * clientRowsPerPageNumber;
    const end = start + clientRowsPerPageNumber;

    return sortedClients.slice(start, end);
  }, [clientPage, clientRowsPerPageNumber, sortedClients]);

  const [taskRowsPerPage, setTaskRowsPerPage] = useState(new Set(["10"]));
  const [taskPage, setTaskPage] = useState(1);

  let taskRowsPerPageNumber = isNaN(parseInt(Array.from(taskRowsPerPage).join("")))
    ? 10
    : parseInt(Array.from(taskRowsPerPage).join(""));

  const taskTotalPages = Math.ceil(sortedClients.length / taskRowsPerPageNumber);
  // console.log("totalPages", totalPages);

  const itemTasks = useMemo(() => {
    const start = (taskPage - 1) * taskRowsPerPageNumber;
    const end = start + taskRowsPerPageNumber;

    return sortedClients.slice(start, end);
  }, [taskPage, taskRowsPerPageNumber, sortedClients]);

  return (
    <Card className="flex w-full h-full mt-4 mb-8 px-2 py-1.5 drop-shadow shadow-none bg-white-default">
      <CardHeader className="">
        <ClientHeader
          searchItem={showClientTask ? searchTaskItem : searchClientItem}
          setSearchItem={
            showClientTask ? setSearchTaskItem : setSearchClientItem
          }
          selectedAllClients={selectedAllClients}
          setSelectedAllClients={setSelectedAllClients}
          showCheckBox={showCheckBox}
          showActionButtons={showActionButtons}
          showOptions={showOptions}
          filterKeys={showClientTask ? taskFilterKeys : clientFilterKeys}
          selectedFilterKeys={
            showClientTask ? selectedTaskFilterKeys : selectedClientFilterKeys
          }
          setSelectedFilterKeys={
            showClientTask
              ? setSelectedTaskFilterKeys
              : setSelectedClientFilterKeys
          }
        />
      </CardHeader>
      <CardBody className="h-full w-full">
        <ClientList
          selectedClient={selectedClient}
          setSelectedClient={setSelectedClient}
          itemClients={itemClients}
          searchItem={searchClientItem}
          showClientTask={showClientTask}
          showClientDetails={showClientDetails}
        />
        <TaskTableView
          searchItem={searchTaskItem}
          showClientTask={showClientTask}
          changeView={changeView}
        />
        <TaskBoardView
          searchItem={searchTaskItem}
          showClientTask={showClientTask}
          changeView={changeView}
        />
        <ClientDetails showClientDetails={showClientDetails} />
      </CardBody>
      <CardFooter className="">
        <CMSFooter
          showFooter={showFooter}
          currentItemsCount={itemClients.length}
          itemListCount={clientsCount}
          startPage={clientPage}
          setPage={setClientPage}
          rowsPerPage={clientRowsPerPage}
          setRowsPerPage={setClientRowsPerPage}
          totalPages={clientTotalPages}
        />
      </CardFooter>
    </Card>
  );
};

export default Clients;
