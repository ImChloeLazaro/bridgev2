import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Avatar,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useState } from "react";
import { restupdate, restread } from "@/app/utils/amplify-rest";
const UpdateTeamMember = ({
  isOpen,
  onOpenChange,
  team,
  person,
  updateOneMember,
  members,
}) => {
  const [selectedPerson, setSelectedPerson] = useState({});

  const statusOptions = [
    { key: "active", label: "Active" },
    { key: "inactive", label: "Inactive" },
  ];

  const employmentStatusOptions = [
    { key: "intern", label: "Intern" },
    { key: "trainee Graduate", label: "Trainee Graduate" },
    { key: "probationary", label: "Probationary" },
    { key: "regular", label: "Regular" },
  ];

  const updatePerson = async (e) => {
    e.preventDefault();
    const backend_team = await restupdate("/teams/team/updateMember", {
      _id: team,
      status: {
        ...selectedPerson,
        _id: person._id,
      },
    });
    if (backend_team.success) {
      updateOneMember({
        ...selectedPerson,
        _id: person._id,
      });
    }
    onOpenChange();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              <div className="flex gap-3 items-center">
                <Avatar src={person.picture} size="lg" />
                <main>
                  <p className="text-slate-900">{person.name}</p>
                  <small className="font-normal text-slate-600">
                    {person.email}
                  </small>
                </main>
              </div>
            </ModalHeader>
            <form onSubmit={updatePerson}>
              <ModalBody>
                <Input
                  isRequired
                  label="Position"
                  size="sm"
                  onChange={(e) =>
                    setSelectedPerson({
                      ...selectedPerson,
                      position: e.target.value,
                    })
                  }
                />
                <Select
                  isRequired
                  label="Status"
                  className="w-full"
                  size="sm"
                  onChange={(e) =>
                    setSelectedPerson({
                      ...selectedPerson,
                      status: e.target.value,
                    })
                  }
                >
                  {statusOptions.map((status) => (
                    <SelectItem key={status.key} value={status.key}>
                      {status.label}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  isRequired
                  label="Employment Status"
                  className="w-full"
                  size="sm"
                  onChange={(e) =>
                    setSelectedPerson({
                      ...selectedPerson,
                      employment_status: e.target.value,
                    })
                  }
                >
                  {employmentStatusOptions.map((status) => (
                    <SelectItem key={status.key} value={status.key}>
                      {status.label}
                    </SelectItem>
                  ))}
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" type="submit">
                  Action
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default UpdateTeamMember;
