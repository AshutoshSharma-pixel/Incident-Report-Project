import { useState } from "react";
import { createIncident } from "../services/api";

export default function ReportIncident({ selectedLocation }) {
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState(1);
  const [result, setResult] = useState(null);

  const submit = async (e) => {
    e.preventDefault();

    if (!description.trim()) {
      alert("Please describe the incident");
      return;
    }

    const res = await createIncident({
      type: "Incident",
      description,
      severity,
      location: selectedLocation || { lat: 28.61, lng: 77.2 },
    });

    setResult(res);
    setDescription("");
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Report Incident</h2>

      <form onSubmit={submit}>
        {/* DESCRIPTION */}
        <textarea
          rows={4}
          placeholder="Describe what happened"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* SEVERITY */}
        <div style={{ margin: "20px 0" }}>
          <label style={{ display: "block", marginBottom: "6px" }}>
            Severity
          </label>
          <select
            value={severity}
            onChange={(e) => setSeverity(Number(e.target.value))}
          >
            <option value={1}>Low</option>
            <option value={2}>Medium</option>
            <option value={3}>High</option>
          </select>
        </div>

        {/* LOCATION INFO */}
        <p style={{ fontSize: "12px", opacity: 0.7 }}>
  Location:{" "}
  {selectedLocation
    ? `${selectedLocation.lat.toFixed(4)}, ${selectedLocation.lng.toFixed(4)} (selected on map)`
    : "Using default location (click on map to select)"}
</p>


        <button style={{ marginTop: "16px" }} type="submit">
          Submit
        </button>
      </form>

      {/* RESULT */}
      {result?.message && (
        <p style={{ marginTop: "20px", color: "orange" }}>
          {result.message}
        </p>
      )}

      {result && severity === 3 && (
        <div style={{ marginTop: "20px" }}>
          <p style={{ fontWeight: "bold" }}>
            Emergency services:
          </p>

          <div style={{ display: "flex", gap: "10px", marginTop: "6px" }}>
            <a href="tel:112">🚓 Police</a>
            <a href="tel:108">🚑 Ambulance</a>
            <a href="tel:101">🚒 Fire</a>
          </div>
        </div>
      )}
    </div>
  );
}
