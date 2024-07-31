import IconButton from "@/app/components/IconButton";
import SearchBar from "@/app/components/SearchBar";
import { Card, CardBody, CardHeader, Tab, Tabs } from "@nextui-org/react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useMemo, useState } from "react";
import { MdRefresh } from "react-icons/md";
import { toast } from "sonner";
import UserRoleCard from "./UserRoleCard";
import {
  fetchUserRolesListAtom,
  roleTabsAtom,
  selectedRoleTabAtom,
  userRolesListAtom,
} from "../store/RoleStore";


const UserRolesList = () => {
  const userRolesList = useAtomValue(userRolesListAtom);
  const fetchUserRolesList = useSetAtom(fetchUserRolesListAtom);

  const [searchRole, setSearchRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUserRolesList();
  }, [fetchUserRolesList]);

  const [selectedRoleTab, setSelectedRoleTab] = useAtom(selectedRoleTabAtom);
  const roleTabs = useAtomValue(roleTabsAtom);

  const userRoles = userRolesList.filter((userRole) => {
    if (selectedRoleTab === "all") {
      return true;
    } else {
      return userRole.role
        .map((role) => role.name.toLowerCase())
        .includes(selectedRoleTab);
    }
  });

  const handleRefreshUser = () => {
    setIsLoading(true);
    const promise = async () =>
      new Promise((resolve) =>
        setTimeout(async () => resolve(await fetchUserRolesList()), 2000)
      );

    toast.promise(promise, {
      loading: "Loading...",
      success: () => {
        setIsLoading(false);
        return "User Roles Updated";
      },
      error: "Error updating user roles",
    });
  };

  const filteredUserRoles = useMemo(() => {
    let filteredUser = userRoles?.length ? [...userRoles] : [];

    if (Boolean(searchRole)) {
      filteredUser = filteredUser.filter((user) =>
        user.name.toLowerCase().includes(searchRole.toLowerCase())
      );
    }

    return filteredUser;
  }, [userRoles, searchRole]);

  return (
    <Card className="flex w-full h-full my-4 px-0 drop-shadow shadow-none bg-white-default rounded-none lg:rounded-xl">
      <CardHeader className="pb-0">
        <div className="py-2 mx-2 md:mx-6 md:w-1/2 flex gap-2">
          <SearchBar
            showSearchBar={true}
            searchItem={searchRole}
            setSearchItem={setSearchRole}
            type={"search"}
          ></SearchBar>
          <IconButton
            data-show={true}
            radius={"sm"}
            aria-label={"Refresh User Data Button"}
            onPress={handleRefreshUser}
            variant="bordered"
            isLoading={isLoading}
            className={"hidden data-[show=true]:flex"}
          >
            <MdRefresh size={24} />
          </IconButton>
        </div>
      </CardHeader>
      <CardBody className="pt-0 pb-2">
        <div className="flex w-full flex-col h-full">
          <Tabs
            variant={"underlined"}
            aria-label="Role Tabs"
            selectedKey={selectedRoleTab}
            onSelectionChange={setSelectedRoleTab}
            className="mx-2 md:mx-6"
            classNames={{
              cursor: "w-full bg-blue-default",
              tab: "max-w-fit px-4",
              tabContent: "group-data-[selected=true]:text-blue-default",
            }}
          >
            {roleTabs.map((roleTab) => (
              <Tab key={roleTab.key} title={roleTab.title}>
                <div className="grid grid-cols-2 gap-3 px-2">
                  {filteredUserRoles.map((user) => (
                    <UserRoleCard key={user.key} user={user}></UserRoleCard>
                  ))}
                </div>
              </Tab>
            ))}
          </Tabs>
        </div>
      </CardBody>
    </Card>
  );
};

export default UserRolesList;
