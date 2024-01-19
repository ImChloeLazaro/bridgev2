import React from "react";

const TrainingItem = ({ data }) => {
  console.log("TRAINING", data);
  const startDate = new Date(data.datetimeStart).getDate();

  const startTime = new Date(data.datetimeStart).toLocaleTimeString();
  const endTime = new Date(data.datetimeEnd).toLocaleTimeString();

  let sideColor = `p-0 m-0 basis-1/5 bg-${data.color}-default text-white-default flex flex-col items-center justify-center rounded-l-md`;
  // * Added @date-fns for datetime manipulation
  return (
    <div className=" m-2 flex bg-white-default drop-shadow rounded-md">
      <div className={sideColor}>
        <p className="font-extrabold text-2xl">{startDate}</p>
        <p className="font-medium text-base uppercase">OCT</p>
        <p className="font-light text-xs">Tue</p>
      </div>
      <div className="basis-4/5 p-2 m-2">
        <p className="font-bold text-xl">{data.title}</p>
        <p className="font-normal text-sm">{data.description}</p>
        <p className="font-normal text-sm">{`${startTime} - ${endTime}`}</p>
      </div>
    </div>
  );
};

export default TrainingItem;
