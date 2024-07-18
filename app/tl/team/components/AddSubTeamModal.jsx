import { useState } from "react";
import { Button, useDisclosure, Input } from "@nextui-org/react";
import ModalComponent from "@/app/admin/team/components/Modal/ModalComponent";
import MemberSelect from "@/app/admin/team/components/MemberSelect";
import ClientSelect from "@/app/admin/team/components/ClientSelect";
import { useAtomValue } from "jotai";
import { authenticationAtom } from "@/app/store/AuthenticationStore";
import { v4 } from "uuid";
import { restinsert } from "@/app/utils/amplify-rest";
const AddSubTeamModal = ({ addSubTeam }) => {
  const { sub, name, email, picture } = useAtomValue(authenticationAtom).auth;

  const [teamMembers, setTeamMembers] = useState({
    head: {
      sub,
      name,
      email,
      picture,
    },
    name: "",
    members: [],
    client: [],
  });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const onsubmit = async (e) => {
    e.preventDefault();
    const updatedMembers = teamMembers.members.map((member) => ({
      ...member,
      position: "not specified",
      status: "active",
      employment_status: "not specified",
    }));

    const subteam_entry = {
      ...teamMembers,
      members: updatedMembers,
    };
    try {
      const team = await restinsert("/teams/subteam/", subteam_entry);
      console.log("RESPONSE", team);
      if (team.success) {
        addSubTeam(team.response);
        console.log("Sub Team Added Successfully", team.response);
      }
    } catch (error) {
      console.log(error);
    }
    onOpenChange();
  };

  return (
    <>
      <Button onClick={onOpenChange} color="primary">
        Insert Sub Team
      </Button>
      <ModalComponent
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title={"Add Sub Team"}
        action={onsubmit}
        actionName={"Add"}
      >
        <div className="flex flex-col space-y-4">
          <Input
            type="text"
            label="Team Name"
            size="sm"
            onChange={(e) =>
              setTeamMembers({ ...teamMembers, name: e.target.value })
            }
          />
          <MemberSelect
            placeholder="Select Team Members"
            name="teamMembers"
            handleInvitees={(selected) =>
              setTeamMembers({
                ...teamMembers,
                members: selected.map((item) => item),
              })
            }
          />
          <ClientSelect
            handleClientSelect={(selected) =>
              setTeamMembers({
                ...teamMembers,
                client: selected.map((item) => item),
              })
            }
          />
        </div>
      </ModalComponent>
    </>
  );
};

export default AddSubTeamModal;
