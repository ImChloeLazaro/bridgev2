import CTAButtons from "@/app/components/CTAButtons";
import FormFieldSelect from "@/app/components/FormFieldSelect";
import {
  Divider,
  Input,
  Textarea
} from "@nextui-org/react";
import { useAtom, useAtomValue } from "jotai";
import { useCallback, useRef } from "react";
import { MdInfoOutline } from "react-icons/md";
import {
  fileListAtom,
  fileUrlListAtom,
  filterKeysAtom,
  mediaFileListAtom,
  mediaLayoutSelectionAtom,
  mediaOrientationSelectionAtom,
  postCaptionAtom,
  postTemplatesAtom,
  postTitleAtom,
  reactionsSelectionAtom,
  selectedMediaLayoutAtom,
  selectedMediaOrientationAtom,
  selectedReactionsAtom,
  selectedTaggedPeopleAtom,
  selectedTemplateTypeAtom,
  taggedPeopleListAtom,
  templateNameAtom,
  templateTypeSelectionAtom,
} from "../../store/ManagePostStore";
import MediaLayoutPreview from "../mediaLayout/MediaLayoutPreview";

const ManagePostSidebarContent = () => {
  const [fileList, setFileList] = useAtom(fileListAtom);
  const [fileUrlList, setFileUrlList] = useAtom(fileUrlListAtom);

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

  const mediaLayoutSelection = useAtomValue(mediaLayoutSelectionAtom);
  const mediaOrientationSelection = useAtomValue(mediaOrientationSelectionAtom);

  const [mediaFileList, setMediaFileList] = useAtom(mediaFileListAtom);
  const reactionsSelection = useAtomValue(reactionsSelectionAtom);
  const [selectedReactions, setSelectedReactions] = useAtom(
    selectedReactionsAtom
  );
  const [selectedTaggedPeople, setSelectedTaggedPeople] = useAtom(
    selectedTaggedPeopleAtom
  );
  const taggedPeopleList = useAtomValue(taggedPeopleListAtom);

  const taggedPeopleKeys = taggedPeopleList.map((tag) => {
    if (tag.key !== "all") {
      return tag.key;
    }
  });

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

  const handleRemoveMedia = () => {
    if (inputFile.current) {
      inputFile.current.value = "";
      inputFile.current.type = "text";
      inputFile.current.type = "file";
    }
    setFileList(null);
    setFileUrlList(null);
    setMediaFileList([]);
  };

  const handleUploadFile = useCallback(
    (e) => {
      const list = e.target.files;
      if (!list) {
        return;
      }

      if (fileUrlList) {
        Object.values(list).forEach((file) => {
          return URL.revokeObjectURL(file);
        });
      }

      setFileList(list);
      setFileUrlList(() => {
        return Object.values(list).map((file) => {
          return URL.createObjectURL(file);
        });
      });
      setMediaFileList(list);
    },
    [fileUrlList, setFileList, setFileUrlList, setMediaFileList]
  );

  const handleSelectionChange = (key) => {
    const selectedTemplate = postTemplates.filter(
      (template) => template.type === Array.from(key).join("")
    )[0];

    if (selectedTemplate) {
      setTemplateName(selectedTemplate.type);
      setSelectedMediaOrientation([...selectedTemplate.orientation]);
      setSelectedMediaLayout([...selectedTemplate.mediaLayout]);
      setSelectedReactions([...selectedTemplate.reactionList]);
      setSelectedTaggedPeople([...selectedTemplate.taggedPeople]);
      setPostTitle(selectedTemplate.title);
      setPostCaption(selectedTemplate.caption);
    }
    setSelectedTemplateType(key);
  };

  const inputFile = useRef(null);

  return (
    <>
      <div className="flex justify-start items-center gap-1 mt-2">
        <p className="font-bold">{"Template Settings"}</p>
        <MdInfoOutline />
      </div>
      <div className="flex justify-between items-center gap-5">
        <p className="font-normal w-24">{"Type"}</p>
        <FormFieldSelect
          label="Template Type Selection"
          items={templateTypeSelection}
          selectedKeys={selectedTemplateType}
          onSelectionChange={handleSelectionChange}
        />
      </div>
      {(Array.from(selectedTemplateType).join("") === "custom" ||
        !templateOnlyList.includes(selectedTemplateTypeString)) && (
        <div className="flex justify-between items-center gap-5">
          <p className="font-normal w-24">{"Name"}</p>
          <Input
            fullWidth
            size="sm"
            label="Give your custom template a name"
            className=""
            value={templateName}
            onValueChange={setTemplateName}
          />
        </div>
      )}

      <div className="flex justify-between items-center gap-5">
        <p className="font-normal w-24">{"Reaction"}</p>
        <FormFieldSelect
          aria-label={"Reaction Selection"}
          items={reactionsSelection}
          selectionMode="single"
          description="This will be the default reaction displayed on your post"
          placeholder="Select reaction"
          selectedKeys={selectedReactions}
          onSelectionChange={setSelectedReactions}
          renderValue={(displayItems) => {
            return (
              <div className="flex flex-wrap gap-2 py-2 max-h-32 overflow-y-auto">
                {displayItems.map((displayItem, index) => (
                  <div
                    key={index}
                    className="flex gap-2 items-center justify-start"
                  >
                    <div className="">{displayItem.data.displayIcon}</div>
                    <div className="text-sm font-medium text-black-default">
                      {displayItem.data.label}
                    </div>
                  </div>
                ))}
              </div>
            );
          }}
        />
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
            <FormFieldSelect
              aria-label={"Media Layout Selection"}
              items={mediaLayoutSelection}
              placeholder="Choose Layout"
              selectedKeys={selectedMediaLayout}
              onSelectionChange={(key) => {
                setSelectedMediaLayout(key);
                selectedMediaLayoutString === "single"
                  ? setSelectedMediaOrientation(new Set(["portrait"]))
                  : setSelectedMediaOrientation(selectedMediaOrientation);
              }}
            />
          </div>
          <div className="flex justify-start items-center gap-5 mb-5">
            <p className="font-normal w-28">{"Orientation"}</p>
            <FormFieldSelect
              aria-label={"Media Orientation Selection"}
              items={mediaOrientationSelection}
              placeholder="Choose Orientation"
              selectedKeys={
                selectedMediaLayoutString === "single"
                  ? new Set(["portrait"])
                  : selectedMediaOrientation
              }
              onSelectionChange={(key) => setSelectedMediaOrientation(key)}
              isDisabled={selectedMediaLayoutString === "single"}
            />
          </div>
          {!mediaFileList?.length && (
            <p className="text-sm font-medium text-red-default">
              {"*Note: this will not display any media on your post"}
            </p>
          )}
        </div>
        <div className="w-60 lg:w-80 h-40 text-center">
          {(selectedMediaLayoutString ? (
            <div className="w-full h-full bg-white-default flex justify-center items-center py-2 m-0 rounded-md border-3 border-grey-hover">
              <MediaLayoutPreview
                mediaFileList={fileUrlList}
                layout={selectedMediaLayoutString}
                orientation={selectedMediaOrientationString}
              />
            </div>
          ) : (
            <div className="w-full h-full bg-white-default flex justify-center items-center py-2 m-0 rounded-md border-3 border-grey-hover">
              {"No media to display"}
            </div>
          )) &&
            (selectedMediaOrientationString ? (
              <div className="w-full h-full bg-white-default flex justify-center items-center py-2 m-0 rounded-md border-3 border-grey-hover">
                <MediaLayoutPreview
                  mediaFileList={fileUrlList}
                  layout={selectedMediaLayoutString}
                  orientation={selectedMediaOrientationString}
                />
              </div>
            ) : (
              <div className="w-full h-full bg-white-default flex justify-center items-center py-2 m-0 rounded-md border-3 border-grey-hover">
                {"No media to display"}
              </div>
            ))}
        </div>
      </div>

      <div className="flex justify-start items-center gap-5">
        <p className="font-normal w-20">{"Files"}</p>
        <input
          ref={inputFile}
          type="file"
          id="post media"
          name="post media"
          accept=".jpg, .jpeg, .png"
          placeholder="Upload file"
          multiple
          className="border-none"
          onChange={(e) => handleUploadFile(e)}
        />
        {fileList && (
          <CTAButtons
            label={"Remove media"}
            color={"clear"}
            onPress={handleRemoveMedia}
          />
        )}
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
          className=""
          value={postTitle}
          onValueChange={setPostTitle}
        />
      </div>
      <div className="flex justify-between items-center gap-5">
        <p className="font-normal w-24">{"Tag People"}</p>
        <FormFieldSelect
          aria-label={"Tag People Selection"}
          label={"Tag people to your post!"}
          items={taggedPeopleList}
          selectionMode="multiple"
          selectedKeys={selectedTaggedPeople}
          onSelectionChange={(key) => {
            console.log("selectedTaggedPeople", selectedTaggedPeople);
            if (Array.from(key).includes("all")) {
              setSelectedTaggedPeople(["all"]);
            } else {
              setSelectedTaggedPeople(key);
            }
          }}
          renderItemPicture={true}
          renderType={"chip"}
          disabledKeys={
            Array.from(selectedTaggedPeople).toString() === "all"
              ? taggedPeopleKeys
              : null
          }
        />
      </div>
      <div className="flex justify-between items-center gap-5 mb-2">
        <p className="font-normal w-24">{"Caption"}</p>
        <Textarea
          value={postCaption}
          onValueChange={setPostCaption}
          label="Give your post a caption"
          className=""
        />
      </div>
    </>
  );
};

export default ManagePostSidebarContent;
