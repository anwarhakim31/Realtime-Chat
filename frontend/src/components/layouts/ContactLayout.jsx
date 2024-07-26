import React, { useEffect } from "react";
import Logo from "../ui/logo";
import Title from "../elements/Title";
import ProfileInfo from "../fragments/ProfileInfo";
import NewDm from "../fragments/NewDm";
import { HOST } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedDirectMessageContacts,
  setDirectMessagerContact,
} from "@/store/slices/chat-slices";
import ContactList from "../fragments/ContactList";

const ContactLayout = () => {
  const directMessageContaacts = useSelector(selectedDirectMessageContacts);
  const dispatch = useDispatch();

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
          console.log(data.contacts);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getContact();
  }, []);

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
        <div className="max-h-[38vh] overflow-y-auto scrollbar-hidden">
          <ContactList contacts={directMessageContaacts} />
        </div>
      </div>
      <div className="my-5">
        <div className="flex-between pr-10">
          <Title text="Channel" />
        </div>
      </div>
      <ProfileInfo />
    </div>
  );
};

export default ContactLayout;
