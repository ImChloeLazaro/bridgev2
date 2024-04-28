import CTAButtons from "@/app/components/CTAButtons";
import IconButton from "@/app/components/IconButton";
import { authenticationAtom } from "@/app/store/AuthenticationStore";
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import { toast } from "sonner";
import {
  deleteShortcutAtom,
  disableDraggableAtom,
  fetchShortcutAtom,
  shortcutsAtom,
  updateShortcutAtom,
} from "../../store/ShortcutsStore";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const ShortcutsOptionsModal = ({ unique_key, title, url }) => {
  const auth = useAtomValue(authenticationAtom);
  const [shortcutsList, setShortcutsList] = useAtom(shortcutsAtom);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedShortcut, setSelectedShortcut] = useState(unique_key);

  const [editShortcutName, setEditShortcutName] = useState(title);
  const [editShortcutURL, setEditShortcutURL] = useState(url);

  const setDisableDraggable = useSetAtom(disableDraggableAtom);
  const fetchShortcut = useSetAtom(fetchShortcutAtom);
  const deleteShortcut = useSetAtom(deleteShortcutAtom);
  const updateShortcut = useSetAtom(updateShortcutAtom);

  const handleDeleteShortcut = async () => {
    const promise = async () =>
      new Promise((resolve) =>
        setTimeout(
          async () =>
            resolve(
              await deleteShortcut({
                _id: selectedShortcut,
              }),
              await fetchShortcut(auth.sub)
            ),
          2000
        )
      );

    toast.promise(promise, {
      loading: "Loading...",
      success: () => {
        setIsOpen(false);
        setDisableDraggable(false);
        return `Successfully Deleted Shortcut`;
      },
      error: "Error deleting shortcut",
    });
  };

  const handleUpdateShortcut = async () => {
    const promise = async () =>
      new Promise((resolve) =>
        setTimeout(
          async () =>
            resolve(
              await updateShortcut({
                _id: unique_key,
                title: editShortcutName,
                url: editShortcutURL,
              }),
              await fetchShortcut(auth.sub)
            ),
          2000
        )
      );

    toast.promise(promise, {
      loading: "Loading...",
      success: () => {
        setIsOpen(false);
        setDisableDraggable(false);
        return `Successfully Updated Shortcut`;
      },
      error: "Error updating shortcut",
    });
  };

  const handleCloseWindow = () => {
    setIsOpen(false);
    setDisableDraggable(false);
  };

  const actionButtons = {
    cta: [
      { color: "red", label: "Delete", action: handleDeleteShortcut },
      { color: "blue", label: "Update", action: handleUpdateShortcut },
    ],
  };

  return (
    <Popover
      placement='bottom-start'
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
          className='bg-transparent'
        >
          <BiDotsVerticalRounded size={22} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-96 p-4'>
        {(titleProps) => (
          <div className='flex flex-col gap-3 w-full'>
            <div className='flex items-center justify-between'>
              <p
                className='text-xl font-extrabold text-black-default/90'
                {...titleProps}
              >
                {"Update Shortcut"}
              </p>
              <IconButton onPress={handleCloseWindow}>
                <MdClose size={24} />
              </IconButton>
            </div>
            <div className='flex flex-col gap-3 w-full'>
              <Input
                isClearable
                label='Name'
                labelPlacement='outside-left'
                size='sm'
                variant='bordered'
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
                label='Link'
                labelPlacement='outside-left'
                size='sm'
                variant='bordered'
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
                size='sm'
                radius='sm'
                variant='light'
                disableRipple={true}
                className='px-3 py-0.5 bg-transparent data-[hover=true]:bg-transparent text-black-default/60 font-bold text-base hover:underline hover:underline-offset-2'
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
