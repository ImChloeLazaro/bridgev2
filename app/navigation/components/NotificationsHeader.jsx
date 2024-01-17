import React from "react";
import { Tabs, Tab, Chip } from "@nextui-org/react";
import { Switch, Button, cn } from "@nextui-org/react";
import { BiDotsVerticalRounded } from "react-icons/bi";

import { useAtom } from "jotai";
import {
  showUnreadAtom,
  notificationTypeAtom,
  notificationsTabsAtom,
} from "../store/NotificationsStore";

const NotificationsHeader = () => {
  const [showUnread, setShowUnread] = useAtom(showUnreadAtom);
  const [notificationType, setNotificationType] = useAtom(notificationTypeAtom);
  const [notificationsTabs] = useAtom(notificationsTabsAtom);

  return (
    <div className="flex flex-col pt-1 px-1">
      <div className="flex items-center justify-between pl-4 pt-1 pb-0">
        <p className="font-extrabold text-xl">Notifications</p>
        <div className="flex items-center mr-1">
          <Switch
            isSelected={showUnread}
            onValueChange={setShowUnread}
            classNames={{
              base: cn(
                "inline-flex flex-row-reverse w-full max-w-md gap-2 p-0 ",
                " bg-transparent hover:bg-transparent items-center",
                "justify-between cursor-pointer rounded-lg border-2 border-transparent"
              ),
              wrapper: [
                "p-0 h-4 w-12 overflow-visible",
                "bg-red-default group-data-[selected=true]:bg-green-default",
              ],
              thumb: cn(
                "w-6 h-6 border-2 shadow-lg",
                //selected
                "group-data-[selected=true]:ml-6",
                "group-data-[selected=true]:border-green-default",
                // pressed
                "group-data-[pressed=true]:w-7",
                "group-data-[selected]:group-data-[pressed]:ml-4"
              ),
              label: ["text-xs"],
            }}
          >
            <p className="font-bold">Only show unread</p>
          </Switch>
          <Button isIconOnly className="bg-transparent p-0">
            <BiDotsVerticalRounded size={16} />
          </Button>
        </div>
      </div>
      <Tabs
        selectedKey={notificationType}
        onSelectionChange={setNotificationType}
        aria-label="Notifications Options"
        variant="underlined"
        classNames={{
          base: "pl-4 py-0 ",
          tabList: "gap-6 w-full relative rounded-none p-0 ",
          tab: "max-w-fit px-0 h-12 ",
          tabContent:
            "group-data-[selected=true]:text-orange-default text-black-default/90",
          cursor: "w-full bg-orange-default",
        }}
      >
        {notificationsTabs.map((tab) => (
          <Tab
            key={tab.key}
            title={
              <div className="flex items-center space-x-2">
                <span className="font-bold">{tab.title}</span>
                {tab.count > 0 && (
                  <Chip
                    radius="full"
                    size="sm"
                    variant="flat"
                    className="group-data-[selected=true]:text-orange-default"
                  >
                    {tab.count}
                  </Chip>
                )}
              </div>
            }
          />
        ))}
      </Tabs>
    </div>
  );
};

export default NotificationsHeader;
