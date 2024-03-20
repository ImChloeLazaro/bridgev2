import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Divider,
} from "@nextui-org/react";
import FormFieldInput from "@/app/components/FormFieldInput";
import { MdInfoOutline } from "react-icons/md";
import { Tab, Tabs } from "@nextui-org/react";
import { useAtom, useAtomValue } from "jotai";
import { clientTabsAtom, selectedClientTabAtom } from "@/app/store/ClientStore";
import ClientFormSections from "./ClientFormSections";

const AddClientModal = ({ isOpen, onOpenChange }) => {
  const [selectedClientTab, setSelectedClientTab] = useAtom(
    selectedClientTabAtom
  );
  const clientTabs = useAtomValue(clientTabsAtom);

  return (
    <Modal
      size={"4xl"}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      classNames={{ closeButton: "m-2",}}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-lg font-medium text-black-default m-2">
              {"New Client Data"}
            </ModalHeader>
            <ModalBody>
              <div className="flex justify-start items-center gap-1 mb-6">
                <div className="w-full flex flex-col items-center">
                  <Tabs
                    key="client onboarding navigation"
                    selectedKey={selectedClientTab}
                    onSelectionChange={setSelectedClientTab}
                    aria-label="Client Onboarding Navigation"
                    variant="underlined"
                    classNames={{
                      base: "pl-4 py-0 w-full",
                      tabList: "gap-8 flex-1 flex-wrap relative rounded-none p-0 overflow-x-scroll",
                      tab: "max-w-fit px-0 h-12 ",
                      tabContent:
                        "group-data-[selected=true]:text-blue-default group-data-[selected=true]:font-extrabold font-medium text-base text-black-default/90",
                      cursor: "w-full bg-blue-default",
                      panel: "w-full",
                    }}
                  >
                    {clientTabs.map((tab) => {
                      return (
                        <Tab
                          key={tab.key}
                          title={<p className="capitalize">{tab.title}</p>}
                        >
                          <div className="h-80 flex gap-y-6 px-5 mb-6 overflow-y-scroll">
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
              <Button variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" onPress={onClose}>
                Onboard New Client
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddClientModal;
