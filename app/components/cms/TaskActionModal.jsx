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
  selectedClientToView,
  selectedTaskAction,
  selectedProcessorTaskAction,
  setSelectedProcessorTaskAction,
  selectedReviewerTaskAction,
  setSelectedReviewerTaskAction,
  onOpenAnotherModal,
  ...props
}) => {
  const userList = useAtomValue(userListAtom);
  const userSelection = userList.map((user) => {
    return { ...user, key: user.sub, value: user.sub };
  });

  const processors = new Set([...tasks?.processor]) ?? new Set([]); // new Set([...tasks?.processor]) ??
  const reviewers = new Set([...tasks?.reviewer]) ?? new Set([]); // new Set([...tasks?.review]) ??

  //   console.log("selectedTaskAction", selectedTaskAction);
  //   console.log("processors", processors);
  //   console.log("reviewers", reviewers);

  const windowDetails = {
    assign: {
      title: "Assign a new team member",
      label: "Assign Member",
      color: "blue",
    },
    remove: {
      title: "Remove a new team member",
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
                  <div className="flex items-center justify-between gap-4">
                    <p className="w-1/3 text-base font-medium text-black-default">
                      {"Processor"}
                    </p>
                    <FormFieldSelect
                      placeholder="Select processor/s"
                      selectionMode={"multiple"}
                      label={"Select processor/s"}
                      items={userSelection}
                      renderItemPicture={true}
                      selectedKeys={selectedProcessorTaskAction}
                      onSelectionChange={setSelectedProcessorTaskAction}
                    />
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <p className="w-1/3 text-base font-medium text-black-default">
                      {"Reviewer"}
                    </p>
                    <FormFieldSelect
                      placeholder="Select reviewer/s"
                      selectionMode={"multiple"}
                      label={"Select reviewer/s"}
                      items={userSelection}
                      renderItemPicture={true}
                      selectedKeys={selectedReviewerTaskAction}
                      onSelectionChange={setSelectedReviewerTaskAction}
                    />
                  </div>
                </>
              )}

              {selectedTaskAction.key === "remove" && (
                <>
                  <div className="flex items-center justify-between gap-4">
                    <p className="w-1/3 text-base font-medium text-black-default">
                      {"Processor"}
                    </p>
                    <FormFieldSelect
                      placeholder="Select processor/s"
                      selectionMode={"multiple"}
                      label={"Select processor/s"}
                      items={processors}
                      renderItemPicture={true}
                      selectedKeys={selectedProcessorTaskAction}
                      onSelectionChange={setSelectedProcessorTaskAction}
                    />
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <p className="w-1/3 text-base font-medium text-black-default">
                      {"Reviewer"}
                    </p>
                    <FormFieldSelect
                      placeholder="Select reviewer/s"
                      selectionMode={"multiple"}
                      label={"Select reviewer/s"}
                      items={reviewers}
                      renderItemPicture={true}
                      selectedKeys={selectedReviewerTaskAction}
                      onSelecti}
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
                  // setSelectedProcessorTaskAction(new Set([]));
                  // setSelectedReviewerTaskAction(new Set([]));
                  onClose();
                }}
              />
              <CTAButtons
                type={"submit"}
                label={windowDetails[selectedTaskAction.key]?.label}
                color={windowDetails[selectedTaskAction.key]?.color}
                onPress={() => {
                  onOpenAnotherModal();
                  console.log("Modal");
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
