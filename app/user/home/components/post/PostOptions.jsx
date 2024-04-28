import {
  Button,
  Listbox,
  ListboxItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import PostReportModal from "./PostReportModal";

const PostOptions = ({ trigger }) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    isOpen: reportIsOpen,
    onOpen: reportOnOpen,
    onOpenChange,
  } = useDisclosure();

  const options = [
    { key: "hide", label: "Hide this post" },
    { key: "report", label: "Report this post" },
  ];

  return (
    <>
      <Popover
        placement="bottom-end"
        showArrow
        offset={6}
        isOpen={isOpen}
        onOpenChange={(open) => setIsOpen(open)}
        classNames={{ content: ["m-0 p-0"] }}
      >
        <PopoverTrigger>
          <Button aria-label={"Post Options Button"} isIconOnly className="bg-transparent">
            {trigger}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-1 w-40">
          <Listbox
            aria-label="Actions"
            onAction={(key) => {
              if (key === "hide") {
                console.log("HIDE");
              }
              if (key === "report") {
                console.log("report");
                setIsOpen(false);
                reportOnOpen();
              }
            }}
            itemClasses={{
              base: [
                "data-[hover=true]:bg-orange-default data-[hover=true]:text-white-default text-black-default",
              ],
              // title: ["text-base font-normal"],
            }}
          >
            {options.map((option) => (
              <ListboxItem key={option.key} id={option.key}>{option.label}</ListboxItem>
            ))}
          </Listbox>
        </PopoverContent>
      </Popover>
      <PostReportModal
        isOpen={reportIsOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
      />
    </>
  );
};

export default PostOptions;
