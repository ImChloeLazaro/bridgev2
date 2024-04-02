import React from "react";
import { MdInfoOutline } from "react-icons/md";
import { Divider, Select, SelectItem, Chip, Avatar } from "@nextui-org/react";
import {
  clientSelectionForTaskAtom,
  endDateAtom,
  recurrenceSelectionAtom,
  managerSelectionAtom,
  processorSelectionAtom,
  reviewerSelectionAtom,
  selectedClientForTaskAtom,
  selectedRecurrenceAtom,
  selectedManagerAtom,
  selectedProcessorAtom,
  selectedReviewerAtom,
  startDateAtom,
  taskNameAtom,
  taskInstructionAtom,
} from "@/app/store/TaskStore";
import { useAtom, useAtomValue } from "jotai";

import FormFieldInput from "@/app/components/FormFieldInput";

const TaskFormSections = () => {
  const [taskName, setTaskName] = useAtom(taskNameAtom);
  const [taskInstruction, setTaskInstruction] = useAtom(taskInstructionAtom);

  const clientSelectionForTask = useAtomValue(clientSelectionForTaskAtom);
  const [selectedClientForTask, setSelectedClientForTask] = useAtom(
    selectedClientForTaskAtom
  );

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
      {/* Description */}
      <div className="mt-2 py-2 w-full">
        <div className="flex justify-start items-center gap-2 mb-8">
          <p className="font-bold text-lg">{"Description"}</p>
          <MdInfoOutline />
        </div>

        <div className="flex flex-col gap-3">
          {/* Client */}
          <div className="flex justify-between items-center gap-5">
            <p className="font-medium w-24">{"Client"}</p>
            <Select
              aria-label="Client Selection"
              items={clientSelectionForTask}
              variant="bordered"
              isMultiline={true}
              selectionMode="single"
              placeholder="Select Client"
              selectedKeys={selectedClientForTask}
              onSelectionChange={(key) => handleClientSelectionChange(key)}
              classNames={{
                base: "max-w-sm max-h-sm",
                trigger: "min-h-unit-12 py-2",
              }}
              renderValue={(displayItems) => {
                return (
                  <div className="flex flex-wrap gap-2 max-h-[100px] overflow-auto">
                    {displayItems.map((displayItem) => (
                      <p
                        key={displayItem.key}
                        className="text-sm font-medium text-black-default"
                      >
                        {displayItem.data.name}
                      </p>
                    ))}
                  </div>
                );
              }}
            >
              {(client) => (
                <SelectItem key={client.key} textValue={client.name}>
                  <div className="flex gap-2 items-center">
                    <Avatar
                      alt={client.name}
                      className="flex-shrink-0"
                      size="sm"
                      src={client.picture}
                    />
                    <span className="text-small">{client.name}</span>
                  </div>
                </SelectItem>
              )}
            </Select>
          </div>

          {/* Processor */}
          <div className="flex justify-between items-center gap-5">
            <p className="font-medium w-24">{"Processor"}</p>
            <Select
              aria-label="Processor Selection"
              items={processorSelection}
              variant="bordered"
              isMultiline={true}
              selectionMode="multiple"
              placeholder="Assign Processor/s"
              selectedKeys={selectedProcessor}
              onSelectionChange={(key) => handleProcessorSelectionChange(key)}
              classNames={{
                base: "max-w-sm max-h-sm",
                trigger: "min-h-unit-12 py-2",
              }}
              renderValue={(displayItems) => {
                return (
                  <div className="flex flex-wrap gap-2 max-h-[100px] overflow-auto">
                    {displayItems.map((displayItem) => (
                      <Chip
                        key={displayItem.key}
                        startContent={displayItem.data.picture}
                        onClose={() => {
                          setSelectedProcessor(() =>
                            Array.from(selectedProcessor).filter(
                              (item) => item !== displayItem.data.key
                            )
                          );
                        }}
                      >
                        {displayItem.data.picture ? (
                          <p className="font-medium">{displayItem.data.name}</p>
                        ) : (
                          <p className="font-bold">{displayItem.data.name}</p>
                        )}
                      </Chip>
                    ))}
                  </div>
                );
              }}
            >
              {(processor) => (
                <SelectItem key={processor.key} textValue={processor.name}>
                  <div className="flex gap-2 items-center">
                    <Avatar
                      alt={processor.name}
                      className="flex-shrink-0"
                      size="sm"
                      src={processor.picture}
                    />
                    <span className="text-small">{processor.name}</span>
                  </div>
                </SelectItem>
              )}
            </Select>
          </div>

          {/* Reviewer */}
          <div className="flex justify-between items-center gap-5">
            <p className="font-medium w-24">{"Reviewer"}</p>

            <Select
              aria-label="Reviewer Selection"
              items={reviewerSelection}
              variant="bordered"
              isMultiline={true}
              selectionMode="multiple"
              placeholder="Assign Reviewer/s"
              selectedKeys={selectedReviewer}
              onSelectionChange={(key) => handleReviewerSelectionChange(key)}
              classNames={{
                base: "max-w-sm max-h-sm",
                trigger: "min-h-unit-12 py-2",
              }}
              renderValue={(displayItems) => {
                return (
                  <div className="flex flex-wrap gap-2 max-h-[100px] overflow-auto">
                    {displayItems.map((displayItem) => (
                      <Chip
                        key={displayItem.key}
                        startContent={displayItem.data.picture}
                        onClose={() => {
                          setSelectedReviewer(() =>
                            Array.from(selectedReviewer).filter(
                              (item) => item !== displayItem.data.key
                            )
                          );
                        }}
                      >
                        {displayItem.data.picture ? (
                          <p className="font-medium">{displayItem.data.name}</p>
                        ) : (
                          <p className="font-bold">{displayItem.data.name}</p>
                        )}
                      </Chip>
                    ))}
                  </div>
                );
              }}
            >
              {(reviewer) => (
                <SelectItem key={reviewer.key} textValue={reviewer.name}>
                  <div className="flex gap-2 items-center">
                    <Avatar
                      alt={reviewer.name}
                      className="flex-shrink-0"
                      size="sm"
                      src={reviewer.picture}
                    />
                    <span className="text-small">{reviewer.name}</span>
                  </div>
                </SelectItem>
              )}
            </Select>
          </div>

          {/* Manager */}
          <div className="flex justify-between items-center gap-5">
            <p className="font-medium w-24">{"Manager"}</p>

            <Select
              aria-label="Manager Selection"
              items={managerSelection}
              variant="bordered"
              isMultiline={true}
              selectionMode="single"
              placeholder="Assign Manager/s"
              selectedKeys={selectedManager}
              onSelectionChange={(key) => handleManagerSelectionChange(key)}
              classNames={{
                base: "max-w-sm max-h-sm",
                trigger: "min-h-unit-12 py-2",
              }}
              renderValue={(displayItems) => {
                return (
                  <div className="flex flex-wrap gap-2 max-h-[100px] overflow-auto">
                    {displayItems.map((displayItem) => (
                      <p
                        key={displayItem.key}
                        className="text-sm font-medium text-black-default"
                      >
                        {displayItem.data.name}
                      </p>
                    ))}
                  </div>
                );
              }}
            >
              {(manager) => (
                <SelectItem key={manager.key} textValue={manager.name}>
                  <div className="flex gap-2 items-center">
                    <Avatar
                      alt={manager.name}
                      className="flex-shrink-0"
                      size="sm"
                      src={manager.picture}
                    />
                    <span className="text-small">{manager.name}</span>
                  </div>
                </SelectItem>
              )}
            </Select>
          </div>
        </div>
      </div>
      {/* Description */}
      <div className="mt-2 py-2 w-full">
        <div className="flex justify-start items-center gap-2 mb-8">
          <p className="font-bold text-lg">{"Description"}</p>
          <MdInfoOutline />
        </div>

        <div className="flex flex-col gap-3">
          {/* Name */}
          <div className="flex justify-between items-center gap-5">
            <p className="font-medium w-24">{"Name"}</p>

            <FormFieldInput
              value={taskName}
              onValueChange={setTaskName}
              placeholder={"Give the task a name "}
              fullWidth={true}
            />
          </div>

          {/* Instruction */}
          <div className="flex justify-between items-center gap-5">
            <p className="font-medium w-24">{"Instruction"}</p>

            <FormFieldInput
              value={taskInstruction}
              onValueChange={setTaskInstruction}
              placeholder={"Special Instructions"}
              fullWidth={true}
            />
          </div>

          {/* Recurrence */}
          <div className="flex justify-between items-center gap-5">
            <p className="font-medium w-24">{"Recurrence"}</p>
            <Select
              aria-label="Client Selection"
              items={recurrenceSelection}
              variant="bordered"
              isMultiline={true}
              selectionMode="single"
              placeholder="Choose Recurrence"
              selectedKeys={selectedRecurrence}
              onSelectionChange={(key) => handleIntervalSelectionChange(key)}
              classNames={{
                base: "max-w-sm max-h-sm",
                trigger: "min-h-unit-12 py-2",
              }}
              renderValue={(displayItems) => {
                return (
                  <div className="flex flex-wrap gap-2">
                    {displayItems.map((displayItem) => (
                      <p key={displayItem.data.key} className="font-medium">
                        {displayItem.data.label}
                      </p>
                    ))}
                  </div>
                );
              }}
            >
              {(client) => (
                <SelectItem key={client.label} textValue={client.label}>
                  <div className="flex gap-2 items-center">
                    <span className="text-small">{client.label}</span>
                  </div>
                </SelectItem>
              )}
            </Select>
          </div>

          {/* Start Date */}
          <div className="flex justify-between items-center gap-5">
            <p className="font-medium w-24">{"Start Date"}</p>

            <FormFieldInput
              value={startDate}
              onValueChange={setStartDate}
              placeholder={"Set a date"}
              withDate={true}
              date={startDate}
              onDateChange={setStartDate}
              isDateModal={true}
              fullWidth={true}
            />
          </div>

          {/* End Date */}
          <div className="flex justify-between items-center gap-5">
            <p className="font-medium w-24">{"End Date"}</p>

            <FormFieldInput
              value={endDate}
              onValueChange={setEndDate}
              placeholder={"Set a date"}
              withDate={true}
              date={endDate}
              onDateChange={setEndDate}
              isDateModal={true}
              fullWidth={true}
            />
          </div>
        </div>
      </div>
      <div className="p-1 m-1 w-full"></div> {/* SPACER FOR LAST ROW*/}
    </div>
  );
};

export default TaskFormSections;
