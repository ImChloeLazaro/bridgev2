import IconButton from "@/app/components/IconButton";
import LabelTagChip from "@/app/components/LabelTagChip";
import {
  selectedClientToViewAtom,
  showClientDetailsAtom,
} from "@/app/store/ClientStore";
import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardBody,
  Image,
} from "@nextui-org/react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { MdChevronRight } from "react-icons/md";
import { changeViewAtom, showClientTaskAtom } from "../store/CMSAdminStore";
import {
  clientTaskProcessorsCountAtom,
  fetchStatusCountAtom,
  // clientTaskStatusCountAtom,
  statusCountAtom,
  tasksAtom,
  taskStatusCountAtom,
} from "@/app/store/TaskStore";
import { Spinner } from "@nextui-org/react";
import { Suspense, useEffect, useMemo, useState } from "react";

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
  const setShowClientTask = useSetAtom(showClientTaskAtom);
  const setChangeView = useSetAtom(changeViewAtom);
  const fetchStatusCount = useSetAtom(fetchStatusCountAtom);
  // const clientTaskStatusCount = useSetAtom(clientTaskStatusCountAtom);

  console.log("data", data);
  const clientTaskProcessorsCount = useAtomValue(clientTaskProcessorsCountAtom);
  const statusCount = useAtomValue(statusCountAtom);

  // const [selectedClient, setSelectedClient] = useState(
  //   clientTaskStatusCount(data._id)
  // );
  // const selectedClient = clientTaskStatusCount(data._id);
  useEffect(() => {
    fetchStatusCount(data._id);
  }, [data._id, fetchStatusCount]);

  // console.log("selectedClient", selectedClient);

  // let statusCount = {
  //   pending: 0,
  //   todo: 0,
  //   done: 0,
  //   forReview: 0,
  // };

  // statusCount = selectedClient?.reduce(
  //   (acc, curr) => {
  //     return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
  //   },
  //   {
  //     pending: 0,
  //     todo: 0,
  //     done: 0,
  //     forReview: 0,
  //   }
  // );

  console.log("statusCount: ", statusCount);

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
              {data.company.name}
            </div>
            <div className="w-2/3 flex flex-wrap justify-center items-center gap-4 p-0">
              {Object.keys(statusCount).map((status, s_index) => {
                if (statusCount[status] > 0) {
                  return (
                    // <Suspense
                    //   key={s_index}
                    //   fallback={
                    //     <div className="w-full flex justify-center items-center">
                    //       {"LOADING"}
                    //     </div>
                    //   }
                    // >
                    <Button
                      key={s_index}
                      className="p-0 m-0 "
                      onPress={() => handleSelectTask()}
                    >
                      <LabelTagChip
                        key={s_index}
                        text={`${status}`}
                        color={tagColors[status]}
                        type="tag"
                        size="md"
                        isFilled
                        withBadge={true}
                        badgeContent={statusCount[status]}
                      />
                    </Button>
                    // </Suspense>
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
                    // <Avatar key={index} src={processor.picture} />
                    <Avatar key={index} src={"https://picsum.photos/200"} />
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
