import React, { useState } from "react";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import { Listbox, ListboxItem } from "@nextui-org/react";

const TrainingOptions = ({ trigger, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  // ### TODO Add Functionality to edit and cancel the selected training

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
          onAction={(key) => console.log(key)}
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

export default TrainingOptions;
