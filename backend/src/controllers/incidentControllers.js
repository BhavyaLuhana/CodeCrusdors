import Incident from "../models/Incident.js";

// Report new incident (SOS or manual report)
export const reportIncident = async (req, res) => {
  try {
    const incident = new Incident(req.body);
    await incident.save();

    // 🚨 TODO: trigger notification system here
    res.status(201).json({ message: "Incident reported", incident });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all incidents
export const getIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find().populate("reportedBy");
    res.json(incidents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
