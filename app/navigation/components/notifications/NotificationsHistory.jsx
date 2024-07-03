import {
  Button,
  Chip,
  Image,
  Listbox,
  ListboxItem,
  ListboxSection,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  format,
} from "date-fns";
import { useAtom, useAtomValue } from "jotai";
import {
  notificationFilterKeysAtom,
  notificationsAtom,
  notificationsTabsAtom,
  notificationTypeAtom,
  selectedNotificationFilterKeysAtom,
  showUnreadAtom,
} from "../../store/NotificationsStore";
import { MdRefresh } from "react-icons/md";
import IconButton from "@/app/components/IconButton";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Tabs, Tab } from "@nextui-org/react";
import { authenticationAtom } from "@/app/store/AuthenticationStore";
import SearchBar from "@/app/components/SearchBar";
import { BiDotsVerticalRounded } from "react-icons/bi";

// @refresh reset

const NotificationsHistory = ({ isOpen, onOpenChange }) => {
  const [isOpenOptions, setIsOpenOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchItem, setSearchItem] = useState("");

  const [notificationType, setNotificationType] = useAtom(notificationTypeAtom);
  const [selectedNotificationFilterKeys, setSelectedNotificationFilterKeys] =
    useAtom(selectedNotificationFilterKeysAtom);

  const notifications = useAtomValue(notificationsAtom);
  const notificationsTabs = useAtomValue(notificationsTabsAtom);
  const showUnread = useAtomValue(showUnreadAtom);
  const auth = useAtomValue(authenticationAtom);
  const notificationFilterKeys = useAtomValue(notificationFilterKeysAtom);

  // const handleLoadNotification = () => {
  //   setIsLoading(true);
  //   const promise = async () =>
  //     new Promise((resolve) => setTimeout(async () => resolve(), 2000));

  //   toast.promise(promise, {
  //     loading: "Loading...",
  //     success: () => {
  //       setIsLoading(false);
  //       return "Notifications Up to Date";
  //     },
  //     error: "Error refreshing data",
  //   });
  // };

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

  const handleActions = (action) => {
    if (action === "show") {
      setIsOpenOptions(false);
      setSelectedNotificationFilterKeys(["hidden"]);
    }
  };

  const userNotifications = notifications.filter(
    (notification) => notification.sub === auth.sub
  );

  const selectedNotificationFilterKeyString = Array.from(
    selectedNotificationFilterKeys
  ).join("");

  const filteredNotifications = useMemo(() => {
    let filteredItems = userNotifications;

    if (Boolean(searchItem)) {
      filteredItems = filteredItems.filter(
        (notification) =>
          notification.title.toLowerCase().includes(searchItem.toLowerCase()) ||
          notification.description
            .toLowerCase()
            .includes(searchItem.toLowerCase())
      );
    }
    if (
      selectedNotificationFilterKeyString !== "all" &&
      Array.from(selectedNotificationFilterKeys).length !==
        notificationFilterKeys.length
    ) {
      filteredItems = filteredItems.filter((notification) => {
        const notificationHidden = notification.hidden ? "hidden" : "";
        if (notification.hidden) {
          return selectedNotificationFilterKeyString === notificationHidden;
        } else {
          return notification.type.includes(
            selectedNotificationFilterKeyString
          );
        }
      });
    }

    return filteredItems;
  }, [
    notificationFilterKeys.length,
    searchItem,
    selectedNotificationFilterKeyString,
    selectedNotificationFilterKeys,
    userNotifications,
  ]);

  const sortedNotifications = useMemo(
    () =>
      filteredNotifications.sort(
        (a, b) => new Date(b.createdBy) - new Date(a.createdBy)
      ),
    [filteredNotifications]
  );

  const filteredTodayNotifications = sortedNotifications.filter(
    (notification) => {
      const datetime = notification.createdBy.slice(0, -1);
      const notificationDateTime =
        datetime instanceof Date ? datetime : new Date(datetime);

      const difference = differenceInDays(new Date(), notificationDateTime);
      if (difference === 0) {
        return notification;
      }
    }
  );
  const filteredYesterdayNotifications = sortedNotifications.filter(
    (notification) => {
      const datetime = notification.createdBy.slice(0, -1);
      const notificationDateTime =
        datetime instanceof Date ? datetime : new Date(datetime);

      const difference = differenceInDays(new Date(), notificationDateTime);
      if (difference === 1) {
        return notification;
      }
    }
  );
  const filteredThisWeekNotifications = sortedNotifications.filter(
    (notification) => {
      const datetime = notification.createdBy.slice(0, -1);
      const notificationDateTime =
        datetime instanceof Date ? datetime : new Date(datetime);

      const difference = differenceInDays(new Date(), notificationDateTime);
      if (difference > 1 && difference <= 7) {
        return notification;
      }
    }
  );
  const filteredOlderNotifications = sortedNotifications.filter(
    (notification) => {
      const datetime = notification.createdBy.slice(0, -1);
      const notificationDateTime =
        datetime instanceof Date ? datetime : new Date(datetime);

      const difference = differenceInDays(new Date(), notificationDateTime);
      if (difference > 7) {
        return notification;
      }
    }
  );

  const options = [
    { key: "show", label: "Show hidden notifications" },
    { key: "settings", label: "Go to Settings" },
  ];

  const notificationSections = [
    { key: "today", title: "Today", items: filteredTodayNotifications },
    {
      key: "yesterday",
      title: "Yesterday",
      items: filteredYesterdayNotifications,
    },
    {
      key: "thisWeek",
      title: "This Week",
      items: filteredThisWeekNotifications,
    },
    { key: "older", title: "Older", items: filteredOlderNotifications },
  ];

  return (
    <Modal
      size={"lg"}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={false}
      classNames={{ base: "z-20", closeButton: "m-2" }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 lg:text-xl pt-4 pb-2">
              {"All Notifications"}
            </ModalHeader>
            <ModalBody className="px-4">
              <div className="flex items-center justify-between">
                <SearchBar
                  searchItem={searchItem}
                  setSearchItem={setSearchItem}
                  type="filter"
                  filterKeys={notificationFilterKeys}
                  selectedFilterKeys={selectedNotificationFilterKeys}
                  setSelectedFilterKeys={setSelectedNotificationFilterKeys}
                />
                <Popover
                  placement="bottom-start"
                  showArrow
                  offset={6}
                  isOpen={isOpenOptions}
                  onOpenChange={(open) => setIsOpenOptions(open)}
                >
                  <PopoverTrigger>
                    <Button isIconOnly className="bg-transparent p-0">
                      <BiDotsVerticalRounded size={18} />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-1 w-44">
                    <Listbox
                      items={options}
                      aria-label="Actions"
                      onAction={(key) => handleActions(key)}
                      itemClasses={{
                        base: [
                          "data-[hover=true]:bg-orange-default data-[hover=true]:text-white-default text-black-default",
                        ],
                        // title: ["text-base font-normal"],
                      }}
                    >
                      {(item) => {
                        return (
                          <ListboxItem key={item.key}>{item.label}</ListboxItem>
                        );
                      }}
                    </Listbox>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="h-[30rem] overflow-y-auto flex flex-col items-center justify-between ">
                <Listbox
                  // items={notifications}
                  aria-label="Dynamic Actions"
                  onAction={(key) => alert(key)}
                  emptyContent={
                    <div className="flex flex-col items-center mt-6">
                      <Image
                        width={180}
                        height={180}
                        alt={"No Notifications"}
                        src={"/no-notifications.png"}
                      />
                      <p className="font-medium text-black-default/80">
                        {"No notifications found!"}
                      </p>
                      <p className="font-medium text-black-default/80">
                        {"Sorry we can't find what you're searching for"}
                      </p>
                    </div>
                  }
                  itemClasses={{ base: "data-[hover=true]:bg-grey-default" }}
                >
                  {notificationSections.map((section) => {
                    return (
                      section.items?.length && (
                        <ListboxSection
                          key={section.key}
                          title={section.title}
                          showDivider
                          classNames={{ heading: "text-sm mb-2" }}
                        >
                          {section.items?.map((item) => {
                            return (
                              <ListboxItem key={item._id}>
                                <div className="flex flex-col gap-1 overflow-hidden whitespace-pre-line">
                                  <p className="font-bold text-xs lg:text-sm leading-tight">
                                    {item.title}
                                  </p>
                                  <p className="font-medium text-xs truncate">
                                    {item.description}
                                  </p>
                                  <p className="font-normal text-xs">
                                    {`${handleNotificationDatetime(
                                      item.createdBy.slice(0, -1) ?? new Date()
                                    )}`}
                                  </p>
                                </div>
                              </ListboxItem>
                            );
                          })}
                        </ListboxSection>
                      )
                    );
                  })}
                </Listbox>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default NotificationsHistory;
