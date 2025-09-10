import express from "express";
import {
  createTrip,
  getMyTrips,
  updateTrip,
  completeTrip,
  deleteTrip,
} from "../controllers/tripControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createTrip);        // Create trip
router.get("/", protect, getMyTrips);         // Get all trips
router.put("/:tripId", protect, updateTrip);  // Update trip
router.patch("/:tripId/complete", protect, completeTrip); // Mark complete
router.delete("/:tripId", protect, deleteTrip); // Delete trip

export default router;
