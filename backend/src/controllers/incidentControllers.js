import Incident from "../models/Incident.js";

export const reportIncident = async (req, res) => {
  try {
    const incident = new Incident(req.body);
    await incident.save();
    res.status(201).json({ message: "Incident reported", incident });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find();
    res.json(incidents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
