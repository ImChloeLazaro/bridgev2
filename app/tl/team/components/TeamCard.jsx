import {
  Card,
  CardHeader,
  CardBody,
  Listbox,
  ListboxItem,
  Chip,
  Avatar,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useDisclosure
} from "@nextui-org/react";
import { FaHamburger } from "react-icons/fa";
import { useState } from "react";
import UpdateTeamMember from "./UpdateTeamMember";

const TeamCard = ({ item, keyHandler }) => {
  const [popoverTrigger, setPopoverTrigger] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [teamMembers, setTeamMembers] = useState(item.members);

  const {
    isOpen: updatePersonIsOpen,
    onOpen: updatePersonOnOpen,
    onClose: updatePersonOnClose
  } = useDisclosure();

  const handleAction = (key) => {
    keyHandler(key, item);
    if (key === 'update') {
      setPopoverTrigger(false);
    }
  };

  const updateOne = (updated) => {
    const updatedMembers = teamMembers.map((member) => {
      if (member._id === updated._id) {
        return {
          ...member,
          ...updated
        };
      }
      return member;
    });
    setTeamMembers(updatedMembers);
  };

  const openUpdateModal = (person) => {
    console.log('PERSON', person);
    setSelectedPerson(person); 
    updatePersonOnOpen();
  };

  return (
    <>
      <UpdateTeamMember
        keyObj={item}
        isOpen={updatePersonIsOpen}
        onOpenChange={updatePersonOnClose}
        teamMember={selectedPerson}
        setUpdatedTeamMember={updateOne}
      />
      <Card key={item._id || item.key} className="flex flex-col p-4 gap-2">
        <CardHeader className="flex justify-between">
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <Popover placement="bottom" showArrow={true} isOpen={popoverTrigger} onOpenChange={(open) => setPopoverTrigger(open)}>
            <PopoverTrigger>
              <Button size="sm" color="primary">
                <FaHamburger />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="px-1 py-2">
                <Listbox aria-label="Actions" onAction={(key) => handleAction(key)}>
                  <ListboxItem key="update">Update</ListboxItem>
                  <ListboxItem
                    key="delete"
                    className={`text-${item.status === "active" ? "danger" : "success"}`}
                  >
                    {item.status === "active" ? "Set as Archive" : "Set as Active"}
                  </ListboxItem>
                </Listbox>
              </div>
            </PopoverContent>
          </Popover>
        </CardHeader>
        <CardBody>
          <Listbox
            items={teamMembers}
            aria-label="Member List"
            onAction={(key) => console.log('THIS IS THE KEY', key)}
            emptyContent={
              <div className="w-full p-0 flex flex-col items-center mt-6 xl:mt-8 text-center">
                No Content!
              </div>
            }
            classNames={{
              base: ["w-full h-auto overflow-y-auto"],
              list: "flex gap-2",
            }}
            itemClasses={{
              base: [
                "p-0",
                "data-[hover=true]:bg-grey-default bg-white-default ",
                "drop-shadow-sm rounded-md outline outline-[1.8px] outline-grey-default",
              ],
            }}
          >
            {(member) => (
              <ListboxItem
                textValue={member.name}
                key={member._id}
                onClick={() => openUpdateModal(member)}
              >
                <div className="flex items-center">
                  <div className="flex w-full p-1">
                    <div className="flex gap-2 w-3/4 items-center">
                      <Avatar src={member.picture} size="md" />
                      <div>
                        <p className="text-sm font-medium">{member.name}</p>
                        <p className="text-xs font-light">{member.email}</p>
                        <p className="text-xs font-light">{member.position}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-between w-1/4">
                      <Chip size="sm" className="text-slate-50" color={member.employment_status === 'Employment Status' ? 'default' : 'warning'}>
                        {member.employment_status}
                      </Chip>
                      <Chip size="sm" className="text-slate-50" color={member.status === 'active' ? 'success' : 'danger'}>
                        {member.status === 'active' ? 'Active' : 'Inactive'}
                      </Chip>
                    </div>
                  </div>
                </div>
              </ListboxItem>
            )}
          </Listbox>
        </CardBody>
      </Card>
    </>
  );
}

export default TeamCard;
