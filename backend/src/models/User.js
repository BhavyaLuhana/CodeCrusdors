const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  aadhaarHash: { type: String, required: true }, // full aadhaar hashed
  aadhaarLast4: { type: String, required: true }, // last 4 digits for PIN
  emergencyContacts: [{ type: String }], // family contacts
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
