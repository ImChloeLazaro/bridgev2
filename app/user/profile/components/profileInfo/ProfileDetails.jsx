import React from "react";
import { profileTabsAtom, selectedTabAtom } from "../../store/ProfileStore";

import { Tabs, Tab, Divider, Avatar } from "@nextui-org/react";
import { useAtom, useAtomValue } from "jotai";
import { MdInfoOutline } from "react-icons/md";
import LabelTag from "../../../../components/LabelTag";

const ProfileDetails = ({ data }) => {
  const [selectedTab, setSelectedTab] = useAtom(selectedTabAtom);
  const profileTabs = useAtomValue(profileTabsAtom);

  return (
    <div className="px-16">
      <Tabs
        key="Profile Navigation"
        selectedKey={selectedTab}
        onSelectionChange={setSelectedTab}
        aria-label="Profile Navigation"
        variant="underlined"
        classNames={{
          base: "py-0 ",
          tabList: "gap-8 w-full relative rounded-none p-0 ",
          tab: "max-w-fit px-0 h-12 ",
          tabContent:
            "group-data-[selected=true]:text-blue-default group-data-[selected=true]:font-extrabold font-medium text-base text-black-default/90",
          cursor: "w-full bg-blue-default",
        }}
      >
        {profileTabs.map((tab) => {
          return (
            <Tab
              key={tab.key}
              title={<p className="capitalize">{tab.title}</p>}
            />
          );
        })}
      </Tabs>
      <Divider />
      {/* // ### EMPLOYEE INFORMATION*/}
      <div className="mt-2 mb-12 py-2 w-full">
        <div className="flex justify-start items-center gap-2 mb-5">
          <p className="font-bold text-lg">{"Employee Information"}</p>
          <MdInfoOutline />
        </div>

        {/* // ### LIST */}
        <div className="flex flex-col items-start gap-4 ">
          {/* // ### ID Number */}
          <div className="flex justify-start items-center gap-10 w-3/5">
            <div className="flex-col w-1/2">
              <p className="font-medium text-base">{"ID Number"}</p>
              <p className="font-medium text-sm text-darkgrey-default">
                {"This is your employee ID"}
              </p>
            </div>
            <p className="">{data.id}</p>
          </div>

          {/* // ### STATUS */}
          <div className="flex justify-start items-center gap-10 w-3/5">
            <p className="font-medium text-base w-1/2">{"Status"}</p>
            <LabelTag text={"Active"} color={"green"} />
          </div>

          {/* // ### REGULARIZATION */}
          <div className="flex justify-start items-center gap-10 w-3/5">
            <div className="flex-col w-1/2">
              <p className="font-medium text-base">{"Regularization"}</p>
              <p className="font-medium text-sm text-darkgrey-default">
                {"6 months after your start date"}
              </p>
            </div>
            <p className="">{"October 31, 2023"}</p>
          </div>

          {/* // ### IMMEDIATE HEAD */}
          <div className="flex justify-start items-center gap-10 w-3/5">
            <p className="font-medium text-base w-1/2">{"Immediate Head"}</p>
            <div className="flex items-center gap-2">
              <Avatar
                radius="full"
                size="md"
                src="/Madelyn Septimus.png"
                alt="Supervisor Profile picture"
              ></Avatar>
              <p className="">{data.supervisor}</p>
            </div>
          </div>
        </div>
      </div>

      {/* // ### PERSONAL INFORMATION*/}
      <div className="mt-2 mb-12 py-2 w-full">
        <div className="flex justify-start items-center gap-2 mb-5">
          <p className="font-bold text-lg">{"Personal Information"}</p>
          <MdInfoOutline />
        </div>

        {/* // ### LIST */}
        <div className="flex flex-col items-start gap-4">
          {/* // ### ADDRESS */}
          <div className="flex justify-start items-center gap-10 w-3/5">
            <div className="flex-col w-1/2">
              <p className="font-medium text-base">{"Address"}</p>
              <p className="font-medium text-sm text-darkgrey-default">
                {"This is your current address"}
              </p>
            </div>
            <p className="">{"105 Jerry Dove Drive, Florence, SC 29501"}</p>
          </div>

          {/* // ### CONTACT NUMBER */}
          <div className="flex justify-start items-center gap-10 w-3/5">
            <div className="flex-col w-1/2">
              <p className="font-medium text-base">{"Contact Number"}</p>
              <p className="font-medium text-sm text-darkgrey-default">
                {"This is your current  contact number"}
              </p>
            </div>
            <p className="">{"(765) 322-1399"}</p>
          </div>

          {/* // ### Birthday */}
          <div className="flex justify-start items-center gap-10 w-3/5">
            <div className="flex-col w-1/2">
              <p className="font-medium text-base ">{"Birthday"}</p>
            </div>
            <p className="">{"October 4, 2001"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
