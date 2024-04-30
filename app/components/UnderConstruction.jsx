import CTAButtons from "@/app/components/CTAButtons";
import { Image } from "@nextui-org/react";
export function UnderConstruction({ src }) {
  return (
    <div className="w-full max-h-screen m-0 p-0">
      <div className="h-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-6 lg:gap-12">
          <p className="text-black-default font-bold text-[2rem] lg:text-[3.5rem] text-center">
            {"OOPS! WE'RE SORRY!"}
          </p>
          <p className="text-black-default font-bold text-md lg:text-lg text-center">
            {
              "We'll be back very soon. We are currently developing this page and will be online soon. Stay tuned."
            }
          </p>
          <Image
            src={src}
            alt="Page under construction"
            radius="none"
            className="justify-center h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}
