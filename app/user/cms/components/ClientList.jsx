import { ScrollShadow } from "@nextui-org/react";
import ClientItemCard from "./ClientItemCard";
import { Suspense, useEffect } from "react";

const ClientList = ({ itemClients, showClientTask, showClientDetails }) => {
  return (
    <ScrollShadow
      size={25}
      data-details={showClientDetails}
      data-view={showClientTask}
      className="flex data-[view=true]:hidden data-[details=true]:hidden w-full h-screen flex-col items-center gap-4 px-6 "
    >
      <div className="flex flex-col w-full gap-y-3">
        {!itemClients?.length ? (
          <div className="w-full h-full flex justify-center p-4 text-lg font-medium text-black-default">
            {"No data to display"}
          </div>
        ) : (
          itemClients.map((client, index) => (
            <Suspense
              key={index}
              fallback={
                <div className="w-full flex justify-center items-center">
                  {"LOADING"}
                </div>
              }
            >
              <ClientItemCard key={index} data={client} />
            </Suspense>
          ))
        )}
      </div>
    </ScrollShadow>
  );
};

export default ClientList;
