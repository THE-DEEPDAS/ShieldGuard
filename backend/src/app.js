import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import Razorpay from "razorpay";
import mongoose from "mongoose";

const app = express();

app.use(cors());

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

export const instance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

//student routes
import studentRouter from "./routes/student.routes.js";
app.use("/api/student", studentRouter);

//teacher routes
import teacherRouter from "./routes/teacher.routes.js";
app.use("/api/teacher", teacherRouter);

//course routes
import courseRouter from "./routes/course.routes.js";
app.use("/api/course", courseRouter);

import adminRouter from "./routes/admin.routes.js";
app.use("/api/admin", adminRouter);

import paymentRouter from "./routes/payment.routes.js";
app.use("/api/payment", paymentRouter);

// Ensure collections are created
import { student } from "./models/student.model.js";
import { Teacher } from "./models/teacher.model.js";
import { course } from "./models/course.model.js";
import { admin } from "./models/admin.model.js";
import { payment } from "./models/payment.model.js";
import { contact } from "./models/contact.model.js";

const ensureCollections = async () => {
  try {
    await student.createCollection();
    await Teacher.createCollection();
    await course.createCollection();
    await admin.createCollection();
    await payment.createCollection();
    await contact.createCollection();
    console.log("Collections ensured.");

    // Populate collections with initial data if they are empty
    const studentCount = await student.countDocuments();
    if (studentCount === 0) {
      await student.create({
        Email: "student@example.com",
        Firstname: "John",
        Lastname: "Doe",
        Password: "password123",
        Isverified: true,
      });
      console.log("Initial student data added.");
    }

    const teacherCount = await Teacher.countDocuments();
    if (teacherCount === 0) {
      await Teacher.create({
        Email: "teacher@example.com",
        Firstname: "Jane",
        Lastname: "Doe",
        Password: "password123",
        Isverified: true,
      });
      console.log("Initial teacher data added.");
    }

    const courseCount = await course.countDocuments();
    if (courseCount === 0) {
      const teacher = await Teacher.findOne();
      await course.create({
        coursename: "Sample Course",
        description: "This is a sample course.",
        isapproved: true,
        enrolledteacher: teacher._id,
      });
      console.log("Initial course data added.");
    }

    const adminCount = await admin.countDocuments();
    if (adminCount === 0) {
      await admin.create({
        username: "admin",
        password: "admin123",
      });
      console.log("Initial admin data added.");
    }
  } catch (error) {
    console.error("Error ensuring collections:", error);
  }
};

mongoose.connection.once("open", ensureCollections);

// Add a route to handle requests to the root URL
app.get("/", (req, res) => {
  res.send("Welcome to the Online Learning Platform API");
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use. Trying another port...`);
    server.listen(0); // Use an available port
  } else {
    throw err;
  }
});

export { app };
