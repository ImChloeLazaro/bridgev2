import CTAButtons from "@/app/components/CTAButtons";
import { Divider, ScrollShadow } from "@nextui-org/react";
import { useAtom, useAtomValue } from "jotai";
import {
  filterKeysAtom,
  postCaptionAtom,
  postTemplatesAtom,
  postTemplatesCountAtom,
  postTitleAtom,
  selectedMediaLayoutAtom,
  selectedMediaOrientationAtom,
  selectedReactionsAtom,
  selectedTaggedPeopleAtom,
  selectedTemplateTypeAtom,
  templateNameAtom,
  templateTypeCountAtom,
  templateTypeSelectionAtom,
} from "../../store/ManagePostStore";
import ManagePostSidebarContent from "./ManagePostSidebarContent";

const ManagePostSidebar = () => {
  const [templateTypeSelection, setTemplateTypeSelection] = useAtom(
    templateTypeSelectionAtom
  );

  const [selectedTemplateType, setSelectedTemplateType] = useAtom(
    selectedTemplateTypeAtom
  );

  const [postTitle, setPostTitle] = useAtom(postTitleAtom);
  const [postCaption, setPostCaption] = useAtom(postCaptionAtom);
  const [templateName, setTemplateName] = useAtom(templateNameAtom);
  const [postTemplates, setPostTemplates] = useAtom(postTemplatesAtom);

  const [selectedMediaOrientation, setSelectedMediaOrientation] = useAtom(
    selectedMediaOrientationAtom
  );
  const [selectedMediaLayout, setSelectedMediaLayout] = useAtom(
    selectedMediaLayoutAtom
  );

  const [selectedReactions, setSelectedReactions] = useAtom(
    selectedReactionsAtom
  );
  const [selectedTaggedPeople, setSelectedTaggedPeople] = useAtom(
    selectedTaggedPeopleAtom
  );
  const postTemplatesCount = useAtomValue(postTemplatesCountAtom);

  const templateTypeCount = useAtomValue(templateTypeCountAtom);
  const filterKeys = useAtomValue(filterKeysAtom);

  const selectedTemplateTypeString = Array.from(selectedTemplateType).join("");

  const handleUpdateTemplate = () => {
    console.log("UPDATED TEMPLATE");
    setTemplateTypeSelection(() =>
      templateTypeSelection.map((template) => {
        if (template.value === selectedTemplateTypeString) {
          return {
            ...template,
            value: templateName.toLowerCase(),
            label: templateName,
          };
        }
        return template;
      })
    );
    setSelectedTemplateType([templateName]);
    setPostTemplates(() =>
      postTemplates.map((template) => {
        if (template.name === selectedTemplateTypeString) {
          return {
            ...template,
            name: templateName,
            type: templateName.toLowerCase(),
            reactionList: [...selectedReactions],
            mediaLayout: [...selectedMediaLayout],
            orientation: [...selectedMediaOrientation],
            title: postTitle,
            taggedPeople: [...selectedTaggedPeople],
            caption: postCaption,
          };
        }
        return template;
      })
    );
  };

  const handleDeleteTemplate = () => {
    console.log("DELETED TEMPLATE");
    setSelectedTemplateType(new Set(["custom"]));

    setTemplateTypeSelection(() => {
      return templateTypeSelection.filter(
        (templateType) => templateType.value !== selectedTemplateTypeString
      );
    });
    setTemplateName("");

    setPostTemplates(() =>
      postTemplates.filter((template) => {
        template.type !== selectedTemplateTypeString;
      })
    );
    setPostTitle("");
    setSelectedReactions([]);
    setSelectedMediaLayout([]);
    setSelectedMediaOrientation([]);
    setSelectedTaggedPeople([]);
    setPostCaption("");
  };

  const handleSaveTemplate = () => {
    console.log("SAVED TEMPLATE");

    // ADD DRAFT TO PUBLISH LIST
    const filteredTemplateName = templateTypeSelection.map((template) => {
      return template.value;
    });

    console.log("templateTypeSelection", templateTypeSelection);
    console.log("postTitle", postTitle);

    if (filteredTemplateName.includes(templateName.toLowerCase())) {
      console.log("ALREADY ON SELECTION CHANGE NAME");
    } else {
      setTemplateTypeSelection((prev) => [
        ...prev,
        {
          key: `template-${templateTypeCount + 1}`,
          label: templateName,
          value: templateName.toLowerCase(),
        },
      ]);
      setSelectedTemplateType([templateName]);
      setPostTemplates((prev) => [
        ...prev,
        {
          id: postTemplatesCount + 1,
          name: templateName,
          type: templateName.toLowerCase(),
          reactionList: [...selectedReactions],
          mediaLayout: [...selectedMediaLayout],
          orientation: [...selectedMediaOrientation],
          title: postTitle,
          taggedPeople: [...selectedTaggedPeople],
          caption: postCaption,
        },
      ]);
    }

    console.log("postTemplates", postTemplates);
  };

  const templateOnlyList = filterKeys
    .filter((template) => template.value != "all")
    .map((template) => {
      return template.value;
    });

  const customTemplateActionButtons = {
    add: {
      color: "orange",
      label: "Save Template",
      action: handleSaveTemplate,
    },
  };

  const customActionButtons = {
    delete: {
      color: "red",
      label: "Delete Template",
      action: handleDeleteTemplate,
    },
    update: {
      color: "blue",
      label: "Update Template",
      action: handleUpdateTemplate,
    },
  };

  const actionButtons =
    Array.from(selectedTemplateType).join("") === "custom"
      ? customTemplateActionButtons
      : templateOnlyList.includes(selectedTemplateTypeString)
      ? {} // no action for templates
      : customActionButtons;

  return (
    <div className="flex flex-col h-full justify-between items-stretch pt-3 rounded-l-lg">
      <div className="flex flex-col py-2 px-6 rounded-l-lg">
        <p className="text-2xl font-bold">{"Community Post"}</p>
        <p className="text-xs font-normal mb-4">
          {"Manage your community posts here"}
        </p>
        <Divider />
      </div>
      <div className="h-full overflow-y-scroll">
        <div className="flex flex-col justify-between h-fit py-2 px-8 gap-3">
          <ManagePostSidebarContent />
        </div>
      </div>

      <div className="flex flex-col pt-0 pb-4 px-6 gap-8">
        {Array.from(selectedTemplateType).join("") === "custom" && <Divider />}
        {Object.values(actionButtons).map((button) => {
          return (
            <CTAButtons
              key={button.label}
              fullWidth={true}
              size="md"
              label={button.label}
              color={button.color}
              onPress={button.action}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ManagePostSidebar;
