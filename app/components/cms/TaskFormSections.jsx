import FormFieldInput from "@/app/components/FormFieldInput";
import FormFieldTextArea from "@/app/components/FormFieldTextArea";
import { Time } from "@internationalized/date";
import { TimeInput } from "@nextui-org/react";
import { useAtom, useAtomValue } from "jotai";
import { MdAccessTime, MdInfoOutline } from "react-icons/md";
import FormFieldSelect from "../FormFieldSelect";

const TaskFormSections = ({
  selectedClientToView,
  showClientTask,
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
  const teamSelection = useAtomValue(teamSelectionAtom);
  const [selectedTeam, setSelectedTeam] = useAtom(selectedTeamAtom);

  const clientSelection = useAtomValue(clientSelectionAtom);
  const [selectedClient, setSelectedClient] = useAtom(selectedClientAtom);

  const processorSelection = useAtomValue(processorSelectionAtom);
  const [selectedProcessor, setSelectedProcessor] = useAtom(
    selectedProcessorAtom
  );

  const reviewerSelection = useAtomValue(reviewerSelectionAtom);
  const [selectedReviewer, setSelectedReviewer] = useAtom(selectedReviewerAtom);

  const managerSelection = useAtomValue(managerSelectionAtom);
  const [selectedManager, setSelectedManager] = useAtom(selectedManagerAtom);

  const [taskName, setTaskName] = useAtom(taskNameAtom);
  const [taskInstruction, setTaskInstruction] = useAtom(taskInstructionAtom);

  const recurrenceSelection = useAtomValue(recurrenceSelectionAtom);
  const [selectedRecurrence, setSelectedRecurrence] = useAtom(
    selectedRecurrenceAtom
  );

  const [taskDuration, setTaskDuration] = useAtom(taskDurationAtom);
  const [dateRange, setDateRange] = useAtom(dateRangeAtom);

  const [startTime, setStartTime] = useAtom(startTimeAtom);
  const [endTime, setEndTime] = useAtom(endTimeAtom);

  const teamSelectionSelectedClient = teamSelection.filter((team) =>
    team.client.map((client) => client._id).includes(selectedClientToView)
  );

  return (
    <div className="flex flex-col gap-6">
      {/* People */}
      <div className="py-2 w-full">
        <div className="flex justify-start items-center gap-2 mb-8">
          <p className="font-bold text-base lg:text-lg xl:text-xl">
            {"People"}
          </p>
          <MdInfoOutline />
        </div>

        <div className="flex flex-col gap-3">
          {/* Team */}
          <div className="flex justify-between items-center gap-8">
            <p className="text-sm lg:text-base font-medium w-[20%]">{"Team"}</p>
            <div className="w-[80%]">
              <FormFieldSelect
                isRequired={true}
                aria-label="Team Selection"
                items={
                  showClientTask ? teamSelectionSelectedClient : teamSelection
                }
                placeholder="Assign Team/s"
                description={
                  selectedTeam.size === 0
                    ? "Create a new team first before creating tasks for clients."
                    : ""
                }
                selectionMode="single"
                selectedKeys={selectedTeam}
                onSelectionChange={(key) => {
                  setSelectedTeam(key);

                  let selectedTeam = teamSelection
                    ?.filter((team) => team?._id === Array.from(key).toString())
                    .pop();

                  if (
                    selectedTeam === undefined ||
                    selectedTeam?.length === 0 ||
                    selectedTeam === null
                  ) {
                    setSelectedClient(new Set([]));
                    setSelectedProcessor(new Set([]));
                    setSelectedReviewer(new Set([]));
                    setSelectedManager(new Set([]));
                  } else {
                    setSelectedClient(
                      showClientTask ? [selectedClientToView] : new Set([])
                    );
                    setSelectedProcessor(
                      new Set(selectedTeam?.members.map((member) => member.sub))
                    );
                    setSelectedReviewer(
                      new Set(selectedTeam?.members.map((member) => member.sub))
                    );
                    setSelectedManager(
                      new Set(selectedTeam?.heads.map((head) => head.sub))
                    );
                  }
                }}
                renderItemPicture={true}
                disallowEmptySelection={false}
              />
            </div>
          </div>

          {/* Client */}
          <div className={`flex justify-between items-center gap-8`}>
            <p className="text-sm lg:text-base font-medium w-[20%]">
              {"Client"}
            </p>
            <div className="w-[80%]">
              <FormFieldSelect
                isRequired={true}
                isDisabled={selectedTeam.size == 0 || showClientTask}
                aria-label="Client Selection"
                items={clientSelection}
                placeholder="Select Client"
                description={
                  "This selection is based from the selected team's assigned clients only"
                }
                selectionMode="single"
                selectedKeys={selectedClient}
                onSelectionChange={(key) => {
                  setSelectedClient(key);
                }}
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
                isDisabled={selectedTeam.size == 0}
                isRequired={true}
                aria-label="Processor Selection"
                items={processorSelection}
                placeholder="Assign Processor/s"
                selectionMode="multiple"
                selectedKeys={selectedProcessor}
                onSelectionChange={setSelectedProcessor}
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
                isDisabled={selectedTeam.size == 0}
                isRequired={true}
                aria-label="Reviewer Selection"
                items={reviewerSelection}
                placeholder="Assign Reviewer/s"
                selectionMode="multiple"
                selectedKeys={selectedReviewer}
                onSelectionChange={setSelectedReviewer}
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
                isDisabled={selectedTeam.size == 0}
                isRequired={true}
                aria-label="Manager Selection"
                items={managerSelection}
                placeholder="Assign Manager/s"
                selectionMode="single"
                selectedKeys={selectedManager}
                onSelectionChange={setSelectedManager}
                renderItemPicture={true}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Description */}
      <div
        data-show={selectedTeam.size == 0}
        className="data-[show=true]:hidden block py-2 w-full"
      >
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
                description={
                  "Note: Recurrence of tasks are automatically done every day"
                }
                selectionMode="single"
                selectedKeys={selectedRecurrence}
                onSelectionChange={setSelectedRecurrence}
              />
            </div>
          </div>

          {Array.from(selectedRecurrence).toString() !== "none" ? (
            <>
              {/* Start Date */}
              <div className="flex justify-between items-center gap-8">
                <p className="text-sm lg:text-base font-medium w-[20%]">
                  {"Start Date"}
                </p>
                <div className="w-[80%]">
                  <FormFieldInput
                    isRequired={true}
                    type={"date"}
                    fullWidth={true}
                    value={taskDuration}
                    onValueChange={setTaskDuration}
                    placeholder={"Set a date"}
                    showPastDate={true}
                    isBusinessDays={true}
                    withDate={true}
                    withTime={false}
                    isDateRange={false}
                    dateRangeValue={dateRange}
                    onDateRangeValueChange={setDateRange}
                  />
                </div>
              </div>

              {/* Task Duration */}
              <div className="flex justify-between items-center gap-8">
                <p className="text-sm lg:text-base font-medium w-[20%]">
                  {"Duration"}
                </p>
                <div className="w-[80%] flex items-center gap-3">
                  <TimeInput
                    isInvalid={startTime?.compare(endTime) > 0}
                    errorMessage={"Invalid Time Range"}
                    label="Start Time"
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
                    label="Due Time"
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
            <div className="flex justify-between items-center gap-8">
              <p className="text-sm lg:text-base font-medium w-[20%]">
                {"Date Range"}
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
                  withTime={true}
                  isDateRange={true}
                  isBusinessDays={true}
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
