import { selectedUserData } from "@/store/slices/auth-slices";
import {
  addMessage,
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

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
  const socket = useRef();
  const userData = useSelector(selectedUserData);
  const chatData = useSelector(selectedChatData);
  const chatType = useSelector(selectedChatType);
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

      return () => {
        // socket.current.off("receiveMessage");
        socket.current.off("userStatus");
        socket.current.disconnect();
        console.log("Socket disconnected");
      };
    }
  }, [cookie, userData]);

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

      socket.current.on("receiveMessage", handleMessage);

      return () => {
        socket.current.off("receiveMessage", handleMessage);
      };
    }
  }, [chatData, chatType]);

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
