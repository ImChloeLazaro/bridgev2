import CTAButtons from "@/app/components/CTAButtons";
import {
  addTaskAtom,
  deleteTaskAtom,
  fetchTaskAtom,
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
import { toast } from "sonner";
import {
  showClientTaskAtom,
  selectedClientToViewAtom,
  taskDataAtom,
  taskNameAtom,
} from "../store/CMSAdminStore";

const AddTaskModal = ({ isOpen, onOpenChange }) => {
  const taskData = useAtomValue(taskDataAtom);
  const taskName = useAtomValue(taskNameAtom);
  const addTask = useSetAtom(addTaskAtom);
  const fetchTask = useSetAtom(fetchTaskAtom);
  const deleteTask = useSetAtom(deleteTaskAtom);

  const showClientTask = useAtomValue(showClientTaskAtom);
  const selectedClientToView = useAtomValue(selectedClientToViewAtom);

  const handleAddTask = async (onClose) => {
    console.log("taskData", taskData);

    const promise = async () =>
      new Promise((resolve) =>
        setTimeout(
          async () => resolve(await addTask(taskData), await fetchTask()),
          2000
        )
      );
    toast.promise(promise, {
      loading: "Creating Task...",
      success: () => {
        return `${!taskName?.length ? "Task" : taskName} Successfully Created`;
      },
      error: "Error task creation failed",
    });

    onClose();
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
                isDisabled={!selectedClientToView?.length && showClientTask}
                label={"Assign Task"}
                color={"blue"}
                onPress={() => handleAddTask(onClose)}
              />
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddTaskModal;
