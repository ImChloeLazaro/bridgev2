import CTAButtons from "@/app/components/CTAButtons";
import IconButton from "@/app/components/IconButton";
import SearchBar from "@/app/components/SearchBar";
import {
  clientsAtom,
  fetchClientAtom,
  selectedClientToEditAtom,
  selectedClientToViewAtom,
  showClientDetailsAtom,
} from "@/app/store/ClientStore";
import { fetchTaskAtom } from "@/app/store/TaskStore";
import { Checkbox, Tooltip, cn } from "@nextui-org/react";
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
} from "../store/CMSTLStore";

const ClientHeader = ({
  searchItem,
  setSearchItem,
  selectedAllClients,
  setSelectedAllClients,
  showCheckBox = false,
  showActionButtons = false,
  showOptions = false,
  filterKeys,
  selectedFilterKeys,
  setSelectedFilterKeys,
  className,
}) => {
  const clients = useAtomValue(clientsAtom);
  const [selectedClient, setSelectedClient] = useAtom(selectedClientToEditAtom);
  const selectedClientToView = useAtomValue(selectedClientToViewAtom);

  const [changeView, setChangeView] = useAtom(changeViewAtom);
  const [showClientTask, setShowClientTask] = useAtom(showClientTaskAtom);
  const [showFooter, setShowFooter] = useAtom(showFooterAtom);

  const [isDisabled, setIsDisabled] = useState(false);

  const fetchTask = useSetAtom(fetchTaskAtom);
  const fetchClient = useSetAtom(fetchClientAtom);

  const [showClientDetails, setShowClientDetails] = useAtom(
    showClientDetailsAtom
  );

  const handleGoBackToClient = () => {
    setShowFooter(false);
    setShowClientTask(false);
    setShowClientDetails(false);
  };

  const handleRefreshClient = async () => {
    console.log("REFRESHED CLIENT DATA");
    setIsDisabled(true);
    await fetchTask();
    await fetchClient();
    setIsDisabled(false);
  };

  const handleUpdateTask = () => {
    console.log("UPDATED");
  };
  const handleDeleteTask = () => {
    console.log("DELETED");
  };

  const handleChangeView = () => {
    setChangeView(!changeView);
    setShowFooter(!showFooter);
  };

  const handleViewClientDetails = () => {
    setShowFooter(!showFooter);
    setShowClientTask(!showClientTask);
    setShowClientDetails(!showClientDetails);
  };

  const actionButtons = {
    update: {
      color: "blue",
      label: "Update Task",
      action: handleUpdateTask,
    },
    add: {
      color: "orange",
      label: "Add Task",
      action: handleDeleteTask,
    },
  };

  const clientNameToDisplay = clients.filter(
    (client) => client.key === selectedClientToView
  )[0]?.name;

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

        {showCheckBox && (
          <Checkbox
            isSelected={selectedAllClients}
            onValueChange={(value) => {
              setSelectedAllClients(value);
              console.log("SELECTED ALL CLIENT:", selectedClient);
              if (!selectedAllClients) {
                setSelectedClient(() => {
                  return clients.map((client, index) => {
                    return `client-${index + 1}`;
                  });
                });
              } else {
                setSelectedClient([]);
              }
            }}
          />
        )}
        <SearchBar
          searchItem={searchItem}
          setSearchItem={setSearchItem}
          filterKeys={filterKeys}
          selectedFilterKeys={selectedFilterKeys}
          setSelectedFilterKeys={setSelectedFilterKeys}
        />
        <IconButton
          onPress={handleRefreshClient}
          variant="bordered"
          isDisabled={isDisabled}
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
            radius={"lg"}
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
            radius={"lg"}
            variant={"bordered"}
            color={showClientDetails ? "green" : "white"}
            size={"md"}
            startContent={<MdOutlineDescription size={24} />}
            label={"View Client Details"}
            onPress={handleViewClientDetails}
          />
        </div>
      </div>
      {showActionButtons && (
        <div className="w-full max-w-md flex justify-between mx-4 gap-4">
          {Object.values(actionButtons).map((button) => {
            return (
              <CTAButtons
                key={button.label}
                fullWidth={true}
                label={button.label}
                color={button.color}
                className={"py-5"}
                onPress={button.action}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ClientHeader;
