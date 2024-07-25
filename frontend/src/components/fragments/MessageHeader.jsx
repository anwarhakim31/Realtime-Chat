import {
  closeChat,
  setSelectedChatData,
  setSelectedChatType,
} from "@/store/slices/chat-slices";
import { Avatar } from "@radix-ui/react-avatar";
import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import { AvatarImage } from "../ui/avatar";
import { useSelector } from "react-redux";
import { splitName } from "./NewDm";
import { getColor } from "@/lib/utils";

const MessageHeader = () => {
  const dispatch = useDispatch();
  const chatData = useSelector(setSelectedChatData);
  const chatType = useSelector(setSelectedChatType);

  return (
    <div className="h-[10vh] border-b-2 border-[#2f303b] flex items-between px-20">
      <div className="flex gap-5 items-center w-full justify-between">
        <div className="flex gap-3 items-center justify-center">
          <div className="w-12 h-12 rounded-full relative">
            <Avatar className={"w-12 h-12 rounded-full"}>
              {chatData.image ? (
                <AvatarImage
                  src={chatData.image}
                  alt="profile"
                  className={"object-cover w-full h-full bg-black"}
                  loading="lazy"
                />
              ) : (
                <div
                  className={`uppercase h-12 w-12  text-xs border flex-center rounded-full ${getColor(
                    chatData.color
                  )}`}
                >
                  {chatData.firstName && chatData.lastName
                    ? splitName(chatData.firstName, chatData.lastName)
                    : chatData.email.split("").shift()}
                </div>
              )}
            </Avatar>
          </div>
          <div className="flex flex-col">
            <span className="font-medium">
              {chatType === "contact" && chatData.firstName
                ? `${chatData.firstName} ${chatData.lastName}  `
                : chatData.email}
            </span>
            {/* <span className="text-xs">Offline</span> */}
          </div>
        </div>
        <div className="flex-center gap-5">
          <button
            onClick={() => dispatch(closeChat())}
            className="text-neutral-500 rounded-sm p-1 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
          >
            <X width={25} height={25} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageHeader;
