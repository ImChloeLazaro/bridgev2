import {
  clientFilterKeysAtom,
  clientsAtom,
  clientsCountAtom,
  selectedClientFilterKeysAtom,
  selectedClientToViewAtom,
  showClientDetailsAtom,
} from "@/app/store/ClientStore";
import {
  selectedTaskFilterKeysAtom,
  taskFilterKeysAtom,
  tasksAtom,
} from "@/app/store/TaskStore";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useAtom, useAtomValue } from "jotai";
import { useMemo, useState } from "react";
import {
  changeViewAtom,
  showActionButtonsAtom,
  showCheckBoxAtom,
  showClientTaskAtom,
  showFooterAtom,
  showOptionsAtom,
} from "../store/CMSAdminStore";
import AddClientModal from "./AddClientModal";
import AddTaskModal from "./AddTaskModal";
import CMSFooter from "./CMSFooter";
import ClientHeader from "./CMSHeader";
import ClientDetails from "./ClientDetails";
import ClientList from "./ClientList";
import TaskBoardView from "./TaskBoardView";
import TaskTableView from "./TaskTableView";

const CMSAdmin = () => {
  const { isOpenTask, onOpenTask, onCloseTask } = useDisclosure();
  const { isOpenClient, onOpenClient, onCloseClient } = useDisclosure();

  const [searchClientItem, setSearchClientItem] = useState("");
  const [searchTaskItem, setSearchTaskItem] = useState("");
  const [selectedAllClients, setSelectedAllClients] = useState(false);

  const showFooter = useAtomValue(showFooterAtom);
  const showOptions = useAtomValue(showOptionsAtom);
  const showCheckBox = useAtomValue(showCheckBoxAtom);
  const showActionButtons = useAtomValue(showActionButtonsAtom);

  const changeView = useAtomValue(changeViewAtom);
  const showClientDetails = useAtomValue(showClientDetailsAtom);

  const clientFilterKeys = useAtomValue(clientFilterKeysAtom);
  const [selectedClientFilterKeys, setSelectedClientFilterKeys] = useAtom(
    selectedClientFilterKeysAtom
  );

  const taskFilterKeys = useAtomValue(taskFilterKeysAtom);
  const [selectedTaskFilterKeys, setSelectedTaskFilterKeys] = useAtom(
    selectedTaskFilterKeysAtom
  );

  const selectedClientToView = useAtomValue(selectedClientToViewAtom);
  const showClientTask = useAtomValue(showClientTaskAtom);

  const clientsCount = useAtomValue(clientsCountAtom);
  const clients = useAtomValue(clientsAtom);

  const tasks = useAtomValue(tasksAtom);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "name",
    direction: "ascending",
  });

  // ##########################################
  const tasksFromSelectedClient = tasks.filter(
    (task) => task.client.client_id === selectedClientToView
    //   (task) => task.client.client_id === "client456"
  );

  const convertedTasksFromSelectedClient = tasksFromSelectedClient[0]?.sla.map(
    (sla, index) => {
      return {
        ...sla,
        id: (index += 1),
        key: tasksFromSelectedClient[0].key,
        processor: tasksFromSelectedClient[0].processor,
        reviewer: tasksFromSelectedClient[0].reviewer,
      };
    }
  );

  const selectedTaskFilterKeyString = Array.from(selectedTaskFilterKeys).join(
    ""
  );

  const filteredTaskItems = useMemo(() => {
    let filteredTasks = convertedTasksFromSelectedClient?.length
      ? [...convertedTasksFromSelectedClient]
      : [];

    if (Boolean(searchTaskItem)) {
      filteredTasks = filteredTasks.filter(
        (task) => task.name.toLowerCase().includes(searchTaskItem.toLowerCase())
        // task.instruction.toLowerCase().includes(searchTaskItem.toLowerCase())
      );
    }
    if (
      selectedTaskFilterKeyString !== "all" &&
      Array.from(selectedTaskFilterKeyString).length !== taskFilterKeys.length
    ) {
      filteredTasks = filteredTasks.filter((task) =>
        Array.from(selectedTaskFilterKeyString).includes(task.status)
      );
    }

    return filteredTasks;
  }, [
    convertedTasksFromSelectedClient,
    searchTaskItem,
    selectedTaskFilterKeyString,
    taskFilterKeys.length,
  ]);

  const [taskRowsPerPage, setTaskRowsPerPage] = useState(new Set(["10"]));
  const [taskPage, setTaskPage] = useState(1);

  let taskRowsPerPageNumber = isNaN(
    parseInt(Array.from(taskRowsPerPage).join(""))
  )
    ? 10
    : parseInt(Array.from(taskRowsPerPage).join(""));

  const taskTotalPages = Math.ceil(
    filteredTaskItems.length / taskRowsPerPageNumber
  );

  const itemTasks = useMemo(() => {
    const start = (taskPage - 1) * taskRowsPerPageNumber;
    const end = start + taskRowsPerPageNumber;

    return filteredTaskItems.slice(start, end);
  }, [taskPage, taskRowsPerPageNumber, filteredTaskItems]);

  const sortedItemTasks = useMemo(() => {
    return [...itemTasks].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [itemTasks, sortDescriptor]);

  // ######################################################
  const selectedClient = clients.filter(
    (client) => client._id === selectedClientToView
  );

  const selectedClientFilterKeyString = Array.from(
    selectedClientFilterKeys
  ).join("");

  const filteredClientItems = useMemo(() => {
    let filteredClients = [...clients];

    if (Boolean(searchClientItem)) {
      filteredClients = filteredClients.filter((client) =>
        client.company.name
          .toLowerCase()
          .includes(searchClientItem.toLowerCase())
      );
    }
    if (
      selectedClientFilterKeyString !== "all" &&
      Array.from(selectedClientFilterKeyString).length !==
        clientFilterKeys.length
    ) {
      filteredClients = filteredClients.filter((client) =>
        Array.from(selectedClientFilterKeyString).includes(client.name)
      );
    }

    return filteredClients;
  }, [
    clients,
    searchClientItem,
    selectedClientFilterKeyString,
    clientFilterKeys.length,
  ]);

  const [clientRowsPerPage, setClientRowsPerPage] = useState(new Set(["10"]));
  const [clientPage, setClientPage] = useState(1);

  let clientRowsPerPageNumber = isNaN(
    parseInt(Array.from(clientRowsPerPage).join(""))
  )
    ? 10
    : parseInt(Array.from(clientRowsPerPage).join(""));

  const clientTotalPages = Math.ceil(
    filteredClientItems.length / clientRowsPerPageNumber
  );

  const itemClients = useMemo(() => {
    const start = (clientPage - 1) * clientRowsPerPageNumber;
    const end = start + clientRowsPerPageNumber;

    return filteredClientItems.slice(start, end);
  }, [clientPage, clientRowsPerPageNumber, filteredClientItems]);

  // sorted clients

  // const sortedItemTasks = useMemo(() => {
  //   return [...itemClients].sort((a, b) => {
  //     const first = a[sortDescriptor.column];
  //     const second = b[sortDescriptor.column];
  //     const cmp = first < second ? -1 : first > second ? 1 : 0;

  //     return sortDescriptor.direction === "descending" ? -cmp : cmp;
  //   });
  // }, [itemClients]);

  return (
    <>
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
        <CardBody className="h-full w-full overflow-x-auto">
          <ClientList
            itemClients={itemClients}
            sortedItemTasks={sortedItemTasks}
            showClientTask={showClientTask}
            showClientDetails={showClientDetails}
          />
          <TaskTableView
            sortedItemTasks={sortedItemTasks}
            showClientTask={showClientTask}
            changeView={changeView}
            sortDescriptor={sortDescriptor}
            setSortDescriptor={setSortDescriptor}
          />
          <TaskBoardView
            sortedItemTasks={filteredTaskItems}
            showClientTask={showClientTask}
            changeView={changeView}
          />
          <ClientDetails
            showClientDetails={showClientDetails}
            selectedClient={selectedClient}
          />
        </CardBody>
        <CardFooter className="">
          <CMSFooter
            showFooter={showFooter}
            displayedItemCount={
              showClientTask ? sortedItemTasks.length : itemClients.length
            }
            totalItemCount={
              showClientTask ? tasksFromSelectedClient.length : clientsCount
            }
            page={showClientTask ? taskPage : clientPage}
            setPage={showClientTask ? setTaskPage : setClientPage}
            rowsPerPage={showClientTask ? taskRowsPerPage : clientRowsPerPage}
            setRowsPerPage={
              showClientTask ? setTaskRowsPerPage : setClientRowsPerPage
            }
            totalPages={showClientTask ? taskTotalPages : clientTotalPages}
          />
        </CardFooter>
      </Card>
    </>
  );
};

export default CMSAdmin;
