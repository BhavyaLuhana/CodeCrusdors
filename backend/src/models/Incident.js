import mongoose from "mongoose";

const incidentSchema = new mongoose.Schema(
  {
    location: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    reportedBy: { type: String, required: true }, // userId or name
    severity: { type: String, enum: ["low", "medium", "high"], default: "low" },
  },
  { timestamps: true }
);

const Incident = mongoose.model("Incident", incidentSchema);
export default Incident;
