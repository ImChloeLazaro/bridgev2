import NextImage from "next/image";
import ExternalLinks from "./ExternalLinks";
import SidebarHeader from "../../../../public/header.webp";

const ExternalLinksHeader = () => {
  return (
    <div className="flex justify-start items-center gap-6 py-4 px-1 ml-1 mr-4">
      <ExternalLinks />
      <NextImage
        alt="Aretex Logo"
        src={SidebarHeader}
        placeholder={"blur"}
        priority={true}
        quality={50}
        sizes="(min-width: 808px) 50vw, 25vw"
        style={{
          width: "100%",
          height: "auto",
          objectFit: "cover", // cover, contain, none
        }}
      />
    </div>
  );
};

export default ExternalLinksHeader;
