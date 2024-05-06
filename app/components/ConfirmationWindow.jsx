import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import CTAButtons from "./CTAButtons";

const ConfirmationWindow = ({ isOpen, onOpen, onOpenChange, data }) => {
  const {
    title,
    icon,
    message,
    description,
    withCondition = false,
    condition,
    type = "OK",
    actions,
  } = data;

  const windowType = {
    YesNo: (
      <>
        <CTAButtons
          color={"red"}
          label={actions.deny.label}
          onPress={actions.deny.choice}
        />
        <CTAButtons
          color={"blue"}
          label={actions.confirm.label}
          onPress={actions.confirm.choice}
        />

        <CTAButtons
          color={"clear"}
          label={"Cancel"}
          disableRipple={true}
          onPress={() => onOpen()}
        />
      </>
    ),
    OK: (
      <>
        <CTAButtons
          color={"orange"}
          label={actions.confirm.label}
          onPress={actions.confirm.choice}
        />
        <CTAButtons
          color={"clear"}
          label={actions.deny.label}
          disableRipple={true}
          onPress={actions.deny.choice}
        />
      </>
    ),
  };

  return (
    <Modal
      size={"md"}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={false}
      classNames={{ closeButton: "m-2", base: "" }}
      scrollBehavior={"inside"}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 pb-2 text-xl font-extrabold text-black-default">
              {title}
            </ModalHeader>
            <ModalBody className="">
              <div className="w-full flex items-center gap-2">
                <div className="p-1">{icon}</div>
                <p className="text-base font-medium text-black-default tracking-tight text-wrap">
                  {message}
                </p>
                {description?.length ? (
                  <p className="text-base font-medium text-black-default tracking-tight text-wrap">
                    {description}
                  </p>
                ) : (
                  ""
                )}
                {withCondition ? { condition } : ""}
              </div>
            </ModalBody>
            <ModalFooter>{windowType[type]}</ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationWindow;
