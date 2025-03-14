import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    order_id: {
      type: String,
      required: true,
    },
    payment_id: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
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
  },
  {
    timestamps: true,
  }
);

export const payment = mongoose.model("payment", paymentSchema);
