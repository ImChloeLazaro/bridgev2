import React from "react";
import { Input } from "@nextui-org/react";

import { useAtomValue, useAtom } from "jotai";
import {
  applicationOnboardingAtom,
  selectedTabAtom,
} from "../store/OnboardingStore";

const ApplicationOnboarding = () => {
  const selectedTab = useAtomValue(selectedTabAtom);
  const [applicationOnboarding, setApplicationOnboarding] = useAtom(
    applicationOnboardingAtom
  );

  const onboardingContent = Object.values(
    applicationOnboarding[selectedTab] || {}
  );

  const handleValueChange = (input_key, input_value) => {
    setApplicationOnboarding((prev) => {
      return {
        ...prev,
        [selectedTab]: onboardingContent.map((application, index) => {
          if (index === input_key) {
            return { ...application, value: input_value };
          }
          return application;
        }),
      };
    });
  };

  return (
    <div className="flex flex-wrap justify-start gap-5 mt-4">
      {onboardingContent?.map((application, index) => {
        return (
          <Input
            key={index}
            size="md"
            type="email"
            label={application.label}
            value={application.value}
            onValueChange={(text) => {
              handleValueChange(index, text);
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
              inputWrapper: ["font-medium", "text-black-default/90", "text-sm"],
              errorMessage: ["text-red-default"],
            }}
          />
        );
      })}
    </div>
  );
};

export default ApplicationOnboarding;
