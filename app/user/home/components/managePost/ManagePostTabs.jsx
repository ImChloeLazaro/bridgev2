import { Tabs, Tab, Chip } from "@nextui-org/react";

const ManagePostTabs = () => {
  return (
    <Tabs
      variant="underlined"
      aria-label="Posts Navigation"
      classNames={{
        tab: "pb-3",
        tabContent:
          "group-data-[selected=true]:text-blue-default text-black-default/90",
        cursor: "w-full bg-blue-default",
      }}
    >
      <Tab
        key="photos"
        title={
          <div className="flex items-center space-x-2">
            <span className="font-bold text-blue-default">{"Drafts"}</span>
            <Chip
              radius="full"
              size="sm"
              variant="flat"
              className="group-data-[selected=true]:text-blue-default font-bold bg-white-default"
            >
              {"12"}
            </Chip>
          </div>
        }
      />
      <Tab
        key="music"
        title={
          <div className="flex items-center space-x-2">
            <span className="font-bold text-blue-default">{"Published"}</span>
            <Chip
              radius="full"
              size="sm"
              variant="flat"
              className="group-data-[selected=true]:text-blue-default font-bold bg-white-default"
            >
              {"16"}
            </Chip>
          </div>
        }
      />
      <Tab
        key="videos"
        title={
          <div className="flex items-center space-x-2">
            <span className="font-bold text-blue-default">{"Archived"}</span>
            <Chip
              radius="full"
              size="sm"
              variant="flat"
              className="group-data-[selected=true]:text-blue-default font-bold bg-white-default"
            >
              {"8"}
            </Chip>
          </div>
        }
      />
    </Tabs>
  );
};

export default ManagePostTabs;
