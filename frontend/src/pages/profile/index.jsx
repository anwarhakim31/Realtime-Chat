import { selectedUserData } from "@/store/slices/auth-slices";
import { useSelector } from "react-redux";

const Profile = () => {
  const userData = useSelector(selectedUserData);

  return <div>Profile id ={}</div>;
};

export default Profile;
