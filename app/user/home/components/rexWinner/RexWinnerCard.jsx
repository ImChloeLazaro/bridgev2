import NextImage from "next/image";
import RexWinner from "../../../../assets/media/rex winner.gif";

const RexWinnerCard = () => {
  return (
    <NextImage
      //   width={500}
      // height={200}
      // priority={true}
      alt="NextUI Fruit Image with Zoom"
      src={RexWinner}
      className="rounded-xl"
    />
  );
};

export default RexWinnerCard;
