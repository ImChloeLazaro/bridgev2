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
                className="flex justify-between items-center p-1 lg:p-2"
              >
                <p className="text-sm sm:text-base font-bold text-black-default w-1/4">
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
                    className="text-sm sm:text-base font-bold text-black-default w-2/6 hover:underline-offset-1 hover:underline"
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
                  className={"px-1 py-2"}
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
