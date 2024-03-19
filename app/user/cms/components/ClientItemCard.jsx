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

const tagColors = {
  todo: "blue",
  inProgress: "orange",
  done: "green",
  forReview: "yellow",
  due: "red",
  pending: "darkgrey",
};
import { useAtom, useSetAtom } from "jotai";
import { MdChevronRight } from "react-icons/md";
import { changeViewAtom, showClientTaskAtom } from "../store/CMSStore";

const ClientItemCard = ({ data }) => {
  const setSelectedClientToView = useSetAtom(selectedClientToViewAtom);
  const setShowClientDetails = useSetAtom(showClientDetailsAtom);
  const [showClientTask, setShowClientTask] = useAtom(showClientTaskAtom);
  const [changeView, setChangeView] = useAtom(changeViewAtom);

  const handleSelectTask = (status) => { // when user pressed on the tags on client list
    handleSelectClient(data.key);
    setChangeView(true);
    console.log("CLIENT TYPE STATUS", status);
  };
  const handleSelectClient = (selected) => { // when user pressed on the arrow on the right most side on client list
    setSelectedClientToView(selected);
    setShowClientTask(true);

    console.log("CLIENT SELECTED", selected);
  };

  return (
    <div className="flex justify-between items-center h-full">
      <Card className="w-11/12 h-min-fit px-0 py-0 drop-shadow shadow-none bg-transparent">
        <CardBody className=" pr-0 py-1">
          <div className="flex justify-around gap-12">
            <div className="w-1/3 flex justify-start items-center text-lg font-bold text-black-default gap-10">
              <div className="">
                <Image
                  src="/image-placeholder.png"
                  alt="Image Placeholder"
                  width={80}
                  radius={"none"}
                  loading={"lazy"}
                />
              </div>
              {data.name}
            </div>
            <div className="w-2/3 flex flex-wrap justify-start items-center gap-4 p-0">
              {Object.keys(data.status).map((status, s_index) => {
                if (data.status[status].count > 0) {
                  return (
                    <Button
                      key={s_index}
                      className="p-0 m-0 "
                      onPress={() => handleSelectTask(status)}
                    >
                      <LabelTagChip
                        key={s_index}
                        text={`${data.status[status].label}`}
                        color={tagColors[status]}
                        type="tag"
                        size="md"
                        isFilled
                        withBadge={true}
                        badgeContent={data.status[status].count}
                      />
                    </Button>
                  );
                }
              })}
            </div>
            <div className="w-1/4 flex justify-between items-center gap-2">
              {data.assignedUsers ?? "No one is assigned "}
              <AvatarGroup size="lg" max={4} total={10}>
                <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
                <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
                <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
              </AvatarGroup>
            </div>
          </div>
        </CardBody>
      </Card>
      <IconButton
        className="bg-transparent w-1/12 h-32"
        onPress={() => handleSelectClient(data.key)}
      >
        <MdChevronRight size={32} />
      </IconButton>
    </div>
  );
};

export default ClientItemCard;
