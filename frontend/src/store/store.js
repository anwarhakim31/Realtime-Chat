import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth-slices";
import chatReducer from "./slices/chat-slices";

const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
  },
});

export default store;
