import { Message } from "../models/message.model.js";
import crypto from "crypto";

const algorithm = "aes-256-cbc";
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

// Encrypt a message
const encryptMessage = (message) => {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(message, "utf8", "hex");
  encrypted += cipher.final("hex");
  return { encrypted, iv: iv.toString("hex") };
};

// Decrypt a message
const decryptMessage = (encrypted, ivHex) => {
  const decipher = crypto.createDecipheriv(
    algorithm,
    key,
    Buffer.from(ivHex, "hex")
  );
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

// Send a message
export const sendMessage = async (req, res) => {
  try {
    const { to, from, message } = req.body;

    const newMessage = await Message.create({ to, from, message });
    res.status(201).json({
      success: true,
      message: {
        to,
        from,
        message,
        timestamp: newMessage.timestamp,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get messages for a user
export const getMessages = async (req, res) => {
  try {
    const { username } = req.query;

    const messages = await Message.find({
      $or: [{ to: username }, { from: username }],
    }).sort({ timestamp: 1 });

    res.status(200).json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
