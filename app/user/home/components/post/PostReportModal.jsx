import CTAButtons from "@/app/components/CTAButtons";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Link,
} from "@nextui-org/react";
import { CheckboxGroup, Checkbox } from "@nextui-org/react";
import { useState } from "react";

const PostReportModal = ({ isOpen, onOpenChange, isDismissable }) => {
  const [selected, setSelected] = useState([]);
  const [value, setValue] = useState("");

  const handleSelectedViolations = (violation) => {
    setSelected(violation);
    console.log("VIOLATIONS:");
    console.log(selected);
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={isDismissable}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="text-xl font-bold text-black-default">
                {"Report Post"}
              </div>
            </ModalHeader>
            <ModalBody>
              <CheckboxGroup
                label={
                  <div className="flex flex-col items-start gap-2">
                    <div className="text-base font-bold text-black-default">
                      {
                        "We're Sorry, this post violates the Company Guidelines "
                      }
                    </div>
                    <div className="text-base font-medium text-black-default">
                      {"Help Us Understand What Happened"}
                    </div>
                  </div>
                }
                value={selected}
                onValueChange={(violation) =>
                  handleSelectedViolations(violation)
                }
              >
                <Checkbox value="spam">{"Spam"}</Checkbox>
                <Checkbox value="nudity">{"Nudity"}</Checkbox>
                <Checkbox value="terrorism">{"Terrorism"}</Checkbox>
                <Checkbox value="violence">{"Violence"}</Checkbox>
                <Checkbox value="child">{"Child Pornography"}</Checkbox>
                <Checkbox value="women">
                  {"Violence against Women and Children"}
                </Checkbox>
                <Checkbox value="porn">{"Pornography"}</Checkbox>
                <Checkbox value="cyber">{"Cyber Bullying"}</Checkbox>
                <Checkbox value="harassment">{"Harassment"}</Checkbox>
                <Checkbox value="hate">{"Hate Speech"}</Checkbox>
                <Checkbox value="suicide">{"Suicide"}</Checkbox>
                <Checkbox value="else">{"Something Else"}</Checkbox>
              </CheckboxGroup>
              {selected.includes("else") && (
                <Input
                  variant={"underlined"}
                  placeholder="Please specify other reason/s"
                  value={value}
                  onValueChange={setValue}
                />
              )}
            </ModalBody>
            <ModalFooter>
              <CTAButtons
                label={"Cancel"}
                color={"clear"}
                size={"sm"}
                onPress={onClose}
              />
              <CTAButtons
                label={"Submit Report"}
                color={"orange"}
                size={"sm"}
                onPress={onClose}
              />
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default PostReportModal;
