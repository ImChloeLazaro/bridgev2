const RightBar = ({ children }) => {
  return (
    <div className="hidden lg:block sticky top-0 w-full h-full overflow-y-scroll no-scrollbar lg:basis-[40%] xl:basis-[28%] mr-1 ml-0 pr-0 lg:pr-2 xl:pr-4">
      <div className="flex flex-col lg:gap-4 xl:gap-6 mt-1 md:mt-2 lg:mt-4 mb-2 lg:mb-8">
        {children}
      </div>
    </div>
  );
};

export default RightBar;
