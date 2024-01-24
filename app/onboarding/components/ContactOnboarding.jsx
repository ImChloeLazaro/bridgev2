import { selectedTabAtom } from "../store/OnboardingStore";

import { contactAtom } from "../store/OnboardingStore";

import OnboardingFieldInput from "../../components/OnboardingFieldInput";

import { useAtom, useAtomValue } from "jotai";

const ContactOnboarding = () => {
  const selectedTab = useAtomValue(selectedTabAtom);

  // Emergency Contact
  const [contact, setContact] = useAtom(contactAtom);

  const emergency_contact = (
    <>
      <OnboardingFieldInput
        label={"NAME"}
        value={contact.name}
        onValueChange={(text) =>
          setContact((prev) => {
            return { ...prev, name: text };
          })
        }
      />
      <OnboardingFieldInput
        label={"ADDRESS"}
        value={contact.address}
        onValueChange={(text) =>
          setContact((prev) => {
            return { ...prev, address: text };
          })
        }
      />
      <OnboardingFieldInput
        label={"RELATIONSHIP"}
        value={contact.relationship}
        onValueChange={(text) =>
          setContact((prev) => {
            return { ...prev, relationship: text };
          })
        }
      />
      <OnboardingFieldInput
        label={"CONTACT NUMBER"}
        value={contact.contact_number}
        onValueChange={(text) =>
          setContact((prev) => {
            return { ...prev, contact_number: text };
          })
        }
      />
    </>
  );

  return (
    <div className="flex flex-wrap justify-start gap-5 mt-4">
      {selectedTab === "emergency_contact" && emergency_contact}
      <div className="p-1 m-1 w-full"></div> {/* SPACER FOR LAST ROW*/}
    </div>
  );
};

export default ContactOnboarding;
