import { Button } from "@nextui-org/react";

const ButtonComponent = ({ color, children, ...props }) => {
    return <Button color={color} {...props}>{children}</Button>
}

export default ButtonComponent;