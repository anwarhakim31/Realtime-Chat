import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from "./pages/auth";
import Chat from "./pages/chat";
import Profile from "./pages/profile";
import AuthRoute from "./routes/AuthRoute";
import PrivateRoute from "./routes/PrivateRoute";
import { useSelector } from "react-redux";
import { selectedUserData, setUserData } from "./store/slices/auth-slices";
import { useEffect } from "react";
import { HOST } from "./utils/constant";

import { useDispatch } from "react-redux";

function App() {
  const userData = useSelector(selectedUserData);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(HOST + "/api/auth/user-data", {
          methods: "GET",
          credentials: "include",
        });

        const data = await res.json();

        if (res.ok && data.user._id) {
          dispatch(setUserData(data.user));
        }
      } catch (error) {
        dispatch(setUserData(undefined));
      }
    };

    if (!userData) {
      fetchData();
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth"
          element={
            <AuthRoute>
              <Auth />
            </AuthRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to={"/auth"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
