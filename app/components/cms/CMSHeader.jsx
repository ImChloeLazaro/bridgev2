import CTAButtons from "@/app/components/CTAButtons";
import IconButton from "@/app/components/IconButton";
import SearchBar from "@/app/components/SearchBar";
import { clientsAtom, fetchClientAtom } from "@/app/store/ClientStore";
import { fetchTaskAtom } from "@/app/store/TaskStore";
import { Tooltip, cn } from "@nextui-org/react";
import { useAtomValue, useSetAtom } from "jotai";
import { useState } from "react";
import {
  MdOutlineChevronLeft,
  MdOutlineDescription,
  MdRefresh,
  MdViewColumn,
  MdViewList,
} from "react-icons/md";
import { toast } from "sonner";

const CMSHeader = ({
  searchItem,
  setSearchItem,
  filterKeys,
  selectedFilterKeys,
  setSelectedFilterKeys,
  changeView,
  setChangeView,
  showClientTask,
  setShowClientTask,
  showFooter,
  setShowFooter,
  showSearchBar,
  setShowSearchBar,
  selectedClientToView,
  showClientDetails,
  setShowClientDetails,
  className,
  children,
}) => {
  const clients = useAtomValue(clientsAtom);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTask = useSetAtom(fetchTaskAtom);
  const fetchClient = useSetAtom(fetchClientAtom);

  const handleGoBackToClient = () => {
    setShowSearchBar(true);
    setShowClientTask(false);
    setShowClientDetails(false);
    setShowFooter(true);
  };

  const handleRefreshClient = () => {
    setIsLoading(true);
    const promise = async () =>
      new Promise((resolve) =>
        setTimeout(
          async () => resolve(await fetchTask(), await fetchClient()),
          2000
        )
      );

    toast.promise(promise, {
      loading: "Loading...",
      success: () => {
        setIsLoading(false);
        return showClientTask ? "Task Data Updated" : "Client Data Updated";
      },
      error: "Error refreshing data",
    });

    console.log("REFRESHED CLIENT DATA");
  };

  const handleChangeView = () => {
    setChangeView(!changeView);
    setShowFooter(!showFooter);
  };

  const handleViewClientDetails = () => {
    setShowSearchBar(!showSearchBar);
    setShowFooter(!changeView && !showFooter);
    setShowClientTask(!showClientTask);
    setShowClientDetails(!showClientDetails);
  };

  const clientNameToDisplay = clients.filter(
    (client) => client._id === selectedClientToView
  )[0]?.company.name;

  return (
    <div className="flex-wrap flex gap-2">
      <div className="flex gap-2">
        <CTAButtons
          color={"clear"}
          showButton={showClientDetails || showClientTask}
          data-details={showClientDetails}
          data-task={showClientTask}
          onPress={handleGoBackToClient}
          startContent={<MdOutlineChevronLeft size={24} />}
          disableRipple={true}
          disableAnimation={true}
          className="
            data-[details=true]:px-0
            data-[details=true]:ml-0
            data-[task=true]:flex 
            data-[details=true]:flex
            ml-2 justify-start
            px-1
            hidden transition-all
            "
          // w-full min-w-14 min-[425px]:min-w-16 md:min-w-32 lg:min-w-40
        >
          <Tooltip
            content={
              !selectedClientToView?.length ? "Go Back" : clientNameToDisplay
            }
            delay={1000}
          >
            <p
              data-details={showClientDetails}
              className="
                  data-[details=true]:w-full
                  w-16 md:w-28 lg:w-32
                  bg-white-default rounded-lg px-2 py-1
                  truncate hover:underline hover:underline-offset-1
                  text-base font-bold text-black-default
                  "
              // w-16 min-[425px]:min-w-20 md:w-28 lg:w-32
            >
              {!selectedClientToView?.length
                ? "Client List"
                : clientNameToDisplay}
            </p>
          </Tooltip>
        </CTAButtons>
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
          radius={"sm"}
          aria-label={"Refresh Task Client Data Button"}
          data-show={showSearchBar}
          onPress={handleRefreshClient}
          variant="bordered"
          isLoading={isLoading}
          className={"hidden data-[show=true]:flex"}
        >
          <MdRefresh size={24} />
        </IconButton>
      </div>
      <div className="flex gap-2">
        <CTAButtons
          showButton={showClientTask}
          isDisabled={showClientDetails}
          radius={"sm"}
          variant={"bordered"}
          color={changeView ? "blue" : "orange"}
          size={"md"}
          startContent={
            changeView ? <MdViewList size={24} /> : <MdViewColumn size={24} />
          }
          label={"Switch View"}
          className={"px-2 min-w-40 w-full lg:max-w-64"}
          onPress={handleChangeView}
        />
        <CTAButtons
          showButton={showClientTask}
          radius={"sm"}
          variant={"bordered"}
          color={showClientDetails ? "green" : "white"}
          size={"md"}
          startContent={<MdOutlineDescription size={24} />}
          label={"View Client Details"}
          className={"px-2 min-w-40 w-full lg:max-w-64"}
          onPress={handleViewClientDetails}
        />
      </div>
      <div className="flex gap-2">{children ? children : null}</div>
    </div>
  );
};

export default CMSHeader;
