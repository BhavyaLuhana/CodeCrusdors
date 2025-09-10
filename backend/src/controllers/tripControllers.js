import Profile from "../models/Profile.js";
import jwt from "jsonwebtoken";

// Helper: Generate Digital ID (simple hash of userId + timestamp for now)
const generateDigitalId = (userId) => {
  return `${userId}-${Date.now().toString(36)}`;
};

// CREATE TRIP
export const createTrip = async (req, res) => {
  try {
    const { startDate, endDate, destination, emergencyContacts } = req.body;
    const userId = req.user.id; // we’ll get this from JWT middleware

    // find or create profile
    let profile = await Profile.findOne({ user: userId });
    if (!profile) {
      profile = new Profile({ user: userId, trips: [] });
    }

    // generate digital ID
    const digitalId = generateDigitalId(userId);

    // new trip object
    const newTrip = {
      startDate,
      endDate,
      destination,
      emergencyContacts,
      digitalId,
      status: "active",
    };

    // push trip to profile
    profile.trips.push(newTrip);
    await profile.save();

    res.status(201).json({ message: "Trip created", trip: newTrip });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL TRIPS FOR USER
export const getMyTrips = async (req, res) => {
  try {
    const userId = req.user.id;

    const profile = await Profile.findOne({ user: userId });
    if (!profile) return res.json({ trips: [] });

    res.json({ trips: profile.trips });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE TRIP
export const updateTrip = async (req, res) => {
  try {
    const userId = req.user.id;
    const { tripId } = req.params;
    const { startDate, endDate, destination, emergencyContacts } = req.body;

    const profile = await Profile.findOne({ user: userId });
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    const trip = profile.trips.id(tripId);
    if (!trip) return res.status(404).json({ message: "Trip not found" });

    // update fields
    if (startDate) trip.startDate = startDate;
    if (endDate) trip.endDate = endDate;
    if (destination) trip.destination = destination;
    if (emergencyContacts) trip.emergencyContacts = emergencyContacts;

    await profile.save();

    res.json({ message: "Trip updated", trip });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// MARK TRIP COMPLETED
export const completeTrip = async (req, res) => {
  try {
    const userId = req.user.id;
    const { tripId } = req.params;

    const profile = await Profile.findOne({ user: userId });
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    const trip = profile.trips.id(tripId);
    if (!trip) return res.status(404).json({ message: "Trip not found" });

    trip.status = "completed";
    await profile.save();

    res.json({ message: "Trip marked as completed", trip });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE TRIP
export const deleteTrip = async (req, res) => {
  try {
    const userId = req.user.id;
    const { tripId } = req.params;

    const profile = await Profile.findOne({ user: userId });
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    const trip = profile.trips.id(tripId);
    if (!trip) return res.status(404).json({ message: "Trip not found" });

    trip.remove();
    await profile.save();

    res.json({ message: "Trip deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};