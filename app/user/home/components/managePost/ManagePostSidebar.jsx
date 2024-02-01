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
import { templateItemsAtom } from "../../store/ManagePostStore";
import ReactionSelect from "./ReactionSelect";
import ManagePostSidebarContent from "./ManagePostSidebarContent";
import CloseButton from "@/app/components/CloseButton";

// ### TODO Add Functionality

const ManagePostSidebar = () => {
  // console.log("MODAL", type);
  const templateItems = useAtomValue(templateItemsAtom);

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
    <>
      <div className="flex justify-between items-start py-4 px-6">
        <div className="flex-col">
          <p className="text-2xl">{"Community Post"}</p>
          <p className="text-xs font-normal">
            {"Manage your community posts here"}
          </p>
        </div>
      </div>
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
    </>
  );
};

export default ManagePostSidebar;
