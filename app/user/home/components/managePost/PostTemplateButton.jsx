import {
  Button,
  Listbox,
  ListboxItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { MdEventNote } from "react-icons/md";
import { useAtomValue } from "jotai";
import { postTemplateItemsAtom } from "../../store/PostTemplateStore";

const PostTemplateButton = () => {
  const postTemplateItems = useAtomValue(postTemplateItemsAtom);

  return (
    <Popover placement="bottom-end" offset={5}>
      <PopoverTrigger>
        <Button
          disableRipple
          disableAnimation
          size="lg"
          startContent={<MdEventNote size={25} />}
          className="bg-transparent font-medium text-lg text-black-default hover:text-orange-default/90"
        >
          {"Templates"}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Listbox
          aria-label="Dynamic Actions"
          onAction={(key) => alert(key)}
          disabledKeys={["choose"]}
          itemClasses={{
            base: [
              "data-[disabled=true]:opacity-100 data-[hover=true]:bg-orange-default data-[hover=true]:text-white-default text-black-default",
            ],
            title: "text-base font-normal ",
          }}
        >
          {postTemplateItems.map((item) => (
            <ListboxItem
              key={item.key}
              startContent={item.key != "choose" && item.icon}
              textValue={item.label}
            >
              {item.label}
            </ListboxItem>
          ))}
        </Listbox>
      </PopoverContent>
    </Popover>
  );
};
export default PostTemplateButton;
