import Razorpay from "razorpay";
import dotenv from "dotenv";
dotenv.config();

const razorpayInstance = new Razorpay({
  key_id: process.env.key_id,
  key_secret: process.env.key_secret,
});

if (!process.env.key_id || !process.env.key_secret) {
  console.warn("Razorpay API keys are missing in environment variables");
}

export default razorpayInstance;
