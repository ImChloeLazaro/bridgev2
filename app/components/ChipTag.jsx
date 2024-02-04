const ChipTag = ({ text, color, size='sm' }) => {
  const colorVariants = {
    red: "text-red-default bg-red-default/20",
    orange: "text-orange-default bg-orange-default/20",
    yellow: "text-yellow-default bg-yellow-default/20",
    green: "text-green-default bg-green-default/20",
    blue: "text-blue-default bg-blue-default/20",
    lightblue: "text-lightblue-default bg-lightblue-default/20",
    black: "text-black-default bg-black-default/20",
    clear: "bg-transparent bg-transparent",
  };

  const sizeVariants = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  }

  return (
    <div className={`flex justify-center max-w-fit`}>
      <p
        className={`capitalize ${colorVariants[color]} ${sizeVariants[size]} font-bold py-0.5 px-2 rounded`}
      >
        {text}
      </p>
    </div>
  );
};

export default ChipTag;
