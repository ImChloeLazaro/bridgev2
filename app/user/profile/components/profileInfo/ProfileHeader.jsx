import IconButton from "@/app/components/IconButton";
import { userAtom } from "@/app/store/UserStore";
import { Avatar } from "@nextui-org/react";
import { useAtomValue } from "jotai";
import NextImage from "next/image";
import { MdCameraAlt, MdManageAccounts } from "react-icons/md";
import ProfileBanner from "../../../../../public/header-profile.webp";
import CTAButtons from "../../../../components/CTAButtons";

const ProfileHeader = () => {
  const user = useAtomValue(userAtom);
  return (
    <>
      <div className="m-0 p-0 w-full ">
        <div className="relative z-10 h-full w-full overflow-hidden flex justify-center items-center lg:[clip-path:polygon(0%_52.181%,5.556%_50.02%,5.556%_50.02%,7.383%_49.289%,9.511%_48.566%,11.906%_47.962%,14.533%_47.591%,17.361%_47.564%,20.356%_47.995%,23.483%_48.996%,26.711%_50.679%,30.006%_53.157%,33.333%_56.543%,33.333%_56.543%,36.667%_60.956%,40%_66.107%,43.333%_71.713%,46.667%_77.493%,50%_83.163%,53.333%_88.443%,56.667%_93.048%,60%_96.698%,63.333%_99.109%,66.667%_100%,66.667%_100%,69.994%_99.107%,73.289%_96.68%,76.517%_92.989%,79.644%_88.302%,82.639%_82.888%,85.467%_77.018%,88.094%_70.958%,90.489%_64.98%,92.617%_59.351%,94.444%_54.342%,100%_39.136%,100%_0%,94.444%_0%,94.444%_0%,92.617%_0%,90.489%_0%,88.094%_0%,85.467%_0%,82.639%_0%,79.644%_0%,76.517%_0%,73.289%_0%,69.994%_0%,66.667%_0%,66.667%_0%,63.333%_0%,60%_0%,56.667%_0%,53.333%_0%,50%_0%,46.667%_0%,43.333%_0%,40%_0%,36.667%_0%,33.333%_0%,33.333%_0%,30.006%_0%,26.711%_0%,23.483%_0%,20.356%_0%,17.361%_0%,14.533%_0%,11.906%_0%,9.511%_0%,7.383%_0%,5.556%_0%,0%_0%)] ">
          <NextImage
            alt={"Profile Banner"}
            src={ProfileBanner}
            priority={true}
            placeholder={"blur"}
            quality={50}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover", // cover, contain, none
            }}
          />
        </div>
      </div>

      <div className="w-full px-2 lg:px-4 xl:px-12 -mt-[2rem] mb-4 lg:mb-0 lg:-mt-[2rem] flex flex-col lg:flex-row gap-6 lg:justify-between items-start lg:items-center">
        <div className="flex flex-col lg:flex-row gap-1 xl:gap-3 px-0 items-start lg:items-center relative z-20 ">
          <div className="flex -mr-6">
            <div className="relative z-20 ">
              <Avatar
                // as={Button}
                // onPress={()=>{console.log("AVATAR CHANGE PROFILE PICTURE")}}
                // radius="full"
                src={user?.picture}
                classNames={{
                  base: "data-[hover=true]:bg-darkgrey-default w-[6rem] h-[6rem] lg:w-[8rem] lg:h-[8rem] text-large border-8 border-white-default ",
                  img: "data-[hover=true]:bg-darkgrey-default",
                }}
              />
            </div>

            <div className="flex relative mt-6 lg:mt-8 right-[35%] translate-x-1/2 translate-y-1/2 z-30">
              <IconButton
                className="bg-grey-hover hover:bg-darkgrey-default"
                radius="full"
              >
                <MdCameraAlt size={16} />
              </IconButton>
            </div>
          </div>

          <div className="px-2 lg:px-0 flex-col">
            <p className="text-xl lg:text-2xl font-extrabold text-darkgrey-hover leading-4">
              {user.name}
            </p>
            {/* FEAT: Connected to team of user */}
            {/* <p className="text-sm lg:text-base font-medium text-darkgrey-hover leading-4">
              {"Junior Data Anaylst"}
            </p> */}
            <p className="text-base font-medium text-darkgrey-hover leading-5">
              {user.email}
            </p>
          </div>
        </div>

        <div className="px-2 lg:px-0 relative z-20 ">
          <CTAButtons
            startContent={<MdManageAccounts size={24} />}
            color="orange"
            label="Edit Profile"
            size="sm"
            className={"h-unit-0 px-5 py-[1.30rem] text-md lg:text-lg"}
          />
        </div>
      </div>
    </>
  );
};

export default ProfileHeader;

// <svg id="wave" style="transform:rotate(0deg); transition: 0.3s" viewBox="0 0 1440 490" version="1.1" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0"><stop stop-color="rgba(243, 106, 62, 1)" offset="0%"></stop><stop stop-color="rgba(255, 179, 11, 1)" offset="100%"></stop></linearGradient></defs><path style="transform:translate(0, 0px); opacity:1" fill="url(#sw-gradient-0)" d="M0,0L48,16.3C96,33,192,65,288,114.3C384,163,480,229,576,261.3C672,294,768,294,864,269.5C960,245,1056,196,1152,179.7C1248,163,1344,180,1440,228.7C1536,278,1632,359,1728,400.2C1824,441,1920,441,2016,408.3C2112,376,2208,310,2304,245C2400,180,2496,114,2592,73.5C2688,33,2784,16,2880,73.5C2976,131,3072,261,3168,302.2C3264,343,3360,294,3456,269.5C3552,245,3648,245,3744,277.7C3840,310,3936,376,4032,334.8C4128,294,4224,147,4320,106.2C4416,65,4512,131,4608,187.8C4704,245,4800,294,4896,334.8C4992,376,5088,408,5184,408.3C5280,408,5376,376,5472,343C5568,310,5664,278,5760,236.8C5856,196,5952,147,6048,147C6144,147,6240,196,6336,220.5C6432,245,6528,245,6624,204.2C6720,163,6816,82,6864,40.8L6912,0L6912,490L6864,490C6816,490,6720,490,6624,490C6528,490,6432,490,6336,490C6240,490,6144,490,6048,490C5952,490,5856,490,5760,490C5664,490,5568,490,5472,490C5376,490,5280,490,5184,490C5088,490,4992,490,4896,490C4800,490,4704,490,4608,490C4512,490,4416,490,4320,490C4224,490,4128,490,4032,490C3936,490,3840,490,3744,490C3648,490,3552,490,3456,490C3360,490,3264,490,3168,490C3072,490,2976,490,2880,490C2784,490,2688,490,2592,490C2496,490,2400,490,2304,490C2208,490,2112,490,2016,490C1920,490,1824,490,1728,490C1632,490,1536,490,1440,490C1344,490,1248,490,1152,490C1056,490,960,490,864,490C768,490,672,490,576,490C480,490,384,490,288,490C192,490,96,490,48,490L0,490Z"></path></svg>
