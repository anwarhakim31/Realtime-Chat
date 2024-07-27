import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { Plus } from "lucide-react";
import { useState } from "react";
import {
  DialogHeader,
  Dialog,
  DialogDescription,
  DialogContent,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import Lottie2 from "react-lottie";
import { animationDefaultOption, getColor } from "@/lib/utils";
import { useEffect } from "react";
import { HOST } from "@/utils/constant";
import { toast } from "sonner";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useDispatch } from "react-redux";
import { setChatData, setChatType } from "@/store/slices/chat-slices";

export const splitName = (firstName, lastName) => {
  const result = [];

  const first = firstName.split("").shift();
  const last = lastName.split("").shift();

  result.push(first);
  result.push(last);

  return result.join("");
};

const Channel = () => {
  const dispatch = useDispatch();

  const [openNewContactModal, setOpenNewContactModal] = useState(false);
  const [search, setSearch] = useState("");
  const [searchedContacts, setSearchedContacts] = useState([]);

  const handleSearch = async (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(HOST + "/api/contacts/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ search }),
          credentials: "include",
        });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message);
        } else {
          setSearchedContacts(data.contact);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    if (search.length > 0) {
      fetchData();
    } else {
      setSearchedContacts([]);
    }
  }, [search]);

  const selectNewContact = (contact) => {
    setOpenNewContactModal(false);
    dispatch(setChatType("contact"));
    dispatch(setChatData(contact));
    setSearch("");
    setSearchedContacts([]);
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Plus
              onClick={() => setOpenNewContactModal(true)}
              className="text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100 cursor-pointer transition-all duration-300"
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1c1b1e] border-none mt-2 p-3 text-white">
            Select New Contact
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog open={openNewContactModal} onOpenChange={setOpenNewContactModal}>
        <DialogContent className="bg-[#181920] border-none text-white w-full max-w-[400px] min-h-[400px] flex flex-col">
          <DialogHeader>
            <DialogTitle className={"text-center"}>
              Please select a contact
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="mb-4">
            <Input
              placeholder="Search contacts..."
              className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              onChange={handleSearch}
              value={search}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Channel;
