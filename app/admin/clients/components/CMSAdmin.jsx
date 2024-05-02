import {
  clientFilterKeysAtom,
  clientsAtom,
  clientsCountAtom,
  fetchClientAtom,
} from "@/app/store/ClientStore";
import {
  fetchTaskAtom,
  selectedTaskFilterKeysAtom,
  taskFilterKeysAtom,
  tasksAtom,
} from "@/app/store/TaskStore";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { Suspense, useEffect, useMemo, useState } from "react";
import {
  changeViewAtom,
  showClientTaskAtom,
  showFooterAtom,
  showSearchBarAtom,
  selectedClientFilterKeysAtom,
  selectedClientToViewAtom,
  showClientDetailsAtom,
  pageRowsSelectionAtom,
} from "../store/CMSAdminStore";

import ClientList from "@/app/components/cms/ClientList";
import TaskTableView from "@/app/components/cms/TaskTableView";
import TaskBoardView from "@/app/components/cms/TaskBoardView";
import ClientDetails from "@/app/components/cms/ClientDetails";
import ClientAdminHeader from "./CMSAdminHeader";
import CMSFooter from "@/app/components/cms/CMSFooter";

const CMSAdmin = () => {
  const [searchClientItem, setSearchClientItem] = useState("");
  const [searchTaskItem, setSearchTaskItem] = useState("");
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "age",
    direction: "ascending",
  });

  const clients = useAtomValue(clientsAtom);
  const tasks = useAtomValue(tasksAtom);

  const clientFilterKeys = useAtomValue(clientFilterKeysAtom);
  const taskFilterKeys = useAtomValue(taskFilterKeysAtom);

  const pageRowsSelection = useAtomValue(pageRowsSelectionAtom);

  const [selectedClientFilterKeys, setSelectedClientFilterKeys] = useAtom(
    selectedClientFilterKeysAtom
  );
  const [selectedTaskFilterKeys, setSelectedTaskFilterKeys] = useAtom(
    selectedTaskFilterKeysAtom
  );

  const [changeView, setChangeView] = useAtom(changeViewAtom);
  const [showFooter, setShowFooter] = useAtom(showFooterAtom);
  const [showClientDetails, setShowClientDetails] = useAtom(
    showClientDetailsAtom
  );
  const [showClientTask, setShowClientTask] = useAtom(showClientTaskAtom);

  const setShowSearchBar = useSetAtom(showSearchBarAtom);
  const [selectedClientToView, setSelectedClientToView] = useAtom(
    selectedClientToViewAtom
  );
  const clientsCount = useAtomValue(clientsCountAtom);

  // ##########################################
  const tasksFromSelectedClient = useMemo(
    () =>
      tasks.filter((task) => task.client.client_id === selectedClientToView),
    [selectedClientToView, tasks]
  );

  const convertedTasksFromSelectedClient = tasksFromSelectedClient[0]?.sla.map(
    (sla, index) => {
      return {
        ...sla,
        id: (index += 1),
        clientKey: tasksFromSelectedClient[0].key,
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
        (task) =>
          task.name.toLowerCase().includes(searchTaskItem.toLowerCase()) ||
          task.instruction.toLowerCase().includes(searchTaskItem.toLowerCase())
      );
    }
    if (
      selectedTaskFilterKeyString !== "all" &&
      Array.from(selectedTaskFilterKeys).length !== taskFilterKeys.length
    ) {
      filteredTasks = filteredTasks.filter((task) =>
        Array.from(selectedTaskFilterKeys).includes(task.status)
      );
    }

    return filteredTasks;
  }, [
    convertedTasksFromSelectedClient,
    searchTaskItem,
    selectedTaskFilterKeyString,
    selectedTaskFilterKeys,
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

  // const sortedItemTasks = useMemo(() => {
  //   return [...itemTasks].sort((a, b) => {
  //     const first = a[sortDescriptor.column];
  //     const second = b[sortDescriptor.column];
  //     const cmp = first < second ? -1 : first > second ? 1 : 0;

  //     return sortDescriptor.direction === "descending" ? -cmp : cmp;
  //   });
  // }, [itemTasks, sortDescriptor]);

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
      Array.from(selectedClientFilterKeys).length !== clientFilterKeys.length
    ) {
      filteredClients = filteredClients.filter((client) =>
        Array.from(selectedClientFilterKeys).includes(client.name)
      );
    }

    return filteredClients;
  }, [
    clients,
    searchClientItem,
    selectedClientFilterKeyString,
    clientFilterKeys.length,
    selectedClientFilterKeys,
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

  const fetchTask = useSetAtom(fetchTaskAtom);
  const fetchClient = useSetAtom(fetchClientAtom);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchTask();
      fetchClient();
    }, 2500);
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Card className="flex w-full h-full my-4 px-2 py-1.5 drop-shadow shadow-none bg-white-default">
        <CardHeader className="">
          <ClientAdminHeader
            searchItem={showClientTask ? searchTaskItem : searchClientItem}
            setSearchItem={
              showClientTask ? setSearchTaskItem : setSearchClientItem
            }
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
          <Suspense
            fallback={
              <div className="text-lg font-medium text-black-default">
                {"CLIENT DATA LOADING"}
              </div>
            }
          >
            <ClientList
              itemClients={itemClients}
              showClientTask={showClientTask}
              setShowClientTask={setShowClientTask}
              showClientDetails={showClientDetails}
              setChangeView={setChangeView}
              setShowFooter={setShowFooter}
              setShowSearchBar={setShowSearchBar}
              setSelectedClientToView={setSelectedClientToView}
              setShowClientDetails={setShowClientDetails}
            />
            <TaskTableView
              itemTasks={filteredTaskItems}
              showClientTask={showClientTask}
              changeView={changeView}
              sortDescriptor={sortDescriptor}
              setSortDescriptor={setSortDescriptor}
              setShowClientTask={setShowClientTask}
              selectedClientToView={selectedClientToView}
            />
            <TaskBoardView
              itemTasks={filteredTaskItems}
              showClientTask={showClientTask && selectedClientToView !== ""}
              changeView={changeView}
              setShowClientTask={setShowClientTask}
              selectedClientToView={selectedClientToView}
            />
            <ClientDetails
              showClientDetails={showClientDetails}
              selectedClient={selectedClient}
            />
          </Suspense>
        </CardBody>
        <CardFooter className="">
          <CMSFooter
            showFooter={showFooter}
            displayedItemCount={
              showClientTask ? itemTasks?.length : itemClients?.length
            }
            totalItemCount={
              showClientTask
                ? tasksFromSelectedClient[0]?.sla?.length
                : clientsCount
            }
            pageRowsSelection={pageRowsSelection}
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
