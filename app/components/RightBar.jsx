const RightBar = ({ children }) => {
  return (
    <div className="hidden lg:block sticky top-0 w-full h-full overflow-y-scroll no-scrollbar lg:basis-[28%] mr-1 ml-0 md:pr-8">
      <div className="flex flex-col gap-6 mt-4 mb-8">{children}</div>
    </div>
  );
};

export default RightBar;
