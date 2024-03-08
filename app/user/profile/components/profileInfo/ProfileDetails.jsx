import { Divider, Tab, Tabs } from "@nextui-org/react";
import { useAtom, useAtomValue } from "jotai";
import {
  profileTabsAtom,
  selectedProfileTabAtom,
} from "../../store/ProfileStore";
import AboutInfo from "./AboutInfo";
import ClientsInfo from "./ClientsInfo";
import ProfileInfo from "./ProfileInfo";
import TeamInfo from "./TeamInfo";

const ProfileDetails = () => {
  const [selectedProfileTab, setSelectedProfileTab] = useAtom(
    selectedProfileTabAtom
  );
  const profileTabs = useAtomValue(profileTabsAtom);

  return (
    <>
      <div className="relative z-50 px-16 my-6 overflow-y-auto">
        <Tabs
          key="Profile Navigation"
          selectedKey={selectedProfileTab}
          onSelectionChange={setSelectedProfileTab}
          aria-label="Profile Navigation"
          variant="underlined"
          classNames={{
            base: "py-0 sticky top-0 bg-white-default",
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
              >
                <div className="mt-2">
                  {selectedProfileTab === "about" && <AboutInfo />}
                  {selectedProfileTab === "profile" && <ProfileInfo />}
                  {selectedProfileTab === "clients" && <ClientsInfo />}
                  {selectedProfileTab === "team" && <TeamInfo />}
                </div>
              </Tab>
            );
          })}
        </Tabs>
      </div>
    </>
  );
};

export default ProfileDetails;
