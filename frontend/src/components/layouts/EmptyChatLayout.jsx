import { animationDefaultOption } from "@/lib/utils";
import Lottie2 from "react-lottie";

const EmptyChatLayout = () => {
  return (
    <div className="flex-1 md:bg-template md:flex flex-col justify-center items-center hidden duration-1000 transition-all">
      <Lottie2
        isClickToPauseDisabled={true}
        height={200}
        width={200}
        options={animationDefaultOption}
      />
      <div className="text-opacity-80 text-white flex flex-col gap-5 items-center mt-10 lg:text-4xl text-3xl transition-all duration-300 text-center">
        <h3 className=" poppins-medium">
          Welcome to
          <span className="text-purple-500"> Syncronus</span> Chat App
          <span className="text-purple-500">.</span>
        </h3>
      </div>
    </div>
  );
};

export default EmptyChatLayout;
