import SearchBar from "@/app/components/SearchBar";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Listbox,
  ListboxItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";

import CTAButtons from "@/app/components/CTAButtons";
import { fetchClientAtom } from "@/app/store/ClientStore";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useMemo, useState } from "react";
import { MdSettings } from "react-icons/md";
import {
  fetchTeamsAtom,
  selectedTeamClientAtom,
  selectedTeamDepartmentAtom,
  selectedTeamFilterKeysAtom,
  selectedTeamHeadsAtom,
  selectedTeamMembersAtom,
  selectedTeamNameArchiveAtom,
  selectedTeamNameAtom,
  teamFilterKeysAtom,
  teamsAtom,
} from "../store/TeamManagementStore";
import TeamCard from "./TeamCard";
import UpdateTeamModal from "./UpdateTeamModal";
import { userAtom } from "@/app/store/UserStore";

const TeamManagement = () => {
  const user = useAtomValue(userAtom);

  const fetchTeams = useSetAtom(fetchTeamsAtom);
  const fetchClient = useSetAtom(fetchClientAtom);

  const setTeamName = useSetAtom(selectedTeamNameAtom);
  const setTeamClient = useSetAtom(selectedTeamClientAtom);
  const setTeamHeads = useSetAtom(selectedTeamHeadsAtom);
  const setTeamMembers = useSetAtom(selectedTeamMembersAtom);
  const setTeamNameArchive = useSetAtom(selectedTeamNameArchiveAtom);
  const setTeamDepartment = useSetAtom(selectedTeamDepartmentAtom);

  useEffect(() => {
    fetchTeams();
    fetchClient();
  }, [fetchClient, fetchTeams]);

  const teams = useAtomValue(teamsAtom);

  const [showArchived, setShowArchived] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const teamFilterKeys = useAtomValue(teamFilterKeysAtom);
  const [selectedTeamFilterKeys, setSelectedTeamFilterKeys] = useAtom(
    selectedTeamFilterKeysAtom
  );

  const selectedTeamFilterKeyString = Array.from(
    selectedTeamFilterKeys
  ).toString();

  const {
    isOpen: isOpenUpdateTeamStatus,
    onOpen: onOpenUpdateTeamStatus,
    onOpenChange: onOpenChangeUpdateTeamStatus,
  } = useDisclosure();

  const [isLoading, setIsLoading] = useState(false);
  const [teamAction, setTeamAction] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const teamOptionsColors = {
    green: "data-[hover=true]:bg-green-default",
    orange: "data-[hover=true]:bg-orange-default",
    red: "data-[hover=true]:bg-red-default",
    blue: "data-[hover=true]:bg-blue-default",
    yellow: "data-[hover=true]:bg-yellow-default",
  };

  const options = [
    {
      key: "show",
      label: showArchived ? "Hide archived team/s" : "Show archived team/s",
      color: showArchived ? "red" : "green",
    },
  ];

  const filteredTeamItems = useMemo(() => {
    let filteredTeams = teams?.length
      ? teams.filter((team) =>
          team.heads.map((head) => head.sub).includes(user.sub)
        )
      : [];

    filteredTeams = showArchived
      ? filteredTeams.filter((team) => team)
      : filteredTeams.filter((team) => team.status === "active");

    if (Boolean(searchItem)) {
      filteredTeams = filteredTeams.filter((team) =>
        team.name.toLowerCase().includes(searchItem.toLowerCase())
      );
    }
    if (
      selectedTeamFilterKeyString !== "all" &&
      Array.from(selectedTeamFilterKeys).length !== teamFilterKeys.length
    ) {
      filteredTeams = filteredTeams.filter((task) => {
        return task.department
          .map((department) => department.name.toLowerCase())
          .includes(Array.from(selectedTeamFilterKeys).toString());
      });
    }

    return filteredTeams;
  }, [
    teams,
    showArchived,
    searchItem,
    selectedTeamFilterKeyString,
    selectedTeamFilterKeys,
    teamFilterKeys.length,
    user.sub,
  ]);

  const handleTeamUpdate = (action) => {
    if (action === "archive") {
      setTeamNameArchive(new Set([]));
    }
    if (action === "add") {
      setTeamName("");
      setTeamClient(new Set([]));
      setTeamHeads(new Set([]));
      setTeamMembers(new Set([]));
      setTeamDepartment(new Set([]));
    }

    setTeamAction(action);
    onOpenUpdateTeamStatus();
  };

  const handleTeamSettings = (action) => {
    setIsOpen(false);
    setShowArchived(!showArchived);
  };

  return (
    <>
      <Card className="flex w-full h-full my-0 lg:my-4 px-0 lg:px-2 drop-shadow shadow-none bg-white-default rounded-none lg:rounded-xl">
        <CardHeader className="">
          <div className="w-full mt-3 flex items-center justify-between gap-2">
            <div className="flex gap-2 justify-between items-center">
              <SearchBar
                type="filter"
                endLabel="Search Team"
                searchItem={searchItem}
                setSearchItem={setSearchItem}
                filterKeys={teamFilterKeys}
                selectedFilterKeys={selectedTeamFilterKeys}
                setSelectedFilterKeys={setSelectedTeamFilterKeys}
              />
              <Popover
                placement="bottom-end"
                showArrow
                offset={6}
                isOpen={isOpen}
                onOpenChange={(open) => setIsOpen(open)}
              >
                <PopoverTrigger>
                  <Button
                    isIconOnly
                    radius={"sm"}
                    aria-label={"Team Settings Button"}
                    variant="bordered"
                    // onPress={handleTeamSettings}
                  >
                    <MdSettings
                      size={18}
                      className="text-black-default"
                      fill="currentColor"
                    />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-1 w-44">
                  <Listbox
                    items={options}
                    aria-label="Actions"
                    onAction={(key) => handleTeamSettings(key)}
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
            </div>
            <div className="flex gap-2 justify-between items-center">
              <CTAButtons
                label={"Archive Team"}
                color={"red"}
                onPress={() => {
                  handleTeamUpdate("archive");
                }}
                className={"px-8 py-5 font-medium text-sm"}
              />
              <CTAButtons
                label={"Add Team"}
                color={"blue"}
                onPress={() => {
                  handleTeamUpdate("add");
                }}
                className={"px-8 py-5 font-medium text-sm"}
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className="p-0 h-full w-full overflow-x-auto">
          <div className="">
            {isLoading ? (
              <div className="flex justify-center items-center">
                <Spinner label="Loading..." />
              </div>
            ) : (
              <div className="flex flex-col w-full gap-y-3">
                {!filteredTeamItems?.length ? (
                  filteredTeamItems?.length < 1 &&
                  !searchItem?.length &&
                  Array.from(selectedTeamFilterKeys).join("") === "all" ? (
                    <div className="w-full h-full flex justify-center p-0 lg:p-4 text-lg font-medium text-black-default">
                      <div className="flex flex-col items-center justify-center">
                        <Image
                          width={450}
                          height={450}
                          alt={"Empty Data"}
                          src={"/empty-data.png"}
                          className="w-[10rem] md:w-[18rem] lg:w-[24rem]"
                        />
                        <p className="text-sm lg:text-lg font-medium text-black-default/80">
                          {"No teams to manage."}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full flex justify-center p-0 lg:p-4 text-lg font-medium text-black-default">
                      <div className="flex flex-col items-center justify-center">
                        <Image
                          width={450}
                          height={450}
                          alt={"No Data"}
                          src={"/no-data-1.webp"}
                          className="w-[10rem] md:w-[18rem] lg:w-[24rem]"
                        />
                        <p className="text-sm lg:text-lg font-medium text-black-default/80">
                          {
                            "Sorry, we didn't found any team matching your criteria!"
                          }
                        </p>
                      </div>
                    </div>
                  )
                ) : (
                  <div className="grid grid-cols-2 xl:grid-cols-1">
                    {filteredTeamItems?.map((team) => (
                      <TeamCard key={team.key} team={team} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </CardBody>
        <CardFooter className=""></CardFooter>
      </Card>
      <UpdateTeamModal
        isOpen={isOpenUpdateTeamStatus}
        onOpenChange={onOpenChangeUpdateTeamStatus}
        action={teamAction}
      />
    </>
  );
};

export default TeamManagement;
