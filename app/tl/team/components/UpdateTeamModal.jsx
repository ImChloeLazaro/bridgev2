import CTAButtons from "@/app/components/CTAButtons";
import FormFieldInput from "@/app/components/FormFieldInput";
import FormFieldSelect from "@/app/components/FormFieldSelect";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  addTeamAtom,
  archiveTeamMultipleAtom,
  deleteTeamAtom,
  selectedTeamClientAtom,
  selectedTeamDepartmentAtom,
  selectedTeamHeadsAtom,
  selectedTeamMembersAtom,
  selectedTeamNameArchiveAtom,
  selectedTeamNameAtom,
  teamClientSelectionAtom,
  teamHeadSelectionAtom,
  teamMemberSelectionAtom,
  teamSelectionAtom,
  selectedTeamDepartmentNameAtom,
  updateTeamAtom,
  addDepartmentAtom,
} from "../store/TeamManagementTLStore";

const UpdateTeamModal = ({ isOpen, onOpenChange, action }) => {
  const [selectedTeamNameArchive, setSelectedTeamNameArchive] = useAtom(
    selectedTeamNameArchiveAtom
  );
  const [selectedTeamName, setSelectedTeamName] = useAtom(selectedTeamNameAtom);
  const [selectedTeamDepartmentName, setSelectedTeamDepartmentName] = useAtom(
    selectedTeamDepartmentNameAtom
  );
  const [selectedTeamClient, setSelectedTeamClient] = useAtom(
    selectedTeamClientAtom
  );
  const [selectedTeamHeads, setSelectedTeamHeads] = useAtom(
    selectedTeamHeadsAtom
  );
  const [selectedTeamMembers, setSelectedTeamMembers] = useAtom(
    selectedTeamMembersAtom
  );
  const [selectedTeamDepartment, setSelectedTeamDepartment] = useAtom(
    selectedTeamDepartmentAtom
  );

  const addTeam = useSetAtom(addTeamAtom);
  const addDepartment = useSetAtom(addDepartmentAtom);
  const updateTeam = useSetAtom(updateTeamAtom);
  const archiveTeamMultiple = useSetAtom(archiveTeamMultipleAtom);
  const deleteTeam = useSetAtom(deleteTeamAtom);

  const teamSelection = useAtomValue(teamSelectionAtom);
  const teamClientSelection = useAtomValue(teamClientSelectionAtom);
  const teamHeadSelection = useAtomValue(teamHeadSelectionAtom);
  const teamMemberSelection = useAtomValue(teamMemberSelectionAtom);

  const activeTeamSelection = teamSelection.filter(
    (team) => team.status === "active"
  );

  const teamAction = {
    archive: {
      title: "Archive Team",
      form: (
        <>
          <FormFieldSelect
            fullWidth={true}
            isRequired={true}
            disabledValidation={true}
            items={activeTeamSelection}
            label={"Select Team/s"}
            selectedKeys={selectedTeamNameArchive}
            onSelectionChange={setSelectedTeamNameArchive}
            renderItemPicture={true}
            renderType={"chip"}
            selectionMode={"multiple"}
          />
          {/* <FormFieldSelect
            fullWidth={true}
            isRequired={true}
            disabledValidation={true}
            items={teamHeadSelection}
            label={"Select Team Head"}
            selectedKeys={selectedTeamHeads}
            onSelectionChange={setSelectedTeamHeads}
            renderItemPicture={true}
            renderType={"chip"}
            selectionMode={"multiple"}
          />
          <FormFieldSelect
            fullWidth={true}
            isRequired={true}
            disabledValidation={true}
            items={teamClientSelection}
            label={"Select Client/s"}
            selectedKeys={selectedTeamClient}
            onSelectionChange={setSelectedTeamClient}
            renderItemPicture={true}
            renderType={"chip"}
            selectionMode={"multiple"}
          /> */}
        </>
      ),
      actionLabel: "Archive Team",
      actionColor: "red",
      action: archiveTeamMultiple,
    },
    sub: {
      title: "Add Sub Team",
      form: (
        <>
          <FormFieldInput
            type={"text"}
            fullWidth={true}
            isRequired={true}
            label={"Team Name"}
            value={selectedTeamName}
            onValueChange={setSelectedTeamName}
            className={"mb-1"}
          />
          <FormFieldSelect
            fullWidth={true}
            isRequired={true}
            disabledValidation={true}
            items={teamClientSelection}
            label={"Select Client/s"}
            selectedKeys={selectedTeamClient}
            onSelectionChange={setSelectedTeamClient}
            renderItemPicture={true}
            renderType={"chip"}
            selectionMode={"multiple"}
          />
          <FormFieldSelect
            fullWidth={true}
            isRequired={true}
            disabledValidation={true}
            items={teamHeadSelection}
            label={"Select Team Head"}
            selectedKeys={selectedTeamHeads}
            onSelectionChange={setSelectedTeamHeads}
            renderItemPicture={true}
          />
          <FormFieldSelect
            fullWidth={true}
            isRequired={true}
            disabledValidation={true}
            items={teamMemberSelection}
            label={"Select Team Member/s"}
            selectedKeys={selectedTeamMembers}
            onSelectionChange={setSelectedTeamMembers}
            renderItemPicture={true}
            renderType={"chip"}
            selectionMode={"multiple"}
          />
        </>
      ),
      actionLabel: "Add Team",
      actionColor: "blue",
      action: addTeam,
    },
    update: {
      title: "Update Team",
      form: (
        <>
          <FormFieldInput
            type={"text"}
            fullWidth={true}
            isRequired={true}
            label={"Team Name"}
            value={selectedTeamName}
            onValueChange={setSelectedTeamName}
            className={"mb-1"}
          />
          <FormFieldSelect
            fullWidth={true}
            isRequired={true}
            disabledValidation={true}
            items={teamClientSelection}
            label={"Select Client/s"}
            selectedKeys={selectedTeamClient}
            onSelectionChange={setSelectedTeamClient}
            renderItemPicture={true}
            renderType={"chip"}
            selectionMode={"multiple"}
          />
          <FormFieldSelect
            fullWidth={true}
            isRequired={true}
            disabledValidation={true}
            items={teamHeadSelection}
            label={"Select Team Head"}
            selectedKeys={selectedTeamHeads}
            onSelectionChange={setSelectedTeamHeads}
            renderItemPicture={true}
          />
          <FormFieldSelect
            fullWidth={true}
            isRequired={true}
            disabledValidation={true}
            items={teamMemberSelection}
            label={"Select Team Member/s"}
            selectedKeys={selectedTeamMembers}
            onSelectionChange={setSelectedTeamMembers}
            renderItemPicture={true}
            renderType={"chip"}
            selectionMode={"multiple"}
          />
        </>
      ),
      actionLabel: "Update Team",
      actionColor: "blue",
      action: updateTeam,
    },
    department: {
      title: "Add Department",
      form: (
        <>
          <FormFieldInput
            type={"text"}
            fullWidth={true}
            isRequired={true}
            label={"Department Name"}
            value={selectedTeamDepartmentName}
            onValueChange={setSelectedTeamDepartmentName}
            className={"mb-1"}
          />
        </>
      ),
      actionLabel: "Add Department",
      actionColor: "green",
      action: addDepartment,
    },
  };

  const handleFormAction = (e) => {
    return false;
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <form action={handleFormAction}>
            <ModalHeader className="flex flex-col gap-1 justify-start">
              <p className="text-lg font-bold text-black-default">
                {teamAction[action].title}
              </p>
            </ModalHeader>
            <ModalBody className="gap-2">{teamAction[action].form}</ModalBody>
            <ModalFooter>
              <CTAButtons label={"Cancel"} color={"clear"} onPress={onClose} />
              <CTAButtons
                type={"submit"}
                label={teamAction[action].actionLabel}
                color={teamAction[action].actionColor}
                onPress={() => {
                  teamAction[action].action();
                  onClose();
                }}
                className={"px-6"}
              />
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
};

export default UpdateTeamModal;
