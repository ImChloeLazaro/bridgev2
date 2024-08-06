import { Spinner, Tab, Tabs } from "@nextui-org/react";
import { useAtom, useAtomValue } from "jotai";
import {
  profileTabsAtom,
  selectedProfileTabAtom,
} from "../../store/ProfileStore";
import AboutInfo from "./AboutInfo";
import ClientsInfo from "./ClientsInfo";
import ProfileInfo from "./ProfileInfo";
import TeamInfo from "./TeamInfo";
import { Suspense } from "react";

const ProfileDetails = () => {
  const [selectedProfileTab, setSelectedProfileTab] = useAtom(
    selectedProfileTabAtom
  );
  const profileTabs = useAtomValue(profileTabsAtom);

  return (
    <>
      <div className="`relative z-10 md:px-4 lg:px-8 my-2 lg:my-6 overflow-y-auto bg-white-default">
        <Tabs
          key="Profile Navigation"
          selectedKey={selectedProfileTab}
          onSelectionChange={setSelectedProfileTab}
          aria-label="Profile Navigation"
          variant="underlined"
          className="ml-4"
          classNames={{
            base: "py-0 sticky top-0 bg-white-default",
            tabList: "gap-8 w-full relative rounded-none p-0",
            tab: "max-w-fit px-0 h-12 bg-white-default",
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
                  {selectedProfileTab === "about" && (
                    <Suspense
                      fallback={
                        <Spinner
                          className="h-full w-full flex items-center justify-center"
                          label="Loading User Information..."
                        />
                      }
                    >
                      <AboutInfo />
                    </Suspense>
                  )}
                  {selectedProfileTab === "profile" && (
                    <Suspense
                      fallback={
                        <Spinner
                          className="h-full w-full flex items-center justify-center"
                          label="Loading Profile Information..."
                        />
                      }
                    >
                      <ProfileInfo />
                    </Suspense>
                  )}
                  {selectedProfileTab === "clients" && (
                    <Suspense
                      fallback={
                        <Spinner
                          className="h-full w-full flex items-center justify-center"
                          label="Loading Client Information..."
                        />
                      }
                    >
                      <ClientsInfo />
                    </Suspense>
                  )}
                  {selectedProfileTab === "team" && (
                    <Suspense
                      fallback={
                        <Spinner
                          className="h-full w-full flex items-center justify-center"
                          label="Loading Team Information..."
                        />
                      }
                    >
                      <TeamInfo />
                    </Suspense>
                  )}
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
