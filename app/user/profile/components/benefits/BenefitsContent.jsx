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
                className="flex justify-between items-center p-2"
              >
                <p className="text-base font-bold text-black-default w-1/4">
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
                    className="text-base font-bold text-black-default w-2/6 hover:underline-offset-1 hover:underline"
                  >
                    {benefit.number ?? "No Data Available"}
                  </Link>
                </Tooltip>

                <LabelTagChip
                  text={
                    benefit.status === "available" ? "Available" : "Unavailable"
                  }
                  color={benefit.status === "available" ? "green" : "red"}
                  size="sm"
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
