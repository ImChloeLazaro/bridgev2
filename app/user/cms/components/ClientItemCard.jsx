import IconButton from "@/app/components/IconButton";
import LabelTagChip from "@/app/components/LabelTagChip";
import { selectedClientToViewAtom } from "@/app/store/ClientStore";
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
import { useSetAtom } from "jotai";
import { MdChevronRight } from "react-icons/md";

const ClientItemCard = ({ data }) => {
  const setSelectedClientToView = useSetAtom(selectedClientToViewAtom);

  const handleClientTask = (status) => {
    console.log("CLIENT TYPE STATUS", status);
  };
  const handleSelectClient = (selected) => {
    setSelectedClientToView(selected);
    
    console.log("CLIENT SELECTED", selected);
  };

  return (
    <div className="flex justify-between items-center h-full">
      <Card className="w-11/12 h-min-fit px-0 py-0 drop-shadow shadow-none bg-transparent">
        <CardBody className=" pr-0 py-0">
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
              {Object.keys(data.status).map((status, s_index) => (
                <Button
                  key={s_index}
                  className="p-0 m-0 "
                  onPress={() => handleClientTask(status)}
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
              ))}
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
