import React, { useEffect } from "react";
import Logo from "../ui/logo";
import Title from "../elements/Title";
import ProfileInfo from "../fragments/ProfileInfo";
import NewDm from "../fragments/NewDm";
import { HOST } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedChannels,
  selectedDirectMessageContacts,
  selectedTrigger,
  setChannel,
  setDirectMessagerContact,
} from "@/store/slices/chat-slices";
import ContactList from "../fragments/ContactList";
import Channel from "../fragments/Channel";
import { toast } from "sonner";
import { selectedUserData,setUserData } from "@/store/slices/auth-slices";

const ContactLayout = () => {
  const directMessageContaacts = useSelector(selectedDirectMessageContacts);
  const dispatch = useDispatch();
  const channel = useSelector(selectedChannels);
  const trigger = useSelector(selectedTrigger);
  const userData = useSelector(selectedUserData);

  useEffect(() => {
    const getContact = async () => {
      const contactLS = JSON.parse(localStorage.getItem("contact"));

      if (contactLS) {
        dispatch(setDirectMessagerContact(contactLS));
      }
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
          localStorage.setItem("contact", JSON.stringify(data.contacts));
        }
      } catch (error) {
        dispatch(setUserData(undefined))
        toast.error(error.message);
      }
    };

    const getChannel = async () => {
      const channelLS = JSON.parse(localStorage.getItem("channel"));

      if (channelLS) {
        dispatch(setChannel(channelLS));
      }
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

          localStorage.setItem("channel", JSON.stringify(data.channel));
        }
      } catch (error) {
        dispatch(setUserData(undefined))
        toast.error(error.message);
      }
    };

    getContact();
    getChannel();
  }, [userData, selectedChannels, selectedDirectMessageContacts, trigger]);

  return (
    <div className="relative w-full md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-template border-r-2 border-[#2f303b] ">
      <div className="">
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
