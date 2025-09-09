// controllers/profileController.js
import Profile from "../models/Profile.js";

// Add or update trip
export const addTrip = async (req, res) => {
  try {
    const { startDate, endDate, destination, emergencyContacts } = req.body;

    // find existing profile
    let profile = await Profile.findOne({ user: req.user.id });

    const newTrip = {
      startDate,
      endDate,
      destination,
      emergencyContacts,
    };

    if (!profile) {
      profile = new Profile({ user: req.user.id, trips: [newTrip] });
    } else {
      profile.trips.push(newTrip);
    }

    await profile.save();
    res.status(201).json({ message: "Trip added successfully", profile });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all trips of logged-in user
export const getTrips = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) return res.status(404).json({ message: "No profile found" });

    res.json(profile.trips);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
