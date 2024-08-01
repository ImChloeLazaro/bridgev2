import { useAtom, useAtomValue } from "jotai";
import FormFieldInput from "../../components/FormFieldInput";
import { contactAtom, selectedTabAtom } from "../store/OnboardingStore";

const ContactOnboarding = ({ viewOnly }) => {
  const selectedTab = useAtomValue(selectedTabAtom);

  // Emergency Contact
  const [contact, setContact] = useAtom(contactAtom);

  const emergency_contact = (
    <>
      <FormFieldInput
        isDisabled={viewOnly}
        type={"text"}
        label={"NAME"}
        value={contact.name}
        onValueChange={(text) =>
          setContact((prev) => {
            return { ...prev, name: text };
          })
        }
        isRequired={true}
      />
      <FormFieldInput
        isDisabled={viewOnly}
        type={"text"}
        label={"ADDRESS"}
        value={contact.address}
        onValueChange={(text) =>
          setContact((prev) => {
            return { ...prev, address: text };
          })
        }
        isRequired={true}
      />
      <FormFieldInput
        isDisabled={viewOnly}
        type={"text"}
        label={"RELATIONSHIP"}
        value={contact.relationship}
        onValueChange={(text) =>
          setContact((prev) => {
            return { ...prev, relationship: text };
          })
        }
        isRequired={true}
      />
      <FormFieldInput
        isDisabled={viewOnly}
        type={"number"} // Temp change for employee automation by @gerome - phone
        label={"CONTACT NUMBER"}
        value={contact.contact_number}
        onValueChange={(text) =>
          setContact((prev) => {
            return { ...prev, contact_number: text };
          })
        }
        isRequired={true}
      />
    </>
  );

  return (
    <div className="h-fit flex flex-wrap justify-between gap-5 mt-4">
      {selectedTab === "emergency_contact" && emergency_contact}
      <div className="p-1 m-1 w-full"></div> {/* SPACER FOR LAST ROW*/}
    </div>
  );
};

export default ContactOnboarding;
