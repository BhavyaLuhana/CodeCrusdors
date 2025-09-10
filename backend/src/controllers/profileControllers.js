import Profile from "../models/Profile.js";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";

// Add or update trip
export const addTrip = async (req, res) => {
  try {
    const { startDate, endDate, destination, emergencyContacts } = req.body;

    // Generate Digital ID
    const rawId = uuidv4(); // unique ID
    const hash = crypto
      .createHash("sha256")
      .update(req.user.id + startDate + destination)
      .digest("hex");

    const newTrip = {
      startDate,
      endDate,
      destination,
      emergencyContacts,
      digitalId: `${rawId}-${hash.slice(0, 8)}`, // combine UUID + short hash
      status: "active",
    };

    // find existing profile
    let profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      profile = new Profile({ user: req.user.id, trips: [newTrip] });
    } else {
      profile.trips.push(newTrip);
    }

    await profile.save();
    res.status(201).json({
      message: "Trip added successfully",
      digitalId: newTrip.digitalId,
      trip: newTrip,
    });
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

console.log("profileControllers.js loaded");