import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  cn,
} from "@nextui-org/react";
import CTAButtons from "./CTAButtons";
import { MdCheck, MdInfoOutline, MdWarning } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdQuestionMark } from "react-icons/md";
import { BsFillXOctagonFill } from "react-icons/bs";
import { BsQuestionOctagonFill } from "react-icons/bs";
import { BsQuestionCircleFill } from "react-icons/bs";
import { BsFillInfoCircleFill } from "react-icons/bs";
const ConfirmationWindow = ({
  message = "message", // main message
  description = "", // description or additional message
  title, // title on top of confirmation window
  icon, // icon on left of confirmation window
  color, // color of button
  type = "confirm", // type of confirmation window
  cancel, // label for cancel button
  action, // function to call when choice is selected
  action_params, // params to pass to action function {}
  choice, // accept choice for confirmation window
  third_choice, // { label: "", color: "blue", action: () => {} , action_params: {} }
  withNotification = false, // display notification after the action is performed
  showChoices = true, // display choices
  onCloseParent, // function to close parent component when choice is selected
  ...props
}) => {
  const windowType = {
    confirm: {
      title: "Confirmation",
      icon: (
        <BsQuestionCircleFill
          size={28}
          className="text-blue-default"
          fill="currentColor"
        />
      ),
      color: "orange",
      choice: "Yes",
      cancel: "Cancel",
      action: () => {},
    },
    info: {
      title: "Info",
      icon: (
        <BsFillInfoCircleFill
          size={28}
          className="text-blue-default"
          fill="currentColor"
        />
      ),
      color: "blue",
      choice: "OK",
      cancel: "Close",
      action: () => {},
    },
    warning: {
      title: "Warning",
      icon: (
        <MdWarning
          size={32}
          className="text-yellow-default"
          fill="currentColor"
        />
      ),
      color: "yellow",
      choice: "Yes",
      cancel: "No",
      action: () => {},
    },
    error: {
      title: "Error",
      icon: (
        <BsFillXOctagonFill
          size={28}
          className="text-red-default"
          fill="currentColor"
        />
      ),
      color: "red",
      choice: "Send Error Report",
      cancel: "Don't Send",
      action: () => {},
      third: { label: "Show Details", color: "white", action: () => {} },
    },
  };

  // // Notify others || user that task has been updated

  // console.log("NOTIF REF", get(notificationSocketRefAtom))
  // // sendNotification({

  // //   action: "notification",
  // //   subs: ["a8dfd442-2977-499b-a917-a0e226c6c089"],
  // //   title: "NOTIFICATION PUSH TESTING",
  // //   type: ["mentioned"],
  // //   description: "TSEING TSEINTSETINTSEITN",
  // //   notified_from: user,
  // //   route: "set",
  // // })

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
              {title ? title : windowType[type]?.title}
            </ModalHeader>
            <ModalBody className="px-6">
              {/* <div className="flex flex-col gap-2 items-start"> */}
              <div className="w-full flex items-center gap-4">
                <div className="p-1">
                  {icon ? icon : windowType[type]?.icon}
                </div>
                <div className="flex flex-col gap-2 items-start">
                  <p className="text-base font-semibold text-black-default tracking-tight text-wrap">
                    {message ? message : ""}
                  </p>
                  <p className="text-sm font-semibold text-black-default tracking-tight text-wrap">
                    {description ? description : ""}

                    {/* Render multiline text string with '\n' */}
                    {/* text.split('\n').map(str => <p>{str}</p>) */}
                  </p>
                </div>
              </div>
              {/* </div> */}
            </ModalBody>
            <ModalFooter>
              {showChoices ? (
                <>
                  <div className="flex justify-between gap-2">
                    {third_choice ? (
                      <CTAButtons
                        color={
                          windowType[type]?.third?.color
                            ? windowType[type]?.third?.color
                            : third_choice.color
                            ? third_choice.color
                            : "blue"
                        }
                        label={
                          windowType[type]?.third?.label
                            ? windowType[type]?.third?.label
                            : third_choice.label
                            ? third_choice.label
                            : ""
                        }
                        onPress={
                          windowType[type]?.third?.action
                            ? windowType[type]?.third?.action
                            : third_choice.action
                            ? third_choice.action
                            : onClose
                        }
                      />
                    ) : null}
                    <div className="flex justify-center gap-2">
                      <CTAButtons
                        // color={color ? color : windowType[type]?.color}
                        color="blue"
                        label={choice ? choice : windowType[type]?.choice}
                        onPress={
                          action
                            ? () => {
                                action(action_params);
                                onCloseParent && onCloseParent();
                                onClose();
                              }
                            : () => {
                                windowType[type]?.action();
                                onCloseParent && onCloseParent();
                                onClose();
                              }
                        }
                      />
                      <CTAButtons
                        disableRipple={true}
                        color={"clear"}
                        label={cancel ? cancel : "Cancel"}
                        onPress={onClose}
                      />
                    </div>
                  </div>
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
