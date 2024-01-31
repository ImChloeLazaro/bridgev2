import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { del, put } from "aws-amplify/api";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import CTAButtons from "../../../components/CTAButtons";
import CloseButton from "../../../components/CloseButton";
import { userAtom } from "../../../store/UserStore";
import {
  disableDraggableAtom,
  shortcutsAtom,
} from "../../store/ShortcutsStore";

// ### TODO Add regex validation when editing link to avoid invalid link

const ShortcutsOptionsModal = ({ unique_key, title }) => {
  const shortcutSize = 28; //icon size
  const [isOpen, setIsOpen] = useState(false);

  const setDisableDraggable = useSetAtom(disableDraggableAtom);
  const user = useAtomValue(userAtom);
  const [shortcuts, setShortcuts] = useAtom(shortcutsAtom);

  const [uniqueShortcutID, setuniqueShortcutID] = useState(
    shortcuts
      .filter((item) => item.key === unique_key)
      .map((detail) => detail._id)
  );

  const [editShortcutName, setEditShortcutName] = useState(
    shortcuts
      .filter((item) => item.key === unique_key)
      .map((detail) => detail.label)
  );
  const [editShortcutLink, setEditShortcutLink] = useState(
    shortcuts
      .filter((item) => item.key === unique_key)
      .map((detail) => detail.link)
  );

  const handleDeleteShortcut = async () => {
    const confirm = window.confirm(`Are you sure you want to delete ${editShortcutName}?`)
    if(confirm){
      try {
        const restOperation = del({
          apiName: "bridgeApi",
          path: "/shortcut",
          options: {
            queryParams: {
              _id : uniqueShortcutID[0],
            },
          },
        });
        const { body } = await restOperation.response;
        const response = await body.json();
        console.log("DELETE SHORTCUT", response);
        setShortcuts(() => shortcuts.filter((item) => item.key !== unique_key));
        setIsOpen(false);
        setDisableDraggable(false);
      } catch (e) {
        console.log("Shortcut DEL call failed: ", e);
      }
    try {
      const restOperation = del({
        apiName: "bridgeApi",
        path: "/shortcut",
        options: {
          queryParams: {
            sub: user.sub,
          },
        },
      });
      const { body } = await restOperation.response;
      const response = await body.json();
      console.log("DELETE SHORTCUT", response);

      setShortcuts(() => shortcuts.filter((item) => item.key !== unique_key));
      setIsOpen(false);
      setDisableDraggable(false);
    } catch (e) {
      console.log("Shortcut DEL call failed: ", e);
    }
  };

  const handleEditShortcut = async () => {
    if (user === null) {
      return;
    }
    // ### TODO Add regex validation on link to check if https:// is already on string
    try {
      const restOperation = put({
        apiName: "bridgeApi",
        path: "/shortcut",
        options: {
          body: {
            _id: uniqueShortcutID[0],
            title: editShortcutName[0],
            url: editShortcutLink[0],
          },
        },
      });
      const { body } = await restOperation.response;
      const response = await body.json();
      console.log("EDIT SHORTCUT", response);
      setShortcuts(() =>
        shortcuts.map((shortcut) => {
          if (shortcut.key === unique_key) {
            console.log("Found shortcut:");
            console.log(shortcut);
            return {
              ...shortcut,
              label: editShortcutName,
              link: editShortcutLink,
            };
          }
          return shortcut;
        })
      );
      setIsOpen(false);
      setDisableDraggable(false);
    } catch (e) {
      console.log("Shortcut PUT call failed: ", e);
    }
  };

  const handleCloseWindow = () => {
    setIsOpen(false);
    setDisableDraggable(false);
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
        console.log("unique_key-" + unique_key);
        console.log(shortcuts);
      }}
    >
      <PopoverTrigger>
        <Button isIconOnly className="bg-transparent">
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
                {title}
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
                value={editShortcutLink}
                onValueChange={setEditShortcutLink}
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
            <div className="flex justify-end gap-2.5">
              <CTAButtons
                label={"Delete"}
                color={"red"}
                onPress={handleDeleteShortcut}
              />
              <CTAButtons
                label={"Edit"}
                color={"blue"}
                onPress={handleEditShortcut}
              />
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
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
export default ShortcutsOptionsModal;
