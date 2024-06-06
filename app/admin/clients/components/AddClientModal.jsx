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
  useDisclosure,
} from "@nextui-org/react";
import { useAtom, useSetAtom, useAtomValue } from "jotai";
import ClientFormSections from "./ClientFormSections";
import { toast } from "sonner";
import ConfirmationWindow from "@/app/components/ConfirmationWindow";

const AddClientModal = ({ isOpen, onOpenChange }) => {
  const {
    isOpen: isOpenPopup,
    onOpen: onOpenPopup,
    onOpenChange: onOpenChangePopup,
  } = useDisclosure();

  const [selectedClientTab, setSelectedClientTab] = useAtom(
    selectedClientTabAtom
  );
  const clientData = useAtomValue(clientDataAtom);
  const clientTabs = useAtomValue(clientTabsAtom);
  const clientName = useAtomValue(companyNameAtom);
  const addClient = useSetAtom(addClientAtom);
  const fetchClient = useSetAtom(fetchClientAtom);

  const handleAddClient = async () => {
    // await addClient(clientData),
    const promise = async () =>
      new Promise((resolve) =>
        setTimeout(async () => resolve(await fetchClient()), 2000)
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
          <form>
            <ModalHeader className="flex flex-col gap-1 text-xl font-bold text-black-default m-2">
              {"New Client Data"}
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
                          title={<p className="capitalize">{tab.title}</p>}
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
                onPress={() => onOpenPopup()}
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
