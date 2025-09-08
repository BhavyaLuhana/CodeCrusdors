const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  password: { type: String, required: true }, // later you can hash it
  familyContacts: [
    {
      name: String,
      phone: String,
      relation: String
    }
  ]
});

module.exports = mongoose.model("User", userSchema);
