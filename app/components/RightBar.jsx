import React, { useState, useRef } from "react";

const RightBar = ({ children }) => {
  const [sidebarWidth, setSidebarWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(null);
  const [onOpen, setOnOpen] = useState(false);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    startX.current = e.clientX;
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX.current;
    const newWidth = sidebarWidth - deltaX;
    const minimumWidth = 300;
    if (newWidth >= minimumWidth) {
      setSidebarWidth(newWidth);
      setOnOpen(true);
    } else {
      setSidebarWidth(0);
      setOnOpen(false);
    }
    startX.current = e.clientX;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };
  const handleOpen = () => {
    setOnOpen(true);
    setSidebarWidth(400);
  };
  const handleClose = () => {
    setOnOpen(false);
    setSidebarWidth(0);
  };

  return (
    <>
      {/* Collapsible RightBar */}

      <div
        className='fixed xl:hidden cursor-e-resize bg-white top-0 right-0 border h-full max-h-screen overflow-hidden transition-all duration-200 z-30'
        style={{ width: sidebarWidth + "px" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {!onOpen && (
          <button
            onClick={handleOpen}
            className='w-6 fixed top-1/2 right-0 h-20 bg-orange-400 rounded-l-2xl'
          >
            {"<"}
          </button>
        )}

        <div className='w-full flex flex-row items-center h-screen'>
          {onOpen && (
            <div className='flex items-center justify-center h-screen z-50'>
              <button
                onClick={handleClose}
                className='w-6  h-20 bg-orange-400 rounded-l-2xl '
              >
                {">"}
              </button>
            </div>
          )}
          <div className=' flex flex-col gap-6 mt-4 mb-8 top-0 right-0 h-full overflow-y-scroll xl:no-scrollbar xl:basis-[28%] xl:ml-0 xl:pr-8'>
            <div className='flex flex-col gap-6 mt-4 mb-8'>{children}</div>
          </div>
        </div>
      </div>

      {/* Non-collapsible RightBar */}
      <div className='hidden xl:flex xl:flex-col xl:gap-6 xl:mt-4 xl:mb-8 xl:max-md:sticky xl:top-0 xl:right-0 xl:h-full xl:overflow-y-scroll xl:no-scrollbar xl:basis-[28%] xl:mr-1 xl:ml-0 xl:pr-8'>
        <div className='flex flex-col gap-6 mt-4 mb-8'>{children}</div>
      </div>
    </>
  );
};

export default RightBar;
