import FormFieldInput from "@/app/components/FormFieldInput";
import FormFieldTextArea from "@/app/components/FormFieldTextArea";
import {
  clientSelectionForTaskAtom,
  managerSelectionAtom,
  processorSelectionAtom,
  recurrenceSelectionAtom,
  reviewerSelectionAtom,
} from "@/app/store/TaskStore";
import { Avatar, Chip, Select, SelectItem } from "@nextui-org/react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { MdInfoOutline } from "react-icons/md";
import FormFieldSelect from "../FormFieldSelect";
import { DateRangePicker } from "@nextui-org/react";
import { parseDateTime, parseZonedDateTime } from "@internationalized/date";
import { getLocalTimeZone, parseDate, today } from "@internationalized/date";

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
  taskNameAtom,
  dateRangeAtom,
  startTimeAtom,
  endTimeAtom,
}) => {
  const showClientTask = useAtomValue(showClientTaskAtom);

  const [taskName, setTaskName] = useAtom(taskNameAtom);
  const [taskInstruction, setTaskInstruction] = useAtom(taskInstructionAtom);

  const clientSelectionForTask = useAtomValue(clientSelectionForTaskAtom);

  const processorSelection = useAtomValue(processorSelectionAtom);
  const [selectedProcessor, setSelectedProcessor] = useAtom(
    selectedProcessorAtom
  );

  const [taskDuration, setTaskDuration] = useAtom(taskDurationAtom);

  const [dateRange, setDateRange] = useAtom(dateRangeAtom);
  const [startTime, setStartTime] = useAtom(startTimeAtom);
  const [endTime, setEndTime] = useAtom(endTimeAtom);

  const reviewerSelection = useAtomValue(reviewerSelectionAtom);
  const [selectedReviewer, setSelectedReviewer] = useAtom(selectedReviewerAtom);

  const managerSelection = useAtomValue(managerSelectionAtom);
  const [selectedManager, setSelectedManager] = useAtom(selectedManagerAtom);

  const recurrenceSelection = useAtomValue(recurrenceSelectionAtom);
  const [selectedRecurrence, setSelectedRecurrence] = useAtom(
    selectedRecurrenceAtom
  );

  const handleClientSelectionChange = (key) => {
    setSelectedClientForTask(key);
    clientSelectionChange({ key: Array.from(key).join("") });
  };

  const handleProcessorSelectionChange = (key) => {
    setSelectedProcessor(key);
  };

  const handleReviewerSelectionChange = (key) => {
    setSelectedReviewer(key);
  };

  const handleManagerSelectionChange = (key) => {
    setSelectedManager(key);
  };

  const handleIntervalSelectionChange = (key) => {
    setSelectedRecurrence(key);
  };

  console.log("taskDuration", taskDuration)

  return (
    <div className="flex flex-col gap-6">
      {/* People */}
      {/* {!showClientTask && ()} */}
      <div className="py-2 w-full">
        <div className="flex justify-start items-center gap-2 mb-8">
          <p className="font-bold text-base lg:text-lg xl:text-xl">
            {"People"}
          </p>
          <MdInfoOutline />
        </div>

        <div className="flex flex-col gap-3">
          {/* Client */}
          <div
            className={`${
              showClientTask ? "cursor-not-allowed" : ""
            } flex justify-between items-center gap-8`}
          >
            <p className="text-sm lg:text-base font-medium w-[20%]">
              {"Client"}
            </p>
            <div className="w-[80%]">
              <FormFieldSelect
                isRequired={true}
                isDisabled={showClientTask}
                aria-label="Client Selection"
                items={clientSelectionForTask}
                placeholder="Select Client"
                selectionMode="single"
                selectedKeys={selectedClientForTask}
                onSelectionChange={(key) => handleClientSelectionChange(key)}
                isMultiline={true}
                renderItemPicture={true}
              />
            </div>
          </div>

          {/* Processor */}
          <div className="flex justify-between items-center gap-8">
            <p className="text-sm lg:text-base font-medium w-[20%]">
              {"Processor"}
            </p>
            <div className="w-[80%]">
              <FormFieldSelect
                isRequired={true}
                // isDisabled={showClientTask}
                aria-label="Processor Selection"
                items={processorSelection}
                placeholder="Assign Processor/s"
                selectionMode="multiple"
                selectedKeys={selectedProcessor}
                onSelectionChange={(key) => handleProcessorSelectionChange(key)}
                isMultiline={true}
                renderType={"chip"}
                renderItemPicture={true}
              />
            </div>
          </div>

          {/* Reviewer */}
          <div className="flex justify-between items-center gap-8">
            <p className="text-sm lg:text-base font-medium w-[20%]">
              {"Reviewer"}
            </p>
            <div className="w-[80%]">
              <FormFieldSelect
                isRequired={true}
                // isDisabled={showClientTask}
                aria-label="Reviewer Selection"
                items={reviewerSelection}
                placeholder="Assign Reviewer/s"
                selectionMode="multiple"
                selectedKeys={selectedReviewer}
                onSelectionChange={(key) => handleReviewerSelectionChange(key)}
                isMultiline={true}
                renderType={"chip"}
                renderItemPicture={true}
              />
            </div>
          </div>

          {/* Manager */}
          <div className="flex justify-between items-center gap-8">
            <p className="text-sm lg:text-base font-medium w-[20%]">
              {"Manager"}
            </p>
            <div className="w-[80%]">
              <FormFieldSelect
                isRequired={true}
                // isDisabled={showClientTask}
                aria-label="Manager Selection"
                items={managerSelection}
                placeholder="Assign Manager/s"
                selectionMode="single"
                selectedKeys={selectedManager}
                onSelectionChange={(key) => handleManagerSelectionChange(key)}
                isMultiline={true}
                renderItemPicture={true}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Description */}
      <div className="py-2 w-full">
        <div className="flex justify-start items-center gap-2 mb-8">
          <p className="text-black-default font-bold text-base lg:text-lg xl:text-xl">
            {"Description"}
          </p>
          <MdInfoOutline />
        </div>

        <div className="flex flex-col gap-3">
          {/* Name */}
          <div className="flex justify-between items-center gap-8">
            <p className="text-sm lg:text-base font-medium w-[20%]">{"Name"}</p>
            <div className="w-[80%]">
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
          <div className="flex justify-between items-center gap-8">
            <p className="text-sm lg:text-base font-medium w-[20%]">
              {"Instruction"}
            </p>
            <div className="w-[80%]">
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
          <div className="flex justify-between items-center gap-8">
            <p className="text-sm lg:text-base font-medium w-[20%]">
              {"Recurrence"}
            </p>
            <div className="w-[80%]">
              <FormFieldSelect
                isRequired={true}
                aria-label="Recurrence Selection"
                items={recurrenceSelection}
                placeholder="Choose Recurrence"
                selectionMode="single"
                selectedKeys={selectedRecurrence}
                onSelectionChange={(key) => handleIntervalSelectionChange(key)}
                isMultiline={true}
              />
            </div>
          </div>

          {/* Task Duration"*/}
          <div className="flex justify-between items-center gap-8">
            <p className="text-sm lg:text-base font-medium w-[20%]">
              {"Task Duration"}
            </p>
            <div className="w-[80%]">
              <FormFieldInput
                isRequired={true}
                type={"date"}
                fullWidth={true}
                value={taskDuration}
                onValueChange={setTaskDuration}
                placeholder={"Set a date"}
                withDate={true}
                dateRangeValue={dateRange}
                onDateRangeValueChange={setDateRange}
                timeStartValue={startTime}
                onTimeStartValueChange={setStartTime}
                timeEndValue={endTime}
                onTimeEndValueChange={setEndTime}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskFormSections;
