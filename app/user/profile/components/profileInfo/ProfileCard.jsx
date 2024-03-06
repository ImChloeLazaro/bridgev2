import { Card, CardBody, CardHeader } from "@nextui-org/react";
import ProfileDetails from "./ProfileDetails";
import ProfileHeader from "./ProfileHeader";

const ProfileCard = () => {
  return (
    // mb-[number] for spacing between posts
    <Card className="mb-6 mx-4 bg-white-default">
      <CardHeader className="flex flex-col p-0 m-0 w-full">
        <ProfileHeader />
      </CardHeader>
      <CardBody className="flex flex-col p-0 m-0 h-[850px]">
        <ProfileDetails />
      </CardBody>
    </Card>
  );
};

export default ProfileCard;
