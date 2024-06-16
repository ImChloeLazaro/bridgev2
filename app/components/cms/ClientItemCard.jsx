import IconButton from "@/app/components/IconButton";
import LabelTagChip from "@/app/components/LabelTagChip";
import { tasksAtom } from "@/app/store/TaskStore";
import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardBody,
  Link,
  Spinner,
} from "@nextui-org/react";
import { differenceInDays } from "date-fns";
import { useAtomValue } from "jotai";
import { useEffect, useMemo, useState } from "react";
import { MdChevronRight } from "react-icons/md";
import { MdPerson } from "react-icons/md";

const tagColors = {
  todo: "blue",
  done: "green",
  forReview: "yellow",
  pending: "darkgrey",
  escalation: "red",
  overdue: "orange",
};

const ClientItemCard = ({
  clientName,
  clientKey,
  setShowClientTask,
  changeView,
  setChangeView,
  setShowFooter,
  setShowSearchBar,
  setSelectedClientToView,
  setSelectedClientForTask,
  setShowClientDetails,
}) => {
  const customBreakPoint = "1023";
  const [isMobile, setIsMobile] = useState(
    window.matchMedia(`(max-width: ${customBreakPoint}px)`).matches
  );

  const tasks = useAtomValue(tasksAtom);

  const labelCount = useMemo(() => {
    let overdueCount = tasks
      .filter((task) => task.client?.client_id === clientKey)[0]
      ?.sla.filter((sla) =>
        Boolean(
          differenceInDays(new Date(sla.duration.end), new Date()) < 0 &&
            sla.status === "todo"
        )
      ).length;
    let escalateCount = tasks
      .filter((task) => task.client?.client_id === clientKey)[0]
      ?.sla.filter((sla) => sla?.escalate).length;
    let statusCount = tasks
      .filter((task) => task.client?.client_id === clientKey)[0]
      ?.sla.map((sla) => sla?.status)
      .reduce(
        (acc, curr) => {
          return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
        },
        {
          pending: 0,
          todo: 0,
          done: 0,
          forReview: 0,
        }
      );

    if (
      Boolean(statusCount) ||
      Boolean(escalateCount) ||
      Boolean(overdueCount)
    ) {
      return {
        ...statusCount,
        escalation: escalateCount,
        overdue: overdueCount,
      };
    } else {
      return {
        pending: 0,
        todo: 0,
        done: 0,
        forReview: 0,
        escalation: 0,
        overdue: 0,
      };
    }
  }, [clientKey, tasks]);

  const clientProcessors = tasks.filter(
    (task) => task.client?.client_id === clientKey
  )[0]?.processor;

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

  const handleSelectTask = () => {
    // when user pressed on the tags on client list
    handleSelectClient(clientKey);
    setChangeView(true);
    setShowFooter(false);
  };
  const handleSelectClient = (selected) => {
    // when user pressed on the arrow on the right most side on client list
    setSelectedClientToView(selected);
    setSelectedClientForTask(new Set([selected]));
    setShowClientTask(true);
    setShowFooter(true && !changeView);
  };

  const handleViewClientDetails = (selected) => {
    // when user pressed on the name of the client
    setSelectedClientToView(selected);
    setShowFooter(false);
    setShowClientTask(false);
    setShowClientDetails(true);
    setShowSearchBar(false);
  };

  return (
    <div className="flex justify-between items-center h-full overflow-x-hidden">
      <Card className="w-11/12 h-min-fit px-0 py-0 drop-shadow shadow-none bg-transparent">
        <CardBody className=" pr-0 py-1">
          <div className="flex justify-between lg:justify-around gap-2 xl:gap-12">
            <div className="w-2/5 flex justify-start items-center text-lg font-bold text-black-default gap-2 lg:gap-10">
              <div className="max-w-[70px] pl-1 lg:pl-4 pr-1">
                <Avatar
                  showFallback
                  fallback={<Spinner />}
                  // src={data.company.picture}
                  src={"https://picsum.photos/200"}
                  className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 text-large"
                />
              </div>
              <Link
                href="#"
                underline="hover"
                className="text-sm md:text-md lg:text-xl font-semibold text-black-default "
                onPress={() => handleViewClientDetails(clientKey)}
              >
                {clientName?.length ? clientName : "Client Name"}
              </Link>
            </div>
            <div className="hidden w-3/5 min-[425px]:flex justify-center items-center gap-4 p-0">
              {Boolean(labelCount)
                ? Object.keys(labelCount).map((status, s_index) => {
                    if (labelCount[status] > 0) {
                      return (
                        <Button
                          key={s_index}
                          className="p-0 m-0 min-w-fit h-full bg-transparent shadow-none"
                          onPress={() => handleSelectTask()}
                        >
                          <LabelTagChip
                            key={s_index}
                            text={`${
                              status === "forReview" ? "For Review" : status
                            }`}
                            color={tagColors[status]}
                            type="tag"
                            isFilled
                            withBadge={true}
                            chipCount={labelCount[status]}
                            className={"lg:h-10"}
                            classNameLabel={
                              "text-sm lg:text-lg lg:px-1 capitalize"
                            }
                          />
                        </Button>
                      );
                    }
                  })
                : null}
            </div>
            <div className="w-1/5 flex justify-end items-center gap-2 px-1">
              {!clientProcessors?.length ? (
                <AvatarGroup>
                  <Avatar
                    isBordered={true}
                    showFallback
                    fallback={
                      <MdPerson
                        size={18}
                        className="text-white-default"
                        fill="currentColor"
                      />
                    }
                    src={null}
                    classNames={{
                      base: [
                        "bg-blue-default ring-blue-default",
                        "w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-large",
                      ],
                    }}
                  />
                </AvatarGroup>
              ) : (
                <AvatarGroup
                  max={isMobile ? 2 : 3}
                  classNames={{
                    base: "gap-1",
                    count: "w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12",
                  }}
                >
                  {clientProcessors.map((processor, index) => (
                    <Avatar
                      isBordered={true}
                      key={index}
                      showFallback
                      fallback={<Spinner />}
                      src={processor.picture}
                      classNames={{
                        base: [
                          "bg-blue-default ring-blue-default",
                          "w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-large",
                        ],
                      }}
                    />
                  ))}
                </AvatarGroup>
              )}
            </div>
          </div>
        </CardBody>
      </Card>
      <IconButton
        aria-label={"Show Client Tasks Button"}
        className="ml-2 lg:ml-0 bg-transparent w-1/12 h-18 lg:h-32"
        onPress={() => handleSelectClient(clientKey)}
      >
        <MdChevronRight size={32} />
      </IconButton>
    </div>
  );
};

export default ClientItemCard;
