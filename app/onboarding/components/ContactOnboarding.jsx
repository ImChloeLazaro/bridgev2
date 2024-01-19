import React from "react";
import { Input } from "@nextui-org/react";

import { useAtom, useAtomValue } from "jotai";
import {
  contactOnboardingAtom,
  selectedTabAtom,
} from "../store/OnboardingStore";

const ContactOnboarding = () => {
  const selectedTab = useAtomValue(selectedTabAtom);
  const [contactOnboarding, setContactOnboarding] = useAtom(
    contactOnboardingAtom
  );
  const onboardingContent = Object.values(contactOnboarding[selectedTab] || {});

  const handleValueChange = (input_key, input_value) => {
    setContactOnboarding((prev) => {
      return {
        ...prev,
        [selectedTab]: Object.values(contactOnboarding[selectedTab]).map(
          (contact, index) => {
            if (index === input_key) {
              return { ...contact, value: input_value };
            }
            return contact;
          }
        ),
      };
    });
  };

  console.log(contactOnboarding);

  return (
    <div className="flex flex-wrap justify-start gap-5 mt-4">
      {onboardingContent?.map((contact, index) => {
        return (
          <Input
            key={index}
            size="md"
            type="email"
            label={contact.label}
            value={contact.value}
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

export default ContactOnboarding;
