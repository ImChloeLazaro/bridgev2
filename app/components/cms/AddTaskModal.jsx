import ConfirmationWindow from "@/app/components/ConfirmationWindow";
import CTAButtons from "@/app/components/CTAButtons";
import {
  addTaskAtom,
  deleteTaskAtom,
  fetchTaskAtom,
} from "@/app/store/TaskStore";
import {
  fetchMyTeamsAtom,
  fetchTeamsAtom,
  fetchSubTeamsAtom,
  fetchUserSubTeamsAtom,
  fetchTeamClientsAtom,
} from "@/app/store/TeamStore";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useAtomValue, useSetAtom } from "jotai";
import { toast } from "sonner";
import TaskFormSections from "./TaskFormSections";
import { useEffect } from "react";
import { fetchUserListAtom } from "@/app/store/UserStore";

const AddTaskModal = ({
  isOpen,
  onOpenChange,
  selectedClientToView,
  showClientTask,
  taskDataAtom,
  clientSelectionAtom,
  selectedClientAtom,
  teamSelectionAtom,
  selectedTeamAtom,
  processorSelectionAtom,
  selectedProcessorAtom,
  reviewerSelectionAtom,
  selectedReviewerAtom,
  managerSelectionAtom,
  selectedManagerAtom,
  taskNameAtom,
  taskInstructionAtom,
  recurrenceSelectionAtom,
  selectedRecurrenceAtom,
  taskDurationAtom,
  dateRangeAtom,
  startTimeAtom,
  endTimeAtom,
}) => {
  const {
    isOpen: isOpenPopup,
    onOpen: onOpenPopup,
    onOpenChange: onOpenChangePopup,
  } = useDisclosure();

  const taskData = useAtomValue(taskDataAtom);
  const taskName = useAtomValue(taskNameAtom);
  const addTask = useSetAtom(addTaskAtom);
  const fetchTask = useSetAtom(fetchTaskAtom);
  const fetchTeams = useSetAtom(fetchTeamsAtom);
  const fetchMyTeams = useSetAtom(fetchMyTeamsAtom);
  const fetchSubTeams = useSetAtom(fetchSubTeamsAtom);
  const fetchUserSubTeams = useSetAtom(fetchUserSubTeamsAtom);
  const fetchTeamClients = useSetAtom(fetchTeamClientsAtom);
  const fetchUserList = useSetAtom(fetchUserListAtom);
  const deleteTask = useSetAtom(deleteTaskAtom);

  const handleAddTask = async () => {
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

  const handleFormAction = (e) => {
    onOpenPopup();
    return false;
  };

  useEffect(() => {
    fetchTeams();
    fetchMyTeams();
    fetchSubTeams();
    fetchUserSubTeams();
    fetchTeamClients();
    fetchUserList();
  }, [
    fetchSubTeams,
    fetchTeams,
    fetchMyTeams,
    fetchUserSubTeams,
    fetchTeamClients,
    fetchUserList,
  ]);

  return (
    <Modal
      size={"xl"}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      classNames={{ closeButton: "m-2" }}
    >
      <ModalContent>
        {(onClose) => (
          <form action={handleFormAction}>
            <ModalHeader className="flex flex-col gap-1 my-2 py-0 pt-2">
              <div className="flex flex-col">
                <p className="font-bold text-base lg:text-lg xl:text-2xl text-black-default ">
                  {"Assign New Task"}
                </p>
                <p className="font-medium text-xs lg:text-sm text-darkgrey-hover">
                  {"Creating a task will notify everyone included in the task."}
                </p>
              </div>
            </ModalHeader>
            <ModalBody className="h-full overflow-y-scroll overflow-x-hidden">
              <div className="h-96">
                <TaskFormSections
                  selectedClientToView={selectedClientToView}
                  showClientTask={showClientTask}
                  clientSelectionAtom={clientSelectionAtom}
                  selectedClientAtom={selectedClientAtom}
                  teamSelectionAtom={teamSelectionAtom}
                  selectedTeamAtom={selectedTeamAtom}
                  processorSelectionAtom={processorSelectionAtom}
                  selectedProcessorAtom={selectedProcessorAtom}
                  reviewerSelectionAtom={reviewerSelectionAtom}
                  selectedReviewerAtom={selectedReviewerAtom}
                  managerSelectionAtom={managerSelectionAtom}
                  selectedManagerAtom={selectedManagerAtom}
                  taskNameAtom={taskNameAtom}
                  taskInstructionAtom={taskInstructionAtom}
                  recurrenceSelectionAtom={recurrenceSelectionAtom}
                  selectedRecurrenceAtom={selectedRecurrenceAtom}
                  taskDurationAtom={taskDurationAtom}
                  dateRangeAtom={dateRangeAtom}
                  startTimeAtom={startTimeAtom}
                  endTimeAtom={endTimeAtom}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <CTAButtons label={"Cancel"} color={"clear"} onPress={onClose} />
              <CTAButtons
                type={"submit"}
                label={"Assign Task"}
                color={"blue"}
                className={"px-6"}
              />
            </ModalFooter>
            <ConfirmationWindow
              message="
                Make sure the details of the task is correct.
                You cannot edit this later.
                "
              title="Create this Task?"
              choice="Create Task"
              action={handleAddTask}
              type="confirm"
              isOpen={isOpenPopup}
              onOpenChange={onOpenChangePopup}
              onCloseParent={onClose}
            />
          </form>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddTaskModal;
