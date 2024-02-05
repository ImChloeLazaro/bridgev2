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
import { MdMinimize } from "react-icons/md";
import CTAButtons from "../../../../components/CTAButtons";
import {
  postTemplatesAtom,
  selectedTemplateTypeAtom,
  templateNameAtom,
  templateTypeCountAtom,
  templateTypeSelectionAtom,
} from "../../store/ManagePostStore";
import ReactionSelect from "../reaction/ReactionSelect";
import ManagePostSidebarContent from "./ManagePostSidebarContent";
import CloseButton from "@/app/components/CloseButton";
import { useEffect } from "react";

// ### TODO Add Functionality

const ManagePostSidebar = () => {
  const [templateTypeSelection, setTemplateTypeSelection] = useAtom(
    templateTypeSelectionAtom
  );

  const templateName = useAtomValue(templateNameAtom);
  const templateTypeCount = useAtomValue(templateTypeCountAtom);

  const handleEditTemplate = () => {
    console.log("EDITED TEMPLATE");
  };
  const handleSaveTemplate = () => {
    console.log("SAVED TEMPLATE");
    console.log("templateTypeCount", templateTypeCount);
    const filteredTemplateName = templateTypeSelection.map((template) => {
      return template.value;
    });
    console.log("filteredTemplateName", filteredTemplateName);

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
    }

    // setPostTemplates(() => {});
  };

  const actionButtons = {
    edit: { color: "blue", label: "Edit Template", action: handleEditTemplate },
    save: {
      color: "orange",
      label: "Save Template",
      action: handleSaveTemplate,
    },
  };

  return (
    <div className="flex-col py-4">
      {/* <div className="flex justify-between items-start"> */}
      <div className="flex-col py-2 px-6">
        <p className="text-2xl font-bold">{"Community Post"}</p>
        <p className="text-xs font-normal mb-4">
          {"Manage your community posts here"}
        </p>
        <Divider />
      </div>
      {/* </div> */}

      <ManagePostSidebarContent />
      <div className="flex justify-end py-4 px-6 gap-8">
        <CTAButtons
          fullWidth={true}
          label={actionButtons.edit.label}
          color={actionButtons.edit.color}
          onPress={actionButtons.edit.action}
        />
        <CTAButtons
          fullWidth={true}
          label={actionButtons.save.label}
          color={actionButtons.save.color}
          onPress={actionButtons.save.action}
        />
      </div>
    </div>
  );
};

export default ManagePostSidebar;
