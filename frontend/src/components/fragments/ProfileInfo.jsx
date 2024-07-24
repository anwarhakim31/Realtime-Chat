import { getColor } from "@/lib/utils";
import { selectedUserData } from "@/store/slices/auth-slices";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { TooltipContent } from "@radix-ui/react-tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { Tooltip } from "@radix-ui/react-tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { EditIcon } from "lucide-react";
import { CirclePower } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProfileInfo = () => {
  const navigate = useNavigate();
  const userData = useSelector(selectedUserData);

  const split = () => {
    const result = [];

    const first = userData.firstName.split("").shift();
    const last = userData.lastName.split("").shift();

    result.push(first);
    result.push(last);

    return result.join("");
  };

  const handleLogout = () => {};

  return (
    <div className="absolute bottom-0 h-16 flex items-center justify-between px-10 w-full bg-[#2a2b33]">
      <div className="flex gap-3 items-center justify-center">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <Avatar>
            {userData.image ? (
              <AvatarImage
                src={userData.image}
                alt="profile"
                className={"object-cover w-full h-full bg-black"}
                loading="lazy"
              />
            ) : (
              <div
                className={`uppercase h-12 w-12  text-5xl border flex-center rounded-full ${getColor(
                  userData.color
                )}`}
              >
                {userData.firstName && userData.lastName
                  ? split()
                  : userData.email.split("").shift()}
              </div>
            )}
          </Avatar>
        </div>
        <div>
          {userData.firstName && userData.lastName ? (
            <span>{`${userData.firstName} ${userData.lastName}`}</span>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="flex gap-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <EditIcon
                className="text-purple-500 text-medium w-6 h-6"
                onClick={() => navigate("/profile")}
              />
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] border-none p-2  text-white">
              Edit Profile
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <CirclePower
                className="text-red-500 text-medium w-6 h-6"
                onClick={handleLogout}
              />
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] border-none p-2  text-white">
              Logout
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ProfileInfo;
