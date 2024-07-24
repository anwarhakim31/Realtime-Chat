import { animationDefaultOption } from "@/lib/utils";
import Lottie from "react-lottie";

const EmptyChatLayout = () => {
  return (
    <div className="flex-1 md:bg-template md:flex flex-col justify-center items-center hidden duration-1000 transition-all">
      <Lottie
        isClickToPauseDisabled={true}
        height={200}
        width={200}
        options={animationDefaultOption}
      />
    </div>
  );
};

export default EmptyChatLayout;
