import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import FormFieldSelect from "../FormFieldSelect";
import { userListAtom } from "@/app/store/UserStore";
import { useAtomValue } from "jotai";
import CTAButtons from "../CTAButtons";

const TaskActionModal = ({
  tasks,
  isOpen,
  onOpenChange,
  onOpenAfterClose,
  selectedTaskAction,
  selectedProcessorTaskAction,
  setSelectedProcessorTaskAction,
  selectedReviewerTaskAction,
  setSelectedReviewerTaskAction,
  ...props
}) => {
  const filterUniqueByKey = (array, key) => {
    const seen = new Map();
    array?.forEach((item) => seen.set(item[key], item));
    return Array.from(seen.values());
  };
  const userList = useAtomValue(userListAtom);

  const filteredProcessors = filterUniqueByKey(tasks?.processor, "sub");
  const filteredReviewers = filterUniqueByKey(tasks?.reviewer, "sub");

  const processorsAssignees = [...filteredProcessors].map(
    (assignee) => assignee.sub
  );

  const reviewersAssignees = [...filteredReviewers].map(
    (assignee) => assignee.sub
  );

  const processorsSelection = userList.map((user) => {
    if (!processorsAssignees.includes(user.sub)) {
      return { ...user, key: user.sub, value: user.sub };
    }
  });
  const reviewersSelection = userList.map((user) => {
    if (!reviewersAssignees.includes(user.sub)) {
      return { ...user, key: user.sub, value: user.sub };
    }
  });

  let isDisabled =
    Boolean(selectedProcessorTaskAction?.size) ||
    Boolean(selectedReviewerTaskAction?.size);

  const processors = new Set([...tasks?.processor]) ?? new Set([]); // new Set([...tasks?.processor]) ??
  const reviewers = new Set([...tasks?.reviewer]) ?? new Set([]); // new Set([...tasks?.review]) ??

  const windowDetails = {
    assign: {
      title: "New Task Assignees",
      label: "Assign Member",
      color: "blue",
    },
    remove: {
      title: "Remove Task Assignees",
      label: "Remove Member",
      color: "red",
    },
  };

  const handleFormAction = (e) => {
    console.log("handleFormAction", e);
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
                {windowDetails[selectedTaskAction.key]?.title}
              </p>
            </ModalHeader>
            <ModalBody>
              {selectedTaskAction.key === "assign" && (
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
                      renderItemPicture={true}
                      selectedKeys={selectedProcessorTaskAction}
                      onSelectionChange={setSelectedProcessorTaskAction}
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
                      renderItemPicture={true}
                      selectedKeys={selectedReviewerTaskAction}
                      onSelectionChange={setSelectedReviewerTaskAction}
                    />
                  </div>
                </>
              )}

              {selectedTaskAction.key === "remove" && (
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
                      renderItemPicture={true}
                      selectedKeys={selectedProcessorTaskAction}
                      onSelectionChange={setSelectedProcessorTaskAction}
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
                      renderItemPicture={true}
                      selectedKeys={selectedReviewerTaskAction}
                      onSelectionChange={setSelectedReviewerTaskAction}
                    />
                  </div>
                </>
              )}
            </ModalBody>
            <ModalFooter>
              <CTAButtons
                label={"Cancel"}
                color={"clear"}
                onPress={() => {
                  setSelectedProcessorTaskAction(new Set([]));
                  setSelectedReviewerTaskAction(new Set([]));
                  onClose();
                }}
              />
              <CTAButtons
                type={"submit"}
                isDisabled={!isDisabled}
                label={windowDetails[selectedTaskAction.key]?.label}
                color={windowDetails[selectedTaskAction.key]?.color}
                onPress={() => {
                  onOpenAfterClose();
                  onClose();
                }}
                className={"px-6"}
              />
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
};

export default TaskActionModal;
