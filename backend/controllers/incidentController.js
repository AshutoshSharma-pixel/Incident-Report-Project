import { checkDuplicate } from "../services/deduplication.js";

let incidents = [];

export const getIncidents = (req, res) => {
  console.log("GET /api/incidents hit");
  res.status(200).json(incidents);
};

export const createIncident = (req, res) => {
  const { type, description, location, severity = 1 } = req.body;

  if (!type || !description || !location) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const duplicate = checkDuplicate(incidents, location, type);

  if (duplicate) {
    duplicate.upvotes += 1;

    return res.status(200).json({
      message: "Duplicate incident detected",
      incident: duplicate
    });
  }

  const newIncident = {
    id: Date.now().toString(),
    type,
    description,
    location,
    severity,
    status: "reported",
    upvotes: 1,
    isVerified: false,
    createdAt: new Date()
  };

  incidents.push(newIncident);

  res.status(201).json(newIncident);
};

export const upvoteIncident = (req, res) => {
  const { id } = req.params;

  const incident = incidents.find((i) => i.id === id);

  if (!incident) {
    return res.status(404).json({ message: "Incident not found" });
  }

  incident.upvotes += 1;

  res.status(200).json(incident);
};
