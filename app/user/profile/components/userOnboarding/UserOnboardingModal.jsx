import OnboardingBody from "@/app/onboarding/components/OnboardingBody";
import OnboardingFooter from "@/app/onboarding/components/OnboardingFooter";
import OnboardingHeader from "@/app/onboarding/components/OnboardingHeader";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { onboardingDataAtom } from "../../store/ProfileStore";
import { useAtomValue, useSetAtom, useAtom } from "jotai";

const UserOnboardingModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {response: data} = useAtomValue(onboardingDataAtom);//temp
  const handleFetchDataWhenOpen = (open) => {
    onOpen(open);
  };

  return (
    <>
      <Button
        disableRipple={true}
        disableAnimation={true}
        className="bg-transparent text-lg font-medium text-lightblue-default hover:underline hover:underline-offset-2"
        onPress={(open) => handleFetchDataWhenOpen(open)}
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
                <OnboardingFooter allowSubmit={false} onClose={onClose} />
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserOnboardingModal;
