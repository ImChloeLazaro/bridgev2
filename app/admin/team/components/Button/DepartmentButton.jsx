import ButtonComponent from "./ButtonComponent";
const DepartmentButton = ({onClick}) => {
    return <ButtonComponent color="danger" onClick={onClick}>Department</ButtonComponent>
}

export default DepartmentButton;