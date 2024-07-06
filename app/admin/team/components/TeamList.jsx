
import { Listbox, ListboxItem, Image, cn, Button, Chip } from "@nextui-org/react"; // Import Loader from NextUI
// import Image from "next/image";
const TeamList = ({ team, head, members }) => {
  return (
    <Listbox
      items={members || []}
      aria-label="Training List"
      onAction={(key) => console.log(key)}
      emptyContent={
        <div className="w-full p-0 flex flex-col items-center mt-6 xl:mt-8 text-center">
          <Image
            width={180}
            height={180}
            alt={"No Training"}
            src={"/no-training.png"}
            classNames={{ img: "aspect-square lg:w-32 xl:w-44" }}
          />
          <p className="text-sm xl:text-base font-medium text-black-default/80">
            {"Feeling extra today?"}
          </p>
          <p className="text-sm xl:text-base font-medium text-black-default/80">
            {"Start your training now!"}
          </p>
        </div>
      }
      classNames={{
        base: ["w-full h-auto overflow-y-auto"],
        list: "flex gap-2",
      }}
      itemClasses={{
        base: [
          "p-0",
          "data-[hover=true]:bg-grey-default bg-white-default ",
          "drop-shadow-sm rounded-md outline outline-[1.8px] outline-grey-default",
        ],
      }}
    >
      {(list) => {
        return (
          <ListboxItem textValue={list.name} key={list._id}>
            <div className="flex items-center justify-between">
              <div
                className={cn(
                  "py-1.5 rounded-l-md",
                  `bg-red-default text-white-default`,
                  `p-2`
                  // `${training.color === "yellow" ? "text-shadow" : ""}`
                )}
              >
                <p className="font-extrabold text-lg xl:text-2xl">
                  {team}
                </p>
                <p className="font-light text-xs">{head}</p>
              </div>
              <div className="ml-0 lg:ml-2.5 2xl:ml-3 flex gap-3 px-2 sm:px-6 lg:px-2 w-[10rem] sm:w-full md:w-full lg:w-[10rem] 2xl:w-[20rem]">
                <Image src={list.picture} width={50} height={50} alt={list.name} className="rounded-full" />
                <div>
                  <p className="text-sm font-medium">{list.name}</p>
                  <p className="text-xs font-light">{list.email}</p>
                  <p className="text-xs font-light">{list.position}</p>
                </div>
              </div>
              <div className="flex flex-col items-start gap-1 m-2">
                <Chip size="sm" className="text-slate-50" color={list.tenure_status === 'Tenure Status' ? 'default' : 'warning'}>{list.tenure_status}</Chip>
                <Chip size="sm" className="text-slate-50" color={list.status === 'active' ? 'success' : 'danger'}>
                  {list.status === 'active' ? 'Active' : 'Inactive'}
                </Chip>
              </div>
            </div>
          </ListboxItem>
        );
      }}
    </Listbox>
  )
}

export default TeamList;