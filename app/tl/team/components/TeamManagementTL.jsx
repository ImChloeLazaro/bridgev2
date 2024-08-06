import CTAButtons from "@/app/components/CTAButtons";
import LabelTagChip from "@/app/components/LabelTagChip";
import SearchBar from "@/app/components/SearchBar";
import { fetchClientAtom } from "@/app/store/ClientStore";
import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Link,
  Listbox,
  ListboxItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  useDisclosure,
  Tabs,
  Tab,
} from "@nextui-org/react";

import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useCallback, useEffect, useMemo, useState } from "react";
import { MdSettings } from "react-icons/md";
import {
  fetchMySubTeamsAtom,
  fetchMyTeamsAtom,
  fetchTeamClientsAtom,
  selectedTeamClientAtom,
  selectedTeamDepartmentAtom,
  selectedTeamDepartmentNameAtom,
  selectedTeamFilterKeysAtom,
  selectedTeamHeadsAtom,
  selectedTeamMembersAtom,
  selectedTeamNameArchiveAtom,
  selectedTeamNameAtom,
  subTeamsAtom,
  teamFilterKeysAtom,
  teamMembersTableColumnsAtom,
  teamsAtom,
} from "../store/TeamManagementTLStore";
import TeamCard from "./TeamCard";
import UpdateTeamModal from "./UpdateTeamModal";

const TeamManagementTL = () => {
  const fetchMyTeams = useSetAtom(fetchMyTeamsAtom);
  const fetchMySubTeams = useSetAtom(fetchMySubTeamsAtom);
  const fetchClient = useSetAtom(fetchClientAtom);
  const fetchTeamClients = useSetAtom(fetchTeamClientsAtom);

  const setTeamName = useSetAtom(selectedTeamNameAtom);
  const setTeamClient = useSetAtom(selectedTeamClientAtom);
  const setTeamHeads = useSetAtom(selectedTeamHeadsAtom);
  const setTeamMembers = useSetAtom(selectedTeamMembersAtom);
  const setTeamNameArchive = useSetAtom(selectedTeamNameArchiveAtom);
  const setTeamDepartment = useSetAtom(selectedTeamDepartmentAtom);
  const selectedTeamDepartmentName = useSetAtom(selectedTeamDepartmentNameAtom);

  useEffect(() => {
    fetchMyTeams();
    fetchMySubTeams();
    fetchTeamClients();
    fetchClient();
  }, [fetchClient, fetchMySubTeams, fetchMyTeams, fetchTeamClients]);

  const teams = useAtomValue(teamsAtom);
  const subTeams = useAtomValue(subTeamsAtom);
  const teamMembersTableColumns = useAtomValue(teamMembersTableColumnsAtom);

  const [selected, setSelected] = useState("myTeam");

  const [showArchived, setShowArchived] = useState(false);
  const [searchMyTeamItem, setSearchMyTeamItem] = useState("");
  const [searchSubTeamItem, setSearchSubTeamItem] = useState("");
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
  const [selectedRow, setSelectedRow] = useState(null);
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
    let filteredTeams = teams?.length ? [...teams] : [];

    filteredTeams = showArchived
      ? filteredTeams.filter((team) => team)
      : filteredTeams.filter((team) => team.status === "active");

    if (Boolean(searchMyTeamItem)) {
      filteredTeams = filteredTeams.filter((team) =>
        team.name.toLowerCase().includes(searchMyTeamItem.toLowerCase())
      );
    }
    if (
      selectedTeamFilterKeyString !== "all" &&
      Array.from(selectedTeamFilterKeys).length !== teamFilterKeys.length
    ) {
      filteredTeams = filteredTeams.filter((task) => {
        return task.client
          .map((client) => client.name.toLowerCase())
          .includes(Array.from(selectedTeamFilterKeys).toString());
      });
    }

    return filteredTeams;
  }, [
    teams,
    showArchived,
    searchMyTeamItem,
    selectedTeamFilterKeyString,
    selectedTeamFilterKeys,
    teamFilterKeys.length,
  ]);

  const filteredSubTeamItems = useMemo(() => {
    let filteredSubTeams = subTeams?.length ? [...subTeams] : [];

    filteredSubTeams = showArchived
      ? filteredSubTeams.filter((subTeam) => subTeam)
      : filteredSubTeams.filter((subTeam) => subTeam.status === "active");

    if (Boolean(searchSubTeamItem)) {
      filteredSubTeams = filteredSubTeams.filter((subTeam) =>
        subTeam.name.toLowerCase().includes(searchSubTeamItem.toLowerCase())
      );
    }
    if (
      selectedTeamFilterKeyString !== "all" &&
      Array.from(selectedTeamFilterKeys).length !== teamFilterKeys.length
    ) {
      filteredSubTeams = filteredSubTeams.filter((task) => {
        return task.client
          .map((client) => client.name.toLowerCase())
          .includes(Array.from(selectedTeamFilterKeys).toString());
      });
    }

    return filteredSubTeams;
  }, [
    subTeams,
    showArchived,
    searchSubTeamItem,
    selectedTeamFilterKeyString,
    selectedTeamFilterKeys,
    teamFilterKeys.length,
  ]);

  const handleTeamUpdate = (action) => {
    if (action === "archive") {
      setTeamNameArchive(new Set([]));
    }

    if (action === "department") {
      selectedTeamDepartmentName("");
    }

    if (action === "team") {
      setTeamName("");
      setTeamClient(new Set([]));
      setTeamHeads(new Set([]));
      setTeamMembers(new Set([]));
      setTeamDepartment(new Set([]));
    }

    if (action === "sub") {
      setTeamName("");
      setTeamClient(new Set([]));
      setTeamHeads(new Set([]));
      setTeamMembers(new Set([]));
    }

    setTeamAction(action);
    onOpenUpdateTeamStatus();
  };

  const handleTeamSettings = (action) => {
    setIsOpen(false);
    setShowArchived(!showArchived);
  };

  const renderCell = useCallback((team, columnKey) => {
    const cellValue = team[columnKey];

    switch (columnKey) {
      case "name":
        return <p className="">{team.name}</p>;
      case "clients":
        return (
          <Tooltip
            placement={"bottom-start"}
            content={`${team.client.map((client) => client.name).join(", ")}`}
            className=""
          >
            <div className="w-full flex gap-2 text-ellipsis overflow-hidden">
              {team.client.slice(0, 6).map((client) => (
                // <Tooltip key={client.sub} content={client.email}>
                <Link
                  key={client._id}
                  href={"#"}
                  underline="hover"
                  className="min-w-fit text-black-default"
                >
                  {client.name}
                </Link>
                // </Tooltip>
              ))}
            </div>
          </Tooltip>
        );
      case "heads":
        return (
          <AvatarGroup isBordered max={6} className="pl-4">
            {team.heads.map((head) => (
              <Tooltip key={head.sub} content={head.email}>
                <Avatar src={head.picture} />
              </Tooltip>
            ))}
          </AvatarGroup>
        );
      case "status":
        return (
          <LabelTagChip
            text={team.status}
            color={team.status === "active" ? "green" : "red"}
            classNameLabel={"capitalize"}
          />
        );
      case "members":
        return (
          <AvatarGroup isBordered max={6} className="pr-4">
            {team.members.map((member) => (
              <Tooltip key={member.sub} content={member.email}>
                <Avatar src={member.picture} />
              </Tooltip>
            ))}
          </AvatarGroup>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <>
      <Card className="flex w-full h-full my-0 lg:my-4 px-0 lg:px-2 drop-shadow shadow-none bg-white-default rounded-none lg:rounded-xl">
        <CardHeader className="">
          <div className="w-full mt-3 flex items-center justify-between gap-2">
            <div className="flex gap-2 justify-between items-center">
              <SearchBar
                type="filter"
                endLabel="Search Team"
                searchItem={
                  selected === "myTeam" ? searchMyTeamItem : searchSubTeamItem
                }
                setSearchItem={
                  selected === "myTeam"
                    ? setSearchMyTeamItem
                    : setSearchSubTeamItem
                }
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
                label={"Add Sub Team"}
                color={"blue"}
                onPress={() => {
                  handleTeamUpdate("sub");
                }}
                className={"px-8 py-5 font-medium text-sm"}
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className="p-0 h-full w-full overflow-x-auto">
          <Tabs
            selectedKey={selected}
            onSelectionChange={setSelected}
            variant={"bordered"}
            aria-label="Sub Teams"
            className="px-3"
          >
            <Tab key="myTeam" title="My Team">
              <Table
                aria-label="My Team Members"
                className="px-2"
                selectionMode="single"
                selectionBehavior={"toggle"}
                classNames={{
                  base: "rounded-none lg:rounded-[1rem] h-full px-0 lg:px-2",
                  tbody: "h-full max-h-screen",
                  wrapper: [
                    "rounded-none lg:rounded-large",
                    "relative justify-start items-start p-0",
                    "overflow-y-scroll no-scrollbar",
                    "max-w-full h-full max-h-screen",
                  ],
                  tr: ["text-sm lg:text-lg h-12 max-h-sm"],
                  th: [
                    "h-16 max-h-sm pl-2 pr-3 lg:pl-8 lg:pr-4 text-left last:pr-8",
                    "text-md lg:text-lg font-extrabold text-darkgrey-hover",
                  ],
                  td: [
                    "[&:nth-child(6)]:w-2/12", // members
                    "[&:nth-child(5)]:w-1/12", // status
                    "[&:nth-child(4)]:w-1/12", // heads
                    "[&:nth-child(3)]:w-5/12", // clients
                    "[&:nth-child(2)]:w-2/12", // team name
                    "[&:nth-child(1)]:w-1/12", // checkbox
                    "h-18 max-h-sm truncate",
                    "text-sm lg:text-lg font-bold text-black-default",
                    "pl-2 pr-4 lg:pl-8 lg:pr-4 text-left",
                    "",
                    "group-data-[hover=true]:bg-grey-default",
                    "group-data-[selected=true]:bg-grey-default",
                  ],
                }}
              >
                <TableHeader columns={teamMembersTableColumns}>
                  {(column) => (
                    <TableColumn key={column.key}>{column.label}</TableColumn>
                  )}
                </TableHeader>
                <TableBody items={filteredTeamItems}>
                  {(item) => (
                    <TableRow key={item.key}>
                      {(columnKey) => (
                        <TableCell>{renderCell(item, columnKey)}</TableCell>
                      )}
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Tab>
            <Tab key="subTeam" title="Sub Team">
              <div className="">
                {isLoading ? (
                  <div className="flex justify-center items-center">
                    <Spinner label="Loading..." />
                  </div>
                ) : (
                  <div className="flex flex-col w-full gap-y-3">
                    {!filteredSubTeamItems?.length ? (
                      filteredSubTeamItems?.length < 1 &&
                      !searchSubTeamItem?.length &&
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
                      <div className="grid grid-cols-3 lg:grid-cols-2 xl:grid-cols-1">
                        {filteredSubTeamItems?.map((team) => (
                          <TeamCard key={team.key} team={team} />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Tab>
          </Tabs>
        </CardBody>
        <CardFooter className=""></CardFooter>
      </Card>
      <UpdateTeamModal
        isOpen={isOpenUpdateTeamStatus}
        onOpenChange={onOpenChangeUpdateTeamStatus}
        action={teamAction}
        data={filteredTeamItems}
      />
    </>
  );
};

export default TeamManagementTL;
