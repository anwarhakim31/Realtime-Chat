import { closeChat } from "@/store/slices/chat-slices";
import { X } from "lucide-react";
import { useDispatch } from "react-redux";

const MessageHeader = () => {
  const dispatch = useDispatch();

  return (
    <div className="h-[10vh] border-b-2 border-[#2f303b] flex items-between px-20">
      <div className="flex gap-5 items-center">
        <div className="flex gap-3 items-center justify-center"></div>
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
