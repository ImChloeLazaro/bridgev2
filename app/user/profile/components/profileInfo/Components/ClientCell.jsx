import { Link } from "@nextui-org/react";
import { useAtomValue, useSetAtom } from "jotai";
import React, { useEffect, useState } from "react";
import {
  selectClientAtom,
  selectedClientAtom,
} from "../../../store/ProfileStore";

const ClientCell = ({ getValue, row, column, table }) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);
  const clientValue = useAtomValue(selectedClientAtom);
  const setClient = useSetAtom(selectClientAtom);
  const handleSelectClient = async (client) => {
    await setClient(client._id);
    console.log("Client Selected: ", client?.name);
    console.log("clientValue: ", clientValue);
  };
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  console.log("value", value);
  return (
    <div>
      {value?.map((client, index) => (
        <p
          
          underline='hover'
          key={index}
          onClick={() => handleSelectClient(client)}
          className='text-black-default hover:underline'
        >
          {client.name}
        </p>
      ))}
    </div>
  );
};

export default ClientCell;
