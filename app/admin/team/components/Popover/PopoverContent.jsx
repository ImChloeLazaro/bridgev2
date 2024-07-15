import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    Button,
    Listbox,
    ListboxItem,
    useDisclosure
  } from "@nextui-org/react";
  import { FaHamburger } from "react-icons/fa";
  import { useState } from "react";
  import { restupdate } from "@/app/utils/amplify-rest";
  import UpdateTeam from "../Modal/UpdateTeam";
  
  const TeamPopover = ({ data, updateTeamInList }) => {
    const { isOpen, onOpenChange } = useDisclosure();
    const [isModalOpen, setModalOpen] = useState(false);
  
    const keyHandler = async (key) => {
      if (key === "update") {
        setModalOpen(true);
        onOpenChange(false); // Close the popover
      }
  
      if (key === "delete") {
        try {
          const status = data.status === "active" ? "archive" : "active";
          const response = await restupdate(`/teams/team/activeOrArchive`, {
            status,
            _id: data._id,
          });
          console.log("Archive team response", response);
          if(response.modifiedCount != 0){
            updateTeamInList({
                ...data,
                status: status,
              }); // Update the team in the list
          } 
        } catch (error) {
          console.log("Archive team error", error);
        }
      }
    };
  
    return (
      <>
        <Popover placement="bottom" showArrow={true} isOpen={isOpen} onOpenChange={onOpenChange}>
          <PopoverTrigger>
            <Button size="sm" color="primary">
              <FaHamburger />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="px-1 py-2">
              <div className="text-tiny w-52">
                <Listbox aria-label="Actions" onAction={(key) => keyHandler(key)}>
                  <ListboxItem key="update">Update</ListboxItem>
                  <ListboxItem
                    key="delete"
                    className={`text-${data.status === "active" ? "danger" : "success"}`}
                  >
                    {data.status === "active" ? "Set as Archive" : "Set as Active"}
                  </ListboxItem>
                </Listbox>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <UpdateTeam
          isOpen={isModalOpen}
          onOpenChange={() => setModalOpen(false)}
          teamData={data}
          updateTeamInList={updateTeamInList}
        />
      </>
    );
  };
  
  export default TeamPopover;
  