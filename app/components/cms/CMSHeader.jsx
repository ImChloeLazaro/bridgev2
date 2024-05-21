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
    <div
      data-task={showClientTask}
      className={cn(
        "w-full flex items-center justify-start mx-0 lg:mx-2 my-0 lg:my-2 gap-4 data-[task=false]:max-w-lg",
        className
      )}
    >
      <div
        data-details={showClientDetails}
        className="data-[details=true]:flex-row w-full flex flex-col lg:flex-row gap-4 lg:gap-2 justify-start"
      >
        <div className="flex justify-between items-center gap-2 mr-2">
          <IconButton
            data-details={showClientDetails}
            data-task={showClientTask}
            isIconOnly={false}
            onPress={handleGoBackToClient}
            className="ml-2 justify-start
            px-1 min-w-18 md:min-w-32 lg:min-w-40
            hidden transition-all 
            data-[task=true]:flex 
            data-[details=true]:flex
            "
          >
            <div className="text-black-default flex justify-center items-center">
              <MdOutlineChevronLeft size={24} />
              <Tooltip
                content={
                  !selectedClientToView?.length
                    ? "Go Back"
                    : clientNameToDisplay
                }
                delay={1000}
              >
                <p
                  data-details={showClientDetails}
                  className="
                  w-14 md:w-24 lg:w-32 data-[details=true]:lg:w-full
                  bg-white-default rounded-lg px-2 py-1
                  truncate hover:underline hover:underline-offset-1
                  text-base font-bold text-black-default"
                >
                  {!selectedClientToView?.length
                    ? "Client List"
                    : clientNameToDisplay}
                </p>
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

        <div
          data-details={showClientDetails}
          data-task={showClientTask}
          className="
          hidden gap-2 ml-0 sm:ml-1 lg:ml-6
          data-[task=true]:flex
          data-[details=true]:flex
          data-[details=true]:lg:ml-2
          overscroll-x-auto no-scrollbar
          "
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
            label={<p className="hidden md:flex">{"Switch View"}</p>}
            className={"px-2 min-[320px]:px-5 w-10"}
            onPress={handleChangeView}
          />
          <CTAButtons
            radius={"sm"}
            variant={"bordered"}
            color={showClientDetails ? "green" : "white"}
            size={"md"}
            startContent={<MdOutlineDescription size={24} />}
            label={
              <p
                data-details={showClientDetails}
                className="hidden md:flex data-[details=true]:flex"
              >
                {"View Client Details"}
              </p>
            }
            className={"px-2 min-[320px]:px-5 w-10"}
            onPress={handleViewClientDetails}
          />
          {children}
        </div>
      </div>
    </div>
  );
};

export default CMSHeader;
