import {
  Divider,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { MdInfoOutline } from "react-icons/md";
import {
  filterKeysAtom,
  mediaFileListAtom,
  postCaptionAtom,
  postTemplatesAtom,
  postTitleAtom,
  selectedMediaLayoutAtom,
  selectedMediaOrientationAtom,
  selectedReactionsAtom,
  selectedTaggedPeopleAtom,
  selectedTemplateTypeAtom,
  templateNameAtom,
  templateTypeSelectionAtom,
} from "../../store/ManagePostStore";
import ReactionSelect from "../reaction/ReactionSelect";
import TagPersonSelect from "./TagPersonSelect";
import MediaLayoutSelect from "../mediaLayout/MediaLayoutSelect";
import MediaOrientationSelect from "../mediaLayout/MediaOrientationSelect";
import MediaLayoutDisplay from "../mediaLayout/MediaLayoutPreview";

const ManagePostSidebarContent = () => {
  const [selectedTemplateType, setSelectedTemplateType] = useAtom(
    selectedTemplateTypeAtom
  );
  const [postTitle, setPostTitle] = useAtom(postTitleAtom);
  const [postCaption, setPostCaption] = useAtom(postCaptionAtom);
  const [templateName, setTemplateName] = useAtom(templateNameAtom);

  const templateTypeSelection = useAtomValue(templateTypeSelectionAtom);
  const postTemplates = useAtomValue(postTemplatesAtom);

  const [selectedMediaOrientation, setSelectedMediaOrientation] = useAtom(
    selectedMediaOrientationAtom
  );
  const [selectedMediaLayout, setSelectedMediaLayout] = useAtom(
    selectedMediaLayoutAtom
  );
  const [mediaFileList, setMediaFileList] = useAtom(mediaFileListAtom);
  const setSelectedReactions = useSetAtom(selectedReactionsAtom);
  const setSelectedTaggedPeople = useSetAtom(selectedTaggedPeopleAtom);
  const filterKeys = useAtomValue(filterKeysAtom);

  const selectedMediaOrientationString = Array.from(
    selectedMediaOrientation
  ).join("");
  const selectedMediaLayoutString = Array.from(selectedMediaLayout).join("");
  const selectedTemplateTypeString = Array.from(selectedTemplateType).join("");

  const templateOnlyList = filterKeys
    .filter((template) => template.value != "all")
    .map((template) => {
      return template.value;
    });

  const handleSelectionChange = (key) => {
    const selectedTemplate = postTemplates.filter(
      (template) => template.type === Array.from(key).join("")
    )[0];

    if (selectedTemplate) {
      setTemplateName(selectedTemplate.type);
      setSelectedMediaOrientation([...selectedTemplate.orientation]);
      setSelectedMediaLayout([...selectedTemplate.mediaLayout]);
      setMediaFileList(selectedTemplate.media);
      setSelectedReactions([...selectedTemplate.reactionList]);
      setSelectedTaggedPeople([...selectedTemplate.taggedPeople]);
      setPostTitle(selectedTemplate.title);
      setPostCaption(selectedTemplate.caption);
    }
    setSelectedTemplateType(key);
  };

  return (
    <div className="w-full max-w-lg max-h-full overflow-y-scroll no-scrollbar">
      <div className="flex flex-col justify-between w-full h-screen max-h-[50rem] py-2 px-6 gap-3 ">
        <div className="flex justify-start items-center gap-1">
          <p className="font-bold">{"Template Settings"}</p>
          <MdInfoOutline />
        </div>
        <div className="flex justify-between items-center gap-5">
          <p className="font-normal w-24">{"Type"}</p>
          
          {/* // ### TODO UPDATE TO AUTOCOMPLETE COMPONENT */}
          {/* // ### TODO Include the custom template keys as filter keys */}
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
              <SelectItem
                key={template.value}
                value={template.value}
                textValue={template.label}
              >
                {template.label}
              </SelectItem>
            )}
          </Select>
        </div>
        {(Array.from(selectedTemplateType).join("") === "custom" ||
          !templateOnlyList.includes(selectedTemplateTypeString)) && (
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
        <div className="flex justify-start items-center w-full h-fit gap-8">
          {/* // Layout & Orientation */}
          <div className="flex-col justify-center items-center w-full">
            <div className="flex justify-start items-center gap-5 mb-5">
              <p className="font-normal w-28">{"Layout"}</p>
              <MediaLayoutSelect />
            </div>
            <div className="flex justify-start items-center gap-5 mb-5">
              <p className="font-normal w-24">{"Orientation"}</p>
              <MediaOrientationSelect />
            </div>
          </div>
          {/* // Display */}
          {/* <div className="w-80 h-40 bg-grey-hover rounded-md p-1"></div> */}
          {(selectedMediaLayoutString ? (
            <div className="w-80 h-40 bg-white-default flex justify-center items-center py-2 m-0 rounded-md border-3 border-grey-hover">
              <MediaLayoutDisplay
                mediaFileList={mediaFileList}
                layout={selectedMediaLayoutString}
                orientation={selectedMediaOrientationString}
              />
            </div>
          ) : (
            <div className="w-80 h-40 bg-white-default flex justify-center items-center py-2 m-0 rounded-md border-3 border-grey-hover">
              {"No media to display"}
            </div>
          )) &&
            (selectedMediaOrientationString ? (
              <div className="w-80 h-40 bg-white-default flex justify-center items-center py-2 m-0 rounded-md border-3 border-grey-hover">
                <MediaLayoutDisplay
                  mediaFileList={mediaFileList}
                  layout={selectedMediaLayoutString}
                  orientation={selectedMediaOrientationString}
                />
              </div>
            ) : (
              <div className="w-80 h-40 bg-white-default flex justify-center items-center py-2 m-0 rounded-md border-3 border-grey-hover">
                {"No media to display"}
              </div>
            ))}
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
