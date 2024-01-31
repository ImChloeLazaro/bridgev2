import { Image } from "@nextui-org/react";
import ExternalLinks from "./ExternalLinks";

const ExternalLinksHeader = () => {
  return (
    <div className="flex justify-start items-center gap-6 py-4 px-1 ">
      <ExternalLinks />
      <Image radius="none" alt="Aretex Logo" src="/header.png" />
    </div>
  );
};

export default ExternalLinksHeader;
