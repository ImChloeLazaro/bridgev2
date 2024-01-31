import { Button, Listbox, ListboxItem, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { BiNews } from "react-icons/bi";
import { FaMedal } from "react-icons/fa6";
import {
  MdCake,
  MdCalendarMonth,
  MdEventNote,
  MdForum,
  MdGroups2,
} from "react-icons/md";

const PostTemplateButton = () => {
  const iconSize = 20;
  const postTemplateItems = [
    {
      key: "choose",
      label: "Choose a Template",
      icon: <FaMedal size={iconSize} />,
    },
    {
      key: "awards",
      label: "Awards",
      icon: <FaMedal size={iconSize} />,
    },
    {
      key: "birthday",
      label: "Birthday",
      icon: <MdCake size={iconSize} />,
    },
    {
      key: "event",
      label: "Event",
      icon: <MdCalendarMonth size={iconSize} />,
    },
    {
      key: "feedback",
      label: "Feedback",
      icon: <MdForum size={iconSize} />,
    },
    {
      key: "news",
      label: "News",
      icon: <BiNews size={iconSize} />,
    },
    {
      key: "team",
      label: "Team",
      icon: <MdGroups2 size={iconSize} />,
    },
  ];

  return (
    <Popover placement="bottom-end" offset={5}>
      <PopoverTrigger>
        <Button
          disableRipple
          disableAnimation
          size="lg"
          startContent={<MdEventNote size={25} />}
          className="bg-transparent font-medium text-lg text-black-default hover:text-orange-default/90"
        >
          {"Templates"}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Listbox
          aria-label="Dynamic Actions"
          onAction={(key) => alert(key)}
          disabledKeys={["choose"]}
          itemClasses={{
            base: [
              "data-[disabled=true]:opacity-100 data-[hover=true]:bg-orange-default data-[hover=true]:text-white-default text-black-default",
            ],
            title: "text-base font-normal ",
          }}
        >
          {postTemplateItems.map((item) => (
            <ListboxItem
              key={item.key}
              startContent={item.key != "choose" && item.icon}
              textValue={item.label}
            >
              {item.label}
            </ListboxItem>
          ))}
        </Listbox>
      </PopoverContent>
    </Popover>
  );
};
export default PostTemplateButton;
