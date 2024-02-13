import CTAButtons from "@/app/components/CTAButtons";
import { Image } from "@nextui-org/react";
export function UnderConstruction({src}) {
  return (
    <div className="w-full h-full m-0 p-0">
      <div className="my-4 gap-1 flex flex-col items-center">
        <p className="text-black-default font-bold text-[56px] text-center">
          {"OOPS! WE'RE SORRY!"}
        </p>
        <p className="text-black-default font-bold text-lg text-center">
          {
            "We'll be back very soon. We are currently developing this page and will be online soon. Stay tuned."
          }
        </p>
        <Image
          src={src}
          alt="Page under construction"
          radius="none"
          className="my-8 justify-center"
        />
        {/* <div className="flex justify-center">
        <CTAButtons label={"Come Back Later"} color={"orange"} />
      </div> */}
      </div>{" "}
    </div>
  );
}
