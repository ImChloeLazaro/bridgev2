import NextImage from "next/image";
import ExternalLinks from "./ExternalLinks";
import SidebarHeader from "../../../../public/header.webp";

const ExternalLinksHeader = () => {
  return (
    <div className="flex justify-between items-center gap-2 py-4 pr-2">
      <ExternalLinks />
      <NextImage
        alt='Aretex Logo'
        src={SidebarHeader}
        placeholder={"blur"}
        priority={true}
        quality={50}
        sizes="(min-width: 808px) 25vw, 50vw"
        style={{
          width: "100%",
          height: "auto",
          objectFit: "contain", // cover, contain, none
        }}
      />
    </div>
  );
};

export default ExternalLinksHeader;
