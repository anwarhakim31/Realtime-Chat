import { selectedUserData } from "@/store/slices/auth-slices";
import {
  addMessage,
  setChatData,
  setSelectedChatData,
  setSelectedChatType,
} from "@/store/slices/chat-slices";
import { HOST } from "@/utils/constant";
import { useRef } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import Cookie from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { setOfflineStatus, setOnlineStatus } from "@/store/slices/users-slices";

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

const SocketProvider = ({ children }) => {
  const socket = useRef();
  const userData = useSelector(selectedUserData);
  const chatData = useSelector(setSelectedChatData);
  const chatType = useSelector(setSelectedChatType);
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
        console.log(status);
        console.log(userId);

        if (status === "online") {
          dispatch(setOnlineStatus(userId));
        } else {
          dispatch(setOfflineStatus(userId));
        }
      });
    }

    return () => {
      if (socket.current) {
        socket.current.off("receiveMessage");
        socket.current.off("userStatus");
        socket.current.disconnect();
        console.log("Socket disconnected");
      }
    };
  }, [cookie]);

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
