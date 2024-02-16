import React, { useState } from "react";
import {
  Avatar,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Checkbox,
  CheckboxGroup,
} from "@nextui-org/react";
import SearchBar from "@/app/components/SearchBar";
import CTAButtons from "@/app/components/CTAButtons";
import {
  clientsListAtom,
  filterKeysAtom,
  selectedClientAtom,
  selectedFilterKeysAtom,
} from "../store/CMSStore";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import ClientItemCard from "./ClientItemCard";

const ClientList = () => {
  const clients = useAtomValue(clientsListAtom);
  const [selectedClient, setSelectedClient] = useAtom(selectedClientAtom);

  const [searchItem, setSearchItem] = useState("");
  const [selectedFilterKeys, setSelectedFilterKeys] = useAtom(
    selectedFilterKeysAtom
  );
  const filterKeys = useAtomValue(filterKeysAtom);

  const handleUpdateTask = () => {
    console.log("UPDATED");
  };
  const handleDeleteTask = () => {
    console.log("DELETED");
  };

  const actionButtons = {
    update: {
      color: "blue",
      label: "Update Task",
      action: handleUpdateTask,
    },
    add: {
      color: "orange",
      label: "Add Task",
      action: handleDeleteTask,
    },
  };
  return (
    <Card className="w-full h-screen px-2 py-1.5 drop-shadow shadow-none bg-white-default">
      <CardHeader className="flex justify-between mx-4 my-2 gap-4">
        <SearchBar
          searchItem={searchItem}
          setSearchItem={setSearchItem}
          filterKeys={filterKeys}
          selectedFilterKeys={selectedFilterKeys}
          setSelectedFilterKeys={setSelectedFilterKeys}
        />
        <div className="w-full max-w-md flex justify-between mx-4 gap-4">
          {Object.values(actionButtons).map((button) => {
            return (
              <CTAButtons
                key={button.label}
                fullWidth={true}
                label={button.label}
                color={button.color}
                className={"py-5"}
                // onPress={button.action}
              />
            );
          })}
        </div>
      </CardHeader>
      <CardBody className="w-full">
        <div className="w-full h-fit flex flex-col items-center gap-4">
          <CheckboxGroup
            aria-label="Client Item Card Checkbox Group"
            value={selectedClient}
            onValueChange={(value) => {
              setSelectedClient(value);
              console.log("SELECTED CLIENT:", value);
            }}
            className="w-full"
          >
            <div className="flex flex-col w-full">
              {clients.map((client, index) => {
                console.log("INSIDE CLIENT IN CMS", client);
                return (
                  <Checkbox
                    value={client.key}
                    key={index}
                    aria-label="Client Item Card Checkbox"
                    classNames={{
                      base: "w-full max-w-full",
                      label: "w-full",
                    }}
                  >
                    <ClientItemCard data={client} />
                  </Checkbox>
                );
              })}
            </div>
          </CheckboxGroup>
        </div>
      </CardBody>
      <CardFooter className="">
        <div className=""></div>
      </CardFooter>
    </Card>
  );
};

export default ClientList;
