import CTAButtons from "@/app/components/CTAButtons";
import { Divider } from "@nextui-org/react";
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
            tagPeople: [...selectedTaggedPeople],
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

  const handleAddTemplate = () => {
    console.log("ADDED TEMPLATE");

    // ADD DRAFT TO PUBLISH LIST
    const filteredTemplateName = templateTypeSelection.map((template) => {
      return template.value;
    });

    console.log("templateTypeSelection", templateTypeSelection);

    if (filteredTemplateName.includes(templateName.toLowerCase())) {
      console.log("ALREADY ON SELECTION CHANGE NAME");
      // ### TODO Add Info Window
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
          tagPeople: [...selectedTaggedPeople],
          caption: postCaption,
        },
      ]);
    }

    // PUBLISH DRAFT TO NEWS FEED
    

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
      action: handleAddTemplate,
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
    <div className="flex-col py-4">
      <div className="flex-col py-2 px-6">
        <p className="text-2xl font-bold">{"Community Post"}</p>
        <p className="text-xs font-normal mb-4">
          {"Manage your community posts here"}
        </p>
        <Divider />
      </div>

      <ManagePostSidebarContent />
      <div className="flex justify-end py-4 px-6 gap-8">
        {Object.values(actionButtons).map((button) => {
          return (
            <CTAButtons
              key={button.label}
              fullWidth={true}
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
