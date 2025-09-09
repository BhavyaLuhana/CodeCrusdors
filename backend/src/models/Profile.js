// models/Profile.js
import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  destination: { type: String, required: true },
  emergencyContacts: [{ type: String, required: true }], // array of phone numbers
  digitalId: { type: String }, // will be generated later
  status: { type: String, enum: ["active", "completed"], default: "active" }
});

const profileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  trips: [tripSchema]
});

export default mongoose.model("Profile", profileSchema);
