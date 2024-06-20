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

const TaskFormSections = ({
  selectedClientForTask,
  setSelectedClientForTask,
  clientSelectionChange,
  endDateAtom,
  selectedManagerAtom,
  selectedProcessorAtom,
  selectedRecurrenceAtom,
  selectedReviewerAtom,
  showClientTaskAtom,
  startDateAtom,
  taskInstructionAtom,
  taskNameAtom,
}) => {
  const showClientTask = useAtomValue(showClientTaskAtom);

  const [taskName, setTaskName] = useAtom(taskNameAtom);
  const [taskInstruction, setTaskInstruction] = useAtom(taskInstructionAtom);

  const clientSelectionForTask = useAtomValue(clientSelectionForTaskAtom);

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

  const [startDate, setStartDate] = useAtom(startDateAtom);
  const [endDate, setEndDate] = useAtom(endDateAtom);

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

          {/* Start Date */}
          <div className="flex justify-between items-center gap-8">
            <p className="text-sm lg:text-base font-medium w-[20%]">
              {"Start Date"}
            </p>
            <div className="w-[80%]">
              <FormFieldInput
                isRequired={true}
                type={"date"}
                value={startDate}
                onValueChange={setStartDate}
                placeholder={"Set a date"}
                withDate={true}
                endContentType={"date"}
                date={startDate}
                onDateChange={setStartDate}
                isDateModal={true}
                fullWidth={true}
              />
            </div>
          </div>

          {/* End Date */}
          <div className="flex justify-between items-center gap-8">
            <p className="text-sm lg:text-base font-medium w-[20%]">
              {"End Date"}
            </p>
            <div className="w-[80%]">
              <FormFieldInput
                isRequired={true}
                type={"date"}
                value={endDate}
                onValueChange={setEndDate}
                placeholder={"Set a date"}
                withDate={true}
                endContentType={"date"}
                date={endDate}
                onDateChange={setEndDate}
                isDateModal={true}
                fullWidth={true}
              />
            </div>
          </div>
        </div>
      </div>
      {/*<div className="p-1 m-1 w-full"></div>  SPACER FOR LAST ROW*/}
    </div>
  );
};

export default TaskFormSections;
