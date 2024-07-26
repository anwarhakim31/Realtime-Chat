import {
  selectedChatData,
  selectedChatType,
  setChatData,
  setChatMessages,
  setChatType,
} from "@/store/slices/chat-slices";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarImage } from "../ui/avatar";
import { splitName } from "./NewDm";
import { getColor } from "@/lib/utils";
import { selectedOnlineUser } from "@/store/slices/users-slices";

const ContactList = ({ contacts, isChannel = false }) => {
  const dispatch = useDispatch();
  const chatData = useSelector(selectedChatData);
  const chatType = useSelector(selectedChatType);
  const onlineUser = useSelector(selectedOnlineUser);

  const handleClick = (contact) => {
    if (isChannel) {
      dispatch(setChatType("channel"));
    } else {
      dispatch(setChatType("contact"));
    }
    dispatch(setChatData(contact));
    if (chatData && chatData._id !== contact._id) {
      dispatch(setChatMessages([]));
    }
  };

  return (
    <div className="mt-5">
      {contacts?.map((contact) => (
        <div
          key={contact._id}
          className={`pl-10 py-2 transition-all duration-300 cursor-pointer ${
            chatData && chatData._id === contact._id
              ? "bg-[#8417ff] hover:bg-[#8417ff]"
              : "hover:bg-[#f1f1f111]"
          }`}
          onClick={() => handleClick(contact)}
        >
          <div className="flex items-start justify-start gap-4 text-neutral-300">
            {!isChannel && (
              <>
                <div className="w-10 h-10 rounded-full relative">
                  <Avatar className="w-10 h-10 ">
                    {contact.image ? (
                      <AvatarImage
                        src={contact.image}
                        alt="profile"
                        className="object-cover w-full rounded-fullh-full bg-black"
                        loading="lazy"
                      />
                    ) : (
                      <div
                        className={`uppercase h-10 w-10 text-xs border flex-center rounded-full ${getColor(
                          contact.color
                        )}`}
                      >
                        {contact.firstName && contact.lastName
                          ? splitName(contact.firstName, contact.lastName)
                          : contact.email.charAt(0)}
                      </div>
                    )}
                  </Avatar>
                </div>
                {isChannel ? (
                  <span>{contact.name}</span>
                ) : (
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {chatType === "contact" && contact.firstName
                        ? `${contact.firstName} ${contact.lastName}`
                        : contact.email}
                    </span>
                    <span className="text-xs">
                      {onlineUser[contact._id] ? "Online" : "Offline"}
                    </span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
