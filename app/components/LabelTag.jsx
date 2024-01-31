// ### TODO Add clear variant as a prop instead to create a combination of clear background and colored text
// ### Same as CTAButtons
const LabelTag = ({ text, color }) => {
  const colorVariants = {
    red: "bg-red-default",
    orange: "bg-orange-default",
    yellow: "bg-yellow-default",
    green: "bg-green-default",
    blue: "bg-blue-default",
    black: "bg-black-default",
    clear: "bg-transparent",
  };

  return (
    <div className={`flex justify-center max-w-fit w-1/4`}>
      <p
        className={`capitalize ${colorVariants[color]} text-white-default font-bold py-1 px-3.5 rounded-md `}
      >
        {text}
      </p>
    </div>
  );
};

export default LabelTag;
