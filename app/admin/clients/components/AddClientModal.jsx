import CTAButtons from "@/app/components/CTAButtons";
import {
  addClientAtom,
  clientDataAtom,
  clientTabsAtom,
  companyNameAtom,
  fetchClientAtom,
  selectedClientTabAtom,
} from "@/app/store/ClientStore";
import {
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tab,
  Tabs,
  useDisclosure,
} from "@nextui-org/react";
import { useAtom, useSetAtom, useAtomValue } from "jotai";
import ClientFormSections from "./ClientFormSections";
import { toast } from "sonner";
import ConfirmationWindow from "@/app/components/ConfirmationWindow";
import { useMemo, useState } from "react";
import { MdOutlineError } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

const AddClientModal = ({ isOpen, onOpenChange }) => {
  const {
    isOpen: isOpenPopup,
    onOpen: onOpenPopup,
    onOpenChange: onOpenChangePopup,
  } = useDisclosure();

  const [clientTabs, setClientTabs] = useAtom(clientTabsAtom);
  const [selectedClientTab, setSelectedClientTab] = useAtom(
    selectedClientTabAtom
  );

  const clientData = useAtomValue(clientDataAtom);
  const clientName = useAtomValue(companyNameAtom);
  const addClient = useSetAtom(addClientAtom);
  const fetchClient = useSetAtom(fetchClientAtom);

  const unfilledInputFields = useMemo(
    () =>
      Object.keys(clientData).reduce(
        (acc, curr) => {
          if (
            [
              "business",
              "company",
              "contact",
              "another_bookkeeper",
              "with_accountant",
            ].includes(curr)
          ) {
            let count;

            if (typeof clientData[curr] === "object") {
              count = Object.keys(clientData[curr])
                .map((data) => Boolean(clientData[curr][data]))
                .filter((data) => !data).length;
            } else {
              count = Boolean(!clientData[curr]) ? 1 : 0;
            }

            if (count === 0) {
              return (acc["general"] = false), acc;
            } else {
              return (acc["general"] = true), acc;
            }
          }

          if (["financial"].includes(curr)) {
            let count;

            if (typeof clientData[curr] === "object") {
              count = Object.keys(clientData[curr])
                .map((data) => Boolean(clientData[curr][data]))
                .filter((data) => !data).length;
            } else {
              count = Boolean(clientData[curr]) ? 1 : 0;
            }

            if (count === 0) {
              return (acc["financial"] = false), acc;
            } else {
              return (acc["financial"] = true), acc;
            }
          }

          if (["software"].includes(curr)) {
            let count;

            if (typeof clientData[curr] === "object") {
              count = Object.keys(clientData[curr])
                .map((data) => Boolean(clientData[curr][data]))
                .filter((data) => !data).length;
            } else {
              count = Boolean(clientData[curr]) ? 1 : 0;
            }

            if (count === 0) {
              return (acc["software"] = false), acc;
            } else {
              return (acc["software"] = true), acc;
            }
          }

          if (["documents"].includes(curr)) {
            let count;

            if (typeof clientData[curr] === "object") {
              count = Object.keys(clientData[curr])
                .map((data) => Boolean(clientData[curr][data]))
                .filter((data) => !data).length;
            } else {
              count = Boolean(clientData[curr]) ? 1 : 0;
            }

            if (count === 0) {
              return (acc["documents"] = false), acc;
            } else {
              return (acc["documents"] = true), acc;
            }
          }

          return acc;
        },
        {
          general: false,
          financial: false,
          software: false,
          documents: false,
        }
      ),
    [clientData]
  );

  const handleAddClient = async () => {
    const promise = async () =>
      new Promise((resolve) =>
        setTimeout(
          async () => resolve(await addClient(clientData), await fetchClient()),
          2000
        )
      );
    toast.promise(promise, {
      loading: "Creating Client Profile...",
      success: () => {
        return `${
          !clientName?.length ? "Client" : clientName
        } Successfully Onboarded`;
      },
      error: "Error onboarding client failed",
    });
  };

  const handleFormAction = (e) => {
    console.log("unfilledInputFields", unfilledInputFields);
    let submitClientData = Object.values(unfilledInputFields).every(
      (value) => value === false
    );

    setClientTabs((prev) =>
      prev.map((tab) => {
        return { ...tab, filled: unfilledInputFields[tab.key] };
      })
    );

    if (submitClientData) {
      console.log("submitClientData", submitClientData);
      onOpenPopup();
    }

    return false;
  };

  return (
    <Modal
      size={"4xl"}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      classNames={{ closeButton: "m-2" }}
    >
      <ModalContent>
        {(onClose) => (
          <form action={handleFormAction}>
            <ModalHeader className="flex flex-col py-3 gap-1 text-xl font-bold text-black-default m-2">
              {"Onboard New Client"}
            </ModalHeader>
            <ModalBody>
              <div className="flex justify-center items-center gap-1">
                <div className="w-full flex flex-col justify-center items-center">
                  <Tabs
                    key="client onboarding navigation"
                    selectedKey={selectedClientTab}
                    onSelectionChange={setSelectedClientTab}
                    aria-label="Client Onboarding Navigation"
                    variant="underlined"
                    classNames={{
                      base: "px-2 py-0 w-full",
                      tabList:
                        "justify-center gap-8 flex-1 flex-wrap relative rounded-none p-0 overflow-x-scroll",
                      tab: "max-w-fit px-0 h-12 ",
                      tabContent:
                        "group-data-[selected=true]:text-blue-default group-data-[selected=true]:font-extrabold font-medium text-base text-black-default/90",
                      cursor: "w-full bg-blue-default",
                      panel: "w-full pt-3 py-0",
                    }}
                  >
                    {clientTabs.map((tab) => {
                      return (
                        <Tab
                          key={tab.key}
                          title={
                            <div className="flex items justify-center gap-2 ">
                              <p className="capitalize">{tab.title}</p>
                              {tab.filled && (
                                <div className="flex items-center gap-2 text-green-default">
                                  <MdOutlineError
                                    size={18}
                                    className="text-red-default"
                                    fill="currentColor"
                                  />
                                </div>
                              )}
                            </div>
                          }
                        >
                          <div className="h-80 flex px-5 overflow-y-scroll">
                            <ClientFormSections />
                          </div>
                        </Tab>
                      );
                    })}
                  </Tabs>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <CTAButtons label={"Cancel"} color={"clear"} onPress={onClose} />

              <CTAButtons
                type={"submit"}
                label={"Onboard New Client"}
                color={"blue"}
                className={"px-6 py-1.5"}
              />
            </ModalFooter>
            <ConfirmationWindow
              message="
                Make sure the details of the client is correct.
                You cannot edit this later.
                "
              title="Onboard New Client?"
              choice="Onboard Client"
              action={handleAddClient}
              type="confirm"
              isOpen={isOpenPopup}
              onOpenChange={onOpenChangePopup}
              onCloseParent={onClose}
            />
          </form>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddClientModal;
