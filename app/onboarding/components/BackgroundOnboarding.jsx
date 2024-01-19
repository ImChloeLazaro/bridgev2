import React from "react";
import { Input } from "@nextui-org/react";

import { useAtom, useAtomValue } from "jotai";
import {
  backgroundOnboardingAtom,
  selectedTabAtom,
} from "../store/OnboardingStore";

const BackgroundOnboarding = () => {
  const selectedTab = useAtomValue(selectedTabAtom);
  const [backgroundOnboarding, setBackgroundOnboarding] = useAtom(
    backgroundOnboardingAtom
  );
  const onboardingContent = Object.values(
    backgroundOnboarding[selectedTab] || {}
  );

  const handleValueChange = (input_key, input_value) => {
    setBackgroundOnboarding((prev) => {
      return {
        ...prev,
        [selectedTab]: onboardingContent.map((background, b_index) => {
          if (selectedTab === "family_background") {
            if (b_index === 2) {
              return Object.values(background).map((child, c_index) => {
                return Object.values(child).map((details, index) => {
                  if (input_key === b_index + "-" + c_index + "-" + index) {
                    return { ...details, value: input_value };
                  }
                  return details;
                });
              });
            } else {
              return Object.values(background).map((family, index) => {
                if (input_key === b_index + "-" + index) {
                  return { ...family, value: input_value };
                }
                return family;
              });
            }
          } else if (selectedTab === "educational_background") {
            return Object.values(background).map((details, index) => {
              if (input_key === b_index + "-" + index) {
                return { ...details, value: input_value };
              }
              return details;
            });
          } else {
            return Object.values(background).map((details, index) => {
              if (input_key === b_index + "-" + index) {
                return { ...details, value: input_value };
              }
              return details;
            });
          }
        }),
      };
    });
  };

  return (
    <div className="flex flex-wrap justify-start gap-5 mt-4">
      {onboardingContent.map((background, b_index) => {
        if (selectedTab === "family_background") {
          if (b_index === 2) {
            return Object.values(background).map((child, c_index) => {
              return Object.values(child).map((details, index) => (
                <Input
                  key={b_index + "-" + c_index + "-" + index}
                  size="md"
                  type="email"
                  label={details.label}
                  value={details.value}
                  onValueChange={(text) => {
                    handleValueChange(
                      b_index + "-" + c_index + "-" + index,
                      text
                    );
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
              ));
            });
          }
          return Object.values(background).map((family, index) => {
            return (
              <Input
                key={b_index + "-" + index}
                size="md"
                type="email"
                label={family.label}
                value={family.value}
                onValueChange={(text) => {
                  handleValueChange(b_index + "-" + index, text);
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
        } else {
          return Object.values(background).map((education_exam, index) => {
            return (
              <Input
                key={b_index + "-" + index}
                size="md"
                type="email"
                label={education_exam.label}
                value={education_exam.value}
                onValueChange={(text) => {
                  handleValueChange(b_index + "-" + index, text);
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
        }
      })}
    </div>
  );
};

export default BackgroundOnboarding;
