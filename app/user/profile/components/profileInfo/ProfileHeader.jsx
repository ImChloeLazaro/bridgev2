import React from "react";
import { MdManageAccounts } from "react-icons/md";

import { User, Image } from "@nextui-org/react";
import CTAButtons from "../../../../components/CTAButtons";

const ProfileHeader = ({ data }) => {
  return (
    <>
      <div className="m-0 p-0 w-full ">
        <div className="relative z-20">
          <Image
            src="/profile_bg.png"
            alt="Profile Banner"
            width={2000}
            radius="none"
          />
        </div>

        <div className="-mt-[7.8rem] relative z-30">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 200"
            fill="none"
          >
            <path
              d="M734.694 105.556C1067.19 134.837 1239.46 127.176 1440 0V800H0V156.944C232.727 60.7011 392.245 50.5877 734.694 105.556Z"
              fill="#f9f9f9"
            />
          </svg>
        </div>
      </div>
      <div className="w-full px-16 -mt-[6rem] relative z-40 flex justify-between items-center">
        <User
          // as="button"
          name={
            <p className="text-2xl font-extrabold text-darkgrey-hover leading-4 mb-3">
              {data.name}
            </p>
          }
          description={
            <>
              <p className="text-base font-medium text-darkgrey-hover leading-4">
                {data.position}
              </p>
              <p className="text-base font-medium text-darkgrey-hover leading-5">
                {data.email}
              </p>
            </>
          }
          avatarProps={{
            src: data.profileURL,
            className: "w-[150px] h-[150px] text-large border-8 border-white-default mb-6",
          }}
          classNames={{
            base: ["gap-6"],
            wrapper: ["my-0 py-0"],
            name: ["text-black-default", "pl-1", "text-xl font-extrabold"],
            description: [
              "pl-1.5 gap-1",
              "flex flex-col items-start font-base leading-4",
            ],
          }}
        />
        <div className="text-lg">
          <CTAButtons
            startContent={<MdManageAccounts />}
            color="orange"
            label="Edit Profile"
            size="lg"
          />
        </div>
      </div>
    </>
  );
};

export default ProfileHeader;
