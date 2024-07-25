import { Link } from "@nextui-org/react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import React, { useEffect, useState } from "react";
import {
  selectClientAtom,
  selectedClientAtom,
} from "../../../store/ProfileStore";
import {
  selectedClientToViewAtom,
  selectedClientForTaskAtom,
  showClientTaskAtom,
} from "@/app/user/cms/store/CMSUserStore";

const ClientCell = ({ getValue, row, column, table }) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);
  const clientValue = useAtomValue(selectedClientAtom);
  const setClient = useSetAtom(selectClientAtom);
  const [selectedClientToView, setSelectedClientToView] = useAtom(
    selectedClientToViewAtom
  );
  const [selectedClientForTask, setSelectedClientForTask] = useAtom(
    selectedClientForTaskAtom
  );
  const setShowClientTask = useSetAtom(showClientTaskAtom);

  const handleSelectClient = async (client) => {
    setSelectedClientToView(client._id);
    setSelectedClientForTask(new Set([client._id]));
    setShowClientTask(true);
    console.log("Client Selected: ", client?.name);
    console.log("clientValue: ", clientValue);
  };
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  // console.log("value", value);
  return (
    <div>
      {value?.map((client, index) => (
        <Link
          href="/user/cms"
          underline="hover"
          key={index}
          onClick={() => handleSelectClient(client)}
          className="text-black-default"
        >
          {client.name}
        </Link>
      ))}
    </div>
  );
};

export default ClientCell;
