const express = require("express");
const Location = require("../models/location.js");
const router = express.Router();

// Save live location
router.post("/", async (req, res) => {
  try {
    const location = new Location(req.body);
    await location.save();
    res.json(location);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get latest location of a user
router.get("/:userId", async (req, res) => {
  try {
    const location = await Location.findOne({ userId: req.params.userId }).sort({ timestamp: -1 });
    res.json(location);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
