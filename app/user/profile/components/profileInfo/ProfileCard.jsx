import { Card, CardBody, CardHeader } from "@nextui-org/react";
import ProfileDetails from "./ProfileDetails";
import ProfileHeader from "./ProfileHeader";
import { profileAtom } from "../../store/ProfileStore";
import { useAtomValue } from "jotai";

const ProfileCard = () => {
  const profile = useAtomValue(profileAtom)
  return (
    // mb-[number] for spacing between posts
    <Card className="mb-6 mx-4 bg-white-default">
      <CardHeader className="flex flex-col p-0 m-0 w-full">
        <ProfileHeader data={profile} />
      </CardHeader>
      <CardBody className="flex flex-col p-0 m-0 h-[850px]">
        <ProfileDetails data={profile} />
      </CardBody>
    </Card>
  );
};

export default ProfileCard;
