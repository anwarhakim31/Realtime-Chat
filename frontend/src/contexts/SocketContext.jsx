import { createContext, useContext, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
import Cookie from "js-cookie";
import jwtDecode from "jwt-decode";
import {
  selectedChatData,
  addMessage,
  selectedChatType,
} from "@/store/slices/chat-slices";
import { setOfflineStatus, setOnlineStatus } from "@/store/slices/users-slices";
import { HOST } from "@/utils/constant";

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
  const socket = useRef();
  const dispatch = useDispatch();
  const cookie = Cookie.get("jwt");

  const chatData = useSelector(selectedChatData);
  const chatType = useSelector(selectedChatType);

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
        console.log("User status update:", { userId, status });
        if (status === "online") {
          dispatch(setOnlineStatus(userId));
        } else {
          dispatch(setOfflineStatus(userId));
        }
      });

      socket.current.on("receiveMessage", (message) => {
        // console.log("Received message:", message);
        if (
          chatType !== undefined &&
          (chatData._id === message.sender._id ||
            chatData._id === message.recipient._id)
        ) {
          dispatch(addMessage(message));
        }
      });

      return () => {
        if (socket.current) {
          socket.current.off("receiveMessage");
          socket.current.off("userStatus");
          socket.current.disconnect();
          console.log("Socket disconnected");
        }
      };
    }
  }, [cookie, chatData, dispatch]);

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
