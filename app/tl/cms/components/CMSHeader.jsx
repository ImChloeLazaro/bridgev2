import CTAButtons from "@/app/components/CTAButtons";
import IconButton from "@/app/components/IconButton";
import SearchBar from "@/app/components/SearchBar";
import {
  clientsAtom,
  fetchClientAtom,
  selectedClientToViewAtom,
  showClientDetailsAtom
} from "@/app/store/ClientStore";
import {
  clientSelectionChangeAtom,
  fetchTaskAtom
} from "@/app/store/TaskStore";
import { Tooltip, cn, useDisclosure } from "@nextui-org/react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useState } from "react";
import {
  MdOutlineChevronLeft,
  MdOutlineDescription,
  MdRefresh,
  MdViewColumn,
  MdViewList,
} from "react-icons/md";
import {
  changeViewAtom,
  showClientTaskAtom,
  showFooterAtom,
  showSearchBarAtom
} from "../store/CMSTLStore";
import AddClientModal from "./AddClientModal";
import AddTaskModal from "./AddTaskModal";

const ClientHeader = ({
  searchItem,
  setSearchItem,
  filterKeys,
  selectedFilterKeys,
  setSelectedFilterKeys,
  className,
}) => {
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

  const clients = useAtomValue(clientsAtom);
  const selectedClientToView = useAtomValue(selectedClientToViewAtom);
  const clientSelectionChange = useSetAtom(clientSelectionChangeAtom);

  const [changeView, setChangeView] = useAtom(changeViewAtom);
  const [showClientTask, setShowClientTask] = useAtom(showClientTaskAtom);
  const [showFooter, setShowFooter] = useAtom(showFooterAtom);
  const [showSearchBar, setShowSearchBar] = useAtom(showSearchBarAtom);

  const [isDisabled, setIsDisabled] = useState(false);

  const fetchTask = useSetAtom(fetchTaskAtom);
  const fetchClient = useSetAtom(fetchClientAtom);

  const [showClientDetails, setShowClientDetails] = useAtom(
    showClientDetailsAtom
  );

  const handleGoBackToClient = () => {
    setShowSearchBar(true);
    setShowClientTask(false);
    setShowClientDetails(false);
    if (showClientDetails) {
      setShowActionButtons(true);
    }
  };

  const handleRefreshClient = async () => {
    console.log("REFRESHED CLIENT DATA");
    setIsDisabled(true);
    await fetchTask();
    await fetchClient();
    setIsDisabled(false);
  };

  const handleChangeView = () => {
    setChangeView(!changeView);
  };

  const handleViewClientDetails = () => {
    setShowSearchBar(!showSearchBar);
    setShowFooter(!showFooter);
    setShowClientTask(!showClientTask);
    setShowClientDetails(!showClientDetails);
  };

  const handleOpenTaskWindow = () => {
    if (showClientTask) {
      clientSelectionChange(selectedClientToView);
    }
    onOpenTask();
  };
  const handleOpenClientWindow = () => {
    onOpenClient();
  };

  const actionButtons = {
    task: {
      color: "blue",
      label: "Add Task",
    },
    client: {
      color: "orange",
      label: "Add Client",
    },
  };

  const clientNameToDisplay = clients.filter(
    (client) => client._id === selectedClientToView
  )[0]?.company.name;

  return (
    <div
      className={cn(
        "w-full flex items-center justify-between mx-4 my-2 gap-4",
        className
      )}
    >
      <div className="flex gap-2">
        <IconButton
          data-details={showClientDetails}
          data-task={showClientTask}
          isIconOnly={false}
          onPress={handleGoBackToClient}
          className="
            hidden transition-all 
            data-[task=true]:flex 
            data-[details=true]:flex"
        >
          <div className="text-black-default gap-2 flex justify-center items-center">
            <MdOutlineChevronLeft size={24} />
            <Tooltip content={clientNameToDisplay} delay={1000}>
              <div
                className="
                bg-white-default rounded-lg px-2 py-1
                  w-28 truncate hover:underline hover:underline-offset-1
                  text-base font-bold text-black-default"
              >
                {clientNameToDisplay}
              </div>
            </Tooltip>
          </div>
        </IconButton>

        <SearchBar
          disabledFilter={showClientTask && changeView}
          showSearchBar={showSearchBar}
          searchItem={searchItem}
          setSearchItem={setSearchItem}
          filterKeys={filterKeys}
          selectedFilterKeys={selectedFilterKeys}
          setSelectedFilterKeys={setSelectedFilterKeys}
        />
        <IconButton
          radius={"md"}
          data-show={showSearchBar}
          onPress={handleRefreshClient}
          variant="bordered"
          isDisabled={isDisabled}
          className={"hidden data-[show=true]:flex"}
        >
          <div
            data-loading={isDisabled}
            className={
              "transition duration-1000 ease-in-out text-black-default hover:rotate-[360deg] data-[loading=true]:animate-spin"
            }
          >
            <MdRefresh size={24} />
          </div>
        </IconButton>
        <div
          data-details={showClientDetails}
          data-task={showClientTask}
          className="hidden data-[task=true]:flex data-[details=true]:flex gap-2 ml-6 "
        >
          <CTAButtons
            isDisabled={showClientDetails}
            radius={"sm"}
            variant={"bordered"}
            color={changeView ? "blue" : "orange"}
            size={"md"}
            startContent={
              changeView ? <MdViewList size={24} /> : <MdViewColumn size={24} />
            }
            label={"Switch View"}
            onPress={handleChangeView}
          />
          <CTAButtons
            radius={"sm"}
            variant={"bordered"}
            color={showClientDetails ? "green" : "white"}
            size={"md"}
            startContent={<MdOutlineDescription size={24} />}
            label={"View Client Details"}
            onPress={handleViewClientDetails}
          />
        </div>
      </div>
      <div
        data-show={showClientDetails}
        className="w-full flex data-[show=true]:hidden justify-end mx-4 gap-4"
      >
        <CTAButtons
          radius={"sm"}
          key={actionButtons.task.label}
          fullWidth={true}
          label={actionButtons.task.label}
          color={actionButtons.task.color}
          className={"py-5 max-w-[16rem]"}
          onPress={() => handleOpenTaskWindow()}
        />
        <AddTaskModal isOpen={isOpenTask} onOpenChange={onOpenChangeTask} />
        {/* <CTAButtons
          radius={"sm"}
          showButton={!showClientTask}
          key={actionButtons.client.label}
          fullWidth={true}
          label={actionButtons.client.label}
          color={actionButtons.client.color}
          className={"py-5 max-w-[16rem]"}
          onPress={() => handleOpenClientWindow()}
        />
        <AddClientModal
          isOpen={isOpenClient}
          onOpenChange={onOpenChangeClient}
        /> */}
      </div>
    </div>
  );
};

export default ClientHeader;
