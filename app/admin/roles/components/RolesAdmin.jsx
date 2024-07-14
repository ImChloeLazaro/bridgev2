import IconButton from "@/app/components/IconButton";
import SearchBar from "@/app/components/SearchBar";
import { fetchUserListAtom, userListAtom } from "@/app/store/UserStore";
import { restupdate } from "@/app/utils/amplify-rest";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Listbox,
  ListboxItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { useAtomValue, useSetAtom } from "jotai";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { IoMdMail } from "react-icons/io";
import { MdEdit, MdRefresh } from "react-icons/md";

const RolesAdmin = () => {
  const [selectedKeys, setSelectedKeys] = useState(new Set(["text"]));
  const [searchRole, setSearchRole] = useState("");

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", "),
    [selectedKeys]
  );

  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const users = useAtomValue(userListAtom);
  const fetchUsers = useSetAtom(fetchUserListAtom);

  const handleRefreshUser = async () => {
    setIsLoading(true);
    try {
      // await new Promise((resolve) => setTimeout(resolve, 2000));
      await fetchUsers();
      toast.success("Refreshed");

      setIsLoading(false);
    } catch (error) {
      toast.error("Error refreshing data" + error);
      setIsLoading(false);
    }
  };

  const categorizeUsersByRole = (users) => {
    const roles = {
      All: new Set(),
      Admin: new Set(),
      TL: new Set(),
      HR: new Set(),
      User: new Set(),
    };

    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(searchRole.toLowerCase())
    );

    filteredUsers.forEach((user) => {
      roles["All"].add(user);
      user.role.forEach((role) => {
        if (role.name === "ADMIN") roles["Admin"].add(user);
        if (role.name === "TL") roles["TL"].add(user);
        if (role.name === "HR") roles["HR"].add(user);
        if (role.name === "USER") roles["User"].add(user);
      });
    });

    // Convert sets to arrays
    Object.keys(roles).forEach((role) => {
      roles[role] = Array.from(roles[role]);
    });

    return roles;
  };

  const roles = categorizeUsersByRole(users);

  const tabs = Object.keys(roles).map((role) => ({
    id: role.toLowerCase(),
    label: role,
    content: roles[role],
  }));

  const handleEditClick = (user) => {
    setCurrentUser(user);
    const userRoles = new Set(user.role.map((role) => role.name.toLowerCase()));
    setSelectedKeys(userRoles);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Convert selectedKeys from Set to Array for easier processing
    const selectedValues = Array.from(selectedKeys);
    const selectedRoles = selectedValues.map((value) => {
      switch (value) {
        case "user":
          return { name: "USER" };
        case "admin":
          return { name: "ADMIN" };
        case "tl":
          return { name: "TL" };
        case "hr":
          return { name: "HR" };
        default:
          return { name: value.toUpperCase() };
      }
    });

    try {
      const updatedUser = await restupdate(`/user/update-role`, {
        sub: currentUser.sub,
        role: selectedRoles,
      });
      // console.log(
      //   "User sub:",
      //   currentUser.sub,
      //   "Selected roles:",
      //   selectedRoles
      // );

      toast.success("Successfuly updated user " + currentUser.name);
    } catch (error) {
      console.error("Error while updating user roles:", error);
      toast.error(
        "Encountered an error while updating user " + currentUser.name
      );
    }

    await fetchUsers();
  };

  return (
    <Card className="flex w-full h-full my-4 px-0 drop-shadow shadow-none bg-white-default rounded-none lg:rounded-xl h-full">
      <div className="flex w-full flex-col h-full">
        <CardHeader className="py-2 mt-6 mx-2 md:mx-6 md:w-1/2 flex gap-2">
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
        </CardHeader>
        <CardBody className="overflow-y-hidden mx-0 p-0">
          <Tabs
            aria-label="Role tabs"
            items={tabs}
            variant="underlined"
            className="mx-2 md:mx-6"
            classNames={{
              cursor: "w-full bg-blue-default",
              tab: "max-w-fit px-4",
              tabContent: "group-data-[selected=true]:text-blue-default",
            }}
          >
            {(item) => (
              <Tab key={item.id} title={item.label} className="h-full">
                <div className="overflow-y-auto h-full">
                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-2 mb-8 mx-0 sm:mx-2 md:mx-4 mt-2">
                    {item.content.map((user) => (
                      <Card
                        key={user.id}
                        className="h-40 md:h-36 drop-shadow-md rounded-none sm:rounded-xl"
                      >
                        <div className="flex items-center justify-center h-full">
                          <div className="w-full">
                            <CardHeader className="flex justify-between mt-1 md:mt-0">
                              <div className="flex items-center">
                                <img
                                  src={user.picture}
                                  alt={user.name}
                                  className="rounded-full w-10 h-10 mr-2"
                                />
                                <div className="flex flex-col leading-tight mr-20">
                                  <div className="font-bold">{user.name}</div>
                                  <div className="flex justify-start items-center gap-2">
                                    <IoMdMail />
                                    {user.email}
                                  </div>
                                </div>
                              </div>
                              <Popover placement="bottom" offset={20} showArrow>
                                <PopoverTrigger>
                                  <Button
                                    isIconOnly
                                    size="sm"
                                    className="bg-blue-default rounded-xl text-white-default absolute top-2 right-2"
                                    onClick={() => handleEditClick(user)}
                                  >
                                    <MdEdit size={16} />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent>
                                  <div className="w-[260px] px-1 py-2 rounded-small border-default-200 dark:border-default-100">
                                    <form onSubmit={handleSubmit}>
                                      <Listbox
                                        aria-label="Multiple selection example"
                                        variant="flat"
                                        disallowEmptySelection
                                        selectionMode="multiple"
                                        selectedKeys={selectedKeys}
                                        onSelectionChange={setSelectedKeys}
                                        disabledKeys={["user"]}
                                      >
                                        <ListboxItem key="user">
                                          User
                                        </ListboxItem>
                                        <ListboxItem key="admin">
                                          Admin
                                        </ListboxItem>
                                        <ListboxItem key="tl">
                                          Team Leader
                                        </ListboxItem>
                                        <ListboxItem key="hr">
                                          Human Resource
                                        </ListboxItem>
                                      </Listbox>
                                      <Button
                                        size="sm"
                                        className="mt-2 bg-blue-default text-white-default"
                                        type="submit"
                                      >
                                        Save
                                      </Button>
                                    </form>
                                  </div>
                                </PopoverContent>
                              </Popover>
                            </CardHeader>
                            <CardBody>
                              <p>
                                <span className="mx-0 md:mx-2 font-medium">
                                  Access:
                                </span>
                                {user.role.map((role) => {
                                  let color = "grey-default";
                                  if (role.name === "ADMIN")
                                    color = "bg-orange-default";
                                  if (role.name === "TL")
                                    color = "bg-red-default";
                                  if (role.name === "HR")
                                    color = "bg-blue-default";
                                  if (role.name === "USER")
                                    color = "bg-green-default";
                                  return (
                                    <Chip
                                      key={role.name}
                                      className={`mx-1 my-1 ${color} rounded-lg text-white-default px-1`}
                                    >
                                      {role.name}
                                    </Chip>
                                  );
                                })}
                              </p>
                            </CardBody>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </Tab>
            )}
          </Tabs>
        </CardBody>
        <CardFooter></CardFooter>
      </div>
    </Card>
  );
};

export default RolesAdmin;
