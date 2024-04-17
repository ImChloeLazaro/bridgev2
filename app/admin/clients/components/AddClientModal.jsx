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
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { useAtom, useSetAtom, useAtomValue } from "jotai";
import ClientFormSections from "./ClientFormSections";
import { toast } from "sonner";

const AddClientModal = ({ isOpen, onOpenChange }) => {
  const [selectedClientTab, setSelectedClientTab] = useAtom(
    selectedClientTabAtom
  );
  const clientData = useAtomValue(clientDataAtom);
  const clientTabs = useAtomValue(clientTabsAtom);
  const clientName = useAtomValue(companyNameAtom);
  const addClient = useSetAtom(addClientAtom);
  const fetchClient = useSetAtom(fetchClientAtom);

  const handleAddClient = async (onClose) => {
    const promise = async () =>
      new Promise((resolve) =>
        setTimeout(
          async () => resolve(await addClient(clientData), await fetchClient()),
          2000
        )
      );
    toast.promise(promise, {
      loading: "Onboarding New Client...",
      success: () => {
        return `${
          !clientName?.length ? "Client" : clientName
        } Successfully Onboarded`;
      },
      error: "Error onboarding client failed",
    });

    onClose();
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
          <>
            <ModalHeader className="flex flex-col gap-1 text-xl font-bold text-black-default m-2">
              {"New Client Data"}
            </ModalHeader>
            <ModalBody>
              <div className="flex justify-center items-center gap-1 mb-6">
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
              <CTAButtons label={"Cancel"} color={"clear"} onPress={onClose} />
              <CTAButtons
                label={"Onboard New Client"}
                color={"blue"}
                onPress={() => handleAddClient(onClose)}
              />
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddClientModal;
