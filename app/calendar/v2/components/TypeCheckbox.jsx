import React from "react";
import {CheckboxGroup} from "@nextui-org/react";
import {CheckMenu} from "./CheckMenu";
import { useEffect } from "react";

export default function TypeCheckbox({onChange, defaultSelected}) {
  const [groupSelected, setGroupSelected] = React.useState([]);

  useEffect(() => {
    setGroupSelected([...groupSelected, ...defaultSelected]);
  },[])

  const handleChange = (selected) => {
    setGroupSelected(selected);
    onChange(selected);
  };
  
  return (
    <div className="flex flex-col gap-1 w-full">
      <CheckboxGroup
        className="gap-1"
        label="Select Event Type:"
        orientation="horizontal"
        value={groupSelected}
        onChange={handleChange}
      >
        <CheckMenu value="Meeting">Meeting</CheckMenu>
        <CheckMenu value="Training">Training</CheckMenu>
        <CheckMenu value="Conference">Conference</CheckMenu>
        <CheckMenu value="Seminar">Seminar</CheckMenu>
        <CheckMenu value="Coaching">Coaching</CheckMenu>
        <CheckMenu value="Team">Team Meeting</CheckMenu>
      </CheckboxGroup>
    </div>
  );
}
