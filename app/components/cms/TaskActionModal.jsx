import { userListAtom } from "@/app/store/UserStore";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useAtomValue } from "jotai";
import CTAButtons from "../CTAButtons";
import FormFieldSelect from "../FormFieldSelect";
import { useState } from "react";

const TaskActionModal = ({
  isOpen,
  onOpenChange,
  onOpenAfterClose,
  sla,
  selectedTaskAction,
  updateSelectedProcessor,
  setUpdateSelectedProcessor,
  updateSelectedReviewer,
  setUpdateSelectedReviewer,
  ...props
}) => {
  const userList = useAtomValue(userListAtom);

  const processorsAssignees = sla?.processor.map((assignee) => assignee.sub);
  const reviewersAssignees = sla?.reviewer.map((assignee) => assignee.sub);

  const processorsSelection = userList?.map((user) => {
    if (!processorsAssignees?.includes(user.sub)) {
      return { ...user, key: user.sub, value: user.sub };
    }
  });
  const reviewersSelection = userList?.map((user) => {
    if (!reviewersAssignees?.includes(user.sub)) {
      return { ...user, key: user.sub, value: user.sub };
    }
  });

  const processors = sla?.processor;
  const reviewers = sla?.reviewer;

  const actionDetails = {
    assign: {
      title: "New Task Assignees",
      label: "Assign Member",
      color: "blue",
      form: (
        <>
          <div className="flex flex-col items-start justify-between gap-2 ">
            <p className="w-1/3 text-base font-medium text-black-default">
              {"Processor"}
            </p>
            <FormFieldSelect
              label="Assigned to"
              placeholder="Select processor/s"
              selectionMode={"multiple"}
              items={processorsSelection}
              selectedKeys={updateSelectedProcessor}
              disabledValidation={true}
              onSelectionChange={setUpdateSelectedProcessor}
              renderType={"chip"}
              renderItemPicture={true}
            />
          </div>
          <div className="flex flex-col items-start justify-between gap-2 ">
            <p className="w-1/3 text-base font-medium text-black-default">
              {"Reviewer"}
            </p>
            <FormFieldSelect
              label="Assigned to"
              placeholder="Select reviewer/s"
              selectionMode={"multiple"}
              items={reviewersSelection}
              selectedKeys={updateSelectedReviewer}
              disabledValidation={true}
              onSelectionChange={setUpdateSelectedReviewer}
              renderType={"chip"}
              renderItemPicture={true}
            />
          </div>
        </>
      ),
    },
    remove: {
      title: "Remove Task Assignees",
      label: "Remove Member",
      color: "red",
      form: (
        <>
          <div className="flex flex-col items-start justify-between gap-4">
            <p className="w-1/3 text-base font-medium text-black-default">
              {"Processor"}
            </p>
            <FormFieldSelect
              label="Remove from"
              placeholder="Select processor/s"
              selectionMode={"multiple"}
              items={processors}
              selectedKeys={updateSelectedProcessor}
              disabledValidation={true}
              onSelectionChange={setUpdateSelectedProcessor}
              renderType={"chip"}
              renderItemPicture={true}
            />
          </div>
          <div className="flex flex-col items-start justify-between gap-4">
            <p className="w-1/3 text-base font-medium text-black-default">
              {"Reviewer"}
            </p>
            <FormFieldSelect
              label="Remove from"
              placeholder="Select reviewer/s"
              selectionMode={"multiple"}
              items={reviewers}
              selectedKeys={updateSelectedReviewer}
              disabledValidation={true}
              onSelectionChange={setUpdateSelectedReviewer}
              renderType={"chip"}
              renderItemPicture={true}
            />
          </div>
        </>
      ),
    },
  };

  const handleFormAction = (e) => {
    return false;
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      classNames={{ closeButton: "hidden" }}
      {...props}
    >
      <ModalContent>
        {(onClose) => (
          <form action={handleFormAction}>
            <ModalHeader className="flex flex-col gap-1">
              <p className="font-bold text-black-default">
                {actionDetails[selectedTaskAction.key]?.title}
              </p>
            </ModalHeader>
            <ModalBody>{actionDetails[selectedTaskAction.key]?.form}</ModalBody>
            <ModalFooter>
              <CTAButtons
                label={"Cancel"}
                color={"clear"}
                onPress={() => {
                  setUpdateSelectedProcessor(new Set([]));
                  setUpdateSelectedReviewer(new Set([]));
                  onClose();
                }}
              />
              <CTAButtons
                type={"submit"}
                label={actionDetails[selectedTaskAction.key]?.label}
                color={actionDetails[selectedTaskAction.key]?.color}
                className={"px-6"}
                onPress={() => {
                  onOpenAfterClose();
                  onClose();
                }}
              />
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
};

export default TaskActionModal;
