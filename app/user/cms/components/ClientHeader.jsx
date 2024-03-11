import CTAButtons from "@/app/components/CTAButtons";
import IconButton from "@/app/components/IconButton";
import SearchBar from "@/app/components/SearchBar";
import { Checkbox, cn } from "@nextui-org/react";
import { useAtom, useAtomValue } from "jotai";
import { MdRefresh } from "react-icons/md";
import {
  clientsListAtom,
  filterKeysAtom,
  selectedClientAtom,
  selectedFilterKeysAtom,
} from "../store/CMSStore";

const ClientHeader = ({
  selectedAllClients,
  setSelectedAllClients,
  searchItem,
  setSearchItem,
  showCheckBox = false,
  showActionButtons = false,
  className,
}) => {
  const clients = useAtomValue(clientsListAtom);
  const filterKeys = useAtomValue(filterKeysAtom);
  const [selectedClient, setSelectedClient] = useAtom(selectedClientAtom);
  const [selectedFilterKeys, setSelectedFilterKeys] = useAtom(
    selectedFilterKeysAtom
  );

  const handleRefreshClient = () => {
    console.log("REFRESHED CLIENT DATA");
  };

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
    <div
      className={cn(
        "w-full flex items-center justify-between mx-4 my-2 gap-4",
        className
      )}
    >
      <div className="flex gap-2">
        {showCheckBox && (
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
        )}
        <SearchBar
          searchItem={searchItem}
          setSearchItem={setSearchItem}
          filterKeys={filterKeys}
          selectedFilterKeys={selectedFilterKeys}
          setSelectedFilterKeys={setSelectedFilterKeys}
        />
        <IconButton onPress={handleRefreshClient} variant="bordered">
          <div
            className={
              "transition duration-1000 ease-in-out text-black-default hover:rotate-[360deg]"
            }
          >
            <MdRefresh size={24} />
          </div>
        </IconButton>
      </div>
      {showActionButtons && (
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
      )}
    </div>
  );
};

export default ClientHeader;
