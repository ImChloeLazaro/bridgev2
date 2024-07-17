import { Tab, Tabs, cn } from "@nextui-org/react";

const NavigationTab = ({ main, right, mainIcon, rightIcon, className }) => {
  return (
    <div className={cn("w-full", className)}>
      <Tabs
        placement="bottom"
        aria-label="Mobile Navigation"
        classNames={{
          base: cn("relative z-20 sticky bottom-0 w-full mb-2", className),
          panel: "w-full py-2 px-0",
          cursor: "w-full group-data-[selected=true]:bg-blue-default/90",
          tab: "h-10",
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
