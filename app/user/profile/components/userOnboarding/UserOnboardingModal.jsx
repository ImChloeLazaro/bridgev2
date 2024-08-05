import OnboardingBody from "@/app/onboarding/components/OnboardingBody";
import OnboardingFooter from "@/app/onboarding/components/OnboardingFooter";
import OnboardingHeader from "@/app/onboarding/components/OnboardingHeader";
import { fetchOnboardingDataAtom } from "@/app/onboarding/store/OnboardingStore";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useSetAtom } from "jotai";
import { useEffect } from "react";

const UserOnboardingModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const fetchOnBoardingData = useSetAtom(fetchOnboardingDataAtom);

  useEffect(() => {
    fetchOnBoardingData();
  }, [fetchOnBoardingData]);

  const handleFetchDataWhenOpen = (open) => {
    onOpen(open);
  };

  return (
    <>
      <Button
        disableRipple={true}
        disableAnimation={true}
        className="bg-transparent text-sm sm:text-md lg:text-lg font-medium text-lightblue-default hover:underline hover:underline-offset-2"
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
                <OnboardingFooter allowUpdateInfo={false} onClose={onClose} />
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserOnboardingModal;
