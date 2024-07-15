"use client";
import { authenticationAtom } from "@/app/store/AuthenticationStore";
import { restinsert } from "@/app/utils/amplify-rest";
import { parseDate } from "@internationalized/date";
import {
  Button,
  Checkbox,
  DatePicker,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { useAtomValue } from "jotai";
import { useState } from "react";
import { FaHistory } from "react-icons/fa";
import { IoInformationCircle } from "react-icons/io5";
import { toast } from "sonner";
import { leaveStatusAtom } from "../../store/ProfileStore";
import LeaveHistory from "./LeaveHistory";

const LeaveRequest = () => {
  const leaveStatus = useAtomValue(leaveStatusAtom);
  // console.log("leaveStatus", leaveStatus);

  const { sub } = useAtomValue(authenticationAtom);
  const [leaveConfirmation, setLeaveConfirmation] = useState(false);
  const [formdata, setFormdata] = useState({
    sub: sub,
    leaveType: "vl",
    numberOfHours: 8,
    leaveDate: new Date().toISOString(),
    reason: "",
    borrowedLeave: false,
  });

  const {
    isOpen: leaveRequestIsOpen,
    onOpen: leaveRequestOnOpen,
    onOpenChange: leaveRequestOnOpenChange,
  } = useDisclosure();
  const {
    isOpen: leaveHistoryIsOpen,
    onOpen: leaveHistoryOnOpen,
    onOpenChange: leaveHistoryOnOpenChange,
  } = useDisclosure();
  const {
    isOpen: confirmationIsOpen,
    onOpen: confirmationOnOpen,
    onOpenChange: confirmationOnOpenChange,
  } = useDisclosure();

  const leaveType = [
    { key: "vl", label: "Vacation Leave", value: "VL" },
    { key: "sl", label: "Sick Leave", value: "SL" },
    { key: "ml", label: "Maternity Leave", value: "ML" },
    { key: "pl", label: "Paternity Leave", value: "PL" },
  ];

  const numberOfHours = [
    { key: "half", label: "4", value: "4" },
    { key: "full", label: "8", value: "8" },
  ];

  const getLeaveLabel = (key) => {
    const leave = leaveType.find((item) => item.key === key);
    return leave ? leave.label : "Unknown Leave Type";
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let isBorrowedLeave = false;
    if (
      (formdata.leaveType === "vl" && leaveStatus?.VL_BALANCE === 0) ||
      (formdata.leaveType === "sl" && leaveStatus?.SL_BALANCE === 0)
    ) {
      isBorrowedLeave = true;
    }
    const updatedFormdata = {
      ...formdata,
      borrowedLeave: isBorrowedLeave,
    };

    setFormdata(updatedFormdata);
    try {
      const response = await restinsert("/leaverequest", updatedFormdata);
      if (response?.success) {
        toast?.success("Leave request submitted successfully");
        confirmationOnOpenChange();
        leaveRequestOnOpenChange();
      }
    } catch (error) {
      console.error("Error saving leave request:", error);
    }
  };
  return (
    <>
      <Button
        disableRipple={true}
        disableAnimation={true}
        className="bg-transparent text-sm sm:text-md lg:text-lg font-medium text-lightblue-default hover:underline hover:underline-offset-2"
        onPress={leaveRequestOnOpen}
      >
        {"File a Leave"}
      </Button>
      <Modal
        isOpen={leaveRequestIsOpen}
        onOpenChange={leaveRequestOnOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Request a Leave
              </ModalHeader>
              <ModalBody>
                <Select
                  isRequired
                  label="Leave Type"
                  defaultSelectedKeys={["vl"]}
                  className="w-full"
                  onChange={(e) =>
                    setFormdata({ ...formdata, leaveType: e.target.value })
                  }
                >
                  {leaveType.map((leave) => (
                    <SelectItem key={leave.key}>{leave.label}</SelectItem>
                  ))}
                </Select>
                <Select
                  isRequired
                  label="Leave Hour"
                  defaultSelectedKeys={["full"]}
                  className="w-full"
                  onChange={(e) =>
                    setFormdata({ ...formdata, numberOfHours: e.target.value })
                  }
                >
                  {numberOfHours.map((hour) => (
                    <SelectItem key={hour.key}>{hour.label}</SelectItem>
                  ))}
                </Select>
                <DatePicker
                  className="w-full"
                  label="Leave Date"
                  value={parseDate(new Date().toISOString().split("T")[0])}
                  onChange={(e) =>
                    setFormdata({
                      ...formdata,
                      leaveDate: new Date(e).toISOString(),
                    })
                  }
                />
                <Textarea
                  label="Reason"
                  placeholder="Type your reason here"
                  className="w-full"
                  onChange={(e) =>
                    setFormdata({ ...formdata, reason: e.target.value })
                  }
                />
              </ModalBody>
              <ModalFooter className="flex justify-between">
                <Button
                  color="danger"
                  variant="secondary"
                  onPress={leaveHistoryOnOpen}
                >
                  <FaHistory /> See history
                </Button>
                <div className="flex gap-1">
                  <Button color="warning" onPress={confirmationOnOpen}>
                    Submit
                  </Button>
                  <Button variant="secondary" onPress={onClose}>
                    Close
                  </Button>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {/* Confirmation Modal */}
      <Modal
        isOpen={confirmationIsOpen}
        onOpenChange={confirmationOnOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex items-center gap-1">
                <IoInformationCircle /> Confirmation
              </ModalHeader>
              <ModalBody>
                <p>
                  Leave Date{" "}
                  {new Date(formdata.leaveDate).toISOString().split("T")[0]}
                </p>
                <p>
                  {getLeaveLabel(formdata.leaveType)} -{" "}
                  {formdata.numberOfHours == 8 ? "Full Day" : "Half Day"}
                </p>
                {((formdata.leaveType === "sl" &&
                  leaveStatus?.SL_BALANCE <= 0) ||
                  (formdata.leaveType === "vl" &&
                    leaveStatus?.VL_BALANCE <= 0)) && (
                  <small className="text-red-600 text-justify">
                    Your {getLeaveLabel(formdata.leaveType)} balance is
                    currently 0. If you proceed and your leave is approved by an
                    admin or team leader, it will be considered as borrowed
                    leave and will automatically be deducted from your future
                    leave balance when the leave is reset.
                  </small>
                )}
                <div className="flex flex-col gap-2">
                  <Checkbox
                    isSelected={leaveConfirmation}
                    onValueChange={setLeaveConfirmation}
                  >
                    Do you confirm your Leave?
                  </Checkbox>
                </div>
              </ModalBody>
              <ModalFooter className="flex gap-1">
                <Button
                  isDisabled={!leaveConfirmation}
                  className="text-white-default font-semibold"
                  color="warning"
                  onClick={handleFormSubmit}
                >
                  Yes, I Confirm
                </Button>
                <Button variant="secondary" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {/* Leave History */}
      <LeaveHistory
        leaveHistoryIsOpen={leaveHistoryIsOpen}
        leaveHistoryOnOpenChange={leaveHistoryOnOpenChange}
      />
    </>
  );
};
export default LeaveRequest;
