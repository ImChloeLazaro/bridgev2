import LabelTagChip from "@/app/components/LabelTagChip";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Image,
  Listbox,
  ListboxItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  User,
  cn,
  useDisclosure,
} from "@nextui-org/react";
import { useAtom, useSetAtom } from "jotai";
import Link from "next/link";
import { useState } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { IoMdMail } from "react-icons/io";
import { MdWork } from "react-icons/md";
import {
  archiveTeamAtom,
  deleteTeamAtom,
  memberEmploymentStatusAtom,
  memberPositionAtom,
  memberStatusAtom,
  selectedMemberAtom,
  selectedTeamClientAtom,
  selectedTeamDepartmentAtom,
  selectedTeamHeadsAtom,
  selectedTeamIDAtom,
  selectedTeamMembersAtom,
  selectedTeamNameAtom,
} from "../store/TeamManagementAdminStore";
import UpdateTeamMemberModal from "./UpdateTeamMemberModal";
import UpdateTeamModal from "./UpdateTeamModal";

const TeamCard = ({ team }) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    isOpen: isOpenUpdateMember,
    onOpen: onOpenUpdateMember,
    onOpenChange: onOpenChangeUpdateMember,
  } = useDisclosure();
  const {
    isOpen: isOpenUpdateTeam,
    onOpen: onOpenUpdateTeam,
    onOpenChange: onOpenChangeUpdateTeam,
  } = useDisclosure();

  const [selectedMember, setSelectedMember] = useAtom(selectedMemberAtom);
  const setMemberPosition = useSetAtom(memberPositionAtom);
  const setMemberStatus = useSetAtom(memberStatusAtom);
  const setMemberEmploymentStatus = useSetAtom(memberEmploymentStatusAtom);

  const setTeamName = useSetAtom(selectedTeamNameAtom);
  const setTeamClient = useSetAtom(selectedTeamClientAtom);
  const setTeamHeads = useSetAtom(selectedTeamHeadsAtom);
  const setTeamMembers = useSetAtom(selectedTeamMembersAtom);
  const setTeamDepartment = useSetAtom(selectedTeamDepartmentAtom);
  const setTeamID = useSetAtom(selectedTeamIDAtom);

  const archiveTeam = useSetAtom(archiveTeamAtom);
  const deleteTeam = useSetAtom(deleteTeamAtom);

  const randomHexColorCode = () => {
    // let n = (Math.random() * 0xfffff * 1000000).toString(16);
    // FEAT: Pseudo-random background color for team cards
    // return "bg-[#" + n.slice(0, 6) + "]";
    let arrays_of_colors = [
      "bg-[#6B6B72]",
      "bg-[#EF8B16]",
      "bg-[#32449C]",
      "bg-[#45C2F9]",
      "bg-[#005D38]",
      "bg-[#E2445B]",
      "bg-[#FFCF4C]",
      "bg-[#A44BFD]",
    ];
    let i = Math.floor(Math.random() * arrays_of_colors.length);
    return arrays_of_colors[i];
  };

  const teamOptionsColors = {
    green: "data-[hover=true]:bg-green-default",
    orange: "data-[hover=true]:bg-orange-default",
    red: "data-[hover=true]:bg-red-default",
    blue: "data-[hover=true]:bg-blue-default",
    yellow: "data-[hover=true]:bg-yellow-default",
  };

  const employmentStatusColors = {
    intern: { color: "lightblue", label: "Intern" },
    trainee_graduate: { color: "purple", label: "Trainee Graduate" },
    probationary: { color: "blue", label: "Probationary" },
    regular: { color: "orange", label: "Regular" },
  };

  const updateTeamDetails = (action) => {
    if (action === "update") {
      const selectedClient = team.client.map((client) => client._id);
      const selectedTeamMember = team.members.map((member) => member.sub);
      const selectedTeamHead = team.heads.map((head) => head.sub);
      const selectedDepartment = team.department.map((department) =>
        department._id
      );
      setTeamName(team.name);
      setTeamClient(selectedClient);
      setTeamMembers(selectedTeamMember);
      setTeamHeads(selectedTeamHead);
      setTeamDepartment(selectedDepartment);
      setTeamID(team._id);
      onOpenUpdateTeam();
    }
    if (action === "archive" || action === "active") {
      archiveTeam({ action: action, team_id: team._id });
    }
    if (action === "delete") {
      deleteTeam({ team_id: team._id });
    }
    setIsOpen(false);
  };

  const options = [
    { key: "update", label: "Update Team", color: "orange" },
    // { key: "add", label: "Add Members", color: "blue" },
    team.status === "archive" && {
      key: "delete",
      label: "Delete Team",
      color: "red",
    },
    {
      key: team.status === "archive" ? "active" : "archive",
      label: team.status === "archive" ? "Set Team as Active" : "Archive Team",
      color: team.status === "archive" ? "green" : "red",
    },
  ];

  return (
    <>
      <Card className="m-2 shadow-small">
        <CardHeader className="flex pl-4 justify-between">
          <div className="w-full flex justify-between items-center gap-3">
            <div className="flex items-center justify-start gap-2">
              <p
                data-archive={team.status === "archive"}
                className="data-[archive=true]:line-through text-lg font-semibold text-black-default"
              >
                {team?.name}
              </p>
              <LabelTagChip
                text={team?.members.length}
                color={"grey"}
                className={"px-1 font-medium rounded-full"}
              />
            </div>
            <div className="flex items-center justify-start gap-2 mr-4">
              <div className="flex flex-wrap items-center justify-start gap-2">
                {team.department.map((department) => (
                  <LabelTagChip
                    color={"orange"}
                    text={department.name}
                    key={department._id}
                  />
                ))}
              </div>
              <LabelTagChip
                text={team.status === "active" ? "Active" : "Archived"}
                color={team.status === "active" ? "green" : "red"}
                className={"px-1 font-medium"}
              />
            </div>
          </div>
          <Popover
            placement="bottom-end"
            showArrow
            offset={6}
            isOpen={isOpen}
            onOpenChange={(open) => setIsOpen(open)}
          >
            <PopoverTrigger>
              <Button isIconOnly className="bg-transparent p-0">
                <BiDotsHorizontalRounded size={20} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-1 w-44">
              <Listbox
                items={options}
                aria-label="Actions"
                disabledKeys={
                  team.status === "archive" ? ["update", "archive"] : [""]
                }
                onAction={(key) => updateTeamDetails(key)}
                itemClasses={{
                  base: [
                    "data-[hover=true]:text-white-default text-black-default",
                  ],
                  // title: ["text-base font-normal"],
                }}
              >
                {(item) => {
                  return (
                    <ListboxItem
                      key={item.key}
                      className={teamOptionsColors[item.color]}
                    >
                      {item.label}
                    </ListboxItem>
                  );
                }}
              </Listbox>
            </PopoverContent>
          </Popover>
        </CardHeader>
        <CardBody className="h-72 overflow-auto">
          <Listbox
            items={team?.members}
            aria-label="Team List"
            onAction={(key) => {
              let selected = team?.members.filter(
                (member) => member.sub === key
              )[0];
              setTeamID(team._id);
              setSelectedMember(selected);
              setMemberPosition(selected?.position);
              setMemberStatus([selected?.status]);
              setMemberEmploymentStatus([selected?.employment_status]);
              onOpenUpdateMember();
            }}
            emptyContent={
              <div className="w-full p-0 flex flex-col items-center mt-6 xl:mt-8 text-center">
                <Image
                  width={180}
                  height={180}
                  alt={"No Members"}
                  src={"/no-data.png"}
                  classNames={{ img: "aspect-square lg:w-32 xl:w-44" }}
                />
                <p className="text-sm xl:text-base font-medium text-black-default/80">
                  {"This team has no members yet"}
                </p>
                <p className="text-sm xl:text-base font-medium text-black-default/80">
                  {"Start adding now!"}
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
            {(item) => {
              return (
                <ListboxItem
                  key={item.key ? item.key : item.sub ? item.sub : item._id}
                  textValue={
                    item.key ? item.key : item.sub ? item.sub : item._id
                  }
                >
                  <div className="w-full h-24 flex gap-4 items-center justify-between">
                    <div
                      className={cn(
                        "w-1/5 px-4 h-full rounded-l-md",
                        "flex flex-col justify-center items-center",
                        "text-base font-medium text-white-default text-shadow",
                        `${randomHexColorCode()}`
                        // `bg-[${randomHexColorCode()}]` // item.color ? item.color :
                      )}
                    >
                      {/* <p className="font-extrabold text-lg xl:text-2xl">{list.team}</p> */}
                      <p className="font-medium text-base">{`Team ${
                        team.heads[0]?.name?.split(" ")[0] ?? "..."
                      }`}</p>
                    </div>
                    <div className="w-3/5 flex items-center justify-start pl-4 gap-6">
                      <User
                        name={item?.name ?? "Team Member"}
                        description={
                          <Link
                            href="/"
                            size="sm"
                            underline="hover"
                            className="text-black-default"
                          >
                            <div className="flex justify-start items-center gap-2">
                              <IoMdMail
                                className="text-black-default"
                                fill="currentColor"
                              />
                              <p className="font-medium text-black-default">
                                {item?.email ?? "team.member@aretex.com.au"}
                              </p>
                            </div>
                            <div className="flex justify-start items-center gap-2">
                              <MdWork
                                className="text-black-default"
                                fill="currentColor"
                              />

                              <p className="font-medium text-black-default">
                                {item?.position}
                              </p>
                            </div>
                          </Link>
                        }
                        avatarProps={{
                          src: item?.picture,
                          alt: item?.name,
                          className: "w-10 h-10 mr-2",
                        }}
                        classNames={{
                          name: "text-base font-medium text-black-default",
                        }}
                      />
                    </div>
                    <div className="w-1/5 flex flex-col justify-center items-end gap-1 m-2">
                      <LabelTagChip
                        text={
                          employmentStatusColors[item?.employment_status]
                            ?.label ?? "Employment Status"
                        }
                        color={
                          employmentStatusColors[item?.employment_status]
                            ?.color ?? "darkgrey"
                        }
                        className={"px-4 font-medium"}
                      />
                      <LabelTagChip
                        text={item?.status === "active" ? "Active" : "Inactive"}
                        color={item?.status === "active" ? "green" : "red"}
                        className={"px-4 font-medium"}
                      />
                    </div>
                  </div>
                </ListboxItem>
              );
            }}
          </Listbox>
        </CardBody>
      </Card>
      <UpdateTeamMemberModal
        selectedMember={selectedMember}
        isOpen={isOpenUpdateMember}
        onOpenChange={onOpenChangeUpdateMember}
      />
      <UpdateTeamModal
        isOpen={isOpenUpdateTeam}
        onOpenChange={onOpenChangeUpdateTeam}
        action={"update"}
      />
    </>
  );
};

export default TeamCard;
