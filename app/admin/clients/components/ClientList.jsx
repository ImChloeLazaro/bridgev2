import { ScrollShadow } from "@nextui-org/react";
import ClientItemCard from "./ClientItemCard";
import { Suspense, useEffect } from "react";
import { fetchTaskAtom } from "@/app/store/TaskStore";
import { fetchClientAtom } from "@/app/store/ClientStore";
import { useSetAtom } from "jotai";

const ClientList = ({ itemClients, showClientTask, showClientDetails }) => {
  const fetchTask = useSetAtom(fetchTaskAtom);
  const fetchClient = useSetAtom(fetchClientAtom);

  useEffect(() => {
    fetchClient();
    fetchTask();
  }, [fetchClient, fetchTask]);
  
  return (
    <ScrollShadow
      size={25}
      data-details={showClientDetails}
      data-view={showClientTask}
      className="flex data-[view=true]:hidden data-[details=true]:hidden w-full h-screen flex-col items-center gap-4 px-6 "
    >
      <div className="flex flex-col w-full gap-y-3">
        {!itemClients?.length ? (
          <div className="w-full flex justify-center p-4">
            {"No data to display"}
          </div>
        ) : (
          itemClients.map((client, index) => (
            <ClientItemCard key={index} data={client} />
          ))
        )}
      </div>
    </ScrollShadow>
  );
};

export default ClientList;
