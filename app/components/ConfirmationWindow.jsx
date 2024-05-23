import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import CTAButtons from "./CTAButtons";
import { MdCheck, MdInfoOutline, MdWarningAmber } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdQuestionMark } from "react-icons/md";

const ConfirmationWindow = ({
  message = "",
  description = "",
  title = "Confirmation",
  icon = <MdInfoOutline size={24} />,
  accept,
  deny,
  third_choice,
  showChoices = true,
  type = "confirm",
  className,
  onCloseParent,
  ...props
}) => {
  const icons = {
    confirm: <MdQuestionMark size={24} />, // orange
    info: <MdInfoOutline size={24} />, // blue
    warning: <MdWarningAmber size={24} />, // yellow
    error: <MdInfoOutline size={24} />, // red
  };

  return (
    <Modal
      size={"md"}
      radius={"md"}
      isDismissable={false}
      isKeyboardDismissDisabled={false}
      shouldBlockScroll={true}
      scrollBehavior={"inside"}
      backdrop={"blur"}
      classNames={{ closeButton: "invisible m-2", base: "" }}
      {...props}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 pb-2 text-xl font-extrabold text-black-default">
              {title}
            </ModalHeader>
            <ModalBody className="px-6">
              {/* <div className="flex flex-col gap-2 items-start"> */}
              <div className="w-full flex items-center gap-4">
                <div className="p-1">
                  {type === "custom" ? icon : icons[type]}
                </div>
                <div className="flex flex-col gap-2 items-start">
                  <p className="text-base font-semibold text-black-default tracking-tight text-wrap">
                    {message}
                  </p>
                  <p className="text-xs font-semibold text-black-default tracking-tight text-wrap">
                    {description}
                  </p>
                </div>
              </div>
              {/* </div> */}
            </ModalBody>
            <ModalFooter>
              {showChoices ? (
                <>
                  {third_choice ? (
                    <CTAButtons
                      startContent={
                        third_choice.icon ? third_choice.icon : null
                      }
                      color={"blue"}
                      label={third_choice.label ? third_choice.label : ""}
                      onPress={
                        third_choice.action ? third_choice.action : onClose
                      }
                    />
                  ) : null}
                  <CTAButtons
                    startContent={accept.icon ? accept.icon : null}
                    color={"orange"}
                    label={accept.label ? accept.label : ""}
                    onPress={
                      accept.action
                        ? () => {
                            accept.action();
                            onCloseParent();
                            onClose();
                          }
                        : onClose
                    }
                  />
                  <CTAButtons
                    disableRipple={true}
                    color={"clear"}
                    label={deny?.label?.length ? deny.label : "Cancel"}
                    onPress={onClose}
                  />
                </>
              ) : null}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationWindow;
