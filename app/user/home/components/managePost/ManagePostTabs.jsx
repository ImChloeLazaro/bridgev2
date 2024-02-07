import { Chip, Tab, Tabs } from "@nextui-org/react";
import { useAtom, useAtomValue } from "jotai";
import {
  postStatusTabsAtom,
  selectedPostStatusAtom,
} from "../../store/ManagePostStore";

const ManagePostTabs = () => {
  const postStatusTabs = useAtomValue(postStatusTabsAtom);
  const [selectedPostStatus, setSelectedPostStatus] = useAtom(
    selectedPostStatusAtom
  );
  return (
    <Tabs
      variant="underlined"
      aria-label="Posts Navigation"
      items={postStatusTabs}
      classNames={{
        tab: "pb-3",
        tabContent:
          "group-data-[selected=true]:text-blue-default text-black-default/90",
        cursor: "w-full bg-blue-default",
      }}
      selectedKey={selectedPostStatus}
      onSelectionChange={setSelectedPostStatus}
    >
      {(tabs) => (
        <Tab
          key={tabs.key}
          title={
            <div className="flex items-center space-x-2">
              <span className="font-bold text-blue-default">{tabs.title}</span>
              {tabs.count != 0 && (
                <Chip
                  radius="full"
                  size="sm"
                  variant="flat"
                  className="group-data-[selected=true]:text-blue-default font-bold bg-white-default"
                >
                  {tabs.count}
                </Chip>
              )}
            </div>
          }
        />
      )}
    </Tabs>
  );
};

export default ManagePostTabs;
