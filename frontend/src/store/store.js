import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth-slices";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
