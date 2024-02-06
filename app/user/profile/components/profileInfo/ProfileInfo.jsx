import { Avatar, Checkbox, Divider, Input, Button } from "@nextui-org/react";
import { useAtom } from "jotai";
import { MdInfoOutline } from "react-icons/md";
import CTAButtons from "../../../../components/CTAButtons";
import {
  confirmPasswordAtom,
  currentPasswordAtom,
  isConfirmPasswordVisibleAtom,
  isCurrentPasswordVisibleAtom,
  isNewPasswordVisibleAtom,
  isVisibleJobTitleAtom,
  newPasswordAtom,
} from "../../store/ProfileStore";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";

const ProfileInfo = ({ data }) => {
  const [isVisibleJobTitle, setIsVisibleJobTitle] = useAtom(
    isVisibleJobTitleAtom
  );

  const [currentPassword, setCurrentPassword] = useAtom(currentPasswordAtom);
  const [newPassword, setNewPassword] = useAtom(newPasswordAtom);
  const [confirmPassword, setConfirmPassword] = useAtom(confirmPasswordAtom);

  const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] = useAtom(
    isCurrentPasswordVisibleAtom
  );
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useAtom(
    isNewPasswordVisibleAtom
  );
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useAtom(
    isConfirmPasswordVisibleAtom
  );

  const toggleVisibility = (setIsVisible, isVisible) =>
    setIsVisible(!isVisible);
  return (
    <>
      {/* // ### UPDATE SETTINGS */}
      <div className="mt-2 mb-12 py-2 w-full">
        <div className="flex-col justify-start items-center gap-2 mb-12">
          <div className="flex gap-2 items-center">
            <p className="font-bold text-lg">{"Profile Settings"}</p>
            <MdInfoOutline />
          </div>
          <p className="font-medium text-sm text-darkgrey-default">
            {"Update your profile photo and details"}
          </p>
        </div>

        {/* // ### LIST */}
        <div className="flex flex-col items-start gap-4 ">
          {/* // ### PROFILE PHOTO */}
          <div className="flex justify-start items-center gap-10 w-full">
            <div className="flex-col w-1/2 min-w-[30%]">
              <p className="font-medium text-base">{"Your Photo"}</p>
              <p className="font-medium text-sm text-darkgrey-default">
                {"This will be displayed on your profile"}
              </p>
            </div>
            <div className="w-full flex justify-between items-center">
              <Avatar
                radius="full"
                size="md"
                src={data.profileURL}
                alt="Profile picture"
              />
              <div className="flex ">
                <CTAButtons
                  label="Delete"
                  color="clear"
                  disableRipple
                ></CTAButtons>
                <CTAButtons
                  label="Update"
                  color="clear"
                  disableRipple
                ></CTAButtons>
              </div>
            </div>
          </div>
          <Divider />
          {/* // ### HEADER PHOTO */}
          <div className="flex justify-start items-center gap-10 w-full">
            <div className="flex-col w-1/2 min-w-[30%]">
              <p className="font-medium text-base">{"Header Photo"}</p>
              <p className="font-medium text-sm text-darkgrey-default">
                {"This will be displayed on your profile"}
              </p>
            </div>
            <div className="w-full flex justify-between items-center">
              <Avatar
                radius="full"
                size="md"
                src="/header-profile.png"
                alt="Header picture"
              />
              <div className="flex ">
                <CTAButtons
                  label="Delete"
                  color="clear"
                  disableRipple
                ></CTAButtons>
                <CTAButtons
                  label="Update"
                  color="clear"
                  disableRipple
                ></CTAButtons>
              </div>
            </div>
          </div>
          <Divider />

          {/* // ### JOB TITLE */}
          <div className="flex justify-start items-center gap-10 w-full">
            <div className="flex-col w-1/2 min-w-[30%]">
              <p className="font-medium text-base">{"Job Title"}</p>
            </div>
            <div className="w-full mr-32 flex flex-col gap-2">
              <Input
                disabled
                placeholder={data.position}
                size="sm"
                variant="bordered"
                radius="sm"
              />
              <Checkbox
                isSelected={isVisibleJobTitle}
                onValueChange={setIsVisibleJobTitle}
                radius="sm"
                classNames={{
                  label: "text-sm font-medium text-darkgrey-default",
                }}
              >
                {"Show my job title under my name"}
              </Checkbox>
            </div>
          </div>
        </div>
      </div>
      {/* // ### PASSWORD */}
      <div className="mt-2 mb-12 py-2 w-full">
        <div className="flex-col justify-start items-center gap-2 mb-5">
          <div className="flex gap-2 items-center">
            <p className="font-bold text-lg">{"Password"}</p>
            <MdInfoOutline />
          </div>
          <p className="font-medium text-sm text-darkgrey-default">
            {"Change your password frequently"}
          </p>
        </div>

        {/* // ### LIST */}
        <div className="flex flex-col items-start gap-4">
          {/* // ### CURRENT PASSWORD */}
          <div className="flex justify-start items-center gap-10 w-full">
            <div className="flex-col w-1/2 min-w-[30%]">
              <p className="font-medium text-base">{"Current Password"}</p>
            </div>
            <div className="w-full mr-32 flex flex-col gap-2">
              <Input
                disabled
                description="Your password was last changed 2 days ago"
                size="sm"
                variant="bordered"
                radius="sm"
                type={isCurrentPasswordVisible ? "text" : "password"}
                value={currentPassword}
                onValueChange={setCurrentPassword}
                classNames={{ input: "text-sm" }}
                endContent={
                  <Button
                    className="focus:outline-none bg-transparent"
                    isIconOnly
                    onPress={() =>
                      toggleVisibility(
                        setIsCurrentPasswordVisible,
                        isCurrentPasswordVisible
                      )
                    }
                  >
                    {isCurrentPasswordVisible ? (
                      <AiOutlineEye size={18} />
                    ) : (
                      <AiOutlineEyeInvisible size={18} />
                    )}
                  </Button>
                }
              />
            </div>
          </div>
          <Divider />

          {/* // ### NEW PASSWORD */}
          <div className="flex justify-start items-center gap-10 w-full">
            <div className="flex-col w-1/2 min-w-[30%]">
              <p className="font-medium text-base">{"New Password"}</p>
            </div>
            <div className="w-full mr-32 flex flex-col gap-2">
              <Input
                description="You can change your password once every 90 days"
                size="sm"
                variant="bordered"
                radius="sm"
                type={isNewPasswordVisible ? "text" : "password"}
                value={newPassword}
                onValueChange={setNewPassword}
                classNames={{ input: "text-sm" }}
                endContent={
                  <Button
                    className="focus:outline-none bg-transparent"
                    isIconOnly
                    onPress={() =>
                      toggleVisibility(
                        setIsNewPasswordVisible,
                        isNewPasswordVisible
                      )
                    }
                  >
                    {isNewPasswordVisible ? (
                      <AiOutlineEye size={18} />
                    ) : (
                      <AiOutlineEyeInvisible size={18} />
                    )}
                  </Button>
                }
              />
            </div>
          </div>
          <Divider />

          {/* // ### CONFIRM PASSWORD */}
          <div className="flex justify-start items-center gap-10 w-full">
            <div className="flex-col w-1/2 min-w-[30%]">
              <p className="font-medium text-base">{"Confirm Password"}</p>
            </div>
            <div className="w-full mr-32 flex flex-col gap-2">
              <Input
                // disabled

                description="You can change your password once every 90 days"
                size="sm"
                variant="bordered"
                radius="sm"
                type={isConfirmPasswordVisible ? "text" : "password"}
                value={confirmPassword}
                onValueChange={setConfirmPassword}
                classNames={{ input: "text-sm" }}
                endContent={
                  <Button
                    className="focus:outline-none bg-transparent"
                    isIconOnly
                    onPress={() =>
                      toggleVisibility(
                        setIsConfirmPasswordVisible,
                        isConfirmPasswordVisible
                      )
                    }
                  >
                    {isConfirmPasswordVisible ? (
                      <AiOutlineEye size={18} />
                    ) : (
                      <AiOutlineEyeInvisible size={18} />
                    )}
                  </Button>
                }
              />
            </div>
          </div>
        </div>
      </div>
      <Divider />
    </>
  );
};

export default ProfileInfo;
