import Razorpay from "razorpay";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.key_id || !process.env.key_secret) {
  console.error(
    "WARNING: Razorpay API keys are missing in environment variables"
  );
}

const razorpayInstance = new Razorpay({
  key_id: process.env.key_id,
  key_secret: process.env.key_secret,
});

export default razorpayInstance;
