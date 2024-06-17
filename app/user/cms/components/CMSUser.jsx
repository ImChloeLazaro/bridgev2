import ClientDetails from "@/app/components/cms/ClientDetails";
import ClientList from "@/app/components/cms/ClientList";
import CMSFooter from "@/app/components/cms/CMSFooter";
import CMSHeader from "@/app/components/cms/CMSHeader";
import TaskBoardView from "@/app/components/cms/TaskBoardView";
import TaskTableView from "@/app/components/cms/TaskTableView";
import { authenticationAtom } from "@/app/store/AuthenticationStore";
import {
  clientFilterKeysAtom,
  clientsAtom,
  clientsCountAtom,
  fetchClientAtom,
} from "@/app/store/ClientStore";
import {
  fetchTaskAtom,
  taskFilterKeysAtom,
  tasksAtom,
} from "@/app/store/TaskStore";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useMemo, useState } from "react";
import { MdFactCheck, MdKeyboardDoubleArrowUp } from "react-icons/md";
import {
  changeViewAtom,
  pageRowsSelectionAtom,
  selectedClientFilterKeysAtom,
  selectedClientForTaskAtom,
  selectedClientToViewAtom,
  selectedTaskFilterKeysAtom,
  showClientDetailsAtom,
  showClientTaskAtom,
  showFooterAtom,
  showSearchBarAtom,
} from "../store/CMSUserStore";

// @refresh reset

const CMSUser = () => {
  const customBreakPoint = "1023";
  const [isMobile, setIsMobile] = useState(
    window.matchMedia(`(max-width: ${customBreakPoint}px)`).matches
  );
  const [searchClientItem, setSearchClientItem] = useState("");
  const [searchTaskItem, setSearchTaskItem] = useState("");
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "endDate",
    direction: "descending",
  });
  const user = useAtomValue(authenticationAtom);

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

  const [showSearchBar, setShowSearchBar] = useAtom(showSearchBarAtom);
  const [selectedClientToView, setSelectedClientToView] = useAtom(
    selectedClientToViewAtom
  );
  const [selectedClientForTask, setSelectedClientForTask] = useAtom(
    selectedClientForTaskAtom
  );

  // ##########################################

  const userTasks = tasks.filter((task) => {
    const processors = task.processor.map((user) => user.sub);
    const reviewers = task.reviewer.map((user) => user.sub);
    return [...processors, ...reviewers].includes(user.sub); // assignees
  });

  const tasksFromSelectedClient = useMemo(
    () =>
      userTasks.filter(
        (task) => task.client?.client_id === selectedClientToView
      ),
    [selectedClientToView, userTasks]
  );

  const convertedTasksFromSelectedClient = tasksFromSelectedClient[0]?.sla.map(
    (sla, index) => {
      return {
        ...sla,
        id: (index += 1),
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

  // ######################################################

  const selectedClient = clients.filter(
    (client) => client._id === selectedClientToView
  );

  const selectedClientFilterKeyString = Array.from(
    selectedClientFilterKeys
  ).join("");

  const filteredClientItems = useMemo(() => {
    const clientIDFromTasks = userTasks.map((task) => task.client?.client_id);

    let filteredClients = [
      ...clients.filter((client) => clientIDFromTasks.includes(client._id)),
    ];

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
    userTasks,
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

  const fetchTask = useSetAtom(fetchTaskAtom);
  const fetchClient = useSetAtom(fetchClientAtom);

  const actions = [
    {
      key: "escalate",
      status_id: "tl",
      color: "orange",
      label: "Escalate to TL",
      icon: <MdKeyboardDoubleArrowUp size={18} />,
    },
    // {
    //   key: "resolve",
    //   status_id: "user",
    //   color: "green",
    //   label: "Resolve Escalation",
    //   icon: <MdFactCheck size={18} />,
    // },
  ];

  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     fetchTask();
  //     fetchClient();
  //   }, 5000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    fetchTask();
    fetchClient();
  }, []);

  useEffect(() => {
    // only execute all the code below in client side
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setIsMobile(
        window.matchMedia(`(max-width: ${customBreakPoint}px)`).matches
      );
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Card className="flex w-full h-full my-0 lg:my-4 px-0 lg:px-2 drop-shadow shadow-none bg-white-default rounded-none lg:rounded-lg">
        <CardHeader
          data-task={showClientTask}
          data-details={showClientDetails}
          className="
            data-[details=true]:py-2 
            data-[task=true]:py-2 
            data-[details=true]:px-1 
            data-[task=true]:px-0 
            p-4 py-4 mt-4 mb-4 lg:mb-2
            "
        >
          <CMSHeader
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
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            changeView={changeView}
            setChangeView={setChangeView}
            showClientTask={showClientTask}
            setShowClientTask={setShowClientTask}
            showFooter={showFooter}
            setShowFooter={setShowFooter}
            showSearchBar={showSearchBar}
            setShowSearchBar={setShowSearchBar}
            selectedClientToView={selectedClientToView}
            showClientDetails={showClientDetails}
            setShowClientDetails={setShowClientDetails}
          />
        </CardHeader>
        <CardBody className="p-0 lg:p-1 xl:p-3 h-full w-full overflow-x-auto">
          <ClientList
            itemClients={itemClients}
            searchClientItem={searchClientItem}
            selectedClientFilterKeys={selectedClientFilterKeys}
            showClientTask={showClientTask}
            setShowClientTask={setShowClientTask}
            showClientDetails={showClientDetails}
            changeView={changeView}
            setChangeView={setChangeView}
            setShowFooter={setShowFooter}
            setShowSearchBar={setShowSearchBar}
            setSelectedClientToView={setSelectedClientToView}
            setSelectedClientForTask={setSelectedClientForTask}
            setShowClientDetails={setShowClientDetails}
            isLoading={isLoading}
          />
          <TaskTableView
            itemTasks={filteredTaskItems}
            showClientTask={showClientTask}
            changeView={changeView}
            sortDescriptor={sortDescriptor}
            setSortDescriptor={setSortDescriptor}
            setShowClientTask={setShowClientTask}
            selectedClientToView={selectedClientToView}
            actions={actions}
            tasksFromSelectedClient={tasksFromSelectedClient}
            isLoading={isLoading}
            isMobile={isMobile}
          />
          <TaskBoardView
            itemTasks={filteredTaskItems}
            showClientTask={showClientTask && selectedClientToView !== ""}
            changeView={changeView}
            setShowClientTask={setShowClientTask}
            selectedClientToView={selectedClientToView}
            actions={actions}
            tasksFromSelectedClient={tasksFromSelectedClient}
            isLoading={isLoading}
            isMobile={isMobile}
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
              showClientTask ? itemTasks?.length : itemClients?.length
            }
            totalItemCount={
              showClientTask ? itemTasks?.length : itemClients?.length
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

export default CMSUser;
