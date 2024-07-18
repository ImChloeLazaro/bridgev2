import CTAButtons from "@/app/components/CTAButtons";
import { userAtom } from "@/app/store/UserStore";
import { Avatar, Divider } from "@nextui-org/react";
import { useAtomValue } from "jotai";
import { MdInfoOutline } from "react-icons/md";

const ProfileInfo = () => {
  const user = useAtomValue(userAtom);

  return (
    <>
      {/* // ### UPDATE SETTINGS */}
      <div className="mt-2 mb-8 lg:mb-12 py-2 w-full ">
        <div className="flex-col justify-start items-center gap-2 mb-12">
          <div className="flex gap-2 items-center">
            <p className="font-bold text-lg">{"Profile Settings"}</p>
            <MdInfoOutline />
          </div>
          <p className="font-medium text-sm text-darkgrey-default">
            {"Update your profile photo and other details"}
          </p>
        </div>

        {/* // ### LIST */}
        <div className="flex flex-col items-start gap-4 ">
          {/* // ### PROFILE PHOTO */}
          <div className="flex justify-start items-center gap-2 lg:gap-10 w-full">
            <div className="flex-col w-1/2 md:w-1/3">
              <p className="font-medium text-base">{"Your Photo"}</p>
              <p className="font-medium text-sm text-darkgrey-default">
                {"This will be displayed on your profile"}
              </p>
            </div>
            <div className="px-2 w-1/2 md:w-2/3 flex justify-end md:gap-16 items-center">
              <Avatar
                radius="full"
                size="md"
                src={user.picture}
                alt="Profile picture"
              />
              <div className="hidden flex-col md:flex md:flex-row md:gap-6">
                <CTAButtons label="Delete" color="clear" disableRipple />
                <CTAButtons label="Update" color="clear" disableRipple />
              </div>
            </div>
          </div>
          <Divider />
          {/* // ### HEADER PHOTO */}
          <div className="flex justify-start items-center gap-2 lg:gap-10 w-full">
            <div className="flex-col w-1/2 md:w-1/3">
              <p className="font-medium text-base">{"Header Photo"}</p>
              <p className="font-medium text-sm text-darkgrey-default">
                {"This will be displayed on your profile"}
              </p>
            </div>
            <div className="px-2 w-1/2 md:w-2/3 flex justify-end md:gap-16 items-center">
              <Avatar
                radius="full"
                size="md"
                src="/header-profile.png"
                alt="Header picture"
              />
              <div className="hidden flex-col md:flex md:flex-row md:gap-6">
                <CTAButtons
                  label="Delete"
                  color="clear"
                  size="sm"
                  disableRipple
                />
                <CTAButtons
                  label="Update"
                  color="clear"
                  size="sm"
                  disableRipple
                />
              </div>
            </div>
          </div>
          <Divider />
        </div>
      </div>
    </>
  );
};

export default ProfileInfo;
