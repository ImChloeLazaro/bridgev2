import LabelTagChip from "@/app/components/LabelTagChip";
import { Link, Tooltip } from "@nextui-org/react";
import { useAtomValue } from "jotai";
import { personalInfoAtom } from "../../store/ProfileStore";

const BenefitsContent = () => {
  const { benefits } = useAtomValue(personalInfoAtom);

  return (
    <div className="flex flex-col w-full gap-1">
      {benefits !== null ? (
        <>
          {benefits?.benefits.map((benefit, index) => {
            return (
              <div
                key={index}
                className="w-full flex justify-between items-center p-1 lg:p-2"
              >
                <p className="w-1/5 text-sm sm:text-base font-bold text-black-default">
                  {benefit?.name ?? "No Data Available"}
                </p>
                <Tooltip
                  showArrow={true}
                  content={
                    <p className="capitalize">{`${benefit?.availability}`}</p>
                  }
                >
                  <Link
                    href="#"
                    underline="none"
                    className="w-1/3 text-sm sm:text-base font-bold text-black-default hover:underline-offset-1 hover:underline"
                  >
                    {benefit?.number ?? "No Data Available"}
                  </Link>
                </Tooltip>

                <LabelTagChip
                  text={
                    benefit?.status === "available"
                      ? "Available"
                      : "Unavailable"
                  }
                  color={benefit?.status === "available" ? "green" : "red"}
                  size="xs"
                  type="label"
                  className={"w-1/3 px-2 py-4 lg:px-2 rounded-[0.4rem]"}
                  classNameLabel={"text-xs lg:text-sm"}
                ></LabelTagChip>
              </div>
            );
          })}
        </>
      ) : (
        <p className="text-red-default text-center">{"No Data Available"}</p>
      )}
    </div>
  );
};

export default BenefitsContent;
