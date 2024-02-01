import {
  Button,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { useAtomValue } from "jotai";
import { MdInfoOutline } from "react-icons/md";
import { MdFileUpload } from "react-icons/md";
import CTAButtons from "../../../../components/CTAButtons";
import { templateItemsAtom } from "../../store/ManagePostStore";
import ReactionSelect from "./ReactionSelect";
import TagPersonSelect from "./TagPersonSelect";
import { useState } from "react";

const ManagePostSidebarContent = () => {
  // console.log("MODAL", type);
  const [value, setValue] = useState(new Set([]));

  const templateItems = useAtomValue(templateItemsAtom);

  return (
    <div className="flex flex-col py-4 px-6 gap-2 ">
      <Divider />
      <div className="flex justify-start items-center gap-1">
        <p className="font-bold">{"Template Settings"}</p>
        <MdInfoOutline />
      </div>
      <div className="flex justify-between items-center gap-5">
        <p className="font-normal w-24">{"Type"}</p>
        <Select
          aria-label="Template Type Selection"
          items={templateItems}
          placeholder="Custom"
          selectedKeys={value}
          onSelectionChange={setValue}
          classNames={{
            base: "max-w-xs",
            trigger: "min-h-unit-12 py-2",
          }}
        >
          {(template) => (
            <SelectItem key={template.value}>{template.label}</SelectItem>
          )}
        </Select>
      </div>
      <div className="flex justify-between items-center gap-5">
        <p className="font-normal w-24">{"Reaction"}</p>
        <ReactionSelect />
      </div>

      {/* Media */}
      <Divider />
      <div className="flex justify-start items-center gap-1">
        <p className="font-bold">{"Media"}</p>
        <MdInfoOutline />
      </div>
      <div className="w-full h-40"></div>
      <div className="flex justify-start items-center gap-5">
        <p className="font-bold">{"Files"}</p>
        <Button startContent={<MdFileUpload size={24} />}>{"Upload"}</Button>
      </div>

      {/* Description */}
      <Divider />
      <div className="flex justify-start items-center gap-1">
        <p className="font-bold">{"Description"}</p>
        <MdInfoOutline />
      </div>
      <div className="flex justify-between items-center gap-5">
        <p className="font-normal w-24">{"Title"}</p>
        <Input fullWidth size="sm" label="Give your post a name" className=""/>
      </div>
      <div className="flex justify-between items-center gap-5">
        <p className="font-normal w-24">{"Tag People"}</p>
        <TagPersonSelect />
      </div>
      <div className="flex justify-between items-center gap-5">
        <p className="font-normal w-24">{"Caption"}</p>
        <Textarea placeholder="Enter your description" className="max-w-xs" />
      </div>
    </div>
  );
};

export default ManagePostSidebarContent;
