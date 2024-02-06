import {
  Button,
  Listbox,
  ListboxItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from "@nextui-org/react";
import { MdEventNote } from "react-icons/md";
import { useAtomValue, useAtom } from "jotai";
import { postTemplateItemsAtom } from "../../store/PostTemplateStore";
import ManagePostModal from "./ManagePostModal";
import { useState, useMemo } from "react";
import {
  selectedTemplateTypeAtom,
} from "../../store/ManagePostStore";

const PostTemplateButton = () => {
  const postTemplateItems = useAtomValue(postTemplateItemsAtom);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [isOpenPopover, setIsOpenPopover] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState(new Set([""]));
  const [selectedTemplateType, setSelectedTemplateType] = useAtom(
    selectedTemplateTypeAtom
  );
  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(""),
    [selectedKeys]
  );

  return (
    <>
      <Popover
        placement="bottom-end"
        offset={5}
        isOpen={isOpenPopover}
        onOpenChange={(open) => setIsOpenPopover(open)}
      >
        <PopoverTrigger>
          <Button
            disableRipple
            disableAnimation
            size="lg"
            startContent={<MdEventNote size={25} />}
            className="bg-transparent font-medium text-lg text-black-default hover:text-orange-default/90"
          >
            {"Templates"}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Listbox
            aria-label="Dynamic Actions"
            // disallowEmptySelection
            disabledKeys={["choose"]}
            selectionMode="single"
            selectedKeys={selectedKeys}
            onSelectionChange={(key) => {
              setSelectedKeys(key);
              setSelectedTemplateType(key);
              setIsOpenPopover(false);
              onOpen();
            }}
            itemClasses={{
              base: [
                "data-[disabled=true]:opacity-100 data-[hover=true]:bg-orange-default data-[hover=true]:text-white-default text-black-default",
              ],
              title: "text-base font-normal ",
            }}
          >
            {postTemplateItems.map((template) => (
              <ListboxItem
                key={template.key}
                startContent={template.key != "choose" && template.icon}
                textValue={template.label}
              >
                {template.label} {selectedValue}
              </ListboxItem>
            ))}
          </Listbox>
        </PopoverContent>
      </Popover>
      <ManagePostModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
      />
    </>
  );
};
export default PostTemplateButton;
