import {
    useDisclosure,
    Input
} from "@nextui-org/react";
import { useState } from "react";
import { restinsert } from "@/app/utils/amplify-rest";
import DepartmentButton from "../Button/DepartmentButton";
import ModalComponent from "./ModalComponent";
import { toast } from "sonner";
const AddDepartment = () => {
    const [department, setDepartment] = useState('');
    const {
        isOpen,
        onOpen,
        onOpenChange
    } = useDisclosure();

    const onsubmit = async (e) => {
        e.preventDefault();
        
        const departmentRequest = await restinsert('/teams/department', {
            name: department
        })

        if (departmentRequest.success) {
            toast.success('Department Added Successfully, Please Refresh to see the changes.');
            setDepartment('');
            onOpenChange();
        }
    }

    return (
        <>
            <DepartmentButton onClick={onOpenChange} />
            <ModalComponent
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                title={'Add Department'}
                action={onsubmit}
                actionName={'Insert'}
            >
                <div className="flex flex-col space-y-4">
                    <Input type="text" label="Department Name" onChange={e => setDepartment(e.target.value)} />
                </div>
            </ModalComponent>
        </>
    )
}

export default AddDepartment;
