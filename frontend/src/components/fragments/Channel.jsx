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
import { Button } from "../ui/button";
import MultipleSelector from "../ui/multipleselect";

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

  const [newChannelModal, setNewChannelModal] = useState(false);
  const [search, setSearch] = useState("");
  const [searchedContacts, setSearchedContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [allContact, setAllContact] = useState([]);
  const [channelName, setChannelName] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(HOST + "/api/contacts/get-all-contacts", {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.erorrs);
        }

        if (res.ok) {
          setAllContact(data.contacts);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    getData();
  }, []);

  const handleCreateChannel = async () => {};

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Plus
              onClick={() => setNewChannelModal(true)}
              className="text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100 cursor-pointer transition-all duration-300"
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1c1b1e] border-none mt-2 p-3 text-white">
            Create New Channel
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog open={newChannelModal} onOpenChange={setNewChannelModal}>
        <DialogContent className="bg-[#181920] border-none text-white w-full max-w-[400px] min-h-[400px] flex flex-col">
          <DialogHeader>
            <DialogTitle className={"text-center"}>
              Please fill up the details for new channel.
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="mb-4">
            <Input
              placeholder="Channel Name..."
              className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              onChange={(e) => setChannelName(e.target.value)}
              value={channelName}
            />
          </div>
          <div>
            <MultipleSelector
              className="rounded-lg bg-[#2c2e3b] border-none py-2 text-white"
              defaultOptions={allContact}
              placeholder="Search Contacts"
              value={selectedContacts}
              onChange={setSelectedContacts}
              emptyIndicator={
                <p className="text-center text-lg leading-6 text-gray-600">
                  No result found.
                </p>
              }
            />
          </div>
          <div>
            <Button
              className="w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300"
              onClick={handleCreateChannel}
            >
              Create Channel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Channel;
