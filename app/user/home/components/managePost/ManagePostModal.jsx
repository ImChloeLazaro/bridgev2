import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import "../../../../aws-auth";
import ManagePostMainContent from "./ManagePostMainContent";
import ManagePostSidebar from "./ManagePostSidebar";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import CTAButtons from "@/app/components/CTAButtons";
import { selectedTemplateTypeAtom } from "../../store/ManagePostStore";
import { useAtom } from "jotai";

// @refresh reset

const ManagePostModal = ({ isOpen, onOpenChange, isDismissable }) => {
  const customBreakPoint = "1023";
  const [isMobile, setIsMobile] = useState(
    window.matchMedia(`(max-width: ${customBreakPoint}px)`).matches
  );
  const [selectedTemplateType, setSelectedTemplateType] = useAtom(
    selectedTemplateTypeAtom
  );

  const showNextButton = !Array.from(selectedTemplateType).includes("custom");
  const [showPostList, setShowPostList] = useState(false);

  useEffect(() => {
    // only execute all the code below in client side
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setIsMobile(
        window.matchMedia(`(max-width: ${customBreakPoint}px)`).matches
      );
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isKeyboardDismissDisabled={true}
      isDismissable={false}
      size={"full"}
      placement={"center"}
      scrollBehavior={"normal"}
      classNames={{ closeButton: "hidden" }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex justify-between gap-1 p-2">
              <CTAButtons
                color={"clear"}
                startContent={<MdKeyboardArrowLeft size={24} />}
                label={"Cancel"}
                disableRipple={true}
                disableAnimation={true}
                className={"px-0 h-10"}
                onPress={() => {
                  setShowPostList(false);
                  if (!showPostList) {
                    onClose();
                  }
                }}
              />
              <CTAButtons
                isDisabled={!showNextButton}
                color={"clear"}
                label={"Next"}
                className={"h-10"}
                onPress={() => setShowPostList(true)}
              />
            </ModalHeader>
            <ModalBody className="overflow-y-auto py-0 px-0 lg:px-6">
              <div
                data-show={showPostList}
                className="block data-[show=true]:hidden"
              >
                <ManagePostSidebar />
              </div>
              <div
                data-show={showPostList}
                className="hidden data-[show=true]:block h-full"
              >
                <ManagePostMainContent showPostList={showPostList} />
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  ) : (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={isDismissable}
      hideCloseButton
      size={"full"}
      placement={"center"}
      classNames={{
        wrapper: "m-auto p-0",
        base: "m-auto p-0 bg-transparent shadow-none relative",
        body: "p-0 my-8 mx-16 h-[16rem]",
        backdrop: "",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <ModalBody className="">
            <div className="flex flex-row rounded-lg h-full">
              <div className="w-[34rem] bg-white-default rounded-l-lg border-2 border-darkgrey-default/50">
                <ManagePostSidebar />
              </div>
              <div className="w-[75rem] bg-background rounded-r-lg border-darkgrey-default/40">
                <ManagePostMainContent onClose={onClose} />
              </div>
            </div>
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ManagePostModal;
