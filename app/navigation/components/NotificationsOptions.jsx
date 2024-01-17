import React, { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Input,
} from "@nextui-org/react";
import { Listbox, ListboxItem } from "@nextui-org/react";

export function NotificationsOptions({ trigger, condition, options }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover
      placement="bottom-start"
      showArrow
      offset={6}
      isOpen={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <PopoverTrigger>
        <Button isIconOnly className="bg-transparent">
          {trigger}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-2 w-44">
        <Listbox aria-label="Actions" onAction={(key) => console.log(key)}>
          {options.map((option) => {
            if (option.key == "mark") {
              return (
                <ListboxItem key={option.key}>{`${option.label} ${
                  condition ? "read" : "unread"
                }`}</ListboxItem>
              );
            }
            return <ListboxItem key={option.key}>{option.label}</ListboxItem>;
          })}
        </Listbox>
      </PopoverContent>
    </Popover>
  );
}
