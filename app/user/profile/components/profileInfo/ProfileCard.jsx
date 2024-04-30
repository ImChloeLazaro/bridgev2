import { Card, CardBody, CardHeader, cn } from "@nextui-org/react";
import ProfileDetails from "./ProfileDetails";
import ProfileHeader from "./ProfileHeader";

const ProfileCard = ({ className }) => {
  return (
    // mb-[number] for spacing between posts
    <Card
      className={cn(
        "lg:mb-6 lg:mx-4 bg-white-default",
        "rounded-none lg:rounded-xl",
        className
      )}
    >
      <CardHeader className="flex flex-col p-0 m-0 w-full">
        <ProfileHeader />
      </CardHeader>
      <CardBody className="flex flex-col p-0 m-0 h-full lg:h-[850px]">
        <ProfileDetails />
      </CardBody>
    </Card>
  );
};

export default ProfileCard;
