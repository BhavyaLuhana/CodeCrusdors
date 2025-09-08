import express from "express";
import { updateLocation, getLocations, getUserLatestLocation } from "../controllers/locationController.js";

const router = express.Router();

router.post("/", updateLocation);          // Save location
router.get("/", getLocations);             // Get all locations
router.get("/:userId", getUserLatestLocation); // Get latest for a specific user

export default router;
