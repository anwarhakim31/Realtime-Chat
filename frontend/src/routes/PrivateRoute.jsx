import { useSelector } from "react-redux";
import { selectedUserData } from "@/store/slices/auth-slices";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

const PrivateRoute = ({ children }) => {
  const userData = useSelector(selectedUserData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading state
    if (userData !== undefined) {
      setLoading(false);
    }
  }, [userData]);

  const isAuthenticate = !userData;

  if (loading) {
    return (
      <div className="flex items-center flex-col bg-template justify-center h-screen">
        <div className="relative">
          <div className="h-20 w-20 rounded-full border-t-8 border-b-8 border-gray-200"></div>
          <div className="absolute top-0 left-0 h-20 w-20 rounded-full border-t-8 border-b-8 border-purple-700 animate-spin"></div>
        </div>
        <div className="text-white mt-2">Loading...</div>
      </div>
    );
  }

  return isAuthenticate ? <Navigate to={"/auth"} /> : children;
};

export default PrivateRoute;
