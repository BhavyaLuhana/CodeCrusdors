import Location from "../models/location.js";

// Save/update user location
export const updateLocation = async (req, res) => {
  try {
    const location = new Location(req.body);
    await location.save();
    res.status(201).json(location);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all locations
export const getLocations = async (req, res) => {
  try {
    const locations = await Location.find().populate("userId");
    res.json(locations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// controllers/locationController.js
export const getUserLatestLocation = async (req, res) => {
  try {
    const location = await Location.findOne({ userId: req.params.userId })
      .sort({ timestamp: -1 }); // newest first
    res.json(location);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

