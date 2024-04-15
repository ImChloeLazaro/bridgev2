import { ScrollShadow, Image, Link } from "@nextui-org/react";
import ClientItemCard from "./ClientItemCard";
import { Suspense } from "react";
import { MdRefresh } from "react-icons/md";

const ClientList = ({
  itemClients,
  showClientTask,
  setShowClientTask,
  showClientDetails,
  setChangeView,
  setShowFooter,
  setShowSearchBar,
}) => {
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
            <div className="flex flex-col items-center justify-center">
              <Image
                width={450}
                height={450}
                alt={"No Data"}
                src={"/no-data-1.webp"}
              />
              <p className="text-lg font-medium text-black-default/80">
                {"No clients found. Try again"}
              </p>
            </div>
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
              <ClientItemCard
                key={index}
                data={client}
                setShowClientTask={setShowClientTask}
                setChangeView={setChangeView}
                setShowFooter={setShowFooter}
                setShowSearchBar={setShowSearchBar}
              />
            </Suspense>
          ))
        )}
      </div>
    </ScrollShadow>
  );
};

export default ClientList;
