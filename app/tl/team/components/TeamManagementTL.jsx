import { useState, useCallback, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Tabs,
  Tab,
  Listbox,
  ListboxItem,
  Chip,
  Avatar,
  useDisclosure,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";

import AddSubTeamModal from "./AddSubTeamModal";
import UpdateSubTeam from "./UpdateSubTeam";
import TeamCard from "./TeamCard";
import TeamTable from "./TeamTable";

import { readwithparams, restupdate } from "@/app/utils/amplify-rest";
import { authenticationAtom } from "@/app/store/AuthenticationStore";
import { useAtomValue } from "jotai";
import { toast } from "sonner";
import { userAtom } from "@/app/store/UserStore";

const TeamManagementTL = () => {
  const [list, setList] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const { sub } = useAtomValue(userAtom);

  const fetchTeams = useCallback(async () => {
    try {
      const teamList = await readwithparams("/teams/subteam/mySubTeam", {
        sub,
      });
      if (teamList.success) setList(teamList.response);
    } catch (error) {
      console.log(error);
    }
  }, [sub]);

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  const addSubTeam = (newTeam) => {
    setList((prevList) => [...prevList, newTeam]);
    console.log("NEW TEAMS", newTeam);
  };

  const keyHandler = async (key, item) => {
    if (key === "update") {
      console.log("UPDATE", item);
      setSelectedTeam(item);
    }

    if (key === "delete") {
      try {
        const status = item.status === "active" ? "archive" : "active";
        const response = await restupdate(`/teams/subteam/activeOrArchive`, {
          status,
          _id: item._id,
        });

        if (response.modifiedCount != 0) {
          toast.success("Status Changed Successfully!");
          setList((prevList) =>
            prevList.map((team) =>
              team._id === item._id ? { ...team, status } : team
            )
          );
        }
      } catch (error) {
        console.log("Archive team error", error);
      }
    }
  };

  const activeTeams = list.filter((team) => team.status === "active");
  const archiveTeams = list.filter((team) => team.status === "archive");

  return (
    <>
      <UpdateSubTeam
        team={selectedTeam}
        isOpen={!!selectedTeam}
        onOpenChange={() => setSelectedTeam(null)}
        setUpdatedSubTeam={(updatedTeam) => {
          setList((prevList) =>
            prevList.map((team) =>
              team._id === updatedTeam._id ? updatedTeam : team
            )
          );
        }}
      />
      <Card className="flex w-full h-full my-4 px-0 lg:px-2 drop-shadow shadow-none bg-white-default rounded-none lg:rounded-xl overflow-auto">
        <header className="w-full">
          <Card className="flex flex-row justify-between items-center gap-2 p-4 my-2 min-h-[3.5rem]">
            <h1 className="text-xl font-semibold">Admin Team Management</h1>
            <div className="flex gap-2">
              <AddSubTeamModal addSubTeam={addSubTeam} />
            </div>
          </Card>
        </header>
        <Tabs aria-label="Options">
          <Tab key="active" title="My Team">
            <TeamTable sub={sub} />
          </Tab>
          <Tab key="sub" title="Sub Team">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeTeams.map((item, index) => (
                <TeamCard key={index} item={item} keyHandler={keyHandler} />
              ))}
            </div>
          </Tab>
          <Tab key="archive" title="Archive Sub Team">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {archiveTeams.map((item, index) => (
                <TeamCard key={index} item={item} keyHandler={keyHandler} />
              ))}
            </div>
          </Tab>
        </Tabs>
      </Card>
    </>
  );
};

export default TeamManagementTL;
