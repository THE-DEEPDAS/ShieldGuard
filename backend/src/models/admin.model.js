import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
  },

  Refreshtoken: {
    type: String,
  },
});

adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

adminSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

adminSchema.methods.generateAccessToken = function () {
  try {
    return jwt.sign(
      {
        _id: this._id,
        Email: this.Email,
      },
      process.env.ACCESS_TOKEN_SECRET || "default_access_secret",
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1h",
      }
    );
  } catch (error) {
    console.error("Error generating access token:", error);
    throw new Error("Error generating access token");
  }
};

adminSchema.methods.generateRefreshToken = function () {
  try {
    return jwt.sign(
      {
        _id: this._id,
        Email: this.Email,
      },
      process.env.REFRESH_TOKEN_SECRET || "default_refresh_secret",
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "7d",
      }
    );
  } catch (error) {
    console.error("Error generating refresh token:", error);
    throw new Error("Error generating refresh token");
  }
};

const admin = mongoose.model("admin", adminSchema);

export { admin };
