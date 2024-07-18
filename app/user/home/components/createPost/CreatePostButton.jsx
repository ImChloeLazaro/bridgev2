import { Button, useDisclosure } from "@nextui-org/react";
import { useAtomValue, useSetAtom } from "jotai";
import {
  postCaptionAtom,
  postTemplatesAtom,
  postTitleAtom,
  selectedReactionsAtom,
  selectedTaggedPeopleAtom,
  selectedTemplateTypeAtom,
} from "../../store/ManagePostStore";
import ManagePostModal from "../managePost/ManagePostModal";
import CTAButtons from "@/app/components/CTAButtons";

const CreatePostButton = () => {
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
      <CTAButtons label={"Create a Post"} className={"flex justify-start items-center h-12 bg-transparent"} cnLabel={"font-medium"} variant="ghost" disableRipple onPress={() => handleSelectionChange(new Set(["custom"]))}/>
      <ManagePostModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
      />
    </>
  );
};

export default CreatePostButton;
