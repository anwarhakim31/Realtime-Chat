import { selectedUserData } from "@/store/slices/auth-slices";
import {
  addChannelInChannelList,
  addMessage,
  selectedChannels,
  selectedChatData,
  selectedChatMessage,
  selectedChatType,
} from "@/store/slices/chat-slices";
import { HOST } from "@/utils/constant";
import { useRef, useEffect, useContext, createContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";
import Cookie from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { setOfflineStatus, setOnlineStatus } from "@/store/slices/users-slices";
import { toast } from "sonner";

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
  const socket = useRef();
  const userData = useSelector(selectedUserData);
  const chatData = useSelector(selectedChatData);
  const chatMessage = useSelector(selectedChatType);
  const chatType = useSelector(selectedChatMessage);
  const channel = useSelector(selectedChannels);
  const dispatch = useDispatch();
  const cookie = Cookie.get("jwt");

  useEffect(() => {
    if (cookie) {
      const { userId } = jwtDecode(cookie);

      socket.current = io(HOST, {
        withCredentials: true,
        query: { userId },
      });

      socket.current.on("connect", () => {
        console.log("Connected to socket server");
      });

      socket.current.on("userStatus", ({ userId, status }) => {
        // console.log("User status update:", { userId, status });
        if (status === "online") {
          dispatch(setOnlineStatus(userId));
        } else {
          dispatch(setOfflineStatus(userId));
        }
      });

      if (channel) {
        socket.current.on("newChannel", (channel) => {
          // Handle the new channel event
          dispatch(addChannelInChannelList(channel));
        });
      }

      return () => {
        socket.current.off("newChannel");
        socket.current.off("userStatus");
        socket.current.disconnect();
        console.log("Socket disconnected");
      };
    }
  }, [cookie, userData]);

  console.log(channel);

  useEffect(() => {
    if (chatData) {
      const handleMessage = (message) => {
        // console.log("Received message:", message);

        if (
          chatType !== undefined &&
          (chatData._id === message.sender._id ||
            chatData._id === message.recipient._id)
        ) {
          dispatch(addMessage(message));
        }
      };

      const handleReceiveChannelMessage = (message) => {
        if (
          selectedChatType !== undefined &&
          chatData._id === message.channelId
        ) {
          dispatch(addMessage(message));
        }
        dispatch(addChannelInChannelList(message));
      };

      socket.current.on("receiveMessage", handleMessage);
      socket.current.on("receive-channel-message", handleReceiveChannelMessage);

      return () => {
        socket.current.off("receiveMessage", handleMessage);
        socket.current.off("channelCreated");
        socket.current.off(
          "receive-channel-message",
          handleReceiveChannelMessage
        );
      };
    }
  }, [chatData, chatType, chatMessage]);

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
