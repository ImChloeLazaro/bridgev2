import CTAButtons from "@/app/components/CTAButtons";
import IconButton from "@/app/components/IconButton";
import SearchBar from "@/app/components/SearchBar";
import { clientsAtom, fetchClientAtom } from "@/app/store/ClientStore";
import {
  deleteTaskAtom,
  fetchTaskAtom,
  logOverDueTasksAtom,
  recurrenceTaskAtom,
} from "@/app/store/TaskStore";
import { Tooltip } from "@nextui-org/react";
import { getHours, getMinutes, getSeconds } from "date-fns";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
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
  isLoading,
  setIsLoading,
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
  const setRecurrenceTask = useSetAtom(recurrenceTaskAtom);
  const logOverDueTasks = useSetAtom(logOverDueTasksAtom);
  const clients = useAtomValue(clientsAtom);

  const deleteTask = useSetAtom(deleteTaskAtom);

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
          async () =>
            resolve(
              // await deleteTask(),
              await fetchTask(),
              await fetchClient()
            ),
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
  };

  const handleChangeView = () => {
    setChangeView(!changeView);
    setShowFooter(changeView && !showFooter);
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

  useEffect(() => {
    const interval = setInterval(() => {
      let now = new Date();
      // console.log(getHours(now), ":", getMinutes(now), ":", getSeconds(now));

      if (
        // 7:30:01AM AU TIME
        getHours(now) == 7 &&
        getMinutes(now) == 30 &&
        getSeconds(now) == 1
      ) {
        // Reset task progress and set new task due date based on recurrence
        setRecurrenceTask();
        fetchTask();
      }

      if (
        // 5:30:01PM AU TIME
        getHours(now) == 5 &&
        getMinutes(now) == 30 &&
        getSeconds(now) == 1
      ) {
        // Logs Overdue tasks
        logOverDueTasks();
        fetchTask();
      }
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full flex-wrap flex gap-2">
      <div
        data-show={showClientTask}
        className="data-[show=true]:max-w-2xl w-full max-w-xl flex flex-row items-center gap-2 mr-2 sm:ml-0"
      >
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
            px-1 ml-2 justify-start
            hidden transition-all
            w-48 lg:w-full lg:max-w-fit
            "
        >
          <Tooltip
            content={
              !selectedClientToView?.length ? "Go Back" : clientNameToDisplay
            }
            delay={1000}
          >
            <p
              className="
                  truncate min-w-0
                  bg-white-default rounded-lg px-2 py-1
                  hover:underline hover:underline-offset-1
                  text-base font-bold text-black-default
                  
                  "
            >
              {!selectedClientToView?.length
                ? "Client List"
                : clientNameToDisplay
                ? clientNameToDisplay
                : "Go Back"}
            </p>
          </Tooltip>
        </CTAButtons>
        <SearchBar
          type={showClientTask ? "filter" : "search"}
          endLabel={showClientTask ? "Search Tasks" : "Search Clients"}
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
        {/* ENABLE SETTINGS FOR CMS COMPONENTS SUCH AS 
        CHANGING DEFAULT TABLE SORTING OR 
        CHANGING DEFAULT ALLOWED DRAGGING COLUMNS? */}
        {/* <IconButton
          radius={"sm"}
          aria-label={"Refresh Task Client Data Button"}
          data-show={showSearchBar}
          // onPress={handleRefreshClient}
          variant="bordered"
          isLoading={isLoading}
          className={"hidden data-[show=true]:flex"}
        >
          <MdSettings size={24} />
        </IconButton> */}
      </div>
      <div
        data-show={showClientTask}
        className="hidden data-[show=true]:flex flex-row items-center gap-2 ml-4"
      >
        <CTAButtons
          isDisabled={showClientDetails}
          radius={"sm"}
          variant={"bordered"}
          color={changeView ? "blue" : "orange"}
          startContent={
            changeView ? <MdViewList size={24} /> : <MdViewColumn size={24} />
          }
          label={"Switch View"}
          className={"h-10 min-w-40 w-full lg:max-w-64"}
          onPress={handleChangeView}
        />
        <CTAButtons
          radius={"sm"}
          variant={"bordered"}
          color={showClientDetails ? "green" : "white"}
          startContent={<MdOutlineDescription size={24} />}
          label={"View Client Details"}
          className={"h-10 min-w-40 w-full lg:max-w-64"}
          onPress={handleViewClientDetails}
        />
      </div>
      <div
        data-show={showClientTask}
        data-details={showClientDetails}
        className="data-[details=true]:hidden flex flex-row items-center gap-2 data-[show=true]:ml-4 sm:data-[show=true]:ml-0 ml-0 min-[1336px]:data-[show=true]:ml-0 min-[1152px]:data-[show=true]:ml-4 "
      >
        {children ? children : null}
      </div>
    </div>
  );
};

export default CMSHeader;
