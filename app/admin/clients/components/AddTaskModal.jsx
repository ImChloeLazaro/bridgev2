import CTAButtons from "@/app/components/CTAButtons";
import {
  addTaskAtom,
  selectedClientForTaskAtom,
  taskDataAtom,
} from "@/app/store/TaskStore";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import TaskFormSections from "./TaskFormSections";

const AddTaskModal = ({ isOpen, onOpenChange }) => {
  const taskData = useAtomValue(taskDataAtom);
  const [selectedClientForTask, setSelectedClientForTask] = useAtom(
    selectedClientForTaskAtom
  );

  const addTask = useSetAtom(addTaskAtom);

  const handleAddTask = async () => {
    console.log("selectedClientForTask", selectedClientForTask);
    console.log("HERE ADDING TASK");
    const response = await addTask(taskData);
    console.log("response", response);

    if (response.success) {
      console.log("CONFIRM WINDOW ADDED TASK", response.success);
    }
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
