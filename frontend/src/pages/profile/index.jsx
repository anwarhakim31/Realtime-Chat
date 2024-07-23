import { selectedUserData } from "@/store/slices/auth-slices";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { colors, getColor } from "@/lib/utils";
import { Trash } from "lucide-react";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HOST } from "@/utils/constant";
import { toast } from "sonner";

const Profile = () => {
  const navigate = useNavigate();
  const userData = useSelector(selectedUserData);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    image: null,
  });
  const [hovered, setHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);
  const [loading, setLoading] = useState(false);

  const split = () => {
    const result = [];

    const first = form.firstName.split("").shift();
    const last = form.lastName.split("").shift();

    result.push(first);
    result.push(last);

    return result.join("");
  };

  const handleSaveChange = async () => {
    setLoading(true);
    try {
      const res = await fetch(HOST + "/api/auth/update-profile", {
        method: "PUT",
        body: JSON.stringify({ ...form }),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.errors);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-template h-[100vh] flex-center gap-10 flex-col">
      <div className="flex flex-col gap-10 w-[80vw] md:w-max">
        <div>
          <ChevronLeft className="text-4xl w-[60px] h-[60px] text-white/90 cursor-pointer" />
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <div
            className=" w-32 h-32 md:w-48 md:h-48 relative flex-center"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Avatar className="h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden">
              {form.image ? (
                <AvatarImage
                  src={form.image}
                  alt="profile"
                  className={"object-cover w-full h-full bg-black"}
                />
              ) : (
                <div
                  className={`uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border flex-center rounded-full ${getColor(
                    selectedColor
                  )}`}
                >
                  {form.firstName && form.lastName
                    ? split()
                    : userData.email.split("").shift()}
                </div>
              )}
            </Avatar>
            {hovered && (
              <div className="absolute inset-0 flex-center bg-black/50 ring-fuchsia-50 rounded-full">
                {form.image ? (
                  <Trash className="text-white w-[30px] h-[30px] cursor-pointer" />
                ) : (
                  <Plus className="text-white w-[30px] h-[30px] cursor-pointer" />
                )}
              </div>
            )}
            {/* { <input type="text" /> } */}
          </div>
          <div className="flex-center min-w-32 gap-5 md:min-w-64 flex-col text-white">
            <div className="w-full">
              <Input
                placeholder="Email"
                type="email"
                disabled
                value={userData.email}
                className={"rounded-lg p-6 bg-[#2c2e3b] border-none"}
              />
            </div>
            <div className="w-full">
              <Input
                placeholder="First Name"
                type="text"
                value={form.firstName}
                onChange={(e) =>
                  setForm((prevState) => ({
                    ...prevState,
                    firstName: e.target.value,
                  }))
                }
                className={"rounded-lg p-6 bg-[#2c2e3b] border-none"}
              />
            </div>
            <div className="w-full">
              <Input
                placeholder="Last Name"
                type="text"
                value={form.lastName}
                onChange={(e) =>
                  setForm((prevState) => ({
                    ...prevState,
                    lastName: e.target.value,
                  }))
                }
                className={"rounded-lg p-6 bg-[#2c2e3b] border-none"}
              />
            </div>
            <div className="w-full flex gap-5">
              {colors.map((color, index) => (
                <div
                  key={index}
                  className={`${color} h-8 w-8 rounded-full cursor-pointer transition-all duration-300 ${
                    selectedColor === index
                      ? "outline outline-white/100 outline-1"
                      : ""
                  }`}
                  onClick={() => setSelectedColor(index)}
                ></div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full">
          <Button
            className="h-16 w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300"
            onClick={handleSaveChange}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
