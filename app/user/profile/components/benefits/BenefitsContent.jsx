import LabelTagChip from "@/app/components/LabelTagChip";
import { useAtomValue } from "jotai";
import { benefitsStatusAtom } from "../../store/ProfileStore";
import { Tooltip, Link } from "@nextui-org/react";

const BenefitsContent = () => {
  const benefitsList = useAtomValue(benefitsStatusAtom);
  console.log("INSIDE BENEFIT", benefitsList);
  return (
    <div className="flex flex-col w-full gap-1">
      {benefitsList !== null ? (
        <>
          {benefitsList.benefits.map((benefit, index) => {
            return (
              <div
                key={index}
                className="w-full flex justify-between items-center p-1 lg:p-2"
              >
                <p className="w-1/3 text-sm sm:text-base font-bold text-black-default">
                  {benefit.name ?? "No Data Available"}
                </p>
                <Tooltip
                  showArrow={true}
                  content={
                    <p className="capitalize">{`${benefit.availability}`}</p>
                  }
                >
                  <Link
                    href="#"
                    underline="none"
                    className="w-1/3 text-sm sm:text-base font-bold text-black-default hover:underline-offset-1 hover:underline"
                  >
                    {benefit.number ?? "No Data Available"}
                  </Link>
                </Tooltip>

                <LabelTagChip
                  text={
                    benefit.status === "available" ? "Available" : "Unavailable"
                  }
                  color={benefit.status === "available" ? "green" : "red"}
                  size="xs"
                  className={"w-1/3 px-1 py-2 lg:px-0"}
                ></LabelTagChip>
              </div>
            );
          })}
        </>
      ) : (
        <p className="text-red-600 text-center">{"No Data Available"}</p>
      )}
    </div>
  );
};

export default BenefitsContent;
