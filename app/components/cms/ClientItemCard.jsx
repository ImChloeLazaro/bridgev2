import IconButton from "@/app/components/IconButton";
import LabelTagChip from "@/app/components/LabelTagChip";
import { tasksAtom } from "@/app/store/TaskStore";
import { userAtom } from "@/app/store/UserStore";
import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardBody,
  Link,
  Spinner,
} from "@nextui-org/react";
import { compareAsc } from "date-fns";
import { useAtomValue } from "jotai";
import { useEffect, useMemo, useState } from "react";
import { MdAdd, MdChevronRight, MdPerson } from "react-icons/md";

const tagColors = {
  todo: "blue",
  done: "green",
  forReview: "yellow",
  pending: "darkgrey",
  escalation: "red",
  overdue: "orange",
};

const ClientItemCard = ({
  client,
  taskStatusCount,
  setShowClientTask,
  changeView,
  setChangeView,
  setShowFooter,
  setShowSearchBar,
  setSelectedClientToView,
  setShowClientDetails,
}) => {
  const customBreakPoint = "1023";
  const [isMobile, setIsMobile] = useState(
    window.matchMedia(`(max-width: ${customBreakPoint}px)`).matches
  );

  const tasks = taskStatusCount;

  const clientProcessors =
    tasks
      .filter((task) => task.client_id === client.key)
      .map((task) => task.processor)
      .flat() ?? [];

  const clientReviewers =
    tasks
      .filter((task) => task.client_id === client.key)
      .map((task) => task.reviewer)
      .flat() ?? [];

  const clientManager =
    tasks
      .filter((task) => task.client_id === client.key)
      .map((task) => task.manager)
      .flat() ?? [];

  const assignees = [
    ...clientProcessors,
    ...clientReviewers,
    ...clientManager,
  ].filter(
    (obj1, i, arr) =>
      // arr.findIndex((obj2) => obj2._id === obj1._id) === i ||
      arr.findIndex((obj2) => obj2.sub === obj1.sub) === i
  );

  // const isReviewer = (user) => {
  //   let reviewer = clientReviewers.filter(
  //     (reviewer) => reviewer.sub === user.sub
  //   );
  //   return Boolean(reviewer?.length);
  // };

  const labelCount = useMemo(() => {
    let overdueCount = tasks
      .filter((task) => task.client_id === client.key)
      .filter(
        (sla) =>
          compareAsc(new Date(sla.duration.end.slice(0, -1)), new Date()) < 0 &&
          sla.status === "todo"
      ).length;
    let escalateCount = tasks
      .filter((task) => task.client_id === client.key)
      .filter((sla) => sla?.escalate).length;
    let statusCount = tasks
      .filter((task) => task.client_id === client.key)
      .map((sla) => sla?.status)
      .reduce(
        (acc, curr) => {
          return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
        },
        {
          todo: 0,
          forReview: 0,
          pending: 0,
          done: 0,
        }
      );

    if (
      Boolean(statusCount) ||
      Boolean(escalateCount) ||
      Boolean(overdueCount)
    ) {
      return {
        escalation: escalateCount,
        overdue: overdueCount,
        ...statusCount,
      };
    } else {
      return {
        escalation: 0,
        overdue: 0,
        todo: 0,
        forReview: 0,
        pending: 0,
        done: 0,
      };
    }
  }, [client.key, tasks]);

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
    handleSelectClient(client.key);
    setChangeView(true);
    setShowFooter(false);
  };
  const handleSelectClient = () => {
    // when user pressed on the arrow on the right most side on client list
    setSelectedClientToView(client.key);
    setShowClientTask(true);
    setChangeView(false);
    setShowFooter(true && !changeView);
  };

  const handleViewClientDetails = () => {
    // when user pressed on the name of the client
    setSelectedClientToView(client.key);
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
                onPress={() => handleViewClientDetails()}
              >
                {client.name?.length ? client.name : "Client Name"}
              </Link>
            </div>
            <div className="hidden w-3/5 min-[425px]:flex justify-center items-center gap-4 p-0">
              {Boolean(labelCount)
                ? Object.keys(labelCount).map((status, s_index) => {
                    if (labelCount[status] > 0) {
                      if (isMobile) {
                        if (s_index <= 1) {
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
                                isFilled={true}
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
                        if (s_index == 2) {
                          return (
                            <Button
                              key={s_index}
                              className="p-0 m-0 min-w-fit h-full bg-transparent shadow-none"
                              onPress={() => handleSelectTask()}
                            >
                              <LabelTagChip
                                key={s_index}
                                text={"Others"}
                                color={"darkgrey"}
                                isFilled={true}
                                withBadge={true}
                                chipCount={
                                  labelCount["todo"] +
                                  labelCount["forReview"] +
                                  labelCount["pending"] +
                                  labelCount["done"]
                                }
                                startContent={<MdAdd />}
                                className={"lg:h-10"}
                                classNameLabel={
                                  "text-sm lg:text-lg lg:px-1 capitalize"
                                }
                              />
                            </Button>
                          );
                        }
                      } else {
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
                    }
                  })
                : null}
            </div>
            <div className="w-1/5 flex justify-end items-center gap-2 px-1">
              {!assignees?.length ? (
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
                  max={isMobile ? 2 : 10}
                  classNames={{
                    base: "gap-1",
                    count: "w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12",
                  }}
                >
                  {assignees.map((processor, index) => (
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
        onPress={() => handleSelectClient()}
      >
        <div className="ml-0 hover:ml-6 transition-all duration-200 ease-in-out">
          <MdChevronRight size={32} />
        </div>
      </IconButton>
    </div>
  );
};

export default ClientItemCard;
