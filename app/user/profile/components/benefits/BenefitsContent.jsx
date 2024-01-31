import { useAtomValue } from "jotai";
import LabelTag from "../../../../components/LabelTag";
import { userAtom } from "../../../../store/UserStore";

const BenefitsContent = () => {
  const user = useAtomValue(userAtom);

  return (
    <div className="flex flex-col w-full gap-1">
      {user.benefits.map((benefit, index) => {
        return (
          <div key={index} className="flex justify-between items-center p-2">
            <p className="text-base font-bold text-black-default w-1/4">
              {benefit.name}
            </p>
            <p className="text-base font-bold text-black-default w-2/6">
              {benefit.number}
            </p>
            <LabelTag
              text={benefit.isAvailable ? "Available" : "Unavailable"}
              color={benefit.isAvailable ? "green" : "red"}
            ></LabelTag>
          </div>
        );
      })}
    </div>
  );
};

export default BenefitsContent;
