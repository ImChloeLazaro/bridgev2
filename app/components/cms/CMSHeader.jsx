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
      className={cn(
        "w-full flex items-center justify-start mx-0 lg:mx-4 my-0 lg:my-2 gap-4",
        className
      )}
    >
      <div className="w-full flex flex-col lg:flex-row gap-4 lg:gap-2 justify-start">
        {/* <div className="w-full flex gap-2"> */}

        <div className="w-full flex justify-between items-center gap-2">
          <IconButton
            data-details={showClientDetails}
            data-task={showClientTask}
            isIconOnly={false}
            onPress={handleGoBackToClient}
            // min-w-0
            className="
            
            hidden transition-all 
            data-[task=true]:flex 
            data-[details=true]:flex"
          >
            <div className="text-black-default gap-2 flex justify-center items-center">
              <MdOutlineChevronLeft size={24} />
              <Tooltip
                content={
                  !selectedClientToView?.length
                    ? "Go Back"
                    : clientNameToDisplay
                }
                delay={1000}
              >
                <div
                  className="
                hidden sm:block bg-white-default rounded-lg px-2 py-1
                  w-28 truncate hover:underline hover:underline-offset-1
                  text-base font-bold text-black-default"
                >
                  {!selectedClientToView?.length
                    ? "Client List"
                    : clientNameToDisplay}
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
          className="hidden data-[task=true]:flex data-[details=true]:flex overscroll-x-auto no-scrollbar gap-2 ml-2 lg:ml-6 "
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
            className={"min-[320px]:"}
            onPress={handleChangeView}
          />
          <CTAButtons
            radius={"sm"}
            variant={"bordered"}
            color={showClientDetails ? "green" : "white"}
            size={"md"}
            startContent={<MdOutlineDescription size={24} />}
            label={"View Client Details"}
            className={"min-[320px]:"}
            onPress={handleViewClientDetails}
          />
        </div>
        {/* </div> */}
        {children}
      </div>
    </div>
  );
};

export default CMSHeader;
