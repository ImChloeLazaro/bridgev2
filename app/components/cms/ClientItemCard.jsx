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
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { MdChevronRight } from "react-icons/md";

const tagColors = {
  todo: "blue",
  done: "green",
  forReview: "yellow",
  pending: "darkgrey",
};

const ClientItemCard = ({
  data,
  setShowClientTask,
  setChangeView,
  setShowFooter,
  setShowSearchBar,
  setSelectedClientToView,
  setSelectedClientForTask,
  setShowClientDetails,
}) => {
  const tasks = useAtomValue(tasksAtom);
  const clientTaskProcessorsCount = tasks.filter(
    (task) => task.client.client_id === data._id
  )[0]?.processor;

  const [statusCount, setStatusCount] = useState({
    pending: 0,
    todo: 0,
    done: 0,
    forReview: 0,
  });

  useEffect(() => {
    const updatedStatusCount = tasks.filter(
      (task) => task.client.client_id === data._id
    )[0];

    if (typeof updatedStatusCount !== "undefined") {
      const convertedStatusCount = updatedStatusCount.sla
        .map((sla) => sla.status)
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
      setStatusCount(
        Object.fromEntries(
          Object.entries(convertedStatusCount).sort(([, a], [, b]) => b - a)
        )
      );
    }
  }, [data._id, tasks]);

  const handleSelectTask = () => {
    // when user pressed on the tags on client list
    handleSelectClient(data._id);
    setChangeView(true);
  };
  const handleSelectClient = (selected) => {
    // when user pressed on the arrow on the right most side on client list
    setSelectedClientToView(selected);
    setSelectedClientForTask(selected);
    setShowClientTask(true);
  };

  const handleViewClientDetails = (selected) => {
    // when user pressed on the name of the client
    setSelectedClientToView(selected);
    setSelectedClientForTask(selected);
    setShowFooter(false);
    setShowClientTask(false);
    setShowClientDetails(true);
    setShowSearchBar(false);
  };

  return (
    <div className="flex justify-between items-center h-full">
      <Card className="w-11/12 h-min-fit px-0 py-0 drop-shadow shadow-none bg-transparent">
        <CardBody className=" pr-0 py-1">
          <div className="flex justify-between lg:justify-around gap-4 lg:gap-12">
            <div className="w-1/3 flex justify-start items-center text-lg font-bold text-black-default gap-2 lg:gap-10">
              <div className="max-w-[70px] pl-1 lg:pl-4 pr-1">
                <Avatar
                  showFallback
                  fallback={<Spinner />}
                  src={data.company.picture}
                  className="w-10 lg:w-16 h-10 lg:h-16 text-large"
                />
              </div>
              <Link
                href="#"
                underline="hover"
                className="text-sm md:text-md lg:text-xl font-semibold text-black-default "
                onPress={() => handleViewClientDetails(data._id)}
              >
                {data.company?.name?.length ? data.company.name : ""}
              </Link>
            </div>
            <div className=" w-1/3 flex flex-wrap justify-center items-center gap-4 p-0">
              {typeof statusCount !== "undefined" &&
                Object.keys(statusCount).map((status, s_index) => {
                  if (
                    statusCount[status] > 0 &&
                    Object.keys(tagColors).includes(status)
                  ) {
                    return (
                      <Button
                        key={s_index}
                        className="p-0 m-0 h-6 lg:h-10 bg-transparent shadow-none"
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
                          badgeContent={statusCount[status]}
                          className={"h-6 lg:h-10 py-2"}
                          classNameContent={"text-sm lg:text-md"}
                        />
                      </Button>
                    );
                  }
                })}
            </div>
            <div className="w-1/3 flex justify-end items-center gap-2 px-1">
              {!clientTaskProcessorsCount?.length ? (
                ""
              ) : (
                <AvatarGroup max={3}>
                  {clientTaskProcessorsCount.map((processor, index) => (
                    <Avatar
                      isBordered={true}
                      key={index}
                      showFallback
                      fallback={<Spinner />}
                      src={processor.picture}
                      classNames={{
                        base: [
                          "bg-blue-default ring-blue-default",
                          " w-10 h-10 lg:w-12 lg:h-12 text-large",
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
        onPress={() => handleSelectClient(data._id)}
      >
        <MdChevronRight size={32} />
      </IconButton>
    </div>
  );
};

export default ClientItemCard;
