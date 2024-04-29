import { Tab, Tabs, cn } from "@nextui-org/react";
import { MdFeed, MdGridView } from "react-icons/md";

const NavigationTab = ({ main, right, mainIcon, rightIcon, className }) => {
  return (
    <div className={cn("w-full", className)}>
      <Tabs
        aria-label="Mobile Navigation"
        classNames={{
          base: cn("relative z-10 sticky top-0 w-full", className),
          panel: "w-full py-0 px-0",
          cursor: "w-full group-data-[selected=true]:bg-blue-default/90",
          tabList: "rounded-none py-1 w-full",
          tabContent: "group-data-[selected=true]:text-white-default",
        }}
      >
        <Tab key="feed" title={mainIcon}>
          {main}
        </Tab>
        <Tab key="misc" title={rightIcon}>
          {right}
        </Tab>
      </Tabs>
    </div>
  );
};

export default NavigationTab;
