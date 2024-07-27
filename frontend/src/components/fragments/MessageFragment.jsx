import { selectedUserData } from "@/store/slices/auth-slices";
import {
  selectedChatData,
  selectedChatMessage,
  selectedChatType,
  setChatMessages,
} from "@/store/slices/chat-slices";
import { HOST } from "@/utils/constant";
import { Download, FileArchive, FileText, Music2, Play, X } from "lucide-react";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageModal from "./media/ImageModal";
import VideoModal from "./media/VideoModal";
import MusicModal from "./media/MusicModal";

const MessageFragment = () => {
  const fragmentRef = useRef();
  const dispatch = useDispatch();
  const chatType = useSelector(selectedChatType);
  const chatData = useSelector(selectedChatData);
  const userData = useSelector(selectedUserData);
  const chatMessages = useSelector(selectedChatMessage);
  const [showImage, setShowImage] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [showVideo, setShowVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [showMusic, setShowMusic] = useState(false);
  const [musicUrl, setMusicUrl] = useState("");

  useEffect(() => {
    if (fragmentRef.current) {
      fragmentRef.current.scrollTop = fragmentRef.current.scrollHeight;
    }
  }, [chatMessages]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await fetch(HOST + "/api/messages/get-messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: chatData._id }),
          credentials: "include",
        });

        const data = await res.json();

        if (data.messages) {
          dispatch(setChatMessages(data.messages));
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (chatData._id) {
      if (chatType === "contact") {
        getMessages();
      }
    }
  }, [chatType, chatData]);

  ////////////////////

  const checkIfImage = (filePath) => {
    const imageRegex =
      /\.(jpg|jpeg|png|gif|svg|tif|ico|heif|heic|bmp|webp|tiff)$/i;
    return imageRegex.test(filePath);
  };

  const checkIfVideo = (filePath) => {
    const videoRegex = /\.(mp4|webm|ogg|avi|mov|wmv|flv|mkv|mpeg|mpg|3gp)$/i;
    return videoRegex.test(filePath);
  };

  const checkIfMusic = (filePath) => {
    const musicRegex = /\.(mp3|wav|ogg|flac|aac|wma|m4a|aiff|alac)$/i;
    return musicRegex.test(filePath);
  };

  const checkIfDocument = (filePath) => {
    const documentRegex = /\.(pdf|docx?|xlsx?|pptx?|txt|csv)$/i;
    return documentRegex.test(filePath);
  };

  const checkIfArchive = (filePath) => {
    const archiveRegex = /\.(rar|zip|7z|tar|gz|bz2)$/i;
    return archiveRegex.test(filePath);
  };

  ////////////////

  const handleDownloadFile = async (fileUrl) => {
    try {
      const res = await fetch(fileUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/octet-stream",
        },
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await res.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = fileUrl.split("-").pop();
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("There was an error downloading the file:", error);
    }
  };

  const renderMessages = () => {
    let lastDate = null;

    return chatMessages.map((message, index) => {
      const messageDate = moment(message.timeStamp).format("YYYY-MM-DD");
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;

      return (
        <div key={index}>
          {showDate && (
            <div className="text-center text-gray-500 my-2">
              {moment(message.timeStamp).format("LL")}
            </div>
          )}
          {chatType === "contact" && renderDmMessages(message)}
        </div>
      );
    });
  };

  const renderDmMessages = (message) => (
    <div
      className={`${
        message.sender === chatData._id ? "text-left" : "text-right"
      } mt-1`}
    >
      {message.messageType === "text" && (
        <div
          className={`${
            message.sender !== chatData._id
              ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"
              : "bg-[#2e2b33]/5 text-white/80 border-[#ffffff]/20"
          } border inline-block p-4 rounded my-1 max-w-[50%] break-words`}
        >
          {message.content}
        </div>
      )}
      {message.messageType === "file" && (
        <div
          className={`${
            message.sender !== chatData._id
              ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"
              : "bg-[#2e2b33]/5 text-white/80 border-[#ffffff]/20"
          } border inline-block p-4 rounded my-1 max-w-[50%] break-words`}
        >
          {checkIfImage(message.fileUrl) && (
            <div
              className="cursor-pointer"
              onClick={() => {
                setShowImage(true);
                setImageUrl(message.fileUrl);
              }}
            >
              <img src={message.fileUrl} height={300} width={300} alt="image" />
            </div>
          )}
          {checkIfVideo(message.fileUrl) && (
            <div
              className="relative cursor-pointer"
              onClick={() => {
                setShowVideo(true);
                setVideoUrl(message.fileUrl);
              }}
            >
              <video width={300} height={300}>
                <source src={message.fileUrl} type="video/mp4" />
              </video>
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <Play className="text-white w-10 h-10" />
              </div>
            </div>
          )}
          {checkIfMusic(message.fileUrl) && (
            <div
              className="relative bg-none flex-center flex-col cursor-pointer"
              onClick={() => {
                setShowMusic(true);
                setMusicUrl(message.fileUrl);
              }}
            >
              <div>
                <Music2
                  className="bg-none text-[#8417ff]"
                  width={50}
                  height={50}
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center  bg-opacity-50">
                <Play className="text-white w-10 h-10" />
              </div>
              <span className="text-sm mt-5">
                {message.fileUrl.split("-").pop()}
              </span>
            </div>
          )}

          {checkIfDocument(message.fileUrl) && (
            <div className="flex items-center justify-center gap-4">
              <span className="text-white/8- text-3xl bg-black/20 rounded-full p-3">
                <FileText />
              </span>
              <span>{message.fileUrl.split("-").pop()}</span>
              <span
                onClick={() => handleDownloadFile(message.fileUrl)}
                className="bg-black/20 p-3 text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300"
              >
                <Download />
              </span>
            </div>
          )}

          {checkIfArchive(message.fileUrl) && (
            <div className="flex items-center justify-center gap-4">
              <span className="text-white/8- text-3xl bg-black/20 rounded-full p-3">
                <FileArchive />
              </span>
              <span>{message.fileUrl.split("-").pop()}</span>
              <span
                onClick={() => handleDownloadFile(message.fileUrl)}
                className="bg-black/20 p-3 text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300"
              >
                <Download />
              </span>
            </div>
          )}
        </div>
      )}

      <div className="text-xs text-gray-600">
        {moment(message.timeStamp).format("LT")}
      </div>
    </div>
  );

  return (
    <div
      ref={fragmentRef}
      className="flex-1 overflow-y-auto p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80vw] w-full"
    >
      {renderMessages()}

      {showImage && (
        <ImageModal
          setShowImage={setShowImage}
          setImageUrl={setImageUrl}
          imageUrl={imageUrl}
          handleDownloadFile={handleDownloadFile}
        />
      )}
      {showVideo && (
        <VideoModal
          setShowVideo={setShowVideo}
          videoUrl={videoUrl}
          handleDownloadFile={handleDownloadFile}
          setVideoUrl={setVideoUrl}
        />
      )}
      {showMusic && (
        <MusicModal
          setShowMusic={setShowMusic}
          musicURl={musicUrl}
          handleDownloadFile={handleDownloadFile}
          setMusicUrl={setMusicUrl}
        />
      )}
    </div>
  );
};

export default MessageFragment;
