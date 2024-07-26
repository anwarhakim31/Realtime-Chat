import { selectedUserData } from "@/store/slices/auth-slices";
import {
  selectedChatData,
  selectedChatMessage,
  selectedChatType,
} from "@/store/slices/chat-slices";
import moment from "moment";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const MessageFragment = () => {
  const scrollRef = useRef();
  const chatType = useSelector(selectedChatType);
  const chatData = useSelector(selectedChatData);
  const userData = useSelector(selectedUserData);
  const chatMessages = useSelector(selectedChatMessage);

  useEffect(() => {
    if (scrollRef) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  const renderMessages = () => {
    let lastDate = null;

    return chatMessages.map((message, index) => {
      const messageDate = moment(message.timeStamp).format("YYYY-MM-DD");
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;

      return (
        <div key={index}>
          {showDate && (
            <div className="text-center text-gray-500 my-2">
              {moment(message.timeStamp).format("LL")}
            </div>
          )}
          {chatType === "contact" && renderDmMessages(message)}
        </div>
      );
    });
  };

  const renderDmMessages = (message) => (
    <div
      className={`${
        message.sender === chatData._id ? "text-left" : "text-right"
      } mt-1`}
    >
      {message.messageType === "text" && (
        <div
          className={`${
            message.sender !== chatData._id
              ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"
              : "bg-[#2e2b33]/5 text-white/80 border-[#ffffff]/20"
          } border inline-block p-4 rounded my-1 max-w-[50%] break-words`}
        >
          {message.content}
        </div>
      )}
      <div className="text-xs text-gray-600">
        {moment(message.timeStamp).format("LT")}
      </div>
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80vw] w-full">
      {renderMessages()}
      <div ref={scrollRef} />
    </div>
  );
};

export default MessageFragment;
