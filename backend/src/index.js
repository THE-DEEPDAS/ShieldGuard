import dotenv from "dotenv";
import { app } from "./app.js";
import mongoose from "mongoose";
import express from "express";

dotenv.config({
  path: "./.env",
});

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB connected:", connection.connection.host);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

app.get("/api/threat-intelligence", async (req, res) => {
  try {
    const articles = [
      {
        title: "Cybersecurity Alert: New Malware Detected",
        content:
          "A new malware targeting financial institutions has been detected...",
      },
      {
        title: "Global Tensions Rise Amid Conflict",
        content: "Recent developments in the region have escalated tensions...",
      },
    ];
    res.json({ articles });
  } catch (error) {
    console.error("Error fetching threat intelligence:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch threat intelligence data." });
  }
});

const startServer = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 0; // Let OS assign port if default is busy
    const server = app.listen(PORT, () => {
      const actualPort = server.address().port;
      console.log(`⚙️ Server is running at port: ${actualPort}`);
    });

    server.on("error", (error) => {
      if (error.code === "EADDRINUSE") {
        console.log("Port is busy, trying another port...");
        server.listen(0); // Let OS assign available port
      } else {
        console.error("Server error:", error);
        process.exit(1);
      }
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
