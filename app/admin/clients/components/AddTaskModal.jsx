import CTAButtons from "@/app/components/CTAButtons";
import { taskDataAtom } from "@/app/store/TaskStore";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useAtomValue } from "jotai";
import TaskFormSections from "./TaskFormSections";

const AddTaskModal = ({ isOpen, onOpenChange }) => {
  const newTask = useAtomValue(taskDataAtom);

  const handleAddTask = () => {
    const newTask = [{}];
    console.log("NEW TASK CREATED: ", newTask);
  };

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
            <ModalHeader className="flex flex-col gap-1 text-xl font-bold text-black-default my-2">
              {"Assign New Task"}
            </ModalHeader>
            <ModalBody className="h-full overflow-y-scroll overflow-x-hidden">
              <TaskFormSections />
            </ModalBody>
            <ModalFooter>
              <CTAButtons label={"Cancel"} color={"clear"} onPress={onClose} />
              <CTAButtons
                label={"Assign Task"}
                color={"blue"}
                onPress={handleAddTask}
              />
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddTaskModal;
