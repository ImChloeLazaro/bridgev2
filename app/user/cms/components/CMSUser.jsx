import AddTaskModal from "@/app/components/cms/AddTaskModal";
import ClientDetails from "@/app/components/cms/ClientDetails";
import ClientList from "@/app/components/cms/ClientList";
import CMSFooter from "@/app/components/cms/CMSFooter";
import CMSHeader from "@/app/components/cms/CMSHeader";
import TaskBoardView from "@/app/components/cms/TaskBoardView";
import TaskTableView from "@/app/components/cms/TaskTableView";
import CTAButtons from "@/app/components/CTAButtons";
import { clientFilterKeysAtom, fetchClientAtom } from "@/app/store/ClientStore";
import {
  actionButtonsAtom,
  fetchTaskAtom,
  recurrenceSelectionAtom,
  taskFilterKeysAtom,
} from "@/app/store/TaskStore";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useMemo, useState } from "react";
import {
  changeViewAtom,
  clientListAtom,
  clientSelectionAtom,
  dateRangeAtom,
  endTimeAtom,
  managerSelectionAtom,
  processorSelectionAtom,
  reviewerSelectionAtom,
  selectedClientAtom,
  selectedClientFilterKeysAtom,
  selectedClientToViewAtom,
  selectedManagerAtom,
  selectedProcessorAtom,
  selectedRecurrenceAtom,
  selectedReviewerAtom,
  selectedTaskAtom,
  selectedTaskFilterKeysAtom,
  selectedTaskIDAtom,
  selectedTeamAtom,
  showClientDetailsAtom,
  showClientTaskAtom,
  showFooterAtom,
  showSearchBarAtom,
  startTimeAtom,
  taskActionsDetailsAtom,
  taskDataAtom,
  taskDurationAtom,
  taskInstructionAtom,
  taskNameAtom,
  tasksListAtom,
  teamSelectionAtom,
  updateSelectedProcessorAtom,
  updateSelectedReviewerAtom,
} from "../store/CMSUserStore";
// @refresh reset

const CMSUser = () => {
  const customBreakPoint = "1023";
  const [isMobile, setIsMobile] = useState(
    window.matchMedia(`(max-width: ${customBreakPoint}px)`).matches
  );
  const {
    isOpen: isOpenTask,
    onOpen: onOpenTask,
    onOpenChange: onOpenChangeTask,
  } = useDisclosure();
  const {
    isOpen: isOpenClient,
    onOpen: onOpenClient,
    onOpenChange: onOpenChangeClient,
  } = useDisclosure();

  const [searchClientItem, setSearchClientItem] = useState("");
  const [searchTaskItem, setSearchTaskItem] = useState("");
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "dueDate",
    direction: "descending",
  });

  const tasksList = useAtomValue(tasksListAtom);

  // console.log(
  //   "tasksList",
  //   tasksList
  //     .map((task) =>
  //       task.sla
  //         .map((sla) => sla.processor.map((processor) => processor.sub))
  //         .flat()
  //     )
  //     .flat(),
  //   tasksList
  //     .map((task) =>
  //       task.sla
  //         .map((sla) => sla.reviewer.map((reviewer) => reviewer.sub))
  //         .flat()
  //     )
  //     .flat()
  // );

  const clientList = useAtomValue(clientListAtom);

  const taskActionsDetails = useAtomValue(taskActionsDetailsAtom);
  const actionButtons = useAtomValue(actionButtonsAtom);

  const clientFilterKeys = useAtomValue(clientFilterKeysAtom);
  const taskFilterKeys = useAtomValue(taskFilterKeysAtom);

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
  const [selectedClient, setSelectedClient] = useAtom(selectedClientAtom);

  // ##########################################

  const selectedTaskFilterKeyString = Array.from(
    selectedTaskFilterKeys
  ).toString();

  let tasksIndex = 0;
  const taskStatusCount = tasksList
    .map((task) =>
      task.sla.map((sla) => {
        return {
          ...sla,
          id: (tasksIndex += 1),
          task_id: task._id,
          client_id: task.client?.client_id,
          client_name: task.client?.name,
          manager: task.manager,
        };
      })
    )
    .flat();

  const filteredTaskItems = useMemo(() => {
    let filteredTasks = tasksList?.length ? [...tasksList] : [];
    let tasksIndex = 0;

    filteredTasks = filteredTasks.filter((tasks) => {
      return tasks.client?.client_id === selectedClientToView;
    });

    filteredTasks = filteredTasks
      .map((task) =>
        task.sla.map((sla) => {
          return {
            ...sla,
            id: (tasksIndex += 1),
            task_id: task._id,
            client_id: task.client?.client_id,
            client_name: task.client?.name,
            manager: task.manager,
          };
        })
      )
      .flat();

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
    tasksList,
    searchTaskItem,
    selectedTaskFilterKeyString,
    selectedTaskFilterKeys,
    taskFilterKeys.length,
    selectedClientToView,
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

  const selectedClientFilterKeyString = Array.from(
    selectedClientFilterKeys
  ).join("");

  const filteredClientItems = useMemo(() => {
    let filteredClients = clientList?.length ? [...clientList] : [];

    if (Boolean(searchClientItem)) {
      filteredClients = filteredClients.filter((client) =>
        client.name.toLowerCase().includes(searchClientItem.toLowerCase())
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
    clientList,
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

  const handleOpenTaskWindow = () => {
    onOpenTask();
  };
  const handleOpenClientWindow = () => {
    onOpenClient();
  };

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchTask();
      fetchClient();
    }, 10000);
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <Card className="flex w-full h-full my-0 lg:my-4 px-0 lg:px-2 drop-shadow shadow-none bg-white-default rounded-none lg:rounded-xl">
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
          >
            <CTAButtons
              isDisabled={Boolean(!itemClients?.length)}
              radius={"sm"}
              variant={"bordered"}
              key={actionButtons.task.label}
              label={actionButtons.task.label}
              color={actionButtons.task.color}
              className={"px-2 h-10 min-w-40 w-full lg:max-w-64"}
              onPress={() => handleOpenTaskWindow()}
            />
            <AddTaskModal
              isOpen={isOpenTask}
              onOpenChange={onOpenChangeTask}
              selectedClientToView={selectedClientToView}
              showClientTask={showClientTask}
              taskDataAtom={taskDataAtom}
              clientSelectionAtom={clientSelectionAtom}
              selectedClientAtom={selectedClientAtom}
              teamSelectionAtom={teamSelectionAtom}
              selectedTeamAtom={selectedTeamAtom}
              processorSelectionAtom={processorSelectionAtom}
              selectedProcessorAtom={selectedProcessorAtom}
              reviewerSelectionAtom={reviewerSelectionAtom}
              selectedReviewerAtom={selectedReviewerAtom}
              managerSelectionAtom={managerSelectionAtom}
              selectedManagerAtom={selectedManagerAtom}
              taskNameAtom={taskNameAtom}
              taskInstructionAtom={taskInstructionAtom}
              recurrenceSelectionAtom={recurrenceSelectionAtom}
              selectedRecurrenceAtom={selectedRecurrenceAtom}
              taskDurationAtom={taskDurationAtom}
              dateRangeAtom={dateRangeAtom}
              startTimeAtom={startTimeAtom}
              endTimeAtom={endTimeAtom}
            />
          </CMSHeader>
        </CardHeader>
        <CardBody className="p-0 lg:p-3 h-full w-full overflow-x-auto">
          <ClientList
            taskStatusCount={taskStatusCount}
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
            setShowClientDetails={setShowClientDetails}
            isLoading={isLoading}
          />
          <TaskTableView
            itemTasks={itemTasks}
            showClientTask={showClientTask}
            changeView={changeView}
            sortDescriptor={sortDescriptor}
            setSortDescriptor={setSortDescriptor}
            setShowClientTask={setShowClientTask}
            selectedClientToView={selectedClientToView}
            actions={taskActionsDetails}
            selectedTaskAtom={selectedTaskAtom}
            selectedTaskIDAtom={selectedTaskIDAtom}
            updateSelectedProcessorAtom={updateSelectedProcessorAtom}
            updateSelectedReviewerAtom={updateSelectedReviewerAtom}
            isLoading={isLoading}
            isMobile={isMobile}
          />
          <TaskBoardView
            itemTasks={filteredTaskItems}
            showClientTask={showClientTask && selectedClientToView !== ""}
            changeView={changeView}
            setShowClientTask={setShowClientTask}
            selectedClientToView={selectedClientToView}
            actions={taskActionsDetails}
            selectedTaskAtom={selectedTaskAtom}
            selectedTaskIDAtom={selectedTaskIDAtom}
            updateSelectedProcessorAtom={updateSelectedProcessorAtom}
            updateSelectedReviewerAtom={updateSelectedReviewerAtom}
            isLoading={isLoading}
            isMobile={isMobile}
          />
          <ClientDetails
            showClientDetails={showClientDetails}
            selectedClientToView={selectedClientToView}
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
