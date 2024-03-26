import NextImage from "next/image";
import ExternalLinks from "./ExternalLinks";
import SidebarHeader from "../../../../public/header.png";

const ExternalLinksHeader = () => {
  return (
    <div className='flex justify-start items-center xs:max-md:pl-12 gap-6 py-4 px-1 ml-1 mr-4'>
      <ExternalLinks />
      <NextImage
        alt='Aretex Logo'
        src={SidebarHeader}
        loading='lazy'
        width={200}
        height={50}
        placeholder={"blur"}
        quality={50}
        // sizes='(min-width: 808px) 50vw, 100vw'
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
