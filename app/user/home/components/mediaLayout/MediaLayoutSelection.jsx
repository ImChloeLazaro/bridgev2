import React from "react";

const MediaLayoutSelection = ({ layout, orientation }) => {
  const layoutOne = {
    // one
    landscape: "",
    portrait:
      "gap-1.5 grid grid-cols-1 grid-rows-1 my-5 bg-white-default/60 h-[900px] px-4",
  };
  const layoutTwo = {
    // two
    landscape:
      "gap-1.5 grid grid-cols-1 grid-rows-2 my-5 bg-white-default/60 h-[900px] px-4",
    portrait:
      "gap-1.5 grid grid-cols-2 grid-rows-1 my-5 bg-white-default/60 h-[900px] px-4",
  };
  const layoutThree = {
    // three
    landscape:
      "gap-1.5 grid grid-cols-1 grid-rows-3 my-5 bg-white-default/60 h-[900px] px-4",
    portrait:
      "gap-1.5 grid grid-cols-2 grid-rows-2 my-5 bg-white-default/60 h-[900px] px-4",
  };
  const layoutFour = {
    // four
    landscape:
      "gap-1.5 grid grid-cols-2 grid-rows-2 my-5 bg-white-default/60 h-[900px] px-4",
    portrait:
      "gap-1.5 grid grid-cols-3 grid-rows-3 my-5 bg-white-default/60 h-[900px] px-4",
  };
  const layoutFive = {
    // five
    landscape:
      "gap-1.5 grid grid-flow-row-dense grid-cols-6 grid-rows-6 my-5 bg-white-default/60 h-[900px] px-4",
    portrait:
      "gap-1.5 grid grid-flow-row-dense grid-cols-6 grid-rows-6 my-5 bg-white-default/60 h-[900px] px-4",
  };
  const layoutSixPlus = {
    //six
    landscape:
      "gap-1.5 grid grid-flow-row-dense grid-cols-6 grid-rows-6 my-5 bg-white-default h-[900px] px-4",
    portrait:
      "gap-1.5 grid grid-flow-row-dense grid-cols-6 grid-rows-6 my-5 bg-white-default h-[900px] px-4",
  };

  return <div className={`${layoutOne[orientation]}`}>MediaLayoutSelection</div>;
};

export default MediaLayoutSelection;
