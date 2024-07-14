import CTAButtons from "@/app/components/CTAButtons";
import FormFieldInput from "@/app/components/FormFieldInput";
import FormFieldSelect from "@/app/components/FormFieldSelect";
import {
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  User,
} from "@nextui-org/react";
import { useAtom, useSetAtom } from "jotai";
import {
  memberEmploymentStatusAtom,
  memberPositionAtom,
  memberStatusAtom,
  updateTeamMemberAtom,
} from "../store/TeamManagementStore";

const UpdateTeamMemberModal = ({ selectedMember, isOpen, onOpenChange }) => {
  const [memberPosition, setMemberPosition] = useAtom(memberPositionAtom);
  const [memberStatus, setMemberStatus] = useAtom(memberStatusAtom);
  const [memberEmploymentStatus, setMemberEmploymentStatus] = useAtom(
    memberEmploymentStatusAtom
  );

  const updateTeamMember = useSetAtom(updateTeamMemberAtom);

  const memberStatusSelection = [
    {
      label: "Active",
      key: "active",
      value: "active",
    },
    {
      label: "Inactive",
      key: "inactive",
      value: "inactive",
    },
  ];

  const memberEmploymentStatusSelection = [
    { label: "Intern", key: "intern", value: "intern" },
    {
      label: "Trainee Graduate",
      key: "trainee_graduate",
      value: "trainee_graduate",
    },
    { label: "Probationary", key: "probationary", value: "probationary" },
    {
      label: "Regular",
      key: "regular",
      value: "regular",
    },
  ];

  const handleFormAction = (e) => {
    return false;
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <form action={handleFormAction}>
            <ModalHeader className="flex flex-col gap-1 justify-start">
              <User
                name={selectedMember?.name}
                description={
                  <Link
                    href="/"
                    size="sm"
                    underline="hover"
                    className="text-black-default"
                  >
                    <div className="flex justify-start items-center gap-2">
                      <p className="font-medium text-black-default">
                        {selectedMember?.email}
                      </p>
                    </div>
                  </Link>
                }
                avatarProps={{
                  src: selectedMember?.picture,
                  alt: selectedMember?.name,
                  className: "w-10 h-10 mr-2",
                }}
                classNames={{
                  base: "justify-start",
                  name: "text-base font-medium text-black-default",
                }}
              />
            </ModalHeader>
            <ModalBody className="gap-2">
              <FormFieldInput
                fullWidth={true}
                placeholder={"Position"}
                value={memberPosition}
                onValueChange={setMemberPosition}
                className={"mb-1"}
              />
              <FormFieldSelect
                fullWidth={true}
                disabledValidation={true}
                items={memberStatusSelection}
                placeholder={"Status"}
                selectedKeys={memberStatus}
                onSelectionChange={setMemberStatus}
              />
              <FormFieldSelect
                fullWidth={true}
                disabledValidation={true}
                items={memberEmploymentStatusSelection}
                placeholder={"Employment Status"}
                selectedKeys={memberEmploymentStatus}
                onSelectionChange={setMemberEmploymentStatus}
              />
            </ModalBody>
            <ModalFooter>
              <CTAButtons label={"Cancel"} color={"clear"} onPress={onClose} />
              <CTAButtons
                type={"submit"}
                label={"Update Member"}
                color={"blue"}
                className={"px-6"}
                onPress={() => {
                  updateTeamMember();
                  onClose();
                }}
              />
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
};

export default UpdateTeamMemberModal;
