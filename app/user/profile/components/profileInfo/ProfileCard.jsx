import React from "react";

import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";
import ProfileHeader from "./ProfileHeader";
import ProfileDetails from "./ProfileDetails";

const ProfileCard = ({ data }) => {
  return (
    // mb-[number] for spacing between posts
    <Card className="mb-6 mx-4 bg-white-default">
      <CardHeader className="flex flex-col p-0 m-0 w-full">
        <ProfileHeader data={data} />
      </CardHeader>
      <CardBody className="flex flex-col p-0 m-0 h-fit">
        {/* <div className=""> */}

        <ProfileDetails data={data} />
        {/* </div> */}
      </CardBody>
    </Card>
  );
};

export default ProfileCard;
