import { toast } from "sonner";

const NotificationToaster = ({
  title,
  description,
  action,
  color,
  ...props
}) => {
  return toast(title, {
    description: description,
    action: action,
    ...props,
  });
};

export default NotificationToaster;
