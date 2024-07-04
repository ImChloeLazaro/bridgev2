import {
  Button,
  Listbox, ListboxItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { useState } from "react";

const RecognitionOptions = ({ trigger, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover
      placement="bottom-end"
      showArrow
      offset={6}
      isOpen={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
      classNames={{ content: ["m-0 p-0"] }}
    >
      <PopoverTrigger>
        <Button isIconOnly className="bg-transparent">
          {trigger}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-1 w-40">
        <Listbox
          aria-label="Actions"
          // onAction={(key) => console.log(key)}
          itemClasses={{
            base: [
              "data-[hover=true]:bg-orange-default data-[hover=true]:text-white-default text-black-default",
            ],
            // title: ["text-base font-normal"],
          }}
        >
          {options.map((option) => (
            <ListboxItem key={option.key}>{option.label}</ListboxItem>
          ))}
        </Listbox>
      </PopoverContent>
    </Popover>
  );
};

export default RecognitionOptions;
