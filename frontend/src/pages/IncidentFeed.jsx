import { useEffect, useState } from "react";
import { getIncidents } from "../services/api";
import MapView from "../components/MapView";
import Hero3D from "../components/Hero3D";

export default function IncidentFeed({ onSelectLocation }) {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    let alive = true;

    const load = async () => {
      try {
        const data = await getIncidents();
        if (alive) setIncidents(Array.isArray(data) ? data : []);
      } catch {
        if (alive) setIncidents([]);
      }
    };

    load();
    const id = setInterval(load, 3000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0b0b0b",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {/* PAGE CONTAINER */}
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* HERO */}
        <section
          style={{
            width: "100%",
            height: "420px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Hero3D />
        </section>

        {/* CONTENT */}
        <section
          style={{
            width: "100%",
            padding: "40px 20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2
            style={{
              fontSize: "32px",
              marginBottom: "24px",
              textAlign: "center",
            }}
          >
            Live Incident Feed
          </h2>

          {/* MAP */}
          <div
            style={{
              width: "100%",
              maxWidth: "900px",
              marginBottom: "40px",
              borderRadius: "16px",
              overflow: "hidden",
            }}
          >
            <MapView
              incidents={incidents}
              onSelectLocation={onSelectLocation}
            />
          </div>

          {/* EMPTY STATE */}
          {incidents.length === 0 && (
            <p style={{ opacity: 0.6 }}>No incidents reported yet.</p>
          )}

          {/* INCIDENT CARDS */}
          <div
            style={{
              width: "100%",
              maxWidth: "900px",
              display: "grid",
              gap: "16px",
            }}
          >
            {incidents.map((i) => (
              <div
                key={i.id}
                style={{
                  background: "#141414",
                  borderRadius: "14px",
                  padding: "18px",
                }}
              >
                <p style={{ fontSize: "13px", opacity: 0.6 }}>
                  {i.type}
                </p>

                <p style={{ fontSize: "18px", margin: "10px 0" }}>
                  {i.description}
                </p>

                {/* SEVERITY LABEL */}
                <p
                  style={{
                    fontSize: "12px",
                    marginBottom: "8px",
                    color:
                      i.severity === 1
                        ? "#3cff3c"
                        : i.severity === 2
                        ? "#ffc107"
                        : "#ff4d4d",
                  }}
                >
                  Severity ·{" "}
                  {i.severity === 1
                    ? "Low"
                    : i.severity === 2
                    ? "Medium"
                    : "High"}
                </p>

                <p style={{ fontSize: "13px", opacity: 0.5 }}>
                  Upvotes · {i.upvotes}
                </p>

                {/* 🚨 EMERGENCY ACTIONS (ONLY FOR HIGH SEVERITY) */}
                {i.severity === 3 && (
                  <div style={{ marginTop: "12px" }}>
                    <p style={{ fontSize: "12px", opacity: 0.6 }}>
                      Emergency services:
                    </p>

                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        marginTop: "6px",
                      }}
                    >
                      <a href="tel:112">
                        <button>🚓 Police</button>
                      </a>
                      <a href="tel:108">
                        <button>🚑 Ambulance</button>
                      </a>
                      <a href="tel:101">
                        <button>🚒 Fire</button>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
