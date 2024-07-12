import { Image } from "@nextui-org/react";
export function UnderConstruction({ src }) {
  return (
    <div className="flex justify-center items-center h-full w-full p-2 md:p-0 border-2">
      <div>
        <div className="my-2 md:hidden block">
          <p className="text-black-default font-bold text-[2rem] lg:text-[3.5rem] text-center leading-none">
            {"OOPS! WE'RE SORRY!"}
          </p>
          <p className="text-black-default font-bold text-md lg:text-lg text-center">
            {
              "We'll be back very soon. We are currently developing this page and will be online soon. Stay tuned."
            }
          </p>
        </div>
        <Image
          src={src}
          alt="Page under construction"
          removeWrapper
          className="h-[60%] max-h-80 md:max-h-full md:h-full w-full object-cover md:rounded-none"
        />
      </div>
    </div>
  );
}
