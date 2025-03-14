import dotenv from "dotenv";
import { app } from "./app.js";
import mongoose from "mongoose";

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
