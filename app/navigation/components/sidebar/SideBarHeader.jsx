import NextImage from "next/image";
import SidebarHeader from "../../../../public/header.webp";
import ExternalLinks from "./ExternalLinks";

const SideBarHeader = () => {
  return (
    <div className="flex justify-between items-center py-4 pr-2 ml-2">
      <ExternalLinks />
      <NextImage
        alt="Aretex Logo"
        src={SidebarHeader}
        placeholder={"blur"}
        priority={true}
        quality={50}
        sizes="(min-width: 768px) 25vw, 50vw"
        style={{
          width: "100%",
          height: "auto",
          paddingLeft: "0.8rem",
          paddingRight: "0.8rem",
          objectFit: "cover", // cover, contain, none
        }}
      />
    </div>
  );
};

export default SideBarHeader;
