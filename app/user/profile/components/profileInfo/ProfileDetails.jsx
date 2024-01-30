import React from "react";
import { profileTabsAtom, selectedTabAtom } from "../../store/ProfileStore";

import { Tabs, Tab, Divider } from "@nextui-org/react";
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
      <div className="my-2 py-2">
        <div className="flex justify-start items-center gap-1">
          <p className="font-bold text-lg">Employee Information</p>
          <MdInfoOutline />
        </div>

        {/* // ### IMMEDIATE HEAD */}
        <div className="flex flex-col justify-start items-start gap-1">
          <div className="flex justify-center items-center">
            <div className="flex-col">
              <p className="font-medium text-base">ID Number</p>
              <p className="font-medium text-sm">This is your employee ID</p>
            </div>
            <p className="">{data.id}</p>
          </div>

          {/* // ### STATUS */}
          <div className="flex justify-center items-center">
            <p className="font-medium text-base">Status</p>
            <LabelTag text={"Active"} color={"green"} />
          </div>

          {/* // ### REGULARIZATION */}
          <div className="flex justify-center items-center">
            <div className="flex-col">
              <p className="font-medium text-base">Regularization</p>
              <p className="font-medium text-sm">
                6 months after your start date
              </p>
            </div>
            <p className="">{"October 31,2023"}</p>
          </div>

          {/* // ### IMMEDIATE HEAD */}
          <div className="flex justify-center items-center">
            <p className="font-medium text-base">Immediate Head</p>
            <div className="flex-col">
              <p className="">{data.supervisor}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="my-2 py-2">
        <div className="flex justify-start items-center gap-1">
          <p className="font-bold text-lg">{}</p>
          <MdInfoOutline />
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
