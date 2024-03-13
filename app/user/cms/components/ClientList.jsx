import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  CheckboxGroup,
  ScrollShadow,
  cn,
} from "@nextui-org/react";
import ClientItemCard from "./ClientItemCard";
const ClientList = ({
  showClientDetails,
  selectedClient,
  setSelectedClient,
  itemClients,
}) => {
  return (
    <ScrollShadow
      size={25}
      data-show={showClientDetails}
      className="w-full h-screen flex flex-col items-center gap-4 px-6 data-[show=true]:hidden"
    >
      <CheckboxGroup
        aria-label="Client Item Card Checkbox Group"
        value={selectedClient}
        onValueChange={(value) => {
          setSelectedClient(value);
          console.log("SELECTED CLIENT:", value);
        }}
        className="w-full"
      >
        <div className="flex flex-col w-full gap-y-3">
          {itemClients.map((client, index) => (
            <Checkbox
              value={client.key}
              key={index}
              aria-label="Client Item Card Checkbox"
              classNames={{
                base: cn(
                  "w-full max-w-full bg-white-default m-0",
                  "hover:bg-lightgrey-hover flex items-center justify-start",
                  "cursor-pointer rounded-lg gap-6 py-0 pr-0 pl-6 border-[0.4px] shadow",
                  "data-[selected=true]:border-3",
                  "data-[selected=true]:border-blue-default/60"
                ),
                label: "w-full",
              }}
            >
              <ClientItemCard data={client} />
            </Checkbox>
          ))}
        </div>
      </CheckboxGroup>
    </ScrollShadow>
  );
};

export default ClientList;
