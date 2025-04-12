import mongoose from "mongoose";

const blockSchema = new mongoose.Schema({
  index: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  data: { type: Object, required: true }, // Message data (to, from, message)
  previousHash: { type: String, required: true },
  hash: { type: String, required: true },
});

export const Block = mongoose.model("Block", blockSchema);
