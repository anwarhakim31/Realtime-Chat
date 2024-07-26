import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@radix-ui/react-avatar";
import { X } from "lucide-react";
import { useEffect } from "react";
import { useSocket } from "@/contexts/SocketContext";
import { setOfflineStatus, setOnlineStatus } from "@/store/slices/users-slices";
import { closeChat } from "@/store/slices/chat-slices";
import { AvatarImage } from "../ui/avatar";
import { splitName } from "./NewDm";
import { getColor } from "@/lib/utils";

const MessageHeader = () => {
  const dispatch = useDispatch();
  const chatData = useSelector((state) => state.chat.chatData);
  const chatType = useSelector((state) => state.chat.chatType);

  const onlineUsers = useSelector((state) => state.users.onlineUsers);

  return (
    <div className="h-[10vh] border-b-2 border-[#2f303b] flex items-between px-20">
      <div className="flex gap-5 items-center w-full justify-between">
        <div className="flex gap-3 items-center justify-center">
          <div className="w-12 h-12 rounded-full relative">
            <Avatar className="w-12 h-12 rounded-full">
              {chatData.image ? (
                <AvatarImage
                  src={chatData.image}
                  alt="profile"
                  className="object-cover w-full h-full bg-black"
                  loading="lazy"
                />
              ) : (
                <div
                  className={`uppercase h-12 w-12 text-xs border flex-center rounded-full ${getColor(
                    chatData.color
                  )}`}
                >
                  {chatData.firstName && chatData.lastName
                    ? splitName(chatData.firstName, chatData.lastName)
                    : chatData.email.charAt(0)}
                </div>
              )}
            </Avatar>
          </div>
          <div className="flex flex-col">
            <span className="font-medium">
              {chatType === "contact" && chatData.firstName
                ? `${chatData.firstName} ${chatData.lastName}`
                : chatData.email}
            </span>
            <span className="text-xs">
              {onlineUsers[chatData._id] ? "Online" : "Offline"}
            </span>
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
