import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  razorpay_order_id: {
    type: String,
    required: true,
  },
  razorpay_payment_id: {
    type: String,
    required: true,
  },
  razorpay_signature: {
    type: String,
    default: "simulated_signature",
  },
  courseID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "course",
    require: true,
  },
  studentID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "student",
    require: true,
  },
});

export const payment = mongoose.model("payment", paymentSchema);
