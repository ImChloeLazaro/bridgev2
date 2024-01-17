import CTAButtons from "../../../components/CTAButtons";
import React, { useState } from "react";
import { MdAdd } from "react-icons/md";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Input,
} from "@nextui-org/react";

import { useAtom, useSetAtom } from "jotai";
import {
  shortcutsAtom,
  addShortcutNameAtom,
  addShortcutLinkAtom,
  shortcutCountAtom,
} from "../../store/ShortcutsStore";
import CloseButton from "../../../components/CloseButton";

const ShortcutsHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [addShortcutName, setAddShortcutName] = useAtom(addShortcutNameAtom);
  const [addShortcutLink, setAddShortcutLink] = useAtom(addShortcutLinkAtom);

  const [shortcutCount] = useAtom(shortcutCountAtom);
  const setShortcuts = useSetAtom(shortcutsAtom);

  const handleAddShortcut = () => {
    setShortcuts((prev) => [
      ...prev,
      {
        id: shortcutCount + 1,
        key: `sct-${shortcutCount + 1}`,
        label: addShortcutName,
        link: addShortcutLink,
      },
    ]);
    setAddShortcutName("");
    setAddShortcutLink("");
    setIsOpen(false);
  };

  const handleCloseWindow = () => {
    setIsOpen(false);
  };

  const properties = {
    title: "New Shortcut",
    trigger: <MdAdd size={24} />,
    cta: [{ color: "orange", label: "Add", action: handleAddShortcut }],
  };

  return (
    <div className="flex items-center gap-x-24 pt-1 pr-4 pb-3 pl-3 bg-white-default">
      <div className="text-xl font-bold">SHORTCUTS</div>
      <Popover
        placement="bottom-start"
        showArrow
        offset={6}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      >
        <PopoverTrigger>
          <Button isIconOnly className="bg-transparent">
            {properties.trigger}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-96 p-4">
          {(titleProps) => (
            <div className="flex flex-col gap-3 w-full">
              <div className="flex items-center justify-between">
                <p
                  className="text-xl font-extrabold text-black-default/80"
                  {...titleProps}
                >
                  {properties.title}
                </p>
                <CloseButton onPress={handleCloseWindow} />
              </div>
              <div className="flex flex-col gap-3 w-full">
                <Input
                  isClearable
                  label="Name"
                  labelPlacement="outside-left"
                  size="sm"
                  variant="bordered"
                  value={addShortcutName}
                  onValueChange={setAddShortcutName}
                  classNames={{
                    base: "gap-4 flex ",
                    label: "font-medium text-base text-black-default/70 w-16",
                    mainWrapper: "grow",
                    inputWrapper:
                      "border-2 border-black-hover/80 data-[hover=true]:border-black-default/90",
                  }}
                />
                <Input
                  autoFocus
                  isClearable
                  label="Link"
                  labelPlacement="outside-left"
                  size="sm"
                  variant="bordered"
                  value={addShortcutLink}
                  onValueChange={setAddShortcutLink}
                  classNames={{
                    base: "gap-4 flex ",
                    label: "font-medium text-base text-black-default/70 w-16",
                    mainWrapper: "grow",
                    inputWrapper:
                      "border-2 border-black-hover/80 data-[hover=true]:border-black-default/90",
                  }}
                />
              </div>
              <div className="flex justify-end gap-2.5">
                {properties.cta.map((details, index) => (
                  <CTAButtons
                    key={`${details.label}-${index}`}
                    label={details.label}
                    color={details.color}
                    onPress={details.action}
                  />
                ))}
                <Button
                  size="sm"
                  radius="sm"
                  variant="light"
                  disableRipple={true}
                  className="px-3 py-0.5 bg-transparent data-[hover=true]:bg-transparent text-black-default/60 font-bold text-base hover:underline hover:underline-offset-2"
                  onPress={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ShortcutsHeader;
