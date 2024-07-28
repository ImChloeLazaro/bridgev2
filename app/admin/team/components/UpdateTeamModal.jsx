import CTAButtons from "@/app/components/CTAButtons";
import FormFieldInput from "@/app/components/FormFieldInput";
import FormFieldSelect from "@/app/components/FormFieldSelect";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
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
  teamDepartmentSelectionAtom,
  teamHeadSelectionAtom,
  teamMemberSelectionAtom,
  teamSelectionAtom,
  selectedTeamDepartmentNameAtom,
  updateTeamAtom,
  addDepartmentAtom,
} from "../store/TeamManagementAdminStore";
import ConfirmationWindow from "@/app/components/ConfirmationWindow";

const UpdateTeamModal = ({ isOpen, onOpenChange, action }) => {
  const {
    isOpen: isOpenPopup,
    onOpen: onOpenPopup,
    onOpenChange: onOpenChangePopup,
  } = useDisclosure();

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
  const teamDepartmentSelection = useAtomValue(teamDepartmentSelectionAtom);

  const activeTeamSelection = teamSelection.filter(
    (team) => team.status === "active"
  );

  const teamAction = {
    archive: {
      label: "Archive Team",
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
        </>
      ),
      actionLabel: "Archive Team",
      actionColor: "red",
      action: archiveTeamMultiple,
      message:
        "Make sure the details of the client is correct. You cannot edit this later.",
      title: "Archive Team",
      choice: "Archive Team",
      type: "warning",
    },
    team: {
      label: "Create New Team",
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
            items={teamDepartmentSelection}
            label={"Select Department/s"}
            selectedKeys={selectedTeamDepartment}
            onSelectionChange={setSelectedTeamDepartment}
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
      actionLabel: "Create Team",
      actionColor: "blue",
      action: addTeam,
      message:
        "You are about to create this team. Make sure the details of the team are correct. You can edit this later.",
      title: `${selectedTeamName}`,
      choice: "Add Team",
      type: "confirm",
    },
    update: {
      label: "Update Team",
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
            items={teamDepartmentSelection}
            label={"Select Department/s"}
            selectedKeys={selectedTeamDepartment}
            onSelectionChange={setSelectedTeamDepartment}
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
      message: "You are about to update this team's details. ",
      title: "Update Team",
      choice: "Update Team",
      type: "confirm",
    },
    department: {
      label: "Create New Department",
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
      actionLabel: "Create Department",
      actionColor: "green",
      action: addDepartment,
      message: "You are about to create a new department.",
      title: `${selectedTeamDepartmentName}`,
      choice: "Add Department",
      type: "confirm",
    },
  };

  const handleFormAction = (e) => {
    onOpenPopup();
    return false;
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      // hideCloseButton={true}
    >
      <ModalContent>
        {(onClose) => (
          <form action={handleFormAction}>
            <ModalHeader className="flex flex-col gap-1 justify-start">
              <p className="text-lg font-bold text-black-default">
                {teamAction[action].label}
              </p>
            </ModalHeader>
            <ModalBody className="gap-2">{teamAction[action].form}</ModalBody>
            <ModalFooter>
              <CTAButtons label={"Cancel"} color={"clear"} onPress={onClose} />
              <CTAButtons
                type={"submit"}
                label={teamAction[action].actionLabel}
                color={teamAction[action].actionColor}
                className={"px-6"}
              />
            </ModalFooter>
            <ConfirmationWindow
              message={teamAction[action].message}
              title={teamAction[action].title}
              choice={teamAction[action].choice}
              action={teamAction[action].action}
              type={teamAction[action].type}
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

export default UpdateTeamModal;
