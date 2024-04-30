import { Button, useDisclosure } from "@nextui-org/react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { notificationCountAtom } from "../../store/NotificationsStore";
import NotificationsHistory from "./NotificationsHistory";

const NotificationsFooter = ({ setNotificationsOpen, markAllAsRead }) => {
  const notificationCount = useAtomValue(notificationCountAtom);
  const { isOpen, onOpen: onOpenNotification, onOpenChange } = useDisclosure();

  const handleOpenNotificationHistory = () => {
    onOpenNotification();
    setNotificationsOpen(false);
  };

  return (
    <div className="flex flex-col pt-1">
      <div className="flex items-center justify-between mx-4 py-0 px-3 pt-2 pb-0 border-t-2 border-black-default/70">
        <Button
          variant="light"
          disableRipple={true}
          disableAnimation={true}
          className="py-0 bg-transparent data-[hover=true]:bg-transparent"
          onPress={() => handleOpenNotificationHistory()}
        >
          <p className="font-extrabold text-md hover:underline hover:underline-offset-2">
            {"See All Notifications"}
          </p>
        </Button>
        <NotificationsHistory isOpen={isOpen} onOpenChange={onOpenChange} />
        <Button
          variant="light"
          isDisabled={notificationCount === 0}
          disableRipple={true}
          disableAnimation={true}
          className="py-0 bg-transparent data-[hover=true]:bg-transparent"
          onPress={() => markAllAsRead()}
        >
          <p className="font-extrabold text-md hover:underline hover:underline-offset-2">
            {"Mark All as Read"}
          </p>
        </Button>
      </div>
    </div>
  );
};

export default NotificationsFooter;
