import { Suspense } from "react";
import { Skeleton } from "@nextui-org/react";

const MainContent = ({ children }) => {
  return (
    <>
      <Suspense fallback={<Skeleton className='w-full h-full rounded-lg' />}>
        <div className='w-full h-fit max-h-fit  mx-4 px-6'>
          <div className='mt-4 mb-8'>{children}</div>
        </div>
      </Suspense>
    </>
  );
};

export default MainContent;
