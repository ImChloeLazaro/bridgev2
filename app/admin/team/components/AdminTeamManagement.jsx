import { useEffect, useState } from "react";
import { Tabs, Tab, Card } from "@nextui-org/react";
import TeamCard from "./TeamCard";
import ArchiveTeam from "./Modal/ArchiveTeam";
import UpdateTeam from "./Modal/UpdateTeam";
import AddTeam from "./Modal/AddTeam";
import { restread } from "@/app/utils/amplify-rest";

const AdminTeamManagement = () => {
  const [list, setList] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const getList = async () => {
    try {
      const teams = await restread('/teams');
      setList(teams.response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  const addNewTeamToList = (newTeam) => {
    setList((prevList) => [...prevList, newTeam]);
  };

  const updateTeamInList = (updatedTeam) => {
    setList((prevList) =>
      prevList.map((team) =>
        team._id === updatedTeam._id ? updatedTeam : team
      )
    );
  };

  const openUpdateModal = (team) => {
    setSelectedTeam(team);
  };

  const activeTeams = list.filter((team) => team.status === "active");
  const archiveTeams = list.filter((team) => team.status === "archive");

  return (
    <Card className="flex w-full h-full my-4 px-0 lg:px-2 drop-shadow shadow-none bg-white-default rounded-none lg:rounded-xl overflow-auto">
      <header className="w-full">
        <Card className="flex flex-row justify-between items-center gap-2 p-4 my-2 min-h-[3.5rem]">
          <h1 className="text-xl font-semibold">Admin Team Management</h1>
          <div className="flex gap-2">
            <ArchiveTeam />
            <UpdateTeam
              isOpen={!!selectedTeam}
              onOpenChange={() => setSelectedTeam(null)}
              teamData={selectedTeam}
              updateTeamInList={updateTeamInList}
            />
            <AddTeam addNewTeamToList={addNewTeamToList} />
          </div>
        </Card>
      </header>
      <div className="flex w-full flex-col p-4">
        <Tabs aria-label="Options">
          <Tab key="active" title="Active Teams">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeTeams.map((item) => (
                <TeamCard
                  key={item._id.$oid}
                  data={item}
                  updateTeamInList={updateTeamInList}
                  openUpdateModal={openUpdateModal}
                />
              ))}
            </div>
          </Tab>
          <Tab key="archive" title="Archive Teams">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {archiveTeams.map((item) => (
                <TeamCard
                  key={item._id.$oid}
                  data={item}
                  updateTeamInList={updateTeamInList}
                  openUpdateModal={openUpdateModal}
                />
              ))}
            </div>
          </Tab>
        </Tabs>
      </div>
    </Card>
  );
};

export default AdminTeamManagement;
