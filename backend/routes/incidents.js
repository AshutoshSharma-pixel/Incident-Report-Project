import express from "express";
import {
  createIncident,
  getIncidents,
  upvoteIncident
} from "../controllers/incidentController.js";

const router = express.Router();

router.post("/", createIncident);
router.get("/", getIncidents);

// LAYER 3: Upvote an incident
router.post("/:id/upvote", upvoteIncident);

export default router;
