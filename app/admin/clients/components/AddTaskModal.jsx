import CTAButtons from "@/app/components/CTAButtons";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import TaskFormSections from "./TaskFormSections";

const AddTaskModal = ({ isOpen, onOpenChange }) => {
  return (
    <Modal
      size={"lg"}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      classNames={{ closeButton: "m-2", base: "h-[600px]" }}
      scrollBehavior={"inside"}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-xl font-bold text-black-default m-2">
              {"Add New Task"}
            </ModalHeader>
            <ModalBody className="h-full overflow-y-scroll overflow-x-hidden">
              <TaskFormSections />
            </ModalBody>
            <ModalFooter>
              <CTAButtons label={"Cancel"} color={"clear"} onPress={onClose} />
              <CTAButtons
                label={"Assign Task"}
                color={"blue"}
                onPress={onClose}
              />
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddTaskModal;
