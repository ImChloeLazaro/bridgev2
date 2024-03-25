import CTAButtons from "../../../components/CTAButtons";
import React, { useState } from "react";
import { post, put, del } from "aws-amplify/api";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Input,
} from "@nextui-org/react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { MdClose } from "react-icons/md";

import { useAtom, useAtomValue, useSetAtom } from "jotai";

import {
  shortcutsAtom,
  disableDraggableAtom,
  fetchShortcutAtom,
  updateShortcutAtom,
  deleteShortcutAtom,
} from "../../store/ShortcutsStore";
import IconButton from "../../../components/IconButton";
import { userAtom } from "../../../store/UserStore";
import { destroywithparams, restupdate } from "@/app/utils/amplify-rest";
import { authenticationAtom } from "@/app/store/AuthenticationStore";

const ShortcutsOptionsModal = ({ unique_key, title, url }) => {
  const auth = useAtomValue(authenticationAtom);

  const fetchShortcut = useSetAtom(fetchShortcutAtom);

  const shortcutSize = 28; //icon size
  const [isOpen, setIsOpen] = useState(false);

  const setDisableDraggable = useSetAtom(disableDraggableAtom);
  const user = useAtomValue(userAtom);
  const [shortcutsList, setShortcutsList] = useAtom(shortcutsAtom);
  const deleteShortcut = useSetAtom(deleteShortcutAtom);
  const updateShortcut = useSetAtom(updateShortcutAtom);

  const [selectedShortcut, setSelectedShortcut] = useState(unique_key);

  const [editShortcutName, setEditShortcutName] = useState(title);
  const [editShortcutURL, setEditShortcutURL] = useState(url);

  const handleDeleteShortcut = async () => {
    const response = await deleteShortcut({
      _id: selectedShortcut,
    });
    if (response.success) {
      setIsOpen(false);
      setDisableDraggable(false);
      console.log("CONFIRM WINDOW DELETED SHORTCUT", response.success);
    }
    fetchShortcut(auth.sub);
  };

  const handleEditShortcut = async () => {
    const response = await updateShortcut({
      _id: unique_key,
      title: editShortcutName,
      url: editShortcutURL,
    });
    if (response.success) {
      setIsOpen(false);
      setDisableDraggable(false);
      console.log("CONFIRM WINDOW EDITED SHORTCUT", response.success);
    }
    fetchShortcut(auth.sub);
  };

  const handleCloseWindow = () => {
    setIsOpen(false);
    setDisableDraggable(false);
  };

  const actionButtons = {
    cta: [
      { color: "red", label: "Delete", action: handleDeleteShortcut },
      { color: "blue", label: "Edit", action: handleEditShortcut },
    ],
  };

  return (
    <Popover
      placement="bottom-start"
      showArrow
      offset={6}
      isOpen={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        setDisableDraggable(open);
        console.log("unique_key: " + unique_key);
        console.log(shortcutsList);
      }}
    >
      <PopoverTrigger>
        <Button
          aria-label={"Shortcut Options"}
          isIconOnly
          className="bg-transparent"
        >
          <BiDotsVerticalRounded size={shortcutSize} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-4">
        {(titleProps) => (
          <div className="flex flex-col gap-3 w-full">
            <div className="flex items-center justify-between">
              <p
                className="text-xl font-extrabold text-black-default/90"
                {...titleProps}
              >
                {"Update Shortcut"}
              </p>
              <IconButton onPress={handleCloseWindow}>
                <MdClose size={24} />
              </IconButton>
            </div>
            <div className="flex flex-col gap-3 w-full">
              <Input
                isClearable
                label="Name"
                labelPlacement="outside-left"
                size="sm"
                variant="bordered"
                value={editShortcutName}
                onValueChange={setEditShortcutName}
                classNames={{
                  base: "gap-4 flex text-black-default/70 data-[focus=true]:text-black-default",
                  label: "font-medium text-base text-black-default/70 w-16",
                  mainWrapper: "grow",
                  inputWrapper:
                    "border-2 border-black-hover/80 data-[hover=true]:border-black-default/90",
                  input: "font-medium text-base",
                }}
              />
              <Input
                autoFocus
                isClearable
                label="Link"
                labelPlacement="outside-left"
                size="sm"
                variant="bordered"
                value={editShortcutURL}
                onValueChange={setEditShortcutURL}
                classNames={{
                  base: "gap-4 flex text-base text-black-default/70 data-[focus=true]:text-black-default",
                  label: "font-medium text-base text-black-default/70 w-16",
                  mainWrapper: "grow",
                  inputWrapper:
                    "border-2 border-black-hover/80 data-[hover=true]:border-black-default/90",
                  input: "font-medium text-base",
                }}
              />
            </div>
            <div className="flex justify-end items-center gap-2.5">
              <Button
                size="sm"
                radius="sm"
                variant="light"
                disableRipple={true}
                className="px-3 py-0.5 bg-transparent data-[hover=true]:bg-transparent text-black-default/60 font-bold text-base hover:underline hover:underline-offset-2"
                onPress={() => {
                  setIsOpen(false);
                  setDisableDraggable(false);
                }}
              >
                {"Cancel"}
              </Button>
              {actionButtons.cta.map((details, index) => (
                <CTAButtons
                  key={`${details.label}-${index}`}
                  label={details.label}
                  color={details.color}
                  onPress={details.action}
                  className={"py-0"}
                  size="sm"
                />
              ))}
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
export default ShortcutsOptionsModal;
