import express from "express";
import cors from "cors";
import incidentRoutes from "./routes/incidents.js";

const app = express();
app.get("/ping", (req, res) => {
  res.send("pong");
});


app.use(cors());
app.use(express.json());

app.use("/api/incidents", incidentRoutes);

const PORT = 5050;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

