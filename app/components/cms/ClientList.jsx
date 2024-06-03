import { ScrollShadow, Image, Spinner } from "@nextui-org/react";
import ClientItemCard from "./ClientItemCard";
import { Suspense } from "react";

const ClientList = ({
  itemClients,
  searchClientItem,
  selectedClientFilterKeys,
  showClientTask,
  setShowClientTask,
  showClientDetails,
  changeView,
  setChangeView,
  setShowFooter,
  setShowSearchBar,
  setSelectedClientToView,
  setSelectedClientForTask,
  setShowClientDetails,
  isLoading,
}) => {
  const clients = isLoading ? [] : itemClients;
  return (
    <ScrollShadow
      size={25}
      data-details={showClientDetails}
      data-view={showClientTask}
      className="flex data-[view=true]:hidden data-[details=true]:hidden w-full h-screen flex-col items-center gap-4 px-0 lg:px-4"
    >
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Spinner label="Loading..." />
        </div>
      ) : (
        <div className="flex flex-col w-full gap-y-3">
          {!clients?.length ? (
            clients?.length < 1 &&
            !searchClientItem?.length &&
            Array.from(selectedClientFilterKeys).join("") === "all" ? (
              <div className="w-full h-full flex justify-center p-0 lg:p-4 text-lg font-medium text-black-default">
                <div className="flex flex-col items-center justify-center">
                  <Image
                    width={450}
                    height={450}
                    alt={"Empty Data"}
                    src={"/empty-data.png"}
                    className="w-[10rem] md:w-[18rem] lg:w-[24rem]"
                  />
                  <p className="text-sm lg:text-lg font-medium text-black-default/80">
                    {"No clients are assigned to you yet."}
                  </p>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex justify-center p-0 lg:p-4 text-lg font-medium text-black-default">
                <div className="flex flex-col items-center justify-center">
                  <Image
                    width={450}
                    height={450}
                    alt={"No Data"}
                    src={"/no-data-1.webp"}
                    className="w-[10rem] md:w-[18rem] lg:w-[24rem]"
                  />
                  <p className="text-sm lg:text-lg font-medium text-black-default/80">
                    {
                      "Sorry, we didn't found any client matching your criteria!"
                    }
                  </p>
                </div>
              </div>
            )
          ) : (
            clients.map((client, index) => {
              console.log("CLIENT ITEM CARD", client.company);
              let o = Object.fromEntries(
                Object.entries(client.company).filter(([_, v]) => v != null)
              );
              console.log("CLIENT ITEM OBJECT", o);
              return (
                <Suspense
                  key={index}
                  fallback={
                    <div className="w-full flex justify-center items-center">
                      {"LOADING"}
                    </div>
                  }
                >
                  <ClientItemCard
                    key={index}
                    data={client}
                    setShowClientTask={setShowClientTask}
                    changeView={changeView}
                    setChangeView={setChangeView}
                    setShowFooter={setShowFooter}
                    setShowSearchBar={setShowSearchBar}
                    setSelectedClientToView={setSelectedClientToView}
                    setSelectedClientForTask={setSelectedClientForTask}
                    setShowClientDetails={setShowClientDetails}
                  />
                </Suspense>
              );
            })
          )}
        </div>
      )}
    </ScrollShadow>
  );
};

export default ClientList;
