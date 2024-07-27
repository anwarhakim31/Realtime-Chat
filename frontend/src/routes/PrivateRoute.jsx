import { useSelector } from "react-redux";
import { selectedUserData, setUserData } from "@/store/slices/auth-slices";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";

const PrivateRoute = ({ children }) => {
  const userData = useSelector(selectedUserData);
  const dispatch = useDispatch();
  const isAuthenticate = !userData;

  const cookie = Cookies.get("jwt");

  useEffect(() => {
    if (!cookie) {
      dispatch(setUserData(undefined));
    }
  }, [cookie]);

  return isAuthenticate ? <Navigate to={"/auth"} /> : children;
};

export default PrivateRoute;
