import {
  Button,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { useAtomValue, useAtom, useSetAtom } from "jotai";
import { MdInfoOutline } from "react-icons/md";
import { MdFileUpload } from "react-icons/md";
import CTAButtons from "../../../../components/CTAButtons";
import {
  templateTypeSelectionAtom,
  selectedTemplateTypeAtom,
  postTitleAtom,
  templateNameAtom,
  postTemplatesAtom,
  selectedReactionsAtom,
  selectedTaggedPeopleAtom,
  postCaptionAtom,
  postTemplatesCountAtom,
} from "../../store/ManagePostStore";
import ReactionSelect from "../reaction/ReactionSelect";
import TagPersonSelect from "./TagPersonSelect";
import { useState } from "react";

const ManagePostSidebarContent = () => {
  const [selectedTemplateType, setTemplateType] = useAtom(
    selectedTemplateTypeAtom
  );

  const templateTypeSelection = useAtomValue(templateTypeSelectionAtom);

  const [postTitle, setPostTitle] = useAtom(postTitleAtom);
  const [postCaption, setPostCaption] = useAtom(postCaptionAtom);
  const [templateName, setTemplateName] = useAtom(templateNameAtom);
  const [postTemplates, setPostTemplates] = useAtom(postTemplatesAtom);

  const postTemplatesCount = useAtomValue(postTemplatesCountAtom);

  const [selectedReactions, setSelectedReactions] = useAtom(
    selectedReactionsAtom
  );
  const [selectedTaggedPeople, setSelectedTaggedPeople] = useAtom(
    selectedTaggedPeopleAtom
  );

  const handleSelectionChange = (key) => {
    const selectedTemplate = postTemplates.filter(
      (template) => template.type === Array.from(key).join("")
    )[0];

    if (selectedTemplate) {
      setSelectedReactions([...selectedTemplate.reactionList]);
      setSelectedTaggedPeople([...selectedTemplate.tagPeople]);
      setPostTitle(selectedTemplate.title);
      setPostCaption(selectedTemplate.caption);
    }
    setTemplateType(key);
    setPostTemplates((prev) => [
      ...prev,
      {
        id: postTemplatesCount + 1,
        name: templateName,
        type: templateName.toLowerCase(),
        reactionList: [...selectedReactions],
        mediaLayout: "one",
        orientation: "landscape",
        title: postTitle,
        tagPeople: [...selectedTaggedPeople],
        caption: postCaption,
      },
    ]);
  };

  return (
    <div className="w-full max-w-md max-h-full overflow-y-scroll no-scrollbar">
      <div className="flex flex-col justify-between h-screen max-h-[50rem] py-2 px-6 gap-3 ">
        <div className="flex justify-start items-center gap-1">
          <p className="font-bold">{"Template Settings"}</p>
          <MdInfoOutline />
        </div>
        <div className="flex justify-between items-center gap-5">
          <p className="font-normal w-24">{"Type"}</p>
          <Select
            aria-label="Template Type Selection"
            items={templateTypeSelection}
            disallowEmptySelection={true}
            selectedKeys={selectedTemplateType}
            onSelectionChange={(key) => handleSelectionChange(key)}
            classNames={{
              base: "max-w-sm",
              trigger: "min-h-unit-12 py-2",
            }}
          >
            {(template) => (
              <SelectItem key={template.value} value={template.value}>
                {template.label}
              </SelectItem>
            )}
          </Select>
        </div>
        {Array.from(selectedTemplateType).join("") === "custom" && (
          <div className="flex justify-between items-center gap-5">
            <p className="font-normal w-24">{"Name"}</p>
            <Input
              fullWidth
              size="sm"
              label="Give your custom template a name"
              className="max-w-sm"
              value={templateName}
              onValueChange={setTemplateName}
            />
          </div>
        )}

        <div className="flex justify-between items-center gap-5">
          <p className="font-normal w-24">{"Reaction"}</p>
          <ReactionSelect />
        </div>

        {/* Media */}
        <Divider />
        <div className="flex justify-start items-center gap-1">
          <p className="font-bold">{"Media"}</p>
          <MdInfoOutline />
        </div>
        <div className="flex justify-start items-center gap-5 ">
          <p className="font-normal w-24">{"Choose Layout"}</p>
          <div className="w-full h-40 bg-grey-hover rounded-md my-2"></div>
        </div>
        <div className="flex justify-start items-center gap-5">
          <p className="font-normal w-20">{"Files"}</p>
          {/* <Button startContent={<MdFileUpload size={24} />}>
             {"Upload"} 
            
          </Button> */}
          <input
            type="file"
            id="post media"
            name="post media"
            accept=".jpg, .jpeg, .png"
            multiple
            className="border-none"
          />
        </div>

        {/* Description */}
        <Divider />
        <div className="flex justify-start items-center gap-1">
          <p className="font-bold">{"Description"}</p>
          <MdInfoOutline />
        </div>
        <div className="flex justify-between items-center gap-5">
          <p className="font-normal w-24">{"Title"}</p>
          <Input
            fullWidth
            size="sm"
            label="Give your post a name"
            className="max-w-sm"
            value={postTitle}
            onValueChange={setPostTitle}
          />
        </div>
        <div className="flex justify-between items-center gap-5">
          <p className="font-normal w-24">{"Tag People"}</p>
          <TagPersonSelect />
        </div>
        <div className="flex justify-between items-center gap-5">
          <p className="font-normal w-24">{"Caption"}</p>
          <Textarea
            value={postCaption}
            onValueChange={setPostCaption}
            label="Give your post a caption"
            className="max-w-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default ManagePostSidebarContent;
