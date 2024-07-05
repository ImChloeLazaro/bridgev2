
import { Listbox, ListboxItem, Image, cn, Button, Chip } from "@nextui-org/react"; // Import Loader from NextUI
// import Image from "next/image";
const TeamList = () => {

  const list = [
    {
      "_id": {
        "$oid": "6686b827214833e5edbef2ea"
      },
      "name": "Test Team",
      "heads": [
        {
          "sub": "d0229811-67cc-4fb8-915b-38d8029b85df",
          "name": "Chloe Lazaro",
          "email": "chloe.lazaro@aretex.com.au",
          "picture": "https://lh3.googleusercontent.com/a/ACg8ocIxaddCAyXN_wh9WLB3DrR4tqUJOMWc31qXCUmmCtrLaA=s96-c",
          "_id": {
            "$oid": "6686b828214833e5edbef2eb"
          }
        }
      ],
      "members": [
        {
          "sub": "a8dfd442-2977-499b-a917-a0e226c6c089",
          "name": "Cyrus Layugan",
          "email": "cyrus.layugan@aretex.com.au",
          "picture": "https://lh3.googleusercontent.com/a/ACg8ocLpwxhx9lINMohpX7A8ewFwV4G9dKZ_oB2TK42jxweJ=s96-c",
          "_id": {
            "$oid": "6686b828214833e5edbef2ec"
          }
        },
        {
          "sub": "5b0f4507-1edf-487f-ab5b-e2f99129a447",
          "name": "John Axel Cortez",
          "email": "john.cortez@aretex.com.au",
          "picture": "https://lh3.googleusercontent.com/a/ACg8ocJrnrq8wb3u1UVxAQ9dbo4tbZUUKui0slL2gXKAZKR3=s96-c",
          "_id": {
            "$oid": "6686b828214833e5edbef2ed"
          }
        },
        {
          "sub": "acbd0f62-4ddf-43a1-b2a2-fdacbae5d3ed",
          "name": "Gerome Blanco",
          "email": "gerome.blanco@aretex.com.au",
          "picture": "https://lh3.googleusercontent.com/a/ACg8ocK-oRnfsN1iyKaShecdglBcr73YxLmy8enJquYyQiZ-caA4Qws=s96-c",
          "_id": {
            "$oid": "6686b828214833e5edbef2ee"
          }
        },
        {
          "sub": "b63b2925-152e-4dcc-a765-c4a786cb2ea2",
          "name": "Andrei Emmanuel Yu",
          "email": "andre.yu@aretex.com.au",
          "picture": "https://lh3.googleusercontent.com/a/ACg8ocIErtDD5EfwTX2HCnh0k-VpHcQmaxKSkv_mU7I9d4rgaKTu12Q=s96-c",
          "_id": {
            "$oid": "6686b828214833e5edbef2ef"
          }
        }
      ],
      "status": "active",
      "created_at": {
        "$date": "2024-07-04T14:56:40.088Z"
      },
      "__v": 0
    }
  ]
  return (
    <Listbox
      items={list || []}
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
                {/* <div className="xl:w-[3rem] mx-2 xl:mx-3 my-2 flex flex-col items-center justify-center">
                 
                </div> */}
                <p className="font-extrabold text-lg xl:text-2xl">
                  {list.name}
                </p>
                <p className="font-light text-xs">{list.heads[0].name}</p>
              </div>
              <div className="ml-0 lg:ml-2.5 2xl:ml-3 flex gap-3 px-2 sm:px-6 lg:px-2 w-[10rem] sm:w-full md:w-full lg:w-[10rem] 2xl:w-[20rem]">
                <Image src={list.heads[0].picture} width={50} height={50} alt={list.heads[0].name} className="rounded-full" />
                <div>
                  <p className="text-sm font-medium">{list.heads[0].name}</p>
                  <p className="text-xs font-light">{list.heads[0].email}</p>
                  <p className="text-xs font-light">Junior Data Analyst</p>
                </div>
              </div>
              <div className="flex flex-col items-start gap-1 m-2">
                <Chip color="secondary">Probationary</Chip>
                <Chip color="danger">Inactive</Chip>
              </div>
            </div>
          </ListboxItem>
        );
      }}
    </Listbox>
  )
}

export default TeamList;