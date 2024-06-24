import { Button, useDisclosure } from "@nextui-org/react";
import { useAtomValue, useSetAtom } from "jotai";
import { BsImage } from "react-icons/bs";
import {
  postCaptionAtom,
  postTemplatesAtom,
  postTitleAtom,
  selectedReactionsAtom,
  selectedTaggedPeopleAtom,
  selectedTemplateTypeAtom,
} from "../../store/ManagePostStore";
import ManagePostModal from "./ManagePostModal";

const ManagePostMediaButton = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const postTemplates = useAtomValue(postTemplatesAtom);
  const setSelectedTemplateType = useSetAtom(selectedTemplateTypeAtom);
  const setSelectedReactions = useSetAtom(selectedReactionsAtom);
  const setSelectedTaggedPeople = useSetAtom(selectedTaggedPeopleAtom);
  const setPostTitle = useSetAtom(postTitleAtom);
  const setPostCaption = useSetAtom(postCaptionAtom);

  const handleSelectionChange = (key) => {
    setSelectedTemplateType(key);

    const selectedTemplate = postTemplates.filter(
      (template) => template.type === Array.from(key).join("")
    )[0];

    if (selectedTemplate) {
      setSelectedReactions([...selectedTemplate.reactionList]);
      setSelectedTaggedPeople([...selectedTemplate.taggedPeople]);
      setPostTitle(selectedTemplate.title);
      setPostCaption(selectedTemplate.caption);
    }
    onOpen();
  };
  return (
    <>
      <Button
        disableRipple
        disableAnimation
        size="sm"
        startContent={<BsImage size={24} />}
        className="bg-transparent font-medium text-sm lg:text-lg text-black-default hover:text-orange-default/90"
        onPress={() => handleSelectionChange(new Set(["custom"]))}
      >
        {"Media"}
      </Button>
      <ManagePostModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
      />
    </>
  );
};

export default ManagePostMediaButton;
