import React, { useEffect } from "react";
import Logo from "../ui/logo";
import Title from "../elements/Title";
import ProfileInfo from "../fragments/ProfileInfo";
import NewDm from "../fragments/NewDm";
import { HOST } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import {
  addChannelInChannelList,
  selectedChannels,
  selectedChatMessage,
  selectedDirectMessageContacts,
  selectedTrigger,
  setChannel,
  setDirectMessagerContact,
} from "@/store/slices/chat-slices";
import ContactList from "../fragments/ContactList";
import Channel from "../fragments/Channel";
import { toast } from "sonner";

const ContactLayout = () => {
  const directMessageContaacts = useSelector(selectedDirectMessageContacts);
  const dispatch = useDispatch();
  const channel = useSelector(selectedChannels);
  const trigger = useSelector(selectedTrigger);

  useEffect(() => {
    const getContact = async () => {
      try {
        const res = await fetch(HOST + "/api/contacts/get-contact-for-dm", {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.errors);
        }

        if (data.contacts) {
          dispatch(setDirectMessagerContact(data.contacts));
        }
      } catch (error) {
        toast.error(error);
      }
    };

    const getChannel = async () => {
      try {
        const res = await fetch(HOST + "/api/channel/get-channel", {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.errors);
        }

        if (data.channel) {
          dispatch(setChannel(data.channel));
        }
      } catch (error) {
        toast.error(error);
      }
    };

    getContact();
    getChannel();
  }, [selectedChannels, selectedDirectMessageContacts, trigger]);

  return (
    <div className="relative w-full md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-template border-r-2 border-[#2f303b] ">
      <div className="p-3">
        <Logo />
      </div>
      <div className="my-5">
        <div className="flex-between pr-10">
          <Title text="Direct Messages" />
          <NewDm />
        </div>
        <div className="max-h-[30vh] xs:max-h-[38vh] overflow-y-auto scroll-h">
          <ContactList contacts={directMessageContaacts} />
        </div>
      </div>
      <div className="my-5">
        <div className="flex-between pr-10">
          <Title text="Channel" />
          <Channel />
        </div>
        <div className="max-h-[25vh] xs:max-h-[38vh] overflow-y-auto scrollbar-hidden">
          <ContactList contacts={channel} isChannel={true} />
        </div>
      </div>
      <ProfileInfo />
    </div>
  );
};

export default ContactLayout;
