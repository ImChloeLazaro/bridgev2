import {
  Button,
  Listbox, ListboxItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { useState } from "react";

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
      <PopoverContent className="p-1 w-44">
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
