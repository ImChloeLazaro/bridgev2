import { useState } from "react";
import {
  Avatar,
  Button,
  Divider,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Checkbox,
  CheckboxGroup,
  Pagination,
  Select,
  SelectItem,
  cn,
} from "@nextui-org/react";
import SearchBar from "@/app/components/SearchBar";
import CTAButtons from "@/app/components/CTAButtons";
import {
  clientsListAtom,
  clientsListCountAtom,
  displayedClientsAtom,
  filterKeysAtom,
  pageRowsSelectionAtom,
  selectedClientAtom,
  selectedFilterKeysAtom,
} from "../store/CMSStore";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { MdChevronRight } from "react-icons/md";
import ClientItemCard from "./ClientItemCard";

const ClientList = () => {
  const [searchItem, setSearchItem] = useState("");
  const [selectedAllClients, setSelectedAllClients] = useState(false);
  const [value, setValue] = useState(new Set(["10"]));

  const clientsListCount = useAtomValue(clientsListCountAtom);
  const displayedClients = useAtomValue(displayedClientsAtom);
  const clients = useAtomValue(clientsListAtom);
  const pageRowsSelection = useAtomValue(pageRowsSelectionAtom);

  const [selectedClient, setSelectedClient] = useAtom(selectedClientAtom);
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
  const filteredPostList = clients.filter((client) => {
    return (
      client.name.toLowerCase().includes(searchItem.toLowerCase()) ||
      client.address.toLowerCase().includes(searchItem.toLowerCase())
    );
  });

  const sortedClients = filteredPostList.sort(
    (a, b) => new Date(b.datetimeOnboarded) - new Date(a.datetimeOnboarded)
  );

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
    <Card className="w-full h-full px-2 py-1.5 drop-shadow shadow-none bg-white-default">
      <CardHeader className="flex justify-between mx-4 my-2 gap-4">
        <div className="flex gap-2">
          <Checkbox
            isSelected={selectedAllClients}
            onValueChange={(value) => {
              setSelectedAllClients(value);
              console.log("SELECTED ALL CLIENT:", selectedClient);
              if (!selectedAllClients) {
                setSelectedClient(() => {
                  return clients.map((client, index) => {
                    return `client-${index + 1}`;
                  });
                });
              } else {
                setSelectedClient([]);
              }
            }}
          />
          <SearchBar
            searchItem={searchItem}
            setSearchItem={setSearchItem}
            filterKeys={filterKeys}
            selectedFilterKeys={selectedFilterKeys}
            setSelectedFilterKeys={setSelectedFilterKeys}
          />
        </div>
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
      <CardBody className="w-full max-h-screen">
        <div className="w-full h-screen flex flex-col items-center gap-4 px-6">
          <CheckboxGroup
            aria-label="Client Item Card Checkbox Group"
            value={selectedClient}
            onValueChange={(value) => {
              setSelectedClient(value);
              console.log("SELECTED CLIENT:", value);
            }}
            className="w-full"
          >
            <div className="flex flex-col w-full gap-y-3">
              {sortedClients.map((client, index) => (
                <Checkbox
                  value={client.key}
                  key={index}
                  aria-label="Client Item Card Checkbox"
                  classNames={{
                    base: cn(
                      "w-full max-w-full bg-white-default m-0",
                      "hover:bg-lightgrey-hover flex items-center justify-start",
                      "cursor-pointer rounded-lg gap-6 py-0 pr-0 pl-6 border-[0.4px] shadow",
                      "data-[selected=true]:border-3",
                      "data-[selected=true]:border-blue-default/60"
                    ),
                    label: "w-full",
                  }}
                >
                  <ClientItemCard data={client} />
                </Checkbox>
              ))}
            </div>
          </CheckboxGroup>
        </div>
      </CardBody>
      <Divider />
      <CardFooter className="flex justify-between px-12">
        {/* <div > */}
        <div className="w-1/3">
          <p>{`Showing ${displayedClients} of ${clientsListCount} results`}</p>
        </div>
        <div className="w-1/3 h-fit flex justify-center items-center py-2 gap-2">
          <div className="h-full">{`Rows per page: `}</div>
          <Select
            variant={"underlined"}
            selectedKeys={value}
            className="max-w-20 mb-2"
            onSelectionChange={setValue}
          >
            {pageRowsSelection.map((pageRow) => (
              <SelectItem key={pageRow.value} value={pageRow.value}>
                {pageRow.label}
              </SelectItem>
            ))}
          </Select>
        </div>
        <Pagination
          isCompact
          showControls
          total={10}
          initialPage={1}
          className="w-1/3 flex justify-end"
        />
        {/* </div> */}
      </CardFooter>
    </Card>
  );
};

export default ClientList;
