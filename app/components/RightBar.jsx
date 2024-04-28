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
    <div className="hidden lg:block sticky top-0 w-full h-full overflow-y-scroll no-scrollbar lg:basis-[28%] mr-1 ml-0 md:pr-8">
      <div className="flex flex-col gap-6 mt-4 mb-8">{children}</div>
    </div>
  );
};

export default RightBar;
