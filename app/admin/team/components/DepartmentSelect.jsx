import { useState } from "react";
import { departmentAtom } from "../store/teamStore";
import { useAtomValue } from "jotai";
import { Select, SelectItem } from "@nextui-org/react";

const DepartmentSelect = ({ handleDepartment }) => {
    const [selectedDepartment, setSelectedDepartments] = useState(new Set([]));
    const departments = useAtomValue(departmentAtom);
    const handleOnChangeSelect = (selected) => {
        const selectedDepartments = Array.from(selected).map((key) => {
            const department = departments.find((item) => item._id === key);
            return department ? {
                _id: department._id,
                name: department.name,
            } : null;
        }).filter(Boolean);
        setSelectedDepartments(selected);
        if (typeof handleDepartment === 'function') {
            handleDepartment(selectedDepartments);
        }
    }
    return (
        <Select
            label="Select Department"
            variant="bordered"
            selectionMode="multiple"
            className="w-full"
            selectedKeys={selectedDepartment}
            onSelectionChange={(selected) => handleOnChangeSelect(selected)}
        >
            {departments.map((item) => (
                <SelectItem key={item._id}>
                    {item.name}
                </SelectItem>
            ))}
        </Select>
    )
}
export default DepartmentSelect