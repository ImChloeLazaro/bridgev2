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
import ManagePostModal from "./ManagePostModal";

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
    console.log("INSIDE CREATE POST BUTTON HERE", key);

    console.log("CREATE POST BUTTON selectedTemplate", selectedTemplate);

    if (selectedTemplate) {
      setSelectedReactions([...selectedTemplate.reactionList]);
      setSelectedTaggedPeople([...selectedTemplate.tagPeople]);
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
        isIconOnly
        className="bg-transparent w-full h-16 text-lg font-medium text-black-default border-[2.5px] rounded-lg border-[#BEBEBE]/80 border-solid flex justify-start items-center pl-4"
        onPress={() => handleSelectionChange(new Set(["custom"]))}
      >
        {/* // ### TODO Randomize placeholder text */}
        {"Create a Post"}
      </Button>
      <ManagePostModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
      />
    </>
  );
};

export default CreatePostButton;
