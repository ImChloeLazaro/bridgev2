import { Suspense } from "react";
import { Skeleton } from "@nextui-org/react";

const MainContent = ({ children }) => {
  return (
    <div className="w-full h-full lg:basis-[60%] xl:basis-[72%] mx-0 px-0 lg:mx-2 xl:mx-4 2xl:mx-6">
      <div className="flex flex-col mt-0 lg:mt-4 mb-0 lg:mb-8">
        {children}
      </div>
    </div>
  );
};

export default MainContent;
