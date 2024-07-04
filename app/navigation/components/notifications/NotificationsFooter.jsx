import { Button } from "@nextui-org/react";

const NotificationsFooter = ({
  onOpen,
  notificationCount,
  setNotificationsOpen,
  markAllAsRead,
}) => {
  const handleOpenNotificationHistory = () => {
    setNotificationsOpen(false);
    onOpen();
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
