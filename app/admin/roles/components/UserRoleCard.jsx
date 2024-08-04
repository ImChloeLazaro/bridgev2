import CTAButtons from "@/app/components/CTAButtons";
import ConfirmationWindow from "@/app/components/ConfirmationWindow";
import LabelTagChip from "@/app/components/LabelTagChip";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Link,
  Listbox,
  ListboxItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
  User,
} from "@nextui-org/react";
import { useAtomValue, useSetAtom } from "jotai";
import { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { IoMdMail } from "react-icons/io";
import { roleSelectionAtom, updateUserRolesAtom } from "../store/UserRoleStore";

const UserRoleCard = ({ user }) => {
  const {
    isOpen: isOpenPopup,
    onOpen: onOpenPopup,
    onOpenChange: onOpenChangePopup,
  } = useDisclosure();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState(new Set([]));
  const roleSelection = useAtomValue(roleSelectionAtom);
  const updateUserRoles = useSetAtom(updateUserRolesAtom);

  const roleCard = {
    user: {
      color: "green",
    },
    admin: {
      color: "orange",
    },
    tl: {
      color: "red",
    },
    hr: {
      color: "blue",
    },
  };

  const updatedRoles = Array.from(selectedRoles).map((role) => {
    return { name: role.toUpperCase() };
  });

  return (
    <Card className="p-1">
      <CardHeader className="flex gap-2 justify-between ">
        <User
          name={user.name}
          description={
            <Link
              href="/"
              size="sm"
              underline="hover"
              className="text-black-default"
            >
              <div className="flex justify-start items-center gap-2">
                <IoMdMail className="text-black-default" fill="currentColor" />
                <p className="font-medium text-black-default">{user.email}</p>
              </div>
            </Link>
          }
          avatarProps={{
            src: user.picture,
            alt: user.name,
            className: "w-10 h-10 mr-2",
          }}
          classNames={{
            name: "text-base font-medium text-black-default",
          }}
        />
        <Popover
          isOpen={isOpen}
          onOpenChange={(open) => {
            setIsOpen(open);
            let roles = user.role.map((role) => role.name.toLowerCase());

            setSelectedRoles([...roles]);
          }}
          placement={"bottom-end"}
        >
          <PopoverTrigger>
            <Button isIconOnly className="bg-transparent">
              <BiDotsVerticalRounded size={24} />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex flex-col gap-2 ">
              <Listbox
                aria-label="Role Selection"
                disallowEmptySelection
                selectionMode="multiple"
                selectedKeys={selectedRoles}
                onSelectionChange={(key) => {
                  setSelectedRoles(key);
                }}
              >
                {roleSelection.map((role) => (
                  <ListboxItem key={role.key}>{role.title}</ListboxItem>
                ))}
              </Listbox>
              <div className="flex gap-2 mb-2">
                <CTAButtons
                  label={"Cancel"}
                  color={"clear"}
                  onPress={() => {
                    setIsOpen(false);
                  }}
                />
                <CTAButtons
                  label={"Update Role"}
                  color={"blue"}
                  className={"px-6"}
                  onPress={() => {
                    onOpenPopup();
                    setIsOpen(false);
                  }}
                  cnLabel={"text-base font-medium text-white-default"}
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <ConfirmationWindow
          message="
                You are about to update this user's access. 
                Are you sure you want to proceed?
                "
          title="Update User Role?"
          choice="Update Role"
          action={updateUserRoles}
          action_params={{ sub: user.sub, updatedRoles: updatedRoles }}
          type="warning"
          isOpen={isOpenPopup}
          onOpenChange={onOpenChangePopup}
        />
      </CardHeader>
      <CardBody className="pt-0">
        <div className="p-0">
          <p className="text-base font-medium">{"Access:"}</p>
          <div className="flex flex-wrap gap-2">
            {user.role.map((user, index) => (
              <LabelTagChip
                key={index}
                text={user.name}
                color={roleCard[user.name?.toLowerCase()]?.color}
                isFilled={true}
                className={"p-2"}
                classNameLabel={"text-sm lg:text-base font-normal"}
              />
            ))}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default UserRoleCard;
