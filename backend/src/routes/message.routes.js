import express from "express";
import { sendMessage, getMessages } from "../controllers/message.controller.js";

const router = express.Router();

router.post("/send", sendMessage);
router.get("/get", getMessages);

export default router;
