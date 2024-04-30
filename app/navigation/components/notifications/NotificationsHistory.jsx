import {
  Button,
  Listbox,
  ListboxItem,
  ListboxSection,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  format,
} from "date-fns";
import { useAtomValue } from "jotai";
import { notificationsAtom } from "../../store/NotificationsStore";
// @refresh reset

const NotificationsHistory = () => {
  const { isOpen, onOpen: onOpenNotification, onOpenChange } = useDisclosure();

  const notifications = useAtomValue(notificationsAtom);

  const filteredTodayNotifications = notifications.filter((notification) => {
    const datetime = notification.createdBy;
    const notificationDateTime =
      datetime instanceof Date ? datetime : new Date(datetime);

    const difference = differenceInDays(new Date(), notificationDateTime);
    if (difference === 0) {
      return notification;
    }
  });
  const filteredYesterdayNotifications = notifications.filter(
    (notification) => {
      const datetime = notification.createdBy;
      const notificationDateTime =
        datetime instanceof Date ? datetime : new Date(datetime);

      const difference = differenceInDays(new Date(), notificationDateTime);
      if (difference === 1) {
        return notification;
      }
    }
  );
  const filteredThisWeekNotifications = notifications.filter((notification) => {
    const datetime = notification.createdBy;
    const notificationDateTime =
      datetime instanceof Date ? datetime : new Date(datetime);

    const difference = differenceInDays(new Date(), notificationDateTime);
    if (difference > 1 && difference <= 7) {
      return notification;
    }
  });

  const filteredOlderNotifications = notifications.filter((notification) => {
    const datetime = notification.createdBy;
    const notificationDateTime =
      datetime instanceof Date ? datetime : new Date(datetime);

    const difference = differenceInDays(new Date(), notificationDateTime);
    if (difference > 7) {
      return notification;
    }
  });

  const handleNotificationDatetime = (datetime) => {
    const notificationDateTime =
      datetime instanceof Date ? datetime : new Date(datetime);

    const daysAgo = differenceInDays(new Date(), notificationDateTime);

    const hrsAgo = differenceInHours(new Date(), notificationDateTime);

    const minsAgo = differenceInMinutes(new Date(), notificationDateTime);

    const dateAgo = format(notificationDateTime, "d MMM yyyy");

    const displayedDate =
      daysAgo > 7
        ? dateAgo
        : hrsAgo > 23
        ? `${daysAgo} ${daysAgo > 1 ? "days" : "day"}`
        : minsAgo > 59
        ? `${hrsAgo} ${hrsAgo > 1 ? "hrs" : "hr"}`
        : minsAgo > 0
        ? `${minsAgo} ${minsAgo > 1 ? "mins" : "min"}`
        : "now";
    return displayedDate;
  };

  return (
    <Modal
      size={"md"}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={false}
      className="z-20"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {"All Notifications"}
            </ModalHeader>
            <ModalBody>
              <div className="h-[30rem] overflow-y-auto">
                <Listbox
                  // items={notifications}
                  aria-label="Dynamic Actions"
                  onAction={(key) => alert(key)}
                  itemClasses={{ base: "data-[hover=true]:bg-grey-default" }}
                >
                  {filteredTodayNotifications?.length && (
                    <ListboxSection key={"today"} title="Today" showDivider>
                      {filteredTodayNotifications.map((notification) => {
                        return (
                          <ListboxItem key={notification._id}>
                            <div className="flex flex-col gap-1 overflow-hidden whitespace-pre-line">
                              <p className="font-bold text-xs leading-tight">
                                {notification.title}
                              </p>
                              <p className="font-medium text-xs truncate">
                                {notification.description}
                              </p>
                              <p className="font-normal text-xs">
                                {`${handleNotificationDatetime(
                                  notification.createdBy ?? new Date()
                                )}`}
                              </p>
                            </div>
                          </ListboxItem>
                        );
                      })}
                    </ListboxSection>
                  )}
                  {filteredYesterdayNotifications?.length && (
                    <ListboxSection
                      key={"yesterday"}
                      title="Yesterday"
                      showDivider
                    >
                      {filteredYesterdayNotifications.map((notification) => {
                        return (
                          <ListboxItem key={notification._id}>
                            <div className="flex flex-col gap-1 overflow-hidden whitespace-pre-line">
                              <p className="font-bold text-xs leading-tight">
                                {notification.title}
                              </p>
                              <p className="font-medium text-xs truncate">
                                {notification.description}
                              </p>
                              <p className="font-normal text-xs">
                                {`${handleNotificationDatetime(
                                  notification.createdBy ?? new Date()
                                )}`}
                              </p>
                            </div>
                          </ListboxItem>
                        );
                      })}
                    </ListboxSection>
                  )}
                  {filteredThisWeekNotifications?.length && (
                    <ListboxSection
                      key={"thisWeek"}
                      title="This Week"
                      showDivider
                    >
                      {filteredThisWeekNotifications.map((notification) => {
                        return (
                          <ListboxItem key={notification._id}>
                            <div className="flex flex-col gap-1 overflow-hidden whitespace-pre-line">
                              <p className="font-bold text-xs leading-tight">
                                {notification.title}
                              </p>
                              <p className="font-medium text-xs truncate">
                                {notification.description}
                              </p>
                              <p className="font-normal text-xs">
                                {`${handleNotificationDatetime(
                                  notification.createdBy ?? new Date()
                                )}`}
                              </p>
                            </div>
                          </ListboxItem>
                        );
                      })}
                    </ListboxSection>
                  )}
                  {filteredOlderNotifications?.length && (
                    <ListboxSection key={"older"} title="Older" showDivider>
                      {filteredOlderNotifications.map((notification) => {
                        return (
                          <ListboxItem key={notification._id}>
                            <div className="flex flex-col gap-1 overflow-hidden whitespace-pre-line">
                              <p className="font-bold text-xs leading-tight">
                                {notification.title}
                              </p>
                              <p className="font-medium text-xs truncate">
                                {notification.description}
                              </p>
                              <p className="font-normal text-xs">
                                {`${handleNotificationDatetime(
                                  notification.createdBy ?? new Date()
                                )}`}
                              </p>
                            </div>
                          </ListboxItem>
                        );
                      })}
                    </ListboxSection>
                  )}
                </Listbox>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onClose}>
                Action
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default NotificationsHistory;
