import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Corrected `Ref` to `ref`
    required: true, // Corrected `requreid` to `required`
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Corrected `Ref` to `ref`
    required: false, // Corrected `requreid` to `required`
  },
  messageType: {
    type: String,
    enum: ["text", "file"],
    required: true, // Corrected `requreid` to `required`
  },
  content: {
    type: String,
    required: function () {
      return this.messageType === "text";
    },
  },
  fileUrl: {
    type: String,
    required: function () {
      return this.messageType === "file";
    },
  },
  timeStamp: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model("Messages", messageSchema);

export default Message;
