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
  useDisclosure,
} from "@nextui-org/react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import TaskFormSections from "./TaskFormSections";
import { toast } from "sonner";
import {
  showClientTaskAtom,
  selectedClientToViewAtom,
  taskDataAtom,
  taskNameAtom,
} from "../store/CMSTLStore";
import ConfirmationWindow from "@/app/components/ConfirmationWindow";
import { MdPostAdd } from "react-icons/md";
import { MdCheck } from "react-icons/md";

const AddTaskModal = ({ isOpen, onOpenChange }) => {
  const {
    isOpen: isOpenPopup,
    onOpen: onOpenPopup,
    onOpenChange: onOpenChangePopup,
  } = useDisclosure();

  const taskData = useAtomValue(taskDataAtom);
  const taskName = useAtomValue(taskNameAtom);
  const addTask = useSetAtom(addTaskAtom);
  const fetchTask = useSetAtom(fetchTaskAtom);
  // const deleteTask = useSetAtom(deleteTaskAtom);

  const showClientTask = useAtomValue(showClientTaskAtom);
  const selectedClientToView = useAtomValue(selectedClientToViewAtom);

  const handleAddTask = async () => {
    console.log("taskData", taskData);

    const promise = async () =>
      new Promise((resolve) =>
        setTimeout(
          async () => resolve(await addTask(taskData), await fetchTask()),
          2000
        )
      );
    toast.promise(promise, {
      loading: "Creating New Task...",
      success: () => {
        return `${!taskName?.length ? "Task" : taskName} Successfully Created`;
      },
      error: "Error task creation failed",
    });
  };

  return (
    <>
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
              <ModalHeader className="flex flex-col gap-1 my-2 py-0 pt-2">
                <div className="flex flex-col">
                  <p className="font-bold text-base lg:text-lg xl:text-2xl text-black-default ">
                    {"Assign New Task"}
                  </p>
                  <p className="font-medium text-xs lg:text-sm text-darkgrey-hover">
                    {
                      "Creating a task will notify everyone included in the task."
                    }
                  </p>
                </div>
              </ModalHeader>
              <ModalBody className="h-full overflow-y-scroll overflow-x-hidden">
                <TaskFormSections />
              </ModalBody>
              <ModalFooter>
                <CTAButtons
                  label={"Cancel"}
                  color={"clear"}
                  onPress={onClose}
                />
                <CTAButtons
                  isDisabled={!selectedClientToView?.length && showClientTask}
                  label={"Assign Task"}
                  color={"blue"}
                  onPress={() => onOpenPopup()}
                />
              </ModalFooter>
              <ConfirmationWindow
                message="
                Make sure the details of the task is correct.
                You cannot edit this later.
                "
                title="Create this Task?"
                accept={{
                  label: "Create Task",
                  icon: <MdPostAdd size={24} />,
                  action: handleAddTask,
                }}
                type="info"
                isOpen={isOpenPopup}
                onOpenChange={onOpenChangePopup}
                onCloseParent={onClose}
              />
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddTaskModal;
