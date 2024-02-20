const MainContent = ({ children }) => {
  return (
    <div className="w-full max-h-screen basis-[72%] overflow-y-scroll mx-4 px-6">
      <div className="mt-4 mb-8">{children}</div>
    </div>
  );
};

export default MainContent;
