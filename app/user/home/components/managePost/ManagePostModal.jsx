import { Modal, ModalBody, ModalContent } from "@nextui-org/react";
import "../../../../aws-auth";
import ManagePostMainContent from "./ManagePostMainContent";
import ManagePostSidebar from "./ManagePostSidebar";
// @refresh reset

const ManagePostModal = ({ isOpen, onOpenChange, isDismissable }) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={isDismissable}
      hideCloseButton
      size={"full"}
      placement={"center"}
      classNames={{
        // inset-x-16 inset-y-8 inset-0 top-8 left-16
        wrapper: "m-auto p-0",
        base: "m-auto p-0 bg-transparent shadow-none relative",
        body: "p-0 my-8 mx-16 h-[16rem]",
        backdrop: "",
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
            <div className="flex flex-row rounded-lg h-full ">
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
