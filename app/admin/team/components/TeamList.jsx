import {
  Listbox,
  ListboxItem,
  Image,
  cn,
  Chip,
  useDisclosure,
  Avatar
} from "@nextui-org/react";
import { useState } from 'react'; // Import useState from React
import UpdateTeamMember from "./Modal/UpdateTeamMember";
const TeamList = ({ 
  team_id, 
  team, 
  head, 
  members, 
  data
}) => {
  const [selectedPerson, setSelectedPerson] = useState(null); // State for selected person
  const [selectedMembers, setSelectedMembers] = useState(members); // State for selected member
  const {
    isOpen: updatePersonIsOpen,
    onOpen: updatePersonOnOpen,
    onClose: updatePersonOnClose
  } = useDisclosure();

  const openUpdateModal = (person) => {
    setSelectedPerson(person); // Update the selected person
    updatePersonOnOpen();
  }

  const updateOneMember = (updated) => {
    const updatedMembers = selectedMembers.map((member) => {
      if (member._id === updated._id) {
        return {
          ...member,
          ...updated
        }
      }
      return member;
    });
    console.log(updated);
    setSelectedMembers(updatedMembers);
    console.log(updatedMembers);
  }

  return (
    <>
      <Listbox
        items={selectedMembers || []}
        aria-label="Training List"
        onAction={(key) => openUpdateModal(key)}
        emptyContent={
          <div className="w-full p-0 flex flex-col items-center mt-6 xl:mt-8 text-center">
            <Image
              width={180}
              height={180}
              alt={"No Training"}
              src={"/no-training.png"}
              classNames={{ img: "aspect-square lg:w-32 xl:w-44" }}
            />
            <p className="text-sm xl:text-base font-medium text-black-default/80">
              {"Feeling extra today?"}
            </p>
            <p className="text-sm xl:text-base font-medium text-black-default/80">
              {"Start your training now!"}
            </p>
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
        {(list) => (
          <ListboxItem textValue={list.name} key={list._id} onClick={() => openUpdateModal(list)}>
            <div className="flex items-center">
              <div
                className={cn(
                  "py-1.5 rounded-l-md",
                  `bg-red-default text-white-default`,
                  `p-2`
                )}
              >
                <p className="font-extrabold text-lg xl:text-2xl">
                  {team}
                </p>
                <p className="font-light text-xs">{head}</p>
              </div>
              <div className="flex w-full ">
                <div className="flex gap-2 w-3/4">
                  <Avatar src={list.picture} size="lg" />
                  <div>
                    <p className="text-sm font-medium">{list.name}</p>
                    <p className="text-xs font-light">{list.email}</p>
                    <p className="text-xs font-light">{list.position}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between w-1/4">
                  <Chip size="sm" className="text-slate-50" color={list.employment_status === 'Employment Status' ? 'default' : 'warning'}>
                    {list.employment_status}
                  </Chip>
                  <Chip size="sm" className="text-slate-50" color={list.status === 'active' ? 'success' : 'danger'}>
                    {list.status === 'active' ? 'Active' : 'Inactive'}
                  </Chip>
                </div>
              </div>
            </div>

          </ListboxItem>
        )}
      </Listbox>
      <UpdateTeamMember
        isOpen={updatePersonIsOpen}
        onOpenChange={updatePersonOnClose}
        person={selectedPerson}
        updateOneMember={updateOneMember}
        team={team_id}
      />
    </>
  )
}

export default TeamList;
