import { Suspense } from "react";
import { Skeleton } from "@nextui-org/react";

const MainContent = ({ children }) => {
  return (
    <div className="w-full h-fit max-h-fit lg:basis-[72%] lg:mx-4 lg:px-6">
      <div className="mt-4 mb-8">{children}</div>
    </div>
  );
};

export default MainContent;
