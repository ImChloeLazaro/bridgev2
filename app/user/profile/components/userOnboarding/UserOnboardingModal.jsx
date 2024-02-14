import OnboardingBody from "@/app/onboarding/components/OnboardingBody";
import OnboardingFooter from "@/app/onboarding/components/OnboardingFooter";
import OnboardingForm from "@/app/onboarding/components/OnboardingForm";
import OnboardingHeader from "@/app/onboarding/components/OnboardingHeader";
import { Button } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

const UserOnboardingModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button
        disableRipple={true}
        disableAnimation={true}
        className="bg-transparent text-lg font-medium text-lightblue-default hover:underline hover:underline-offset-2"
        onPress={onOpen}
      >
        {"View Form"}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size={"4xl"}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <OnboardingHeader />
              </ModalHeader>
              <ModalBody className="h-[760px]">
                <OnboardingBody viewOnly={true} />
              </ModalBody>
              <ModalFooter>
                <OnboardingFooter />
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserOnboardingModal;
