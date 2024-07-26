import { useSocket } from "@/contexts/SocketContext";
import { selectedUserData } from "@/store/slices/auth-slices";
import {
  addMessage,
  selectedChatData,
  selectedChatType,
} from "@/store/slices/chat-slices";
import EmojiPicker from "emoji-picker-react";
import { Paperclip, SendHorizonal, Sticker } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const MessageBar = () => {
  const emojiRef = useRef(null);
  const [message, setMessage] = useState("");
  const chatData = useSelector(selectedChatData);
  const chatType = useSelector(selectedChatType);
  const userData = useSelector(selectedUserData);
  const socket = useSocket();
  const [isEmojiPicker, setIsEmojiPicker] = useState(false);
  const dispatch = useDispatch();

  const handleAddEmoji = (emoji) => {
    setMessage((msg) => msg + emoji.emoji);
  };

  const handleSendMessage = async () => {
    if (chatType === "contact") {
      socket.emit("sendMessage", {
        sender: userData._id,
        recipient: chatData._id,
        messageType: "text",
        content: message,
        fileUrl: undefined,
      });
    }

    setMessage("");
  };

  return (
    <div className="h-[10vh] bg-[#1c1d25] flex-center  px-8 mb-6 gap-6">
      <div className="flex-1 flex bg-[#2a2b33] rounded-md items-center gap-6 pr-5">
        <input
          type="text"
          className="w-full p-5 bg-transparent rounded-md focus:border-none focus:outline-none"
          placeholder="Enter Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="text-neutral-500 rounded-sm p-1 focus:border-none focus:outline-none focus:text-white duration-300 transition-all">
          <Paperclip width={25} height={25} />
        </button>
        <div className="relative">
          <button
            onClick={() => setIsEmojiPicker(true)}
            aria-label="emoji picker"
            className="text-neutral-500 rounded-sm p-1 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
          >
            <Sticker width={28} height={28} />
          </button>
          <div className="absolute bottom-16 right-0" ref={emojiRef}>
            <EmojiPicker
              theme="dark"
              open={isEmojiPicker}
              onEmojiClick={handleAddEmoji}
              autoFocusSearch={false}
              searchDisabled={true}
            />
          </div>
        </div>
      </div>
      <button
        onClick={handleSendMessage}
        aria-label="send message"
        className="bg-[#8417ff] rounded-md flex-center p-5 hover:bg-[#741bda] focus:bg-[#741bda] focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
      >
        <SendHorizonal width={25} height={25} />
      </button>
    </div>
  );
};

export default MessageBar;
