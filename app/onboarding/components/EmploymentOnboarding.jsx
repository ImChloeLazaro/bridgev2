import React from "react";
import { Input } from "@nextui-org/react";

import { useAtomValue, useAtom } from "jotai";
import {
  employmentOnboardingAtom,
  selectedTabAtom,
} from "../store/OnboardingStore";

const EmploymentOnboarding = () => {
  const selectedTab = useAtomValue(selectedTabAtom);
  const [employmentOnboarding, setEmploymentOnboarding] = useAtom(
    employmentOnboardingAtom
  );
  const onboardingContent = Object.values(
    employmentOnboarding[selectedTab] || {}
  );

  const handleValueChange = (input_key, input_value) => {
    setEmploymentOnboarding((prev) => {
      return {
        ...prev,
        [selectedTab]: onboardingContent.map((employment, e_index) => {
          return Object.values(employment).map((details, index) => {
            if (input_key === e_index + "-" + index) {
              return { ...details, value: input_value };
            }
            return details;
          });
        }),
      };
    });
  };

  return (
    <div className="flex flex-wrap justify-start gap-5 mt-4">
      {onboardingContent?.map((employment, e_index) => {
        return Object.values(employment).map((details, index) => {
          return (
            <Input
              key={e_index + "-" + index}
              size="md"
              type="email"
              label={details.label}
              value={details.value}
              onValueChange={(text) => {
                handleValueChange(e_index + "-" + index, text);
              }}
              classNames={{
                base: ["w-[370px]"],
                label: [
                  "font-medium",
                  "text-black-default/70",
                  "text-sm",
                  "group-data-[focus=true]:tracking-tight",
                ],
                input: [
                  "font-medium",
                  "group-data-[filled=true]:text-black-default/80",
                  "text-sm",
                ],
                inputWrapper: [
                  "font-medium",
                  "text-black-default/90",
                  "text-sm",
                ],
                errorMessage: ["text-red-default"],
              }}
            />
          );
        });
      })}
    </div>
  );
};

export default EmploymentOnboarding;
