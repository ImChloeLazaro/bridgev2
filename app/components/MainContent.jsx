import { Suspense } from "react";
import { Skeleton } from "@nextui-org/react";

const MainContent = ({ children }) => {
  return (
    <div className="w-full h-full lg:basis-[72%] lg:mx-4 lg:px-6">
      <div className="flex flex-col mt-1 md:mt-2 lg:mt-4 mb-2 lg:mb-8">{children}</div>
    </div>
  );
};

export default MainContent;
