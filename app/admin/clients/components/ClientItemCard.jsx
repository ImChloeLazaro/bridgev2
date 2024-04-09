import IconButton from "@/app/components/IconButton";
import LabelTagChip from "@/app/components/LabelTagChip";
import {
  selectedClientToViewAtom,
  showClientDetailsAtom,
} from "@/app/store/ClientStore";
import {
  clientTaskProcessorsCountAtom,
  tasksAtom,
} from "@/app/store/TaskStore";
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
import {
  changeViewAtom,
  showClientTaskAtom,
  showFooterAtom,
  showSearchBarAtom,
} from "../store/CMSAdminStore";

const tagColors = {
  todo: "blue",
  inProgress: "orange",
  done: "green",
  forReview: "yellow",
  due: "red",
  pending: "darkgrey",
};

const ClientItemCard = ({ data }) => {
  const tasks = useAtomValue(tasksAtom);
  const setSelectedClientToView = useSetAtom(selectedClientToViewAtom);
  const setShowClientDetails = useSetAtom(showClientDetailsAtom);
  const setShowClientTask = useSetAtom(showClientTaskAtom);
  const setChangeView = useSetAtom(changeViewAtom);
  const setShowFooter = useSetAtom(showFooterAtom);
  const setShowSearchBar = useSetAtom(showSearchBarAtom);
  const clientTaskProcessorsCount = useAtomValue(clientTaskProcessorsCountAtom);

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
      setStatusCount(convertedStatusCount);
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
    setShowClientTask(true);
    // auto select processor, managers, reviewers on task form when adding task inside the client view
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
    <div className="flex justify-between items-center h-full">
      <Card className="w-11/12 h-min-fit px-0 py-0 drop-shadow shadow-none bg-transparent">
        <CardBody className=" pr-0 py-1">
          <div className="flex justify-around gap-12">
            <div className="w-1/3 flex justify-start items-center text-lg font-bold text-black-default gap-10">
              <div className="max-w-[70px] pl-4 pr-1">
                <Avatar
                  showFallback
                  fallback={<Spinner />}
                  src={data.company.picture}
                  className="w-16 h-16 text-large"
                />
              </div>
              <Link
                href="#"
                underline="hover"
                className="text-xl font-semibold text-black-default "
                onPress={() => handleViewClientDetails(data._id)}
              >
                {data.company?.name?.length ? data.company.name : ""}
              </Link>
            </div>
            <div className="w-2/3 flex flex-wrap justify-center items-center gap-4 p-0">
              {typeof statusCount !== "undefined" &&
                Object.keys(statusCount).map((status, s_index) => {
                  if (statusCount[status] > 0) {
                    return (
                      <Button
                        key={s_index}
                        className="p-0 m-0 "
                        onPress={() => handleSelectTask()}
                      >
                        <LabelTagChip
                          key={s_index}
                          text={`${status === "forReview" ? "For Review" : status}`}
                          color={tagColors[status]}
                          type="tag"
                          size="md"
                          isFilled
                          withBadge={true}
                          badgeContent={statusCount[status]}
                        />
                      </Button>
                    );
                  }
                })}
            </div>
            <div className="w-1/4 flex justify-between items-center gap-2">
              {!clientTaskProcessorsCount?.length ? (
                ""
              ) : (
                <AvatarGroup size="lg" max={3}>
                  {clientTaskProcessorsCount.map((processor, index) => (
                    <Avatar key={index} src={processor.picture} />
                    // <Avatar key={index} src={"https://picsum.photos/200"} />
                  ))}
                </AvatarGroup>
              )}
            </div>
          </div>
        </CardBody>
      </Card>
      <IconButton
        className="bg-transparent w-1/12 h-32"
        onPress={() => handleSelectClient(data._id)}
      >
        <MdChevronRight size={32} />
      </IconButton>
    </div>
  );
};

export default ClientItemCard;
