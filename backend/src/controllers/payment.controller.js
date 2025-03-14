import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { payment } from "../models/payment.model.js";
import { Teacher } from "../models/teacher.model.js";

const coursePayment = asyncHandler(async (req, res) => {
  const { fees } = req.body;

  if (!fees) {
    throw new ApiError(400, "fees is required");
  }

  const order = {
    id: "sim_" + Date.now(),
    amount: fees,
    currency: "INR",
    status: "created",
  };

  return res.status(200).json(new ApiResponse(200, order, "order created"));
});

const coursePaymentConfirmation = asyncHandler(async (req, res) => {
  const { orderId } = req.body;
  const studentID = req.Student._id;
  const courseID = req.params.courseID;

  const orderDetails = await payment.create({
    razorpay_order_id: orderId,
    razorpay_payment_id: "sim_pay_" + Date.now(),
    razorpay_signature: "simulated_signature",
    courseID,
    studentID,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, { orderDetails }, "payment confirmed"));
});

const getkey = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(
      new ApiResponse(200, { key: "simulated_key" }, "simulation key fetched")
    );
});

const teacherAmount = asyncHandler(async (req, res) => {
  const teacher = req.teacher;

  const newEnrolledStudentCount = await Teacher.aggregate([
    {
      $match: { _id: teacher._id },
    },
    {
      $unwind: "$enrolledStudent",
    },
    {
      $match: { "enrolledStudent.isNewEnrolled": true },
    },
    {
      $group: {
        _id: null,
        count: { $sum: 1 },
      },
    },
  ]);

  const count =
    newEnrolledStudentCount.length > 0 ? newEnrolledStudentCount[0].count : 0;

  await Teacher.findByIdAndUpdate(teacher._id, {
    $inc: { Balance: count * 500 },
  });

  const newTeacher = await Teacher.findOneAndUpdate(
    { _id: teacher._id, "enrolledStudent.isNewEnrolled": true },
    { $set: { "enrolledStudent.$[elem].isNewEnrolled": false } },
    {
      new: true,
      arrayFilters: [{ "elem.isNewEnrolled": true }],
    }
  );

  if (!newTeacher) {
    const newTeacher = await Teacher.findById(teacher._id);

    return res
      .status(200)
      .json(new ApiResponse(200, { newTeacher }, "balance"));
  }

  return res.status(200).json(new ApiResponse(200, { newTeacher }, "balance"));
});

const withdrawAmount = asyncHandler(async (req, res) => {
  const teacherId = req.teacher._id;
  const amount = req.body.amount;

  console.log(amount);

  const teacher = await Teacher.findById(teacherId);

  if (!teacher) {
    return res.status(404).json({ message: "Teacher not found" });
  }

  if (teacher.Balance < amount) {
    return res.status(400).json({ message: "Insufficient balance" });
  }

  teacher.Balance -= amount;
  teacher.WithdrawalHistory.push({ amount });
  await teacher.save();

  const newTeacher = await Teacher.findById(teacherId);

  return res.status(200).json(new ApiResponse(200, { newTeacher }, "balance"));
});

export {
  coursePayment,
  getkey,
  coursePaymentConfirmation,
  teacherAmount,
  withdrawAmount,
};
