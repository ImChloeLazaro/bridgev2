import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { Textarea, Button, Divider, Input } from "@nextui-org/react";
import { MdInfoOutline } from "react-icons/md";
import ReactionSelect from "./ReactionSelect";
import CTAButtons from "../../../../components/CTAButtons";
import { useAtom, useAtomValue } from "jotai";
import { templateItemsAtom } from "../../store/ManagePostStore";

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
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <p className="text-2xl">Community Post</p>
              <p className="text-xs font-normal">
                Manage your community posts here
              </p>
            </ModalHeader>
            <ModalBody className="pt-0">
              {/*Template Settings */}
              <Divider />
              <div className="flex justify-start items-center gap-1">
                <p className="font-bold">Template Settings</p>
                <MdInfoOutline />
              </div>
              <div className="flex justify-between items-center gap-5">
                <p className="font-normal">Type</p>
                <Select
                  size={"sm"}
                  items={templateItems}
                  placeholder="Custom"
                  className="max-w-xs"
                >
                  {(template) => (
                    <SelectItem key={template.value}>
                      {template.label}
                    </SelectItem>
                  )}
                </Select>
              </div>
              <div className="flex justify-between items-center gap-5">
                <p className="font-normal">Reaction</p>
                <ReactionSelect />
              </div>

              {/*Media */}
              <Divider />
              <div className="flex justify-start items-center gap-1">
                <p className="font-bold">Media</p>
                <MdInfoOutline />
              </div>
              <div className="w-full h-40"></div>
              <div className="flex justify-start items-center gap-5">
                <p className="font-bold">Files</p>
                <div className="flex gap-2">
                  <Button>Add Picture</Button>
                  <Button>Add Video</Button>
                </div>
              </div>

              {/*Description*/}
              <Divider />
              <div className="flex justify-start items-center gap-1">
                <p className="font-bold">Description</p>
                <MdInfoOutline />
              </div>
              <div className="flex justify-between items-center gap-5">
                <p className="font-normal w-10">Title</p>
                <Input fullWidth size="sm" label="Give your post a name" />
              </div>
              <div className="flex justify-between items-center gap-5">
                <p className="font-normal w-10">Tag People</p>
                <ReactionSelect />
              </div>
              <div className="flex justify-between items-center gap-5">
                <p className="font-normal w-10">Caption</p>
                <Textarea
                  placeholder="Enter your description"
                  className="max-w-xs"
                />
              </div>
            </ModalBody>
            <ModalFooter className="flex justify-end">
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
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ManagePostModal;
