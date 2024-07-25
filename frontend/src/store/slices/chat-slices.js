import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatType: undefined,
  chatData: undefined,
  chatMessage: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChatType: (state, action) => {
      state.chatType = action.payload;
    },
    setChatData: (state, action) => {
      state.chatData = action.payload;
    },
    setChatMessages: (state, action) => {
      state.chatMessage = action.payload;
    },
    addMessage: (state, action) => {
      const { chatType } = state;
      const message = action.payload;

      const newMessage = {
        ...message,
        recipient:
          chatType === "channel" ? message.recipient : message.recipient._id,
      };

      state.chatMessage.push(newMessage);
    },
    closeChat: (state) => {
      state.chatType = undefined;
      state.chatMessage = undefined;
      state.chatMessage = [];
    },
  },
});

export const {
  setChatType,
  closeChat,
  setChatData,
  setChatMessages,
  addMessage,
} = chatSlice.actions;
export default chatSlice.reducer;

export const setSelectedChatData = (state) => state.chat.chatData;
export const setSelectedChatType = (state) => state.chat.chatType;
export const setSelectedChatMessage = (state) => state.chat.chatMessage;
