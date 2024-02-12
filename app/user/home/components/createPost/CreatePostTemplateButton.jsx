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
import { useAtomValue, useSetAtom } from "jotai";
import { postTemplateItemsAtom } from "../../store/PostTemplateStore";
import ManagePostModal from "../managePost/ManagePostModal";
import { useState, useMemo } from "react";
import {
  postCaptionAtom,
  postTemplatesAtom,
  postTitleAtom,
  selectedMediaLayoutAtom,
  selectedMediaOrientationAtom,
  selectedReactionsAtom,
  selectedTaggedPeopleAtom,
  selectedTemplateTypeAtom,
  templateNameAtom,
} from "../../store/ManagePostStore";

const CreatePostTemplateButton = () => {
  const postTemplateItems = useAtomValue(postTemplateItemsAtom);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [isOpenPopover, setIsOpenPopover] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState(new Set([""]));

  const postTemplates = useAtomValue(postTemplatesAtom);
  const setSelectedTemplateType = useSetAtom(selectedTemplateTypeAtom);
  const setPostTitle = useSetAtom(postTitleAtom);
  const setPostCaption = useSetAtom(postCaptionAtom);
  const setSelectedReactions = useSetAtom(selectedReactionsAtom);
  const setSelectedTaggedPeople = useSetAtom(selectedTaggedPeopleAtom);
  const setSelectedMediaOrientation = useSetAtom(selectedMediaOrientationAtom);
  const setSelectedMediaLayout = useSetAtom(selectedMediaLayoutAtom);

  const handleSelectionChange = (key) => {
    setSelectedKeys(key);
    setSelectedTemplateType(key);

    const selectedTemplate = postTemplates.filter(
      (template) => template.type === Array.from(key).join("")
    )[0];
    console.log("INSIDE TEMPLATE BUTTON HERE", key);

    console.log("TEMPLATE BUTTON selectedTemplate", selectedTemplate);

    if (selectedTemplate) {
      setSelectedReactions([...selectedTemplate.reactionList]);
      setSelectedTaggedPeople([...selectedTemplate.tagPeople]);
      setSelectedMediaOrientation([...selectedTemplate.orientation]);
      setSelectedMediaLayout([...selectedTemplate.mediaLayout]);
      setPostTitle(selectedTemplate.title);
      setPostCaption(selectedTemplate.caption);
    }

    setIsOpenPopover(false);
    onOpen();
  };

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
            onSelectionChange={(key) => handleSelectionChange(key)}
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
                {template.label}
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
export default CreatePostTemplateButton;
