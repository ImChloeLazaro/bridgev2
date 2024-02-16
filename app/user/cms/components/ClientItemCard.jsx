import ChipTag from "@/app/components/ChipTag";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";

const tagColors = {
  todo: "blue",
  inProgress: "orange",
  done: "green",
  forReview: "yellow",
  due: "red",
};

// ### TODO Fix label to have space, rewrite atom for this component

const ClientItemCard = ({ data }) => {
  return (
    <Card className="w-full h-min-fit px-2 py-1.5 drop-shadow shadow-none bg-white-default">
      <CardBody className="w-full">
        <div className="flex justify-around gap-12">
          <div className="w-1/3 bg-white-default text-lg font-bold text-black-default">
            {data.name}
          </div>
          <div className="w-1/3 bg-white-default flex flex-wrap justify-start items-start gap-4">
            {Object.keys(data.status).map((status, s_index) => (
              <ChipTag
                key={s_index}
                text={`${status}`}
                color={tagColors[status]}
                size="md"
                isFilled
                withBadge={true}
                badgeContent={data.status[status]}
              />
            ))}
          </div>
          <div className="w-1/3 bg-white-default">
            {data.assignedUsers ?? "No one is assigned "}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default ClientItemCard;
