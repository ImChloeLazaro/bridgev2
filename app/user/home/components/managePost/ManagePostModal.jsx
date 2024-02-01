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
import CTAButtons from "../../../../components/CTAButtons";
import { templateItemsAtom } from "../../store/ManagePostStore";
import ReactionSelect from "./ReactionSelect";
import ManagePostSidebar from "./ManagePostSidebar";
import ManagePostMainContent from "./ManagePostMainContent";

// ### TODO Add Functionality

const ManagePostModal = ({ isOpen, onOpenChange, isDismissable, type }) => {
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
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={isDismissable}
      hideCloseButton
      size={"5xl"}
      scrollBehavior={"outside"}
      // placement={"center"}
      classNames={{
        // inset-x-16 inset-y-8 inset-0 top-8 left-16
        wrapper: "h-full my-0 p-0",
        base: "h-full my-0 p-0 bg-transparent shadow-none sm:my-2 sm:fixed sm:inset-x-6",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <ModalBody>
            <div className="flex max-w-screen max-h-screen">
              <div className="basis-2/5 max-w-[30rem] bg-white-default rounded-l-lg border-2 border-darkgrey-default/50">
                <ManagePostSidebar />
              </div>
              <div className="basis-3/5 h-full max-h-screen bg-background rounded-r-lg border-darkgrey-default/40">
                <ManagePostMainContent onClose={onClose} />
              </div>
            </div>
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ManagePostModal;
