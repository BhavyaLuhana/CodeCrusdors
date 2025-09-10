import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// simulate OTP (later connect to SMS API)
const otpStore = {}; // { phoneNumber: otp }
const generateOTP = () => Math.floor(1000 + Math.random() * 9000).toString();

// REGISTER
export const registerUser = async (req, res) => {
  try {
    const { name, phoneNumber, aadhaarNumber } = req.body;

    // check existing user
    let existing = await User.findOne({ phoneNumber });
    if (existing) return res.status(400).json({ message: "User already exists" });

    // hash aadhaar
    const aadhaarHash = await bcrypt.hash(aadhaarNumber, 10);
    const aadhaarLast4 = aadhaarNumber.slice(-4);

    // simulate OTP
    const otp = generateOTP();
    console.log(`OTP for ${phoneNumber}: ${otp}`);

    // save user
    const newUser = new User({
      name,
      phoneNumber,
      aadhaarHash,
      aadhaarLast4,
    });
    await newUser.save();

    res.status(201).json({ message: "User registered. Enter OTP to confirm.", otp }); 
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const requestLoginOTP = async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    const user = await User.findOne({ phoneNumber });
    if (!user) return res.status(404).json({ message: "User not found" });

    // generate OTP
    const otp = generateOTP();

    otpStore[phoneNumber] = otp;

    console.log(`Login OTP for ${phoneNumber}: ${otp}`);

    res.json({ message: "OTP sent. Use it with Aadhaar last 4 digits to form PIN." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { phoneNumber, loginPin } = req.body;

    const user = await User.findOne({ phoneNumber });
    if (!user) return res.status(404).json({ message: "User not found" });

    // split loginPin: first 4 = Aadhaar last 4, last 4 = OTP
    const aadhaarPart = loginPin.slice(0, 4);
    const otpPart = loginPin.slice(4);

    if (aadhaarPart !== user.aadhaarLast4) {
      return res.status(400).json({ message: "Invalid Aadhaar digits" });
    }

    if (otpStore[phoneNumber] !== otpPart) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // clear OTP after use
    delete otpStore[phoneNumber];

    // issue token
    const token = jwt.sign(
      { id: user._id, phoneNumber: user.phoneNumber },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        phoneNumber: user.phoneNumber,
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};