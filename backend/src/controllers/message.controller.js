import { Message } from "../models/message.model.js";
import { Block } from "../models/blockchain.model.js";
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

// Function to calculate hash for a block
const calculateHash = (index, timestamp, data, previousHash) => {
  const blockString = `${index}${timestamp}${JSON.stringify(
    data
  )}${previousHash}`;
  return crypto.createHash("sha256").update(blockString).digest("hex");
};

// Function to get the last block in the blockchain
const getLastBlock = async () => {
  const lastBlock = await Block.findOne().sort({ index: -1 });
  return lastBlock;
};

// Send a message
export const sendMessage = async (req, res) => {
  try {
    const { to, from, message } = req.body;

    // Save the message in the database
    const newMessage = await Message.create({ to, from, message });

    // Blockchain logic
    const lastBlock = await getLastBlock();
    const previousHash = lastBlock ? lastBlock.hash : "0"; // Genesis block hash is "0"
    const index = lastBlock ? lastBlock.index + 1 : 0;
    const timestamp = new Date();
    const data = { to, from, message };
    const hash = calculateHash(index, timestamp, data, previousHash);

    // Create a new block
    const newBlock = await Block.create({
      index,
      timestamp,
      data,
      previousHash,
      hash,
    });

    res.status(201).json({
      success: true,
      message: {
        to,
        from,
        message,
        timestamp: newMessage.timestamp,
      },
      blockchain: newBlock,
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
