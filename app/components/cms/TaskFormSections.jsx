import FormFieldInput from "@/app/components/FormFieldInput";
import FormFieldTextArea from "@/app/components/FormFieldTextArea";
import {
  managerSelectionAtom,
  processorSelectionAtom,
  recurrenceSelectionAtom,
  reviewerSelectionAtom,
} from "@/app/store/TaskStore";
import { Time } from "@internationalized/date";
import { TimeInput } from "@nextui-org/react";
import { useAtom, useAtomValue } from "jotai";
import { MdAccessTime, MdInfoOutline } from "react-icons/md";
import FormFieldSelect from "../FormFieldSelect";
import { teamsAtom } from "@/app/store/TeamManagementStore";
import { authenticationAtom } from "@/app/store/AuthenticationStore";

const TaskFormSections = ({
  selectedClientForTask,
  setSelectedClientForTask,
  clientSelectionChange,
  selectedManagerAtom,
  selectedProcessorAtom,
  selectedRecurrenceAtom,
  selectedReviewerAtom,
  showClientTaskAtom,
  taskDurationAtom,
  taskInstructionAtom,
  teamSelectionAtom,
  teamsByClientSelectionAtom,
  selectedTeamForTaskAtom,
  taskNameAtom,
  dateRangeAtom,
  startTimeAtom,
  endTimeAtom,
  clientSelectionForTaskAtom,
}) => {
  const user = useAtomValue(authenticationAtom);
  const showClientTask = useAtomValue(showClientTaskAtom);

  const [taskName, setTaskName] = useAtom(taskNameAtom);
  const [taskInstruction, setTaskInstruction] = useAtom(taskInstructionAtom);

  const clientSelectionForTask = useAtomValue(clientSelectionForTaskAtom);
  console.log("clientSelectionForTask: ", clientSelectionForTask);

  const [taskDuration, setTaskDuration] = useAtom(taskDurationAtom);

  const [dateRange, setDateRange] = useAtom(dateRangeAtom);
  const [startTime, setStartTime] = useAtom(startTimeAtom);
  const [endTime, setEndTime] = useAtom(endTimeAtom);

  const teamSelection = useAtomValue(teamSelectionAtom);
  const [selectedTeamForTask, setSelectedTeamForTask] = useAtom(
    selectedTeamForTaskAtom
  );

  const teamsByClientSelection = useAtomValue(teamsByClientSelectionAtom);

  const processorSelection = useAtomValue(processorSelectionAtom);
  const [selectedProcessor, setSelectedProcessor] = useAtom(
    selectedProcessorAtom
  );

  const reviewerSelection = useAtomValue(reviewerSelectionAtom);
  const [selectedReviewer, setSelectedReviewer] = useAtom(selectedReviewerAtom);

  const managerSelection = useAtomValue(managerSelectionAtom);
  const [selectedManager, setSelectedManager] = useAtom(selectedManagerAtom);

  const recurrenceSelection = useAtomValue(recurrenceSelectionAtom);
  const [selectedRecurrence, setSelectedRecurrence] = useAtom(
    selectedRecurrenceAtom
  );

  console.log("selectedTeamForTask", selectedTeamForTask.size == 0);
  console.log("teamSelection", teamSelection);
  console.log("teamsByClientSelection", teamsByClientSelection);
  console.log("Wow taskDuration", taskDuration);

  const teamForTaskSelection = showClientTask
    ? teamsByClientSelection
    : teamSelection;

  return (
    <div className='flex flex-col gap-6'>
      {/* People */}
      <div className='py-2 w-full'>
        <div className='flex justify-start items-center gap-2 mb-8'>
          <p className='font-bold text-base lg:text-lg xl:text-xl'>
            {"People"}
          </p>
          <MdInfoOutline />
        </div>

        <div className='flex flex-col gap-3'>
          {/* Client */}
          <div
            className={`${
              showClientTask ? "cursor-not-allowed" : ""
            } flex justify-between items-center gap-8`}
          >
            <p className='text-sm lg:text-base font-medium w-[20%]'>
              {"Client"}
            </p>
            <div className='w-[80%]'>
              <FormFieldSelect
                isRequired={true}
                isDisabled={showClientTask}
                aria-label='Client Selection'
                items={clientSelectionForTask}
                placeholder='Select Client'
                selectionMode='single'
                selectedKeys={selectedClientForTask}
                onSelectionChange={(key) => {
                  setSelectedClientForTask(key);
                  clientSelectionChange({ key: Array.from(key).toString() });
                }}
                renderItemPicture={true}
              />
            </div>
          </div>

          {/* Team */}
          <div className='flex justify-between items-center gap-8'>
            <p className='text-sm lg:text-base font-medium w-[20%]'>{"Team"}</p>
            <div className='w-[80%]'>
              <FormFieldSelect
                isRequired={true}
                aria-label='Team Selection'
                items={teamForTaskSelection} //
                placeholder='Assign Team/s'
                selectionMode='single'
                selectedKeys={selectedTeamForTask}
                onSelectionChange={(key) => {
                  setSelectedTeamForTask(key);

                  let assignees = teamForTaskSelection.filter(
                    (team) => team?._id === Array.from(key).toString()
                  )[0];
                  if (
                    assignees === undefined ||
                    assignees?.length === 0 ||
                    assignees === null
                  ) {
                    setSelectedProcessor(new Set([]));
                    setSelectedReviewer(new Set([]));
                    setSelectedManager(new Set([]));
                  } else {
                    setSelectedProcessor(
                      new Set(assignees?.members.map((member) => member.sub))
                    );
                    setSelectedReviewer(
                      new Set(assignees?.members.map((member) => member.sub))
                    );
                    if (assignees && assignees?.userSide === true) {
                      setSelectedManager(new Set([user?.sub]));
                    } else {
                      setSelectedManager(
                        new Set(assignees?.heads.map((head) => head.sub))
                      );
                    }
                  }
                }}
                renderItemPicture={true}
                disallowEmptySelection={false}
              />
            </div>
          </div>

          {/* Processor */}
          <div className='flex justify-between items-center gap-8'>
            <p className='text-sm lg:text-base font-medium w-[20%]'>
              {"Processor"}
            </p>
            <div className='w-[80%]'>
              <FormFieldSelect
                isDisabled={selectedTeamForTask.size == 0}
                isRequired={true}
                aria-label='Processor Selection'
                items={processorSelection} // showClientTask ? teamsByClientSelection.members :
                placeholder='Assign Processor/s'
                selectionMode='multiple'
                selectedKeys={selectedProcessor}
                onSelectionChange={setSelectedProcessor}
                renderType={"chip"}
                renderItemPicture={true}
              />
            </div>
          </div>

          {/* Reviewer */}
          <div className='flex justify-between items-center gap-8'>
            <p className='text-sm lg:text-base font-medium w-[20%]'>
              {"Reviewer"}
            </p>
            <div className='w-[80%]'>
              <FormFieldSelect
                isDisabled={selectedTeamForTask.size == 0}
                isRequired={true}
                aria-label='Reviewer Selection'
                items={reviewerSelection}
                placeholder='Assign Reviewer/s'
                selectionMode='multiple'
                selectedKeys={selectedReviewer}
                onSelectionChange={setSelectedReviewer}
                renderType={"chip"}
                renderItemPicture={true}
              />
            </div>
          </div>

          {/* Manager */}
          <div className='flex justify-between items-center gap-8'>
            <p className='text-sm lg:text-base font-medium w-[20%]'>
              {"Manager"}
            </p>
            <div className='w-[80%]'>
              <FormFieldSelect
                isDisabled={
                  selectedTeamForTask.size == 0 || selectedManager.size > 0
                }
                isRequired={true}
                aria-label='Manager Selection'
                items={managerSelection}
                placeholder='Assign Manager/s'
                selectionMode='single'
                selectedKeys={selectedManager}
                onSelectionChange={setSelectedManager}
                renderItemPicture={true}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Description */}
      <div className='py-2 w-full'>
        <div className='flex justify-start items-center gap-2 mb-8'>
          <p className='text-black-default font-bold text-base lg:text-lg xl:text-xl'>
            {"Description"}
          </p>
          <MdInfoOutline />
        </div>

        <div className='flex flex-col gap-3'>
          {/* Name */}
          <div className='flex justify-between items-center gap-8'>
            <p className='text-sm lg:text-base font-medium w-[20%]'>{"Name"}</p>
            <div className='w-[80%]'>
              <FormFieldInput
                isRequired={true}
                type={"text"}
                value={taskName}
                onValueChange={setTaskName}
                placeholder={"Give the task a name "}
                fullWidth={true}
              />
            </div>
          </div>
          {/* Instruction */}
          <div className='flex justify-between items-center gap-8'>
            <p className='text-sm lg:text-base font-medium w-[20%]'>
              {"Instruction"}
            </p>
            <div className='w-[80%]'>
              <FormFieldTextArea
                isRequired={true}
                value={taskInstruction}
                onValueChange={setTaskInstruction}
                placeholder={"Special Instructions"}
                fullWidth={true}
              />
            </div>
          </div>
          {/* Recurrence */}
          <div className='flex justify-between items-center gap-8'>
            <p className='text-sm lg:text-base font-medium w-[20%]'>
              {"Recurrence"}
            </p>
            <div className='w-[80%]'>
              <FormFieldSelect
                isRequired={true}
                aria-label='Recurrence Selection'
                items={recurrenceSelection}
                placeholder='Choose Recurrence'
                selectionMode='single'
                selectedKeys={selectedRecurrence}
                onSelectionChange={setSelectedRecurrence}
              />
            </div>
          </div>

          {Array.from(selectedRecurrence).toString() !== "none" ? (
            <>
              {/* Start Date */}
              <div className='flex justify-between items-center gap-8'>
                <p className='text-sm lg:text-base font-medium w-[20%]'>
                  {"Start Date"}
                </p>
                <div className='w-[80%]'>
                  <FormFieldInput
                    isRequired={true}
                    type={"date"}
                    fullWidth={true}
                    value={taskDuration}
                    onValueChange={setTaskDuration}
                    placeholder={"Set a date"}
                    showPastDate={true}
                    withDate={true}
                    withTime={false}
                    isDateRange={false}
                    dateRangeValue={dateRange}
                    onDateRangeValueChange={setDateRange}
                  />
                </div>
              </div>

              {/* Task Duration */}
              <div className='flex justify-between items-center gap-8'>
                <p className='text-sm lg:text-base font-medium w-[20%]'>
                  {"Duration"}
                </p>
                <div className='w-[80%] flex items-center gap-3'>
                  <TimeInput
                    isInvalid={startTime?.compare(endTime) > 0}
                    errorMessage={"Invalid Time Range"}
                    label='Start Time'
                    minValue={new Time()}
                    value={startTime}
                    onChange={(timeStart) => {
                      setStartTime(timeStart);
                    }}
                    startContent={<MdAccessTime size={16} />}
                    classNames={{ input: "font-medium text-black-default" }}
                  />
                  <TimeInput
                    isInvalid={startTime?.compare(endTime) > 0}
                    errorMessage={"Invalid Time Range"}
                    label='Due Time'
                    minValue={new Time()}
                    value={endTime}
                    onChange={(timeEnd) => {
                      setEndTime(timeEnd);
                    }}
                    startContent={<MdAccessTime size={16} />}
                    classNames={{ input: "font-medium text-black-default" }}
                  />
                </div>
              </div>
            </>
          ) : (
            <div className='flex justify-between items-center gap-8'>
              <p className='text-sm lg:text-base font-medium w-[20%]'>
                {"Date Range"}
              </p>
              <div className='w-[80%]'>
                <FormFieldInput
                  isRequired={true}
                  type={"date"}
                  fullWidth={true}
                  value={taskDuration}
                  onValueChange={setTaskDuration}
                  placeholder={"Set a date"}
                  withDate={true}
                  withTime={true}
                  isDateRange={true}
                  showPastDate={false}
                  dateRangeValue={dateRange}
                  onDateRangeValueChange={setDateRange}
                  timeStartValue={startTime}
                  onTimeStartValueChange={setStartTime}
                  timeEndValue={endTime}
                  onTimeEndValueChange={setEndTime}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskFormSections;
