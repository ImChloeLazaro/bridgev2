import { Image } from "@nextui-org/react";
import NextImage from "next/image";
import ExternalLinks from "./ExternalLinks";
import SidebarHeader from "../../../../public/header.png";

const ExternalLinksHeader = () => {
  return (
    <div className="flex justify-start items-center gap-6 py-4 px-1 ">
      <ExternalLinks />
      <NextImage
        alt="Aretex Logo"
        src={SidebarHeader}
        loading="lazy"
        placeholder={"blur"}
        quality={50}
        sizes="(min-width: 808px) 50vw, 100vw"
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
