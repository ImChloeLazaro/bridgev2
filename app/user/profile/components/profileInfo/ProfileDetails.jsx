import { Divider, Tab, Tabs } from "@nextui-org/react";
import { useAtom, useAtomValue } from "jotai";
import { profileTabsAtom, selectedTabAtom } from "../../store/ProfileStore";
import AboutInfo from "./AboutInfo";
import ClientsInfo from "./ClientsInfo";
import ProfileInfo from "./ProfileInfo";
import TeamInfo from "./TeamInfo";

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
      {selectedTab === "about" && <AboutInfo data={data} />}
      {selectedTab === "profile" && <ProfileInfo data={data} />}
      {selectedTab === "clients" && <ClientsInfo data={data} />}
      {selectedTab === "team" && <TeamInfo data={data} />}
    </div>
  );
};

export default ProfileDetails;
