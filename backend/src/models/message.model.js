import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    to: { type: String, required: true },
    from: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Message = mongoose.model("Message", messageSchema);
