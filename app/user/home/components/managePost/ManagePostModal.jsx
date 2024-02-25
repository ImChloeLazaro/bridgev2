import { Modal, ModalBody, ModalContent } from "@nextui-org/react";
import ManagePostMainContent from "./ManagePostMainContent";
import ManagePostSidebar from "./ManagePostSidebar";
import "../../../../aws-auth"

const ManagePostModal = ({ isOpen, onOpenChange, isDismissable }) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={isDismissable}
      hideCloseButton
      size={"full"}
      scrollBehavior={"outside"}
      placement={"center"}
      classNames={{
        // inset-x-16 inset-y-8 inset-0 top-8 left-16
        wrapper: "my-0 p-0",
        base: "my-6 p-0 bg-transparent shadow-none relative sm:my-6 sm:relative sm:max-h-fit sm:h-fit",
        body: "flex-row justify-center m-0 p-0 text-clip",
      }}
    >
      {/* 
      max-w-[30rem]
      max-w-[75rem]
      basis-2/5  
      basis-3/5
*/}
      <ModalContent>
        {(onClose) => (
          <ModalBody>
            <div className="flex">
              <div className="bg-white-default rounded-l-lg border-2 border-darkgrey-default/50">
                <ManagePostSidebar />
              </div>
              <div className="bg-background rounded-r-lg border-darkgrey-default/40">
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
