const MainContent = ({ children }) => {
  return (
    <div className="w-full h-fit max-h-fit basis-[72%] mx-4 px-6">
      <div className="mt-4 mb-8">{children}</div>
    </div>
  );
};

export default MainContent;
