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
import { MdAdd, MdClose } from "react-icons/md";
import CTAButtons from "@/app/components/CTAButtons";
import { BsSortDownAlt } from "react-icons/bs";
import { BsSortUpAlt } from "react-icons/bs";
import {
  addShortcutAtom,
  fetchShortcutAtom,
  shortcutTitleAtom,
  shortcutURLAtom,
  updateSortedShortcutsAtom,
} from "../../store/ShortcutsStore";
import IconButton from "@/app/components/IconButton";

const ShortcutsHeader = () => {
  const auth = useAtomValue(authenticationAtom);
  const [isOpen, setIsOpen] = useState(false);
  const [sorted, setSorted] = useState(false);
  const [shortcutTitle, setShortcutTitle] = useAtom(shortcutTitleAtom);
  const [shortcutURL, setShortcutURL] = useAtom(shortcutURLAtom);
  const addShortcut = useSetAtom(addShortcutAtom);
  const fetchShortcut = useSetAtom(fetchShortcutAtom);
  const updateSortedShortcuts = useSetAtom(updateSortedShortcutsAtom);

  const handleAddShortcut = async () => {
    if (auth.sub === null) {
      return;
    }
    const response = await addShortcut({
      sub: auth.sub,
      title: shortcutTitle,
      url: shortcutURL,
    });
    if (response.success) {
      handleCloseWindow();
      console.log("CONFIRM WINDOW ADDED SHORTCUT", response.success);
    }
    fetchShortcut(auth.sub);
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
    <div className="flex items-center justify-between pt-1 pr-4 pb-3 pl-3 bg-white-default">
      <div className="text-xl font-bold">{"SHORTCUTS"}</div>
      <div className="flex justify-center items-center gap-1">
        <IconButton
          onPress={() => {
            setSorted(!sorted);
            updateSortedShortcuts({ sort: sorted, sub: auth.sub });
          }}
        >
          {sorted ? <BsSortUpAlt size={24} /> : <BsSortDownAlt size={24} />}
        </IconButton>
        <Popover
          placement="bottom-start"
          showArrow
          offset={6}
          isOpen={isOpen}
          onOpenChange={setIsOpen}
        >
          <PopoverTrigger>
            <Button
              aria-label={"Add Shortcut Button"}
              isIconOnly
              className="bg-transparent"
            >
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
                    value={shortcutTitle}
                    onValueChange={setShortcutTitle}
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
                    value={shortcutURL}
                    onValueChange={setShortcutURL}
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
                    {"Cancel"}
                  </Button>
                </div>
              </div>
            )}
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default ShortcutsHeader;
