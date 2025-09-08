import express from "express";
import { reportIncident, getIncidents } from "../controllers/incidentControllers.js";

const router = express.Router();

router.post("/", reportIncident);   // report new incident
router.get("/", getIncidents);      // fetch all incidents

export default router;
