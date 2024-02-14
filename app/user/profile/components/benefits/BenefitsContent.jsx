import { useAtomValue } from "jotai";
import LabelTag from "../../../../components/LabelTag";
import { userAtom, benefitsStatusAtom } from "../../../../store/UserStore";

// ### TODO Connect benefit backend function handler

const BenefitsContent = () => {
  const result = useAtomValue(benefitsStatusAtom);
  return (
    <div className="flex flex-col w-full gap-1">
      {result.response !== null ? (
        <>
          {result.response.benefits.map((benefit, index) => {
            return (
              <div
                key={index}
                className="flex justify-between items-center p-2"
              >
                <p className="text-base font-bold text-black-default w-1/4">
                  {benefit.name ?? "No Data Available"}
                </p>
                <small className="text-base font-bold text-black-default w-2/6">
                  {benefit.number ?? "No Data Available"}
                </small>
                <LabelTag
                  text={
                    benefit.status === "available" ? "Available" : "Unavailable"
                  }
                  color={benefit.status === "available" ? "green" : "red"}
                ></LabelTag>
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
