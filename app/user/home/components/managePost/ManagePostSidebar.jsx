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
import { useAtomValue } from "jotai";
import { MdInfoOutline } from "react-icons/md";
import { MdFileUpload } from "react-icons/md";
import { MdMinimize } from "react-icons/md";
import CTAButtons from "../../../../components/CTAButtons";
import { postTemplatesAtom, selectedTemplateTypeAtom } from "../../store/ManagePostStore";
import ReactionSelect from "../reaction/ReactionSelect";
import ManagePostSidebarContent from "./ManagePostSidebarContent";
import CloseButton from "@/app/components/CloseButton";

// ### TODO Add Functionality

const ManagePostSidebar = () => {
  // console.log("MODAL", type);
  const postTemplates = useAtomValue(postTemplatesAtom);
  const templateType = useAtomValue(selectedTemplateTypeAtom);

  const handleEditTemplate = () => {
    console.log("EDITED TEMPLATE");
  };
  const handleSaveTemplate = () => {
    console.log("SAVED TEMPLATE");
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
      
      <ManagePostSidebarContent data={postTemplates}/>
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
