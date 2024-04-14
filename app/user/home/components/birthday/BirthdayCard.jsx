import NextImage from "next/image";
import Birthday from "../../../../assets/media/birthday.gif";

const BirthdayCard = () => {
  return (
    <NextImage
      width={500}
      // height={200}
      priority={true}
      // unoptimized={true}
      alt="Birthday GIF"
      src={Birthday}
      className="rounded-xl"
    />
  );
};

export default BirthdayCard;
