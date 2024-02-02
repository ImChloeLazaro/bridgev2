const RightBar = ({ children }) => {
  return (
    <div className="w-full max-h-screen basis-[28%] overflow-y-scroll no-scrollbar mr-1 ml-0 pr-8">
      <div className="flex flex-col gap-6 mt-4 mb-8">{children}</div>
    </div>
  );
};

export default RightBar;
