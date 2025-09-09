import express from "express";
import { addTrip, getTrips } from "../controllers/profileController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/trip", authMiddleware, addTrip);   // add new trip
router.get("/trips", authMiddleware, getTrips);  // fetch all trips

export default router;
