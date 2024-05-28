import NextImage from "next/image";
import RexWinner from "../../../../assets/media/rex winner.gif";

const RexWinnerCard = () => {
  return (
    <NextImage
      width={500}
      // height={200}
      priority={true}
      unoptimized={true}
      alt="Rex Winner GIF"
      src={RexWinner}
      className="rounded-none lg:rounded-xl"
    />
  );
};

export default RexWinnerCard;
